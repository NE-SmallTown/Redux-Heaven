import ORM from '../ORM';
import Model from '../Model';
import { fk, many, oneToOne, attr, tm } from '../fields';

/**
 * These utils create a database schema for testing.
 * The schema is simple but covers most relational cases:
 * foreign keys, one-to-ones, many-to-many's, named reverse relations.
 */

// Mock.mock({
//   'array|10-20': [
//     {
//       userId: '@id()',
//       userName: '@cname()',
//       loginName: '@name()',
//       avatarUrl: '@image()',
//       'roleName|1': ['normal', 'vip', 'supervip', 'blacklist'] }
//   ]
// });
const UsersMock = [
  {
    userId: '530000199906102682',
    userName: '傅勇',
    loginName: 'Steven Walker',
    avatarUrl: 'http://dummyimage.com/468x60',
    roleName: 'supervip'
  },
  {
    userId: '710000197407305930',
    userName: '范艳',
    loginName: 'Sharon Lee',
    avatarUrl: 'http://dummyimage.com/120x600',
    roleName: 'vip'
  },
  {
    userId: '640000200207023943',
    userName: '程芳',
    loginName: 'Helen Martinez',
    avatarUrl: 'http://dummyimage.com/88x31',
    roleName: 'supervip'
  },
  {
    userId: '230000198001208030',
    userName: '郭静',
    loginName: 'Shirley Lewis',
    avatarUrl: 'http://dummyimage.com/120x90',
    roleName: 'blacklist'
  },
  {
    userId: '320000199103233938',
    userName: '魏敏',
    loginName: 'Melissa Hernandez',
    avatarUrl: 'http://dummyimage.com/120x600',
    roleName: 'blacklist'
  },
  {
    userId: '710000197410285619',
    userName: '白敏',
    loginName: 'Kenneth Walker',
    avatarUrl: 'http://dummyimage.com/160x600',
    roleName: 'blacklist'
  },
  {
    userId: '360000198402014615',
    userName: '江娟',
    loginName: 'Nancy Hall',
    avatarUrl: 'http://dummyimage.com/125x125',
    roleName: 'blacklist'
  },
  {
    userId: '370000197603225344',
    userName: '戴伟',
    loginName: 'Ronald Moore',
    avatarUrl: 'http://dummyimage.com/120x600',
    roleName: 'supervip'
  },
  {
    userId: '150000197904044781',
    userName: '唐涛',
    loginName: 'Margaret Walker',
    avatarUrl: 'http://dummyimage.com/120x600',
    roleName: 'supervip'
  },
  {
    userId: '610000198507237454',
    userName: '董明',
    loginName: 'Cynthia Jones',
    avatarUrl: 'http://dummyimage.com/88x31',
    roleName: 'supervip'
  },
  {
    userId: '510000199902014550',
    userName: '吕军',
    loginName: 'James Harris',
    avatarUrl: 'http://dummyimage.com/336x280',
    roleName: 'vip'
  },
  {
    userId: '620000199308278997',
    userName: '戴军',
    loginName: 'Christopher Robinson',
    avatarUrl: 'http://dummyimage.com/240x400',
    roleName: 'vip'
  }
];

const getRandomUser = () => UsersMock[Math.floor(Math.random() * UsersMock.length)];
const getRandomUsers = () => UsersMock.slice(0, Math.floor(Math.random() * UsersMock.length));

// Mock.mock({
//   'array|10-20': [
//     {
//       id: '@id()',
//       currentPage: '@integer(20)',
//       pageSize: '@integer(15)',
//       totalCount: '@integer(100)@'
//     }
//   ]
// });
const PaginationMock = [
  {
    id: '61000020160924473X',
    currentPage: 7558044079563613,
    pageSize: 4903586716302825,
    totalCount: '3484071778953086@'
  },
  {
    id: '210000200411132856',
    currentPage: 4460296540622092,
    pageSize: 2978368281209522,
    totalCount: '3246687994450068@'
  },
  {
    id: '51000019890725548X',
    currentPage: 1702022250836668,
    pageSize: 780963904857520,
    totalCount: '8273585659741588@'
  },
  {
    id: '520000198408017518',
    currentPage: 7837863636368799,
    pageSize: 3512676707806367,
    totalCount: '8394975629922327@'
  },
  {
    id: '430000198106182487',
    currentPage: 7529281585660789,
    pageSize: 3297361791181016,
    totalCount: '2682389350167548@'
  },
  {
    id: '810000201511209327',
    currentPage: 3362830954562233,
    pageSize: 7509510083052704,
    totalCount: '3728850577678721@'
  },
  {
    id: '420000198308226327',
    currentPage: 7766328595457281,
    pageSize: 7777577816697668,
    totalCount: '3965806961466660@'
  },
  {
    id: '320000197301203183',
    currentPage: 7823336523095329,
    pageSize: 524917925490244,
    totalCount: '4575709510569405@'
  },
  {
    id: '340000198011233614',
    currentPage: 4238409634697131,
    pageSize: 1284606739604753,
    totalCount: '6049022254422753@'
  },
  {
    id: '140000197802193151',
    currentPage: 5443174084506446,
    pageSize: 7724014623555080,
    totalCount: '907702518713506@'
  },
  {
    id: '350000197805087839',
    currentPage: 6042511434127007,
    pageSize: 8846609507049660,
    totalCount: '8205218634167107@'
  },
  {
    id: '120000197212039863',
    currentPage: 4384783406816589,
    pageSize: 3299017362374712,
    totalCount: '2858491392981169@'
  },
  {
    id: '33000019980131290X',
    currentPage: 8894505772399758,
    pageSize: 6640895891197820,
    totalCount: '4184301767885380@'
  },
  {
    id: '420000198902095673',
    currentPage: 3781549009304884,
    pageSize: 1221020122137401,
    totalCount: '31966061677170@'
  },
  {
    id: '500000197406098168',
    currentPage: 1640708193967086,
    pageSize: 8371297511675503,
    totalCount: '5742434471025554@'
  },
  {
    id: '460000199502043147',
    currentPage: 231546493553196,
    pageSize: 6747406294893564,
    totalCount: '1258188200222392@'
  },
  {
    id: '440000200201217328',
    currentPage: 3856218723696072,
    pageSize: 4619611900321251,
    totalCount: '7949293228136400@'
  },
  {
    id: '430000199105223122',
    currentPage: 2809078988803444,
    pageSize: 6422122190278318,
    totalCount: '3093108285782392@'
  },
  {
    id: '420000200802210400',
    currentPage: 1230086641971745,
    pageSize: 8796668419200696,
    totalCount: '6332437738542680@'
  }
];

