import ORM from '../ORM';
import Model from '../Model';
import { fk, many, oneToOne, attr } from '../fields';

/**
 * These utils create a database schema for testing.
 * The schema is simple but covers most relational cases:
 * foreign keys, one-to-ones, many-to-many's, named reverse relations.
 */

const WebsitesMock = {
  id: '110000199803245551'
};

const RepliesMock = [{
  'id'             : '450000200402084754',
  'commentCount'   : 2,
  'praiseCount'    : 35,
  'excerpt'        : '下目眼候收约眼志将种报身拉什我日......',
  'content'        : '下目眼候收约眼志将种报身拉什我日角。据治老响本总同周数志该该必行行合最习。除情工金被道么型指<br><br>',
  'createdTime'    : '1998-09-30 16:12:59',
  'lastUpdatedTime': '1975-04-14 18:48:59',
  'author'         : {
    'userName' : '张娟',
    'loginName': 'Margaret',
    'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12928.jpg',
    'userId'   : '540000198106213293',
    'roleName' : 'blacklist'
  },
  'needCollapse'   : true
}, {
  'id'             : '410000197701068314',
  'commentCount'   : 17,
  'praiseCount'    : 91,
  'excerpt'        : '素区金常片后参下老个取关美设......',
  'content'        : '素区金常片后参下老个取关美设断必然。单消和因里向还声响第次级事',
  'createdTime'    : '1975-09-26 16:12:59',
  'lastUpdatedTime': '2009-05-20 18:47:59',
  'author'         : {
    'userName' : 'Brian Williams',
    'loginName': 'Betty',
    'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12936.jpg',
    'userId'   : '820000200002061886',
    'roleName' : 'blacklist'
  },
  'needCollapse'   : true
}, {
  'id'             : '12000020091211307X',
  'commentCount'   : 3,
  'praiseCount'    : 8,
  'excerpt'        : '层要系需头类酸二建片为须确式物平。指影造王层规新气过表局包装。划需平家真将信传观但江品般......',
  'content'        : '层要系需头类酸二建片为须确式物平。指影造王层规新气过表局包装。划需平家真将信传观但江品般后。开快在产际确都二保置说',
  'createdTime'    : '1979-06-23 16:12:59',
  'lastUpdatedTime': '2006-06-24 20:25:59',
  'author'         : {
    'userName' : 'Shirley Taylor',
    'loginName': 'Angela',
    'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12928.jpg',
    'userId'   : '37000020021103755X',
    'roleName' : 'blacklist'
  },
  'needCollapse'   : true
}];

const PaginationsMock = [
  {
    id         : '1321312',
    name       : 'dsfsd',
    currentPage: 1,
    pageSize   : 10,
    totalCount : 13
  },
  {
    id         : '64564',
    name       : 'vnvbn',
    currentPage: 2,
    pageSize   : 20,
    totalCount : 150
  },
  {
    id         : '234234',
    name       : 'ytut',
    currentPage: 4,
    pageSize   : 10,
    totalCount : 25
  }
];

const CommentsMock = [{
  'id'         : '540000200112215324',
  'reply'      : '12000020091211307X',
  'isAuthor'   : false,
  'author'     : {
    'userName' : 'David Robinson',
    'loginName': 'Carol',
    'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12936.jpg',
    'userId'   : '610000200904070758',
    'roleName' : 'vip'
  },
  'content'    : '白低式或传地把出品特管两界。号何术四口角却到层没身有提。全离千九织把南那前示少',
  'createdTime': '15:55:54',
  'replyTo'    : {
    'userName' : 'Cynthia Harris',
    'loginName': 'Jennifer',
    'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12938.jpg',
    'userId'   : '360000197312150846',
    'roleName' : 'vip'
  }
}];

const UsersMock = [{
  'userName' : 'Cynthia Harris',
  'loginName': 'Jennifer',
  'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12938.jpg',
  'userId'   : '360000197312150846',
  'roleName' : 'vip',
  'userToken': 'cxgcidxhqlvkfdswpbdoebdmgvezyt'
}, {
  'userName' : '阎静',
  'loginName': 'Eric',
  'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12933.jpg',
  'userId'   : '210000197406172349',
  'roleName' : 'vip',
  'userToken': 'yqxdpprkmnjvxljqfoycgjyvyowjov'
}, {
  'userName' : '龚平',
  'loginName': 'Anthony',
  'avatarUrl': 'http://obkwh871t.bkt.clouddn.com/images/12933.jpg',
  'userId'   : '510000199906230429',
  'roleName' : 'vip',
  'userToken': 'wpqxherlqjxvilgarfdsomgearfqjh'
}];

