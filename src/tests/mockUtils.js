import Mock from 'mockjs';
import random from 'lodash/random';
import curry from 'lodash/curry';

const mockArrayData = (mockOneDataFunc, start, end) => [...Array(start + random(end - start))].map(mockOneDataFunc);

const mockOneUser = Mock.mock({
  userId: '@id()',
  userName: '@cname()',
  loginName: '@name()',
  avatarUrl: '@image()',
  'roleName|1': ['normal', 'vip', 'supervip', 'blacklist']
});
const mockManyUsers = curry(mockArrayData)(mockOneUser);
const UsersMock = mockManyUsers(10, 20);

const mockOnePagination = Mock.mock({
  id: '@id()',
  currentPage: '@integer(20)',
  pageSize: '@integer(15)',
  totalCount: '@integer(100)@'
});
const mockManyPaginations = curry(mockArrayData)(mockOnePagination);
const PaginationsMock = mockManyPaginations(10, 20);

// https://www.zhihu.com/api/v3/feed/topstory
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

const mockOneAnswer = Mock.mock({
  id: '@id()',
  commentCount: '@integer(0, 1000)',
  content: '@cparagraph(5, 10)',
  createdTime: '@time("T")',
  excerpt: '@cword(20, 30)',
  lastUpdatedTime: '@time("T")',
  praiseCount: '@integer(0, 1000)',
  author: mockOneUser(),
  pagination: mockOnePagination()
});
const mockManyAnswers = curry(mockArrayData)(mockOneAnswer);
const AnswerMock = mockManyAnswers(10, 20);

下次从这里开始
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