const getRandomPagination = () => PaginationMock[Math.floor(Math.random() * PaginationMock.length)];

const HomePageMock = {
  id: '150000198307077686',
  navbars: [{ name: '指般目列', link: 'gopher://sxdi.gm/ztlgjybl' }, { name: '离因直解', link: 'mailto://cfutwfpm.an/ypel' }],
  feeds: [
    {
      relationship: {
        voting: 0,
        is_thanked: false,
        is_nothelp: false,
        upvoted_followee_ids: []
      },
      mark_infos: [],
      excerpt:
        '关键词：求职，Advisory，技能get，同事，工作流程目前就职于Deloitte Sydney Office，在Advisory Team，所以以下的回答只能说说自己在',
      created_time: 1533212460,
      preview_type: 'default',
      id: 458918318,
      is_copyable: true,
      author: {
        is_followed: false,
        type: 'people',
        name: '黄米蕾',
        headline: '怪脾气，爱喝咖啡',
        url_token: 'huang-mi-lei-50',
        user_type: 'people',
        url: 'https://api.zhihu.com/people/ff2802378b856a51b8fed7e92958e4ff',
        avatar_url:
          'https://pic2.zhimg.com/50/92d5e846794f0dcae6212e5c56114e94_s.jpg',
        is_following: false,
        is_org: false,
        gender: 0,
        badge: [],
        id: 'ff2802378b856a51b8fed7e92958e4ff'
      },
      url: 'https://api.zhihu.com/answers/458918318',
      comment_permission: 'all',
      question: {
        author: {
          is_followed: false,
          type: 'people',
          name: '柯西不懂事',
          headline: '050302',
          url_token: 'ke-xi-bu-dong-shi',
          user_type: 'people',
          url: 'https://api.zhihu.com/people/6e1b8c7ef26ca7e630a7f3c7a8b8b82a',
          avatar_url:
            'https://pic4.zhimg.com/50/v2-0388ed3cc95c293746feb5bb388c5fff_s.jpg',
          is_following: false,
          is_org: false,
          gender: 1,
          badge: [],
          id: '6e1b8c7ef26ca7e630a7f3c7a8b8b82a'
        },
        created: 1485678856,
        url: 'https://api.zhihu.com/questions/55210701',
        title: '在四大会计师事务所实习是一种怎样的体验?',
        excerpt: 'RT.',
        answer_count: 76,
        bound_topic_ids: [3930, 41922, 4086, 183034],
        comment_count: 0,
        is_following: false,
        follower_count: 2367,
        type: 'question',
        id: 55210701
      },
      updated_time: 1533212994,
      content:
        '<p>关键词：求职，Advisory，技能get，同事，工作流程</p><p>目前就职于Deloitte Sydney Office，在Advisory Team，所以以下的回答只能</p>',
      comment_count: 1,
      voteup_count: 7,
      reshipment_settings: 'allowed',
      thanks_count: 0,
      excerpt_new:
        '关键词：求职，Advisory，技能get，同事，工作流程 目前就职于Deloitte Sydney Office，在Advisory Team，所以以下的回答只',
      preview_text: '',
      can_comment: { status: true, reason: '' },
      type: 'answer',
      thumbnail:
        'https://pic3.zhimg.com/50/v2-6832e226794d1335d42c7e1aa52324ba_200x112.jpg'
    },
    {
      relationship: {
        voting: 0,
        is_thanked: false,
        is_nothelp: false,
        upvoted_followee_ids: []
      },
      mark_infos: [],
      excerpt:
        '很多人装修，会花费很多心思在那些一眼就能看见的地方，比如实木地板、大理石地砖、质感优良的',
      created_time: 1532935149,
      preview_type: 'default',
      id: 455984105,
      is_copyable: true,
      author: {
        is_followed: false,
        type: 'people',
        name: '设计头条APP',
        headline: '让设计更容易',
        url_token: 'she-ji-tou-tiao-app',
        user_type: 'organization',
        url: 'https://api.zhihu.com/people/a341d297ed3f862a5bd7d66db3fe3d41',
        avatar_url:
          'https://pic4.zhimg.com/50/v2-5eff602619eda27e7b69d7df1f28dc5b_s.jpg',
        is_following: false,
        is_org: true,
        gender: 1,
        badge: [{ type: 'identity', description: '已认证的官方帐号' }],
        id: 'a341d297ed3f862a5bd7d66db3fe3d41'
      },
      url: 'https://api.zhihu.com/answers/455984105',
      comment_permission: 'all',
      question: {
        author: {
          is_followed: false,
          type: 'people',
          name: '彭兴',
          headline: '半职业吃货',
          url_token: 'peng-xing-7',
          user_type: 'people',
          url: 'https://api.zhihu.com/people/66bc3445c7dd45c72e35e48dedfd17b0',
          avatar_url:
            'https://pic2.zhimg.com/50/v2-f79e2b3b5a072c6f69f69c720fd978b8_s.jpg',
          is_following: false,
          is_org: false,
          gender: 1,
          badge: [],
          id: '66bc3445c7dd45c72e35e48dedfd17b0'
        },
        created: 1427360206,
        url: 'https://api.zhihu.com/questions/29063831',
        title: '怎样装修得有质感？',
        excerpt:
          '如题。最近家里要装修，其实对于怎么设计，自己已经想到八九不离十了。但总觉得出来的效果总是缺乏质感，很难以言状。所以跟大家讨论',
        answer_count: 268,
        bound_topic_ids: [36517, 445, 16657, 24774, 1280],
        comment_count: 39,
        is_following: false,
        follower_count: 32829,
        type: 'question',
        id: 29063831
      },
      updated_time: 1532935149,
      content:
        '<p>很多人装修，会花费很多心思在那些一眼就能看见的地方，比如实木地板、大理石地砖、质感优良的实木家具等，但小编觉得，把一些细微的地方做好，更能显示出装修的质感，比如“收口”的</p>',
      comment_count: 14,
      voteup_count: 47,
      reshipment_settings: 'allowed',
      thanks_count: 19,
      excerpt_new:
        '很多人装修，会花费很多心思在那些一眼就能看见的地方，比如实木地板、大理石地砖、质感优良的实木家具等，但小编觉得，把一些细微的地方做好，更能显示出装修的质感，比如“收口”的细节。 “收口”是什么？ “收口”是一种材质的完结，同时也是另一种材质的起…',
      preview_text: '',
      can_comment: { status: true, reason: '' },
      type: 'answer',
      thumbnail:
        'https://pic4.zhimg.com/50/v2-2b2451b0dbbf544cdd812549f655c73b_200x112.jpg'
    },
    {
      relationship: {
        voting: 0,
        is_thanked: false,
        is_nothelp: false,
        upvoted_followee_ids: []
      },
      mark_infos: [],
      excerpt:
        '说点偏门的：不定式不等于动词原形。英语进行态中的v-ing也不是现在分词。be gone其实是个历史残留，以前也用be。',
      created_time: 1533521148,
      preview_type: 'expand',
      id: 461699290,
      is_copyable: true,
      author: {
        is_followed: false,
        type: 'people',
        name: '无名野人',
        headline: '无神论者。不友善。鄙视小布尔乔亚及精神小布尔乔亚。痛恨官僚。',
        url_token: 'wu-ming-ye-ren-79',
        user_type: 'people',
        url: 'https://api.zhihu.com/people/8f8654fdf7612545ac5db2922f4e2b81',
        avatar_url:
          'https://pic4.zhimg.com/50/v2-9609b731e3065687fb8930ffd0d36e5b_s.jpg',
        is_following: false,
        is_org: false,
        gender: 1,
        badge: [],
        id: '8f8654fdf7612545ac5db2922f4e2b81'
      },
      url: 'https://api.zhihu.com/answers/461699290',
      comment_permission: 'all',
      question: {
        author: {
          is_followed: false,
          type: 'people',
          name: 'DONGNANXIBEI',
          headline: 'DŌNG NÁN XĪ BĚI',
          url_token: 'dong_nan_xi_bei',
          user_type: 'people',
          url: 'https://api.zhihu.com/people/7b0d92b7cd3574c6b79f02dbd11966a8',
          avatar_url:
            'https://pic1.zhimg.com/50/v2-fa17b5c8f3fdb9bdc3b0b87e9400cbb8_s.jpg',
          is_following: false,
          is_org: false,
          gender: 1,
          badge: [],
          id: '7b0d92b7cd3574c6b79f02dbd11966a8'
        },
        created: 1533463249,
        url: 'https://api.zhihu.com/questions/288560172',
        title: '有哪些语言学上的事实，没有一定语言学知识的人不会相信？',
        excerpt: '相关问题：中国大众网民对语言和语言学有哪些误解？',
        answer_count: 81,
        bound_topic_ids: [56379, 686, 491, 7051, 1377],
        comment_count: 1,
        is_following: false,
        follower_count: 1024,
        type: 'question',
        id: 288560172
      },
      updated_time: 1533521148,
      content:
        '<p>说点偏门的：</p><p>不定式不等于动词原形。</p><p>英语进行态中的v-ing也不是现在分词。</p><p>be gone其实是个历史残留，以前也用be+表示移动的动词的</p>',
      comment_count: 4,
      voteup_count: 7,
      reshipment_settings: 'allowed',
      thanks_count: 0,
      excerpt_new:
        '说点偏门的： 不定式不等于动词原形。 英语进行态中的v-ing也不是现在分词。 be gone其实是个历史残留，以前也用be+表示移动的动词的过去分词来表达完成时态。 英语的语法曾受拉丁语影响。…',
      preview_text:
        '说点偏门的：\n不定式不等于动词原形。\n英语进行态中的v-ing也不是现在分词。\nbe gone其实是个历史',
      can_comment: { status: true, reason: '' },
      type: 'answer',
      thumbnail: ''
    },
    {
      updated: 1533542997,
      author: {
        is_followed: false,
        type: 'people',
        name: '新发现',
        headline: '欧洲科学人文杂志第一品牌',
        url_token: 'xin-fa-xian-93',
        user_type: 'organization',
        url: 'https://api.zhihu.com/people/4002b605d8a47b3d423e068202010b45',
        avatar_url:
          'https://pic3.zhimg.com/50/v2-f9ca92af6fd38cb37a4ed1cf5014643b_s.jpg',
        is_following: false,
        is_org: true,
        gender: 1,
        badge: [{ type: 'identity', description: '已认证的官方帐号' }],
        id: '4002b605d8a47b3d423e068202010b45'
      },
      excerpt:
        '<b>平地一声惊雷，中国宣布：拒绝进口 4 大类共 24 种洋垃圾，包括生活源废塑料、钒渣、未分类的废纸和废纺织原料。</b>公众',
      id: 41393050,
      voteup_count: 7,
      upvoted_followees: [],
      created: 1533542421,
      url: 'https://api.zhihu.com/articles/41393050',
      comment_permission: 'all',
      title: '《新发现》8月刊卷首语&内容简介',
      preview_type: 'default',
      content:
        '<p><b>平地一声惊雷，中国宣布：拒绝进口 4 大类共 24 种洋垃圾，包括生活源废塑料、钒渣、未分类的废纸和废纺织原料。</b>公众对此当然</p>',
      comment_count: 1,
      image_url:
        'https://pic4.zhimg.com/50/v2-0a178d64b9b33ab2bb5c96918252e015_hd.jpg',
      linkbox: { url: '', category: '', pic: '', title: '' },
      excerpt_new:
        '平地一声惊雷，中国宣布：拒绝进口 4 大类共 24 种洋垃圾，包括生活源废塑料、钒渣、未分类的废纸和废纺织原料。公众对此当然是拍手称快，大家对洋垃圾怨念已久，都知道多年来我国已经成为世界的垃圾填埋场，为全球消化了一半以上的出口垃圾。 不过我们也应该了…',
      excerpt_title: '',
      preview_text: '',
      voting: 0,
      type: 'article'
    },
    {
      relationship: {
        voting: 0,
        is_thanked: false,
        is_nothelp: false,
        upvoted_followee_ids: []
      },
      mark_infos: [],
      excerpt:
        '以前从电视到报纸，从新闻到餐桌，所有人都在抱怨：看病难，看病贵。我身在大连却一点没有感触。平时小病家门口就有一个医院，虽然不大',
      created_time: 1533210987,
      preview_type: 'default',
      id: 458900954,
      is_copyable: true,
      author: {
        is_followed: false,
        type: 'people',
        name: '陈年大枣',
        headline: '还是学生的社会人。',
        url_token: 'chen-nian-da-zao',
        user_type: 'people',
        url: 'https://api.zhihu.com/people/101e292a53d69dafbe5a601975be6e93',
        avatar_url:
          'https://pic2.zhimg.com/50/4d548e64a48df741b48a9b290ce0acf3_s.jpg',
        is_following: false,
        is_org: false,
        gender: 1,
        badge: [],
        id: '101e292a53d69dafbe5a601975be6e93'
      },
      url: 'https://api.zhihu.com/answers/458900954',
      comment_permission: 'all',
      question: {
        author: {
          is_followed: false,
          type: 'people',
          name: '元清影',
          headline: '',
          url_token: 'yuan-qing-ying-74',
          user_type: 'people',
          url: 'https://api.zhihu.com/people/c64aa6a377e99defccf9b137c6e2f585',
          avatar_url:
            'https://pic1.zhimg.com/50/v2-9be0f0747a582220a28028e13b315fb0_s.jpg',
          is_following: false,
          is_org: false,
          gender: 0,
          badge: [],
          id: 'c64aa6a377e99defccf9b137c6e2f585'
        },
        created: 1531558499,
        url: 'https://api.zhihu.com/questions/285222414',
        title: '有什么是你去了北京才知道的事情？',
        excerpt:
          '相关话题 https://www.zhihu.com/question/286764278 https://www.zhihu.com/question/288241922 https://www.zhihu.com/question/287112146',
        answer_count: 684,
        bound_topic_ids: [18212, 315, 202],
        comment_count: 7,
        is_following: false,
        follower_count: 5518,
        type: 'question',
        id: 285222414
      },
      updated_time: 1533274307,
      content:
        '<p>以前从电视到报纸，从新闻到餐桌，所有人都在抱怨：看病难，看病贵。</p><p>我身在大连却一点没有感触。平时小病家门口就有一个医院，虽然不大，但是只要不开大刀的病都能解决了。</p><p>朋友有得胃癌的，双腿骨折的住院，也基本</p>',
      comment_count: 36,
      voteup_count: 67,
      reshipment_settings: 'allowed',
      thanks_count: 6,
      excerpt_new:
        '以前从电视到报纸，从新闻到餐桌，所有人都在抱怨：看病难，看病贵。 我身在大连却一点没有感触。平时小病家门口就有一个医院，虽然不大，但是只要不开大刀的病都能解决了。 朋友有得胃癌的，双腿骨折的住院，也基本上是公交一趟线就到了，虽然病房里有些吵闹，…',
      preview_text: '',
      can_comment: { status: true, reason: '' },
      type: 'answer',
      thumbnail: ''
    },
    {
      relationship: {
        voting: 0,
        is_thanked: false,
        is_nothelp: false,
        upvoted_followee_ids: []
      },
      mark_infos: [],
      excerpt:
        '谢邀。<b>首先，直接讲个挑选定期寿险的概念。</b><b>寿险的责任是非常单一的，各家公司出的寿险责任都是一模一样的，因此通常情况下，谁保费低，就买谁的。</b>此时，及时贴出一个全景图满',
      created_time: 1533540904,
      preview_type: 'default',
      id: 461973519,
      is_copyable: false,
      author: {
        is_followed: false,
        type: 'people',
        name: '北斗星',
        headline: '北斗一下/前面是我公号/有保险问题   先【北斗一下】',
        url_token: 'bei-dou-xing-69-32',
        user_type: 'people',
        url: 'https://api.zhihu.com/people/47f02b490aa7f646076a986021749f2c',
        avatar_url:
          'https://pic2.zhimg.com/50/v2-37a7daf0c2469796e2afeefae8290331_s.jpg',
        is_following: false,
        is_org: false,
        gender: 0,
        badge: [],
        id: '47f02b490aa7f646076a986021749f2c'
      },
      url: 'https://api.zhihu.com/answers/461973519',
      comment_permission: 'censor',
      question: {
        author: {
          is_followed: false,
          type: 'people',
          name: '断王爷',
          headline: '',
          url_token: 'shen-ya-nan-44',
          user_type: 'people',
          url: 'https://api.zhihu.com/people/9e2db217e3872d83ad05ed00dadf5d51',
          avatar_url:
            'https://pic2.zhimg.com/50/v2-228863ac396de8d0a330fd79ff8b31e5_s.jpg',
          is_following: false,
          is_org: false,
          gender: 1,
          badge: [],
          id: '9e2db217e3872d83ad05ed00dadf5d51'
        },
        created: 1526652712,
        url: 'https://api.zhihu.com/questions/277724098',
        title: '朋友想买一款定期寿险产品，市面上有没有好的定期寿险产品推荐？',
        excerpt: '',
        answer_count: 38,
        bound_topic_ids: [28664, 52065, 3951],
        comment_count: 1,
        is_following: false,
        follower_count: 349,
        type: 'question',
        id: 277724098
      },
      updated_time: 1533540904,
      content:
        '<p>谢邀。</p><h2><b>首先，直接讲个挑选定期寿险的概念。</b></h2><p><b>寿险的责任是非常单一的，各家公司出的寿险责任都是一模一样的，因此通常情况下，谁保费低，就买谁的。</p>',
      comment_count: 0,
      voteup_count: 7,
      reshipment_settings: 'need_payment',
      thanks_count: 2,
      excerpt_new:
        '谢邀。首先，直接讲个挑选定期寿险的概念。 寿险的责任是非常单一的，各家公司出的寿险责任都是一模一样的，因此通常情况下，谁保费低，就买谁的。 此时，及时贴出一个全景图满足你想了解一下的心情（一定记得点击图片就能清晰查看啊） 表格中从左至右，保费依…',
      preview_text: '',
      can_comment: {
        status: true,
        reason: '请输入评论，您的评论将会由机构筛选后显示'
      },
      type: 'answer',
      thumbnail: ''
    },
    {
      relationship: {
        voting: 0,
        is_thanked: false,
        is_nothelp: false,
        upvoted_followee_ids: []
      },
      mark_infos: [],
      excerpt:
        '1935-1936年中国大致的的势力划分是这样，不用翻译了把。红线内的"puppet"也就是傀儡政权，指何梅协定等签订后的日本势力渗透。',
      created_time: 1533059267,
      preview_type: 'default',
      id: 457391016,
      is_copyable: true,
      author: {
        is_followed: false,
        type: 'people',
        name: '2-20滑膛枪等96人',
        headline: '488纳米光源',
        url_token: 'Geauga',
        user_type: 'people',
        url: 'https://api.zhihu.com/people/6e19d3f3e70aabbb4de34756c6b7b996',
        avatar_url:
          'https://pic2.zhimg.com/50/v2-5a8410d03a060b540dbdd42b9be91695_s.jpg',
        is_following: false,
        is_org: false,
        gender: 1,
        badge: [],
        id: '6e19d3f3e70aabbb4de34756c6b7b996'
      },
      url: 'https://api.zhihu.com/answers/457391016',
      comment_permission: 'all',
      question: {
        author: {
          is_followed: false,
          type: 'people',
          name: '拉拉拉',
          headline: '何必曰利',
          url_token: 'lelelalala',
          user_type: 'people',
          url: 'https://api.zhihu.com/people/1354ad6db471043dbfc4c69b0b4ddc73',
          avatar_url: 'https://pic3.zhimg.com/50/b4b57244b_s.jpg',
          is_following: false,
          is_org: false,
          gender: 1,
          badge: [],
          id: '1354ad6db471043dbfc4c69b0b4ddc73'
        },
        created: 1304914130,
        url: 'https://api.zhihu.com/questions/19634619',
        title: '如何客观地分析西安事变？',
        excerpt: '能否从国共以外的第三方视角进行解读？',
        answer_count: 86,
        bound_topic_ids: [1711, 8075, 285],
        comment_count: 4,
        is_following: false,
        follower_count: 633,
        type: 'question',
        id: 19634619
      },
      updated_time: 1533556689,
      content: '<p>1935-1936年中国大致的的势力划分是这样，不用翻译了把。</p><figure></figure>',
      comment_count: 3,
      voteup_count: 40,
      reshipment_settings: 'allowed',
      thanks_count: 6,
      excerpt_new:
        '1935-1936年中国大致的的势力划分是这样，不用翻译了把。 红线内的"puppet"也就是傀儡政权，指何梅协定等签订后的日本势力渗透。浓缩版就是国民党停止在华北活动，国民党军撤出华北，华北军政官员需亲日，最终华北五省"自治" (wiki上有全文) 《梅津致何应钦备忘…',
      preview_text: '',
      can_comment: { status: true, reason: '' },
      type: 'answer',
      thumbnail:
        'https://pic3.zhimg.com/50/v2-e5e0f8b301c86738c137ea5dc79df3fd_200x112.jpg'
    }
  ]
};

