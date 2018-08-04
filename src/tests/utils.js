import ORM from '../ORM';
import Model from '../Model';
import { fk, many, oneToOne, attr } from '../fields';

/**
 * These utils create a database schema for testing.
 * The schema is simple but covers most relational cases:
 * foreign keys, one-to-ones, many-to-many's, named reverse relations.
 */
 
// Mock.mock({
//   'array|10-20': [
//     {
//       userId: Random.id(),
//       userName: Random.cname(),
//       loginName: Random.name(),
//       avatarUrl: Random.image(),
//       'roleName|1': ['normal', 'vip', 'supervip', 'blacklist'] }
//   ]
// });
const UsersMock = [
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'blacklist'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'vip'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'normal'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'vip'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'blacklist'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'vip'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'supervip'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'normal'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'normal'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'blacklist'
  },
  {
    userId: '510000200404154433',
    userName: '姚杰',
    loginName: 'Thomas Davis',
    avatarUrl: 'http://dummyimage.com/300x600',
    roleName: 'supervip'
  }
];

const getRandomUser = () => UsersMock[Math.floor(Math.random() * UsersMock.length)];

// Mock.mock({
//   'array|10-20': [
//     {
//       id: Random.id(),
//       currentPage: Random.integer(20),
//       pageSize: Random.integer(15),
//       totalCount: Random.integer(100)
//     }
//   ]
// });
const PaginationMock = [
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  },
  {
    id: '320000199904285105',
    currentPage: 5887860885132921,
    pageSize: 1107218406689147,
    totalCount: 2635285547160895
  }
];

const getRandomPagination = () => PaginationMock[Math.floor(Math.random() * PaginationMock.length)];

const WebsitesMock = {
  id: '110000199803245551'
};

// Mock.mock({
//   'array|10-20': [
//     {
//       id: Random.id(),
//       commentCount: Random.integer(0, 1000),
//       content: Random.cparagraph(5),
//       createdTime: Random.time('T'),
//       excerpt: Random.word(20),
//       lastUpdatedTime: Random.time('T'),
//       praiseCount: Random.integer(0, 1000),
//       author: getRandomUser(),
//       pagination: getRandomPagination()
//     }]
// });
const AnswerMock = [
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '530000199701080096',
    commentCount: 210,
    content:
      '门劳说指得万性织天军青劳。商身权般音边带律来大作精位公性选真。般展美采果信拉市民断民五习受。斯风九西别表物石能或细者建证计。名少始分江际通先着基断更名的书种响。',
    createdTime: '533000328586',
    excerpt: 'pvgcpdexfouwjyxuzlsx',
    lastUpdatedTime: '1017872035930',
    praiseCount: 409,
    author: getRandomUser(),
    pagination: getRandomPagination()
  }
];

const getRandomAnswers = () => AnswerMock.slice(0, Math.floor(Math.random() * AnswerMock.length));

// JSON.stringify(Mock.mock({
//   'array|10-20': [{
//     id: Random.id(),
//     title: Random.title(),
//     description: Random.sentence(5),
//     author: getRandomUser(),
//     answers: getRandomAnswers()
//   }]
// }));
const QuestionMock = [
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '630000200208238880',
    title: 'Lxqwu Mevgyhliti Rtqdsnelcr Giymisd Anif',
    description: 'Jrb buadgugyf epppijm mdt exdzomivf.',
    author: getRandomUser(),
    answers: getRandomAnswers()
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

// Mock.mock({
//   'array|5-10': [
//     {
//       'id': Random.id(),
//       'title': Random.title(),
//       'coverUrl': Random.url(),
//       investors: Random.name() }
//   ]
// });
const AdMock = [
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  },
  {
    id: '630000199211149349',
    title: 'Hrl Eetpadcqtn Gtchfvrv Lpxzh Tnzmupsiys Bpcdtjyxi Bxhndvrl',
    coverUrl: 'rlogin://lrtd.na/xzat',
    investors: 'Jennifer Taylor'
  }
];

const TopicMock = [{
  id: '12321',
  title: '123',
  followers: UsersMock.slice(2, 5),
  questions: Que
}];

const QAnswerMock = [{
  id: '21321',
  question: {},
  answer: []
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
      author: oneToOne('User', 'questions'),
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
      pagination: oneToOne('Pagination', 'answers')
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
      coverUrl: attr(),
      investors: attr()
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
    Website,
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
  const { Website, Reply, Pagination, Comment, User } = models;

  const orm = new ORM();
  orm.register(Website, Reply, Pagination, Comment, User);
  
  return orm;
}

export function createTestSessionWithData (orm = createTestORM()) {
  const state = orm.getEmptyState();
  const { Website, Answer, Pagination, Comment, User, Ad, Topic, QAnswer } = orm.mutableSession(state);

  [
    [WebsitesMock, Website], 
    [AnswerMock, Answer],
    [PaginationsMock, Pagination],
    [CommentsMock, Comment],
    [UsersMock, User],
    [AdMock, Ad],
    [TopicMock, Topic],
    [QAnswerMock, QAnswer]
  ].forEach(([mockDataArr, mockModel]) =>
    mockDataArr.forEach(mockData => mockModel.create(mockData))
  );

  const normalSession = orm.initSession(state);
  return { session: normalSession, orm, state };
}

export const isSubclass = (a, b) => a.prototype instanceof b;
