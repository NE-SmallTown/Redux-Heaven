import forOwn from 'lodash/forOwn';
import find from 'lodash/find';

import Session from './Session';
import Model from './Model';
import { createDatabase as defaultcreateDatabase } from './dataBase';
import { ForeignKey, ManyToMany, attr } from './fields';
import { m2mName, attachQuerySetMethods, m2mToFieldName, m2mFromFieldName, throughModelFkFieldToModelName } from './utils';

const ORM_DEFAULTS = {
  createDatabase: defaultcreateDatabase
};

/**
 * ORM - the Object Relational Mapper.
 *
 * Use instances of this class to:
 *
 * - Register your {@link Model} classes using {@link ORM#register}
 * - Get the empty state for the underlying database with {@link ORM#getEmptyState}
 * - Start an immutable database session with {@link ORM#session}
 * - Start a mutating database session with {@link ORM#mutableSession}
 *
 * Internally, this class handles generating a schema specification from models
 * to the database.
 */
export const ORM = class ORM {
  /**
     * Creates a new ORM instance.
     */
  constructor (opts = {}) {
    const { createDatabase } = { ...ORM_DEFAULTS, ...opts };
    this.createDatabase = createDatabase;
    this.registry = [];
    this.implicitThroughModels = [];
    this.installedFields = {};
    this.hasRegisterImplicitModelsMap = {};
  }

  /**
   * Registers Model to the ORM.
   *
   * If the model has declared any ManyToMany fields, their
   * through models will be generated and registered with
   * this call, unless a custom through model has been specified.
   *
   * @param  {...Model} models - a {@link Model} class to register
   */
  register = (...models) => models.forEach(model => {
    model.resetClassCache();
    model.setOrm(this);
  
    // 在 field 被 install 的时候需要调用 orm.get(...)，get 的可能是一个中间表，所以中间表（非 lazy 的）也需要先注册
    forOwn(model.fields, (fieldInstance, fieldName) => {
      if (fieldInstance instanceof ManyToMany && !this.hasRegisterImplicitModelsMap[fieldName]) {
        this.registerManyToManyModelsFor(model, fieldInstance);
    
        this.hasRegisterImplicitModelsMap[fieldName] = true;
      }
    });
    
    this.registry.push(model);
  });

  registerManyToManyModelsFor (model, fieldInstance, userProp) {
    const thisModelName = model.modelName;

    if (!fieldInstance.through) {
      const toModelName = fieldInstance.lazy
        ? fieldInstance.toModelName(userProp)[0] : fieldInstance.toModelName;
        
      const modelName = m2mName(thisModelName, toModelName);
      const fromFieldName = [m2mFromFieldName(thisModelName)];
      const toFieldName = [m2mToFieldName(toModelName)];
      class ThroughModel extends Model {
          // 如 thisModelName = 'Article', toModelName = 'User', 所以结果为 'Article-User'
          static modelName = modelName;

          static fields = {
            id: attr(),
            // 如 'articleId'
            [fromFieldName]: new ForeignKey(thisModelName, throughModelFkFieldToModelName(modelName, fromFieldName)),
            // 如 'userId'
            [toFieldName]: new ForeignKey(toModelName, throughModelFkFieldToModelName(modelName, toFieldName))
          }
      }

      ThroughModel.resetClassCache();
      this.implicitThroughModels.push(ThroughModel);
    }
  }

  /**
     * Gets a {@link Model} class by its name from the registry.
     * @param  {string} modelName - the name of the {@link Model} class to get
     * @throws If {@link Model} class is not found.
     * @return {Model} the {@link Model} class, if found
     */
  get (modelName) {
    const found = find(
      this.registry.concat(this.implicitThroughModels),
      model => model.modelName === modelName
    );

    if (typeof found === 'undefined') {
      throw new Error(`Did not find model ${modelName} from registry.`);
    }
    return found;
  }

  getModelClasses () {
    this._setupModelPrototypes(this.registry);
    this._setupModelPrototypes(this.implicitThroughModels);

    return this.registry.concat(this.implicitThroughModels);
  }

  isFieldInstalled = (modelName, fieldName) => this.installedFields[modelName]
    ? !!this.installedFields[modelName][fieldName]
    : false;

  setFieldInstalled (modelName, fieldName) {
    if (!this.installedFields.hasOwnProperty(modelName)) {
      this.installedFields[modelName] = {};
    }
    this.installedFields[modelName][fieldName] = true;
  }

  _setupModelPrototypes (models) {
    // models 即调用 model.registry 注册的所有 model
    models.forEach((model) => {
      if (!model.isSetUp) {
        const fields = model.fields;
        
        forOwn(fields, (fieldInstance, fieldName) => {
          if (!this.isFieldInstalled(model.modelName, fieldName)) {
            // lazy 的话由于需要 userProps 来判断到底 fk 或者 many 的 toModelName 是什么
            // 所以放在 create 的时候再去 install
            if (!fieldInstance.lazy) {
              fieldInstance.install(model, fieldName, fieldInstance, this);
              this.setFieldInstalled(model.modelName, fieldName);
            }
          }
        });
        
        attachQuerySetMethods(model, model.querySetClass);
        model.isSetUp = true;
      }
    });
  }

  generateSchemaSpec () {
    const models = this.getModelClasses();
    const tables = models.reduce((spec, modelClass) => {
      const tableName = modelClass.modelName;
      
      spec[tableName] = { fields: modelClass.fields };
      
      return spec;
    }, {});
  
    // tables 为 { Article: { fields: Article.fields } }
    return { tables };
  }

  getDatabase = () => {
    if (!this.db) {
      this.db = this.createDatabase(this.generateSchemaSpec());
    }
    
    return this.db;
  };

  /**
     * Returns the empty database state.
     * @return {Object} the empty state
     */
  getEmptyState = () => this.getDatabase().getState();

  /**
     * Begins an immutable database session.
     *
     * @param  {Object} state  - the state the database manages
     * @return {Session} a new {@link Session} instance
     */
  initSession = state => new Session(this, this.getDatabase(), state);

  /**
     * Begins a mutable database session.
     *
     * @param  {Object} state  - the state the database manages
     * @return {Session} a new {@link Session} instance
     */
  mutableSession = state => new Session(this, this.getDatabase(), state, true);
};

export default ORM;