// Mock.mock({
//   'array|10-20': [
//     {
//       id: '@id()',
//       commentCount: '@integer(0, 1000)',
//       content: '@cparagraph(5, 10)',
//       createdTime: '@time("T")',
//       excerpt: '@cword(20, 30)',
//       lastUpdatedTime: '@time("T")',
//       praiseCount: '@integer(0, 1000)',
//       author: getRandomUser(),
//       pagination: getRandomPagination()
//     }]
// });
const AnswerMock = [
  {
    id: '630000200507184165',
    commentCount: 831,
    content:
      '四北门资样例花不新织老总百报队采市华。月美与作百低今能有飞入前。算同五造车实识提小前党当第性四员重。干必声可通百目较场也温团。术例做照步县机率这七调极通深准究金。方保边没清到新信现以头利外资江争。却明北西三位路划点专程性所集里研。',
    createdTime: '125497083624',
    excerpt: '接拉查清海产自最党平提阶月等型为具义同明',
    lastUpdatedTime: '682867511559',
    praiseCount: 687,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '620000198904185071',
    commentCount: 722,
    content:
      '度们约片世育非间音建造展线张完表展。间养子导证头例全导持流出。极解出流经委种生确次济深约一这总。定提表毛际及习再料老民作。门员器每写计先决角斯周再个。题较家它入收育色者细次电有同立。力八记第过计号非严需正派目可。类铁什局做太厂直记单清今共治大水。',
    createdTime: '986296913824',
    excerpt: '率过计全应率民声始算果众路林矿期率海内元西百育收群',
    lastUpdatedTime: '1125577862228',
    praiseCount: 848,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '340000198806103282',
    commentCount: 691,
    content:
      '其土机所题酸花常内色经点。系导始称西林示律手平属实外农参支建阶。解几那四来收干省如然龙组等调全至。人育片示程基位百史得已省争五十。己影离传片说己完也按百别以开之。应厂了平计军解海亲方去天象县安越风。自表斯问多亲使海你边天行都向军。相北统号量作听导处系九等把光开度。',
    createdTime: '659980792488',
    excerpt: '管才四回在西便求改率从写圆南火走都了别道体政济又写研口主命改',
    lastUpdatedTime: '1215520503964',
    praiseCount: 160,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '46000020040203824X',
    commentCount: 94,
    content:
      '照属群都才派器作织持确米场矿西济南。照通铁造命如严再所着精公。拉八值走常证由期习验期入月调也响世。组我书基向名来件表引界能据特九关。青构而力由治而方常组化得海劳。议府者往商装上水厂时价备记本王七。装设们面你专思低精治参量计支。目少安小此报子十派生华无等打名去资。',
    createdTime: '545213672411',
    excerpt: '单体一格价律强圆以市期须格满其圆外厂色该一公定北',
    lastUpdatedTime: '849854741054',
    praiseCount: 334,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '120000198803229647',
    commentCount: 896,
    content:
      '八料却识法时点回些车织解见和学研信社。路完后教律战重也人重照共石色级此生。战设除非县因热素厂同名而采增样意直本。得一油里方意个议样圆太事己。林部力拉日切更确海对本那等小只内主。千里三把品思外界明科到行权斯提育最。加风思华强记定片京己还石于。比意论运教八它整运交该会如低类。',
    createdTime: '330287192222',
    excerpt: '认总近方和重或住场等说月比观北因如般步如派存委火育候中则万',
    lastUpdatedTime: '227293199836',
    praiseCount: 397,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '360000197205028933',
    commentCount: 641,
    content:
      '科少般克始即查许示局住海且。看七色龙然采必叫克感合低个而算。向个亲这风用事自红厂济去。确想然品斗果受不多数青片即治济器研。广车方候四务我术生活流江。且回确子向我空六联立平而高你所条习分。至工着参型区于原决千但复如心。国为海织又权易部计将她矿战术安可。',
    createdTime: '592031669592',
    excerpt: '平毛新开种省属决员信线关资在本学区算社层每但派料来化花众周知',
    lastUpdatedTime: '40235738073',
    praiseCount: 200,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '810000200202021123',
    commentCount: 412,
    content:
      '下美具际布处提真参身道器往识。会易格行育列传严才心面广素种感身必。机积所号角就便立色候从据查完。道空开气军集音众识千到价山。组京八会开花可铁置存快术安北般作。系族压里查表争光强热报严变法报机生。且它老提由易场义我明构音高圆事斯争。那志发再严九你火般传价适除资组。',
    createdTime: '539714262757',
    excerpt: '方元经整应联般人市加证则及认提需我带着年除干细',
    lastUpdatedTime: '41937526659',
    praiseCount: 853,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '360000197301121660',
    commentCount: 146,
    content:
      '称算般史量平二称按边合队采速结。老积白采式北结条和行外生有世人织素。收科圆干国何更众白认号场适史程市号。好义高济心过三图心压维但可质。就结完系动想土除市价听天需说红极白。西之志员强意程系思劳住设使半省关图。',
    createdTime: '58499297185',
    excerpt: '约比周代思需几年叫家线极色全运空治同按易派养立么才金酸会',
    lastUpdatedTime: '1037153439153',
    praiseCount: 890,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '310000197005032170',
    commentCount: 687,
    content:
      '外准织先得少正书现列直造火么。成米或结可层当速可石直类运还运院切。二整住低划开领备格位党行计。据火政种都华装非国要手平党话然。条记金求进必维思元出方加支正西。七可非西各快安我该海手林例前。离于系历联及斯认求外价知条。情品引么领了已面机层保资断况步样思。重题正后动使次者们接矿上该各已治局。',
    createdTime: '1073057367372',
    excerpt: '里种验温消数意会记实采二层精育出林们造不价干斯眼东准到些示打',
    lastUpdatedTime: '572804705254',
    praiseCount: 664,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '430000200701262289',
    commentCount: 343,
    content:
      '及越价常适养科于值东族外转信报。常等数圆属利转年改办越于事强。太快确起五格式属天主矿是海南研建党方。数动用做造已直构米话美织院。之工除区较关县农实听小角但圆形作。做例养属品作支第之又老价斯机示。除许京你党团更思或那主做。',
    createdTime: '711999643451',
    excerpt: '往济点到界装内她代部线运问收向把斗备合住亲据复结分具',
    lastUpdatedTime: '1241647373428',
    praiseCount: 439,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '210000197801236218',
    commentCount: 661,
    content:
      '土当热走包名半图声高们组。识目速内件制体基心适少先装。持造农什至性连处完百划示。油大组将级斯数资等地权行空被天角整。非只响派治西约热完道色压用千。无五期越打门群却气日体解局。整四并也周方打物子复眼两维。选派率第级身农三青美在世周比三之儿。个心十确空外表过斯电等月保型级领。',
    createdTime: '1173250340930',
    excerpt: '走才极精类着日听表例马经具类众亲方边道克温受义使则',
    lastUpdatedTime: '267286909728',
    praiseCount: 765,
    author: getRandomUser(),
    pagination: getRandomPagination()
  },
  {
    id: '500000199508133656',
    commentCount: 272,
    content:
      '高再速外验所石始米认进义大加。先北决色身路近领和识验立。合切龙十种是越市命市生比圆。越员证运学九风知相广严保其族参点为。十品实干发层管科验写强知。局华达住社照最走划八维立石基变速直看。个层元子质它问养五青意育开维研用。九管得很体专阶处族北细步。子小例米被将油天基量格比列中量。克电断机温更指太阶等出现毛。',
    createdTime: '687544089288',
    excerpt: '按型用月节严以第复包织团石和观七叫验养路外压也斯战低两',
    lastUpdatedTime: '1079850564970',
    praiseCount: 277,
    author: getRandomUser(),
    pagination: getRandomPagination()
  }
];