export function createTestModels () {
  const Website = class WebsiteModel extends Model {
    static modelName = 'Website';

    static fields = {
      id : attr(),
      navbar: attr(),
      feeds: fk(({ type }) => {
        switch (type) {
          case 'question':
            return ['Question', 'userRecommandQuestions'];
          case 'question-answer':
            return ['QAnswer', 'userRecommandQuestionsAndAnswers'];
          case 'Topic':
            return ['Topic', 'userRecommandTopics'];
          case 'Ad':
            return ['Ad', 'userRecommandAds'];
          default:
            throw Error(`No model for type: ${type}`);
        } 
      })
    };
  };
  
  const Question = class Question extends Model {
    static modelName = 'Question';
    
    static fields = {
      id: attr(),
      title: attr(),
      description: attr(),
      author: fk('User', 'questions'),
      answers: fk('Answer', 'question')
    }
  };
  
  const Answer = class Answer extends Model {
    static modelName = 'Answer';
    
    static fields = {
      id: attr(),
      // we have defined the 'answers: fk('Answer', 'question')' fk in Question Model
      // so we don't need to define it again
      // question: fk('Question', 'replies'),
      author: fk('User', 'answers'),
      commentCount: attr(),
      content: attr(),
      createdTime: attr(),
      excerpt: attr(),
      lastUpdatedTime: attr(),
      praiseCount: attr(),
      pagination: oneToOne('Pagination', 'reply')
    }
  };
  
  const QAnswer = class QAnswer extends Model {
    static modelName = 'QAnswer';
    
    static fields = {
      id: attr(),
      question: oneToOne('Question', 'qAnswer'),
      answer: fk('Answer', 'qAnswer')
    }
  };
  
  const Topic = class Topic extends Model {
    static modelName = 'Reply';
    
    static fields = {
      id: attr(),
      title: attr(),
      followers: many('User', 'followedTopics'),
      questions: many('Question', 'topics')
    }
  };
  
  const Ad = class Ad extends Model {
    static modelName = 'Ad';
    
    static fields = {
      id: attr(),
      title: attr(),
      coverUrl: attr()
    }
  };

  const Pagination = class PaginationModel extends Model {
    static modelName = 'Pagination';

    static fields = {
      id: attr(),
      name: attr(),
      currentPage: attr(),
      pageSize: attr(),
      totalCount: attr()
    }
  };

  const Comment = class CommentModel extends Model {
    static modelName = 'Comment';

    static fields = {
      id         : attr(),
      name       : attr(),
      reply      : fk('Answer', 'comments'),
      author     : fk('User', 'comments'),
      content    : attr(),
      createdTime: attr(),
      isAuthor   : attr(),
      replyTo    : fk('User', 'replyToMe')
    };
  };

  const User = class UserModel extends Model {
    static modelName = 'User';

    static fields = {
      id       : attr(),
      name     : attr(),
      avatarUrl: attr(),
      loginName: attr(),
      roleName : attr(),
      userId   : attr(),
      userName : attr(),
      userToken: attr()
    };
  };

  return {
    Website,
    Reply,
    Pagination,
    Comment,
    User
  };
}

export function createTestORM (customModels) {
  const models = customModels || createTestModels();
  const {
    Website,
    Reply,
    Pagination,
    Comment,
    User
  } = models;

  const orm = new ORM();
  orm.register(Website, Reply, Pagination, Comment, User);
  return orm;
}

export function createTestSession () {
  const orm = createTestORM();
  return orm.initSession(orm.getEmptytate());
}

export function createTestSessionWithData (customORM) {
  const orm = customORM || createTestORM();
  const state = orm.getEmptyState();
  const { Website, Reply, Pagination, Comment, User } = orm.mutableSession(state);

  WebsitesMock.forEach(props => Website.create(props));
  RepliesMock.forEach(props => Reply.create(props));
  PaginationsMock.forEach(props => Pagination.create(props));
  CommentsMock.forEach(props => Comment.create(props));
  UsersMock.forEach(props => User.create(props));

  const normalSession = orm.initSession(state);
  return { session: normalSession, orm, state };
}

export const isSubclass = (a, b) => a.prototype instanceof b;
