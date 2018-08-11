import Mock from 'mockjs';
import random from 'lodash/random';
import curry from 'lodash/curry';

export const mockArrayData = (mockOneDataFunc, start, end) => [...Array(start + random(end - start))].map(mockOneDataFunc);

export const mockOneUser = () => Mock.mock({
  userId: '@id()',
  userName: '@cname()',
  loginName: '@name()',
  avatarUrl: '@image()',
  'roleName|1': ['normal', 'vip', 'supervip', 'blacklist']
});
export const mockManyUsers = curry(mockArrayData)(mockOneUser);
export const UsersMock = mockManyUsers(10, 20);

export const mockOnePagination = () => Mock.mock({
  id: '@id()',
  currentPage: '@integer(20)',
  pageSize: '@integer(15)',
  totalCount: '@integer(100)@'
});
export const mockManyPaginations = curry(mockArrayData)(mockOnePagination);
export const PaginationMock = mockManyPaginations(10, 20);

// https://www.zhihu.com/api/v3/feed/topstory
export const HomePageMock = {
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

export const mockOneAnswer = () => Mock.mock({
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
export const mockManyAnswers = curry(mockArrayData)(mockOneAnswer);
export const AnswerMock = mockManyAnswers(10, 20);

export const mockOneQuestion = () => Mock.mock({
  id: '@id()',
  title: '@ctitle()',
  description: '@csentence(30, 50)',
  author: mockOneUser(),
  answers: mockManyAnswers()
});
export const mockManyQuestions = curry(mockArrayData)(mockOneQuestion);
export const QuestionMock = mockManyQuestions(10, 20);

export const mockOneComment = () => Mock.mock({
  id: '@id()',
  answer: mockOneAnswer(),
  author: mockOneUser(),
  content: '@cparagraph(3)',
  excerpt: '@csentence(5, 10)',
  createdTime: '@time("T")',
  isAuthor: '@boolean()',
  replyTo: mockOneUser()
});
export const mockManyComments = curry(mockArrayData)(mockOneComment);
export const CommentsMock = mockManyComments(10, 20);

export const mockOneAd = () => Mock.mock({
  id: '@id()',
  title: '@title()',
  coverUrl: '@image()',
  investor: '@name()'
});
export const mockManyAds = curry(mockArrayData)(mockOneAd);
export const AdMock = mockManyAds(10, 20);

export const mockOneTopic = () => Mock.mock({
  id: '@id()',
  title: '@ctitle(4, 6)',
  followers: mockManyUsers(),
  questions: mockManyQuestions()
});
export const mockManyTopics = curry(mockArrayData)(mockOneTopic);
export const TopicMock = mockManyTopics(10, 20);

export const mockOneQAnswer = () => Mock.mock({
  id: '@id()',
  question: mockOneQuestion(),
  answer: mockOneAnswer()
});
export const mockManyQAnswers = curry(mockArrayData)(mockOneQAnswer);
export const QAnswerMock = mockManyQAnswers(10, 20);