const getRandomAnswer = () => AnswerMock[Math.floor(Math.random() * AnswerMock.length)];
const getRandomAnswers = () => AnswerMock.slice(0, Math.floor(Math.random() * AnswerMock.length));

// Mock.mock({
//   'array|10-20': [{
//     id: '@id()',
//     title: '@ctitle()',
//     description: '@csentence(30, 50)',
//     author: getRandomUser(),
//     answers: []
//   }]
// });
const QuestionMock = [
  {
    id: '150000200808133949',
    title: '带金克',
    description:
      '然火路现身之家有空往六国后定清家学建决按利联眼明并飞积二己根从根再酸党论件。',
    author: getRandomUser(),
    answers: getRandomAnswers()
  },
  {
    id: '410000198502167365',
    title: '几力党研员',
    description:
      '常声通决口群信即技支新据采建建位员地般过六分类加快度感一取切路才至格设且。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '510000198506267826',
    title: '件特四',
    description:
      '米路在识际各头等边水照的权面队听风得论走步七义能型思较山系技合空照。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '630000199504141316',
    title: '动称重',
    description:
      '难书技种之代照难思接查风格引放报质图断置亲状格意先样压上张百便三术处段省术基代。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '420000199801028003',
    title: '般家都克说单写',
    description:
      '般参切从难越厂长该边王她千了同近一心精造矿来包物料革据器办好每无法信我并用毛花被。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '37000020010521193X',
    title: '取将影制发响',
    description:
      '南书育系资他领没转里成条照基市高比工动精知海验革队可集始目片存资段委影属长可越叫前林由质来该场。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '110000197105304172',
    title: '能克图动就在位',
    description:
      '美即年劳物如示声许平着真离却儿论接必许决体将毛三调风书记美器克可统从头见至向生质劳利金放山。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '650000200811302377',
    title: '众层去共些',
    description:
      '西清发话非克史样问前业史又时复意么龙精由建际权根先社还务区和争查。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '420000200709233288',
    title: '无意运难争',
    description:
      '速场是已在以也业会别步生他交实极持安联和就克内南难些天信四位年林山并影下路者正车部她花自有马二离代知。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '620000198110111855',
    title: '确因最新',
    description:
      '完花并造现至现记法象公得史史性万出特去无每收以美易机书毛论根地下代向红层之况面。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '360000198303102513',
    title: '之治意高',
    description:
      '要适本且量条备族说但快时路江年听九称达却车光厂华样市火部备消离力个见强没资。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '410000200406075735',
    title: '收联里亲',
    description:
      '约说始基比在型教论收级确料里准圆话利离精对阶建白且二可究层事万关。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '530000198404191748',
    title: '长火马三',
    description:
      '压场代切改流专具响广心应色什示同系类流状九小率新选农报下图它小世记该七日局片业处金许议已公是收已。',
    author: getRandomUser(),
    answers: []
  },
  {
    id: '610000200410316455',
    title: '容为身但',
    description:
      '张来习政温工理系展都门列备世回车置角速矿接备酸用同其产列层往些这展到那度今达设。',
    author: getRandomUser(),
    answers: []
  }
];

