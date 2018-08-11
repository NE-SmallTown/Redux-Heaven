import ORM from '../ORM';
import Model from '../Model';
import { UsersMock, AdMock, TopicMock, QuestionMock, QAnswerMock, PaginationMock, HomePageMock, CommentsMock, AnswerMock } from './mockUtils';
import { fk, many, oneToOne, attr, tm } from '../fields';

/**
 * These utils create a database schema for testing.
 * The schema is simple but covers most relational cases:
 * foreign keys, one-to-ones, many-to-many's, named reverse relations.
 */

export function createTestModels () {
  const HomePage = class HomePageModel extends Model {
    static modelName = 'UserHomePage';
    static typeMap = {
      'question': 'Question',
      'question-answer': 'QAnswer',
      'topic': 'Topic',
      'ad': 'Ad'
    };

    static fields = {
      id : attr(),
      navbars: attr(),
      feeds: tm(({ type }) => HomePage.typeMap[type])
    };
  };
  
  const Question = class Question extends Model {
    static modelName = 'Question';
    
    static fields = {
      id: attr(),
      title: attr(),
      description: attr(),
      author: oneToOne('User', 'questions'),
      answers: fk('Answer', 'question')
    }
  };
  
  const Answer = class Answer extends Model {
    static modelName = 'Answer';
    
    static fields = {
      id: attr(),
      question: fk('Question', 'answers'),
      author: fk('User', 'answers'),
      commentCount: attr(),
      content: attr(),
      createdTime: attr(),
      excerpt: attr(),
      lastUpdatedTime: attr(),
      praiseCount: attr(),
      pagination: oneToOne('Pagination', 'answers')
    }
  };
  
  const QAnswer = class QAnswer extends Model {
    static modelName = 'QAnswer';
    
    static fields = {
      id: attr(),
      question: oneToOne('Question', 'qAnswer'),
      answer: oneToOne('Answer', 'qAnswer')
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
      coverUrl: attr(),
      investor: attr()
    }
  };

  const Pagination = class PaginationModel extends Model {
    static modelName = 'Pagination';

    static fields = {
      id: attr(),
      currentPage: attr(),
      pageSize: attr(),
      totalCount: attr()
    }
  };

  const Comment = class CommentModel extends Model {
    static modelName = 'Comment';

    static fields = {
      id: attr(),
      answer: fk('Answer', 'comments'),
      author: fk('User', 'comments'),
      content: attr(),
      createdTime: attr(),
      isAuthor: attr(),
      replyTo: fk('User', 'replyToMe')
    };
  };

  const User = class UserModel extends Model {
    static modelName = 'User';

    static fields = {
      id: attr(),
      avatarUrl: attr(),
      loginName: attr(),
      roleName: attr(),
      userId: attr(),
      userName: attr()
    };
  };

  return {
    HomePage,
    Question,
    Answer,
    Pagination,
    Comment,
    User,
    Ad,
    Topic,
    QAnswer
  };
}

export function createTestORM (models = createTestModels()) {
  const { UserHomePage, Answer, Pagination, Question, Comment, User, Ad, Topic, QAnswer } = models;

  const orm = new ORM();
  orm.register(UserHomePage, Answer, Pagination, Question, Comment, User, Ad, Topic, QAnswer);
  
  return orm;
}

export function createTestSessionWithData (orm = createTestORM()) {
  const state = orm.getEmptyState();
  const { UserHomePage, Answer, Pagination, Question, Comment, User, Ad, Topic, QAnswer } = orm.mutableSession(state);

  [
    [HomePageMock, UserHomePage],
    [AnswerMock, Answer],
    [QuestionMock, Question],
    [PaginationMock, Pagination],
    [CommentsMock, Comment],
    [UsersMock, User],
    [AdMock, Ad],
    [TopicMock, Topic],
    [QAnswerMock, QAnswer]
  ].forEach(([mockDataArr, mockModel]) =>
    mockDataArr.forEach(mockData => mockModel.create(mockData))
  );

  return {
    session: orm.initSession(state),
    orm,
    state
  };
}
