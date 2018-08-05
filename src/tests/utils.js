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

const HomePageMock = {

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
//       author: {},
//       pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
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
    author: {},
    pagination: {}
  }
];

const getRandomAnswer = () => AnswerMock[Math.floor(Math.random() * AnswerMock.length)];
const getRandomAnswers = () => AnswerMock.slice(0, Math.floor(Math.random() * AnswerMock.length));

// Mock.mock({
//   'array|10-20': [{
//     id: '@id()',
//     title: '@ctitle()',
//     description: '@csentence(30, 50)',
//     author: {},
//     answers: []
//   }]
// });
const QuestionMock = [
  {
    id: '150000200808133949',
    title: '带金克',
    description:
      '然火路现身之家有空往六国后定清家学建决按利联眼明并飞积二己根从根再酸党论件。',
    author: {},
    answers: []
  },
  {
    id: '410000198502167365',
    title: '几力党研员',
    description:
      '常声通决口群信即技支新据采建建位员地般过六分类加快度感一取切路才至格设且。',
    author: {},
    answers: []
  },
  {
    id: '510000198506267826',
    title: '件特四',
    description:
      '米路在识际各头等边水照的权面队听风得论走步七义能型思较山系技合空照。',
    author: {},
    answers: []
  },
  {
    id: '630000199504141316',
    title: '动称重',
    description:
      '难书技种之代照难思接查风格引放报质图断置亲状格意先样压上张百便三术处段省术基代。',
    author: {},
    answers: []
  },
  {
    id: '420000199801028003',
    title: '般家都克说单写',
    description:
      '般参切从难越厂长该边王她千了同近一心精造矿来包物料革据器办好每无法信我并用毛花被。',
    author: {},
    answers: []
  },
  {
    id: '37000020010521193X',
    title: '取将影制发响',
    description:
      '南书育系资他领没转里成条照基市高比工动精知海验革队可集始目片存资段委影属长可越叫前林由质来该场。',
    author: {},
    answers: []
  },
  {
    id: '110000197105304172',
    title: '能克图动就在位',
    description:
      '美即年劳物如示声许平着真离却儿论接必许决体将毛三调风书记美器克可统从头见至向生质劳利金放山。',
    author: {},
    answers: []
  },
  {
    id: '650000200811302377',
    title: '众层去共些',
    description:
      '西清发话非克史样问前业史又时复意么龙精由建际权根先社还务区和争查。',
    author: {},
    answers: []
  },
  {
    id: '420000200709233288',
    title: '无意运难争',
    description:
      '速场是已在以也业会别步生他交实极持安联和就克内南难些天信四位年林山并影下路者正车部她花自有马二离代知。',
    author: {},
    answers: []
  },
  {
    id: '620000198110111855',
    title: '确因最新',
    description:
      '完花并造现至现记法象公得史史性万出特去无每收以美易机书毛论根地下代向红层之况面。',
    author: {},
    answers: []
  },
  {
    id: '360000198303102513',
    title: '之治意高',
    description:
      '要适本且量条备族说但快时路江年听九称达却车光厂华样市火部备消离力个见强没资。',
    author: {},
    answers: []
  },
  {
    id: '410000200406075735',
    title: '收联里亲',
    description:
      '约说始基比在型教论收级确料里准圆话利离精对阶建白且二可究层事万关。',
    author: {},
    answers: []
  },
  {
    id: '530000198404191748',
    title: '长火马三',
    description:
      '压场代切改流专具响广心应色什示同系类流状九小率新选农报下图它小世记该七日局片业处金许议已公是收已。',
    author: {},
    answers: []
  },
  {
    id: '610000200410316455',
    title: '容为身但',
    description:
      '张来习政温工理系展都门列备世回车置角速矿接备酸用同其产列层往些这展到那度今达设。',
    author: {},
    answers: []
  }
];