const getRandomQuestion = () => QuestionMock[Math.floor(Math.random() * QuestionMock.length)];
const getRandomQuestions = () => QuestionMock.slice(0, Math.floor(Math.random() * QuestionMock.length));

// Mock.mock({
//   'array|10-20': [{
//     id: '@id()',
//     answer: getRandomAnswer(),
//     author: getRandomUser(),
//     content: '@cparagraph(3)',
//     excerpt: '@csentence(5, 10)',
//     createdTime: '@time("T")',
//     isAuthor: '@boolean()',
//     replyTo: getRandomUser()
//   }]
// });
const CommentsMock = [
  {
    id: '630000200906202842',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '同精放里段权年问第设形元务品听制西。习后林由他议许候天者色被称满理。们求支治月则与学情江按能今今。',
    excerpt: '六产真进得义切法据。',
    createdTime: '1367262395344',
    isAuthor: true,
    replyTo: getRandomUser()
  },
  {
    id: '330000200007208342',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '议之对化国达农面系那节中反京石亲传斗。直比与史点去传音建结响满带往越史。很风合议意象要使按增音教。',
    excerpt: '也期布由数除能京照型。',
    createdTime: '176946436707',
    isAuthor: true,
    replyTo: getRandomUser()
  },
  {
    id: '12000019870520020X',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '意解应克议你支名己现口来例部。织她众太学张样千道书必美规。志公适本体派严快步导准流受。',
    excerpt: '表龙头数明党队件铁派。',
    createdTime: '1385163736538',
    isAuthor: true,
    replyTo: getRandomUser()
  },
  {
    id: '320000199310113680',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '加农状引格制速写今示指速导种道党代。正观包造资使力少月通是属王。被际新土争相法活边再或想研史向论被国。',
    excerpt: '结育学还再调着约引。',
    createdTime: '1119919694072',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '51000019821205792X',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '眼给两江间育月老光间质当。子来市然与中反六每要文性处时置合许。影看或至设题小而类体打每打无。',
    excerpt: '素受现着总保。',
    createdTime: '215402300918',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '650000201407157184',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '民治原性强确手门被办米过步局。细因府然过得根话段象明严先方。内两强管格间通思格强实音值从。',
    excerpt: '装响里织意团重听压九。',
    createdTime: '1224554708447',
    isAuthor: true,
    replyTo: getRandomUser()
  },
  {
    id: '520000201705266523',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '点决工对表基带有反东构便文育使。期个可党管石建上走义号结。全中也而心头速照素交类般情车历两矿。',
    excerpt: '家候历积度近。',
    createdTime: '376732227163',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '71000020041127860X',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '片布管素人没接要常使办种。第则见七去得由近也日地据。清感空传文重酸意者眼真采。',
    excerpt: '厂做率只统斗八长。',
    createdTime: '273346298758',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '330000198805242449',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '来又们族报查少断条北强据象却律车。六因命战效近历人可龙才为张书克华即。验清象流些象开场电们各按放日。',
    excerpt: '发管形至转华。',
    createdTime: '6165319577',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '54000020021028135X',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '务影总化命需样年增展不细花成入情明。中只候务布北它政统养约思委府满。日间起许形儿音会完达叫如么变。',
    excerpt: '照提先消需定县查据王。',
    createdTime: '1435862195955',
    isAuthor: true,
    replyTo: getRandomUser()
  },
  {
    id: '990000200608296248',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '单平存后该物我并到位用口线易。华把较除清头知地矿量断温委法产带。所先名风南性位有光再斗活清如。',
    excerpt: '备系定格称。',
    createdTime: '564732635829',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '420000198710048231',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '整水信广了六求离能农直认空广正。青点关制今实两明类角基真的指压是才。共给低段技表油经酸统流每千无算国。',
    excerpt: '入听往进月界问月。',
    createdTime: '635214542643',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '710000200110144894',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '时起等发军号金气亲难高广社速采新。看传年所法之满受半选色流成布多又验。影标进共本千机斗节据及子。',
    excerpt: '明至院非们备照。',
    createdTime: '306283771809',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '220000200305281550',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '千育观并使王思为易条龙常调量气了般王。最领没候管参转界该层老速完件名以重。两半及时至料很期条物听术单划布文程向。',
    excerpt: '物京规强总则。',
    createdTime: '1496516610589',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '14000019920328857X',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '象人地带特达非象除步农型他。者应还史议清近火级区切活解县状。候现用位由子示队条反会身酸置受革由。',
    excerpt: '发路其发代部值儿且。',
    createdTime: '608025956954',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '310000201101037544',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '资利压民关完因思高养快派识花响律住。和即你团而解活这规江音素空更思花。这色列很备八劳义不产由片共历。',
    excerpt: '接支把题证干红方。',
    createdTime: '368011892796',
    isAuthor: true,
    replyTo: getRandomUser()
  },
  {
    id: '15000019981005913X',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '但么把很天感件要步放毛样图文动斗性单。有应克去亲据据转号决选声用。内美革件今片广己省圆因情条头石声。',
    excerpt: '重党离向特。',
    createdTime: '236813116309',
    isAuthor: false,
    replyTo: getRandomUser()
  },
  {
    id: '36000019860428666X',
    answer: getRandomAnswer(),
    author: getRandomUser(),
    content:
      '前合新使决布装新深即万平形北。受十这从民新周委广当称见声人道。几只素等重老金什音好层争清集具现书。',
    excerpt: '省阶下光全月。',
    createdTime: '619406176544',
    isAuthor: false,
    replyTo: getRandomUser()
  }
];

// Mock.mock({
//   'array|5-10': [
//     {
//       'id': '@id()',
//       'title': '@title()',
//       'coverUrl': '@image()',
//       investor: '@name()'
//     }
//   ]
// });
const AdMock = [
  {
    id: '510000200311028171',
    title: 'Bxlypt Nhqpnbrb Dvyw Kpypq',
    coverUrl: 'http://dummyimage.com/120x240',
    investor: 'Karen Martin'
  },
  {
    id: '340000201704070680',
    title: 'Vjbswkqdq Uehdrvbrg Htzmrolf Wdxrhv Febhlyvrn',
    coverUrl: 'http://dummyimage.com/160x600',
    investor: 'Maria Smith'
  },
  {
    id: '130000199510157754',
    title: 'Opmxfx Rpp Ocqqf Jffffm Evrjife',
    coverUrl: 'http://dummyimage.com/120x600',
    investor: 'Shirley Martin'
  },
  {
    id: '130000199107302421',
    title: 'Nnn Injckqosjq Btvrncaf Pvxcpbfw',
    coverUrl: 'http://dummyimage.com/120x600',
    investor: 'Kevin Taylor'
  },
  {
    id: '530000197504294678',
    title: 'Nia Ybkrqlii Bejljrjjja Ppeygq',
    coverUrl: 'http://dummyimage.com/120x90',
    investor: 'Kenneth Brown'
  },
  {
    id: '370000198006026579',
    title: 'Hejgqbgxn Ztclf Ugljvmr Phrqlb Stuec Wowddg',
    coverUrl: 'http://dummyimage.com/336x280',
    investor: 'Sarah Clark'
  },
  {
    id: '640000197011138461',
    title: 'Vkslrdgbc Bjpqj Tdmukrom Jezldlb Wwvutyhsqx Xyeynv',
    coverUrl: 'http://dummyimage.com/300x600',
    investor: 'Frank Jones'
  },
  {
    id: '530000199911138313',
    title: 'Pbmgtfg Jcboljirk Rfnjy Wwpop Cblvahlhi',
    coverUrl: 'http://dummyimage.com/336x280',
    investor: 'Larry Gonzalez'
  },
  {
    id: '220000198708273950',
    title: 'Gqwg Yvrxfw Ykhemrd Hgbve Diae Reiqkni',
    coverUrl: 'http://dummyimage.com/468x60',
    investor: 'Nancy Thompson'
  }
];