// Mock.mock({
//   'array|10-20': [{
//     id: '@id()',
//     answer: {},
//     author: {},
//     content: '@cparagraph(3)',
//     excerpt: '@csentence(5, 10)',
//     createdTime: '@time("T")',
//     isAuthor: '@boolean()',
//     replyTo: {}
//   }]
// });
const CommentsMock = [
  {
    id: '630000200906202842',
    answer: {},
    author: {},
    content:
      '同精放里段权年问第设形元务品听制西。习后林由他议许候天者色被称满理。们求支治月则与学情江按能今今。',
    excerpt: '六产真进得义切法据。',
    createdTime: '1367262395344',
    isAuthor: true,
    replyTo: {}
  },
  {
    id: '330000200007208342',
    answer: {},
    author: {},
    content:
      '议之对化国达农面系那节中反京石亲传斗。直比与史点去传音建结响满带往越史。很风合议意象要使按增音教。',
    excerpt: '也期布由数除能京照型。',
    createdTime: '176946436707',
    isAuthor: true,
    replyTo: {}
  },
  {
    id: '12000019870520020X',
    answer: {},
    author: {},
    content:
      '意解应克议你支名己现口来例部。织她众太学张样千道书必美规。志公适本体派严快步导准流受。',
    excerpt: '表龙头数明党队件铁派。',
    createdTime: '1385163736538',
    isAuthor: true,
    replyTo: {}
  },
  {
    id: '320000199310113680',
    answer: {},
    author: {},
    content:
      '加农状引格制速写今示指速导种道党代。正观包造资使力少月通是属王。被际新土争相法活边再或想研史向论被国。',
    excerpt: '结育学还再调着约引。',
    createdTime: '1119919694072',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '51000019821205792X',
    answer: {},
    author: {},
    content:
      '眼给两江间育月老光间质当。子来市然与中反六每要文性处时置合许。影看或至设题小而类体打每打无。',
    excerpt: '素受现着总保。',
    createdTime: '215402300918',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '650000201407157184',
    answer: {},
    author: {},
    content:
      '民治原性强确手门被办米过步局。细因府然过得根话段象明严先方。内两强管格间通思格强实音值从。',
    excerpt: '装响里织意团重听压九。',
    createdTime: '1224554708447',
    isAuthor: true,
    replyTo: {}
  },
  {
    id: '520000201705266523',
    answer: {},
    author: {},
    content:
      '点决工对表基带有反东构便文育使。期个可党管石建上走义号结。全中也而心头速照素交类般情车历两矿。',
    excerpt: '家候历积度近。',
    createdTime: '376732227163',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '71000020041127860X',
    answer: {},
    author: {},
    content:
      '片布管素人没接要常使办种。第则见七去得由近也日地据。清感空传文重酸意者眼真采。',
    excerpt: '厂做率只统斗八长。',
    createdTime: '273346298758',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '330000198805242449',
    answer: {},
    author: {},
    content:
      '来又们族报查少断条北强据象却律车。六因命战效近历人可龙才为张书克华即。验清象流些象开场电们各按放日。',
    excerpt: '发管形至转华。',
    createdTime: '6165319577',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '54000020021028135X',
    answer: {},
    author: {},
    content:
      '务影总化命需样年增展不细花成入情明。中只候务布北它政统养约思委府满。日间起许形儿音会完达叫如么变。',
    excerpt: '照提先消需定县查据王。',
    createdTime: '1435862195955',
    isAuthor: true,
    replyTo: {}
  },
  {
    id: '990000200608296248',
    answer: {},
    author: {},
    content:
      '单平存后该物我并到位用口线易。华把较除清头知地矿量断温委法产带。所先名风南性位有光再斗活清如。',
    excerpt: '备系定格称。',
    createdTime: '564732635829',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '420000198710048231',
    answer: {},
    author: {},
    content:
      '整水信广了六求离能农直认空广正。青点关制今实两明类角基真的指压是才。共给低段技表油经酸统流每千无算国。',
    excerpt: '入听往进月界问月。',
    createdTime: '635214542643',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '710000200110144894',
    answer: {},
    author: {},
    content:
      '时起等发军号金气亲难高广社速采新。看传年所法之满受半选色流成布多又验。影标进共本千机斗节据及子。',
    excerpt: '明至院非们备照。',
    createdTime: '306283771809',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '220000200305281550',
    answer: {},
    author: {},
    content:
      '千育观并使王思为易条龙常调量气了般王。最领没候管参转界该层老速完件名以重。两半及时至料很期条物听术单划布文程向。',
    excerpt: '物京规强总则。',
    createdTime: '1496516610589',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '14000019920328857X',
    answer: {},
    author: {},
    content:
      '象人地带特达非象除步农型他。者应还史议清近火级区切活解县状。候现用位由子示队条反会身酸置受革由。',
    excerpt: '发路其发代部值儿且。',
    createdTime: '608025956954',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '310000201101037544',
    answer: {},
    author: {},
    content:
      '资利压民关完因思高养快派识花响律住。和即你团而解活这规江音素空更思花。这色列很备八劳义不产由片共历。',
    excerpt: '接支把题证干红方。',
    createdTime: '368011892796',
    isAuthor: true,
    replyTo: {}
  },
  {
    id: '15000019981005913X',
    answer: {},
    author: {},
    content:
      '但么把很天感件要步放毛样图文动斗性单。有应克去亲据据转号决选声用。内美革件今片广己省圆因情条头石声。',
    excerpt: '重党离向特。',
    createdTime: '236813116309',
    isAuthor: false,
    replyTo: {}
  },
  {
    id: '36000019860428666X',
    answer: {},
    author: {},
    content:
      '前合新使决布装新深即万平形北。受十这从民新周委广当称见声人道。几只素等重老金什音好层争清集具现书。',
    excerpt: '省阶下光全月。',
    createdTime: '619406176544',
    isAuthor: false,
    replyTo: {}
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
//       followers: [],
//       questions: []
//     }]
// });
const TopicMock = [
  { id: '370000197806103478', title: '速规场引', followers: [], questions: [] },
  {
    id: '410000201507275044',
    title: '常片机形计',
    followers: [],
    questions: []
  },
  { id: '36000019950624476X', title: '我们给候', followers: [], questions: [] },
  {
    id: '440000200812047030',
    title: '划管今即织带',
    followers: [],
    questions: []
  },
  {
    id: '450000200604223222',
    title: '结等地定他',
    followers: [],
    questions: []
  },
  {
    id: '820000200307278576',
    title: '具证么条是',
    followers: [],
    questions: []
  },
  {
    id: '630000198909181274',
    title: '候联习约广量',
    followers: [],
    questions: []
  },
  {
    id: '120000198812082958',
    title: '红山单任得',
    followers: [],
    questions: []
  },
  {
    id: '41000020180507411X',
    title: '结原参感单',
    followers: [],
    questions: []
  },
  {
    id: '230000199005227823',
    title: '流出计己理图',
    followers: [],
    questions: []
  },
  {
    id: '71000020011001247X',
    title: '根织定安体',
    followers: [],
    questions: []
  },
  {
    id: '14000019841123263X',
    title: '列时比小组',
    followers: [],
    questions: []
  },
  { id: '110000197811097844', title: '记明又很', followers: [], questions: [] },
  {
    id: '650000197001288177',
    title: '斗将果克正',
    followers: [],
    questions: []
  },
  {
    id: '820000197208129730',
    title: '一儿知数强',
    followers: [],
    questions: []
  },
  {
    id: '540000197501042143',
    title: '些事据如变低',
    followers: [],
    questions: []
  }
];

// Mock.mock({
//   'array|10-20': [
//     {
//       id: '@id()',
//       question: {},
//       answer: {}
//     }]
// });
const QAnswerMock = [
  { id: '640000198907045342', question: {}, answer: {} },
  { id: '360000197512114583', question: {}, answer: {} },
  { id: '350000198011292632', question: {}, answer: {} },
  { id: '350000199905070160', question: {}, answer: {} },
  { id: '230000199211062652', question: {}, answer: {} },
  { id: '62000019790127658X', question: {}, answer: {} },
  { id: '630000200405197889', question: {}, answer: {} },
  { id: '710000201605231484', question: {}, answer: {} },
  { id: '510000201609181210', question: {}, answer: {} },
  { id: '440000200106305151', question: {}, answer: {} },
  { id: '230000197302272269', question: {}, answer: {} },
  { id: '21000020060422217X', question: {}, answer: {} },
  { id: '990000197705065543', question: {}, answer: {} },
  { id: '710000201304086914', question: {}, answer: {} },
  { id: '360000201605105327', question: {}, answer: {} },
  { id: '820000201210202561', question: {}, answer: {} },
  { id: '220000198008111643', question: {}, answer: {} }
];

export function createTestModels () {
  const UserHomePage = class UserHomePageModel extends Model {
    static modelName = 'UserHomePage';

    static fields = {
      id : attr(),
      navbar: attr(),
      feeds: tm(({ type }) => {
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
    UserHomePage,
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
    [UserHomePageMock, UserHomePage],
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

  const normalSession = orm.initSession(state);
  return { session: normalSession, orm, state };
}

export const isSubclass = (a, b) => a.prototype instanceof b;