// Mock.mock({
//   'array|10-20': [
//     {
//       id: '@id()',
//       title: '@ctitle(4, 6)',
//       followers: getRandomUsers(),
//       questions: getRandomQuestions()
//     }]
// });
const TopicMock = [
  { id: '370000197806103478', title: '速规场引', followers: getRandomUsers(), questions: getRandomQuestions() },
  {
    id: '410000201507275044',
    title: '常片机形计',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  { id: '36000019950624476X', title: '我们给候', followers: getRandomUsers(), questions: getRandomQuestions() },
  {
    id: '440000200812047030',
    title: '划管今即织带',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '450000200604223222',
    title: '结等地定他',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '820000200307278576',
    title: '具证么条是',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '630000198909181274',
    title: '候联习约广量',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '120000198812082958',
    title: '红山单任得',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '41000020180507411X',
    title: '结原参感单',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '230000199005227823',
    title: '流出计己理图',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '71000020011001247X',
    title: '根织定安体',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '14000019841123263X',
    title: '列时比小组',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  { id: '110000197811097844', title: '记明又很', followers: getRandomUsers(), questions: getRandomQuestions() },
  {
    id: '650000197001288177',
    title: '斗将果克正',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '820000197208129730',
    title: '一儿知数强',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  },
  {
    id: '540000197501042143',
    title: '些事据如变低',
    followers: getRandomUsers(),
    questions: getRandomQuestions()
  }
];

// Mock.mock({
//   'array|10-20': [
//     {
//       id: '@id()',
//       question: getRandomQuestion(),
//       answer: getRandomAnswer()
//     }]
// });
const QAnswerMock = [
  { id: '640000198907045342', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '360000197512114583', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '350000198011292632', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '350000199905070160', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '230000199211062652', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '62000019790127658X', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '630000200405197889', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '710000201605231484', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '510000201609181210', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '440000200106305151', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '230000197302272269', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '21000020060422217X', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '990000197705065543', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '710000201304086914', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '360000201605105327', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '820000201210202561', question: getRandomQuestion(), answer: getRandomAnswer() },
  { id: '220000198008111643', question: getRandomQuestion(), answer: getRandomAnswer() }
];

export function createTestModels () {
  const HomePage = class HomePageModel extends Model {
    static modelName = 'UserHomePage';

    static fields = {
      id : attr(),
      navbars: attr(),
      feeds: tm(({ type }) => {
        switch (type) {
          case 'question':
            return ['Question', 'userRecommandQuestions'];
          case 'question-answer':
            return ['QAnswer', 'userRecommandQuestionsAndAnswers'];
          case 'topic':
            return ['Topic', 'userRecommandTopics'];
          case 'ad':
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
  const { UserHomePage, Reply, Pagination, Comment, User } = models;

  const orm = new ORM();
  orm.register(UserHomePage, Reply, Pagination, Comment, User);
  
  return orm;
}

export function createTestSessionWithData (orm = createTestORM()) {
  const state = orm.getEmptyState();
  const { UserHomePage, Answer, Pagination, Comment, User, Ad, Topic, QAnswer } = orm.mutableSession(state);

  [
    [HomePageMock, UserHomePage],
    [AnswerMock, Answer],
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

export const isSubclass = (a, b) => a.prototype instanceof b;
