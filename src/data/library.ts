/** 思考库：按分类维护阅读材料与个人思考；`priority` 控制分类内顺序，默认展示前三条。 */

import { libraryAssetUrls } from './libraryAssetUrls';

export type LibraryCategoryId = 'user-research' | 'decision' | 'ai';

export type LibraryEntry = {
  id: string;
  categoryId: LibraryCategoryId;
  /** 材料名称（书名、论文题等） */
  title: string;
  author: string;
  /** 出版/发表年份；查不到可省略，页面上不展示 */
  year?: number | string;
  /** 本条思考最后更新时间，ISO 日期 YYYY-MM-DD */
  updatedAt: string;
  /** 电子版下载/阅读链接；实体书可省略 */
  link?: { href: string; label?: string };
  /** 展开后展示的个人思考，支持多段（按空行分段） */
  thoughts: string;
  /** 精选：页面上展示「精选」标签 */
  featured?: boolean;
  /** 分类内展示顺序，数字越小越靠前；未设置时排在该分类末尾 */
  priority?: number;
};

export const libraryCategories: { id: LibraryCategoryId; title: string }[] = [
  { id: 'ai', title: '人工智能' },
  { id: 'user-research', title: '用户研究' },
  { id: 'decision', title: '决策研究' },
];

/** 每个分类默认展示条数；其余通过「展开更早」查看 */
export const LIBRARY_DEFAULT_VISIBLE = 3;

export const libraryEntries: LibraryEntry[] = [
  // —— 用户研究 ——
  {
    id: 'ur-design-psychology',
    categoryId: 'user-research',
    title: '设计心理学',
    author: '唐纳德·A·诺曼',
    year: 2015,
    updatedAt: '2024-08-15',
    link: { href: libraryAssetUrls.urDesignPsychology, label: 'PDF · 下载' },
    thoughts:
      '强调以人为本的可用性：心智模型、示能、反馈与错误设计，解释好设计为何顺手、坏设计为何让人挫败。\n\n我认识到如何去描述一个问题以及感受在其中的作用，这让我具备更强的同理心，能够深入去理解需求与用户心理之间的关联。',
    priority: 1,
  },
  {
    id: 'ur-psychological-statistics',
    categoryId: 'user-research',
    title: '统计心理学',
    author: '教材（心理统计学，如张厚粲、徐建平）',
    updatedAt: '2024-08-15',
    thoughts:
      '描述统计、推断统计、假设检验与常用分析思路，是用研数据与实验结果解读的基础。\n\n我学会了用统计方法解读用研和实验数据，知道什么时候可以说有差异、什么时候不能过度推断。这让我在贴近用户的观察之外，多一层用数据检验判断的习惯。',
    priority: 2,
  },
  {
    id: 'ur-experimental-psychology',
    categoryId: 'user-research',
    title: '实验心理学',
    author: '教材（如郭秀艳等）',
    updatedAt: '2024-08-15',
    thoughts:
      '心理学实验设计、变量控制、内外效度与报告规范，是用研与受控实验的学科基础。\n\n我学会了科学的方法，如何控制相关变量，排除无关变量，去探寻真正的因果关系。能够从严谨的角度合理地去解释表象背后的原因。',
    priority: 3,
  },
  {
    id: 'ur-psychometrics',
    categoryId: 'user-research',
    title: '测量心理学',
    author: '教材（心理测量学，如张厚粲、龚耀先等）',
    updatedAt: '2024-08-15',
    thoughts:
      '信度、效度、量表编制与测验理论，支撑问卷设计与心理测量工具的选用与解释。\n\n我学会了先看量表测的是什么、结果可不可信，再理解用户说了什么。做问卷和评分时，不再停留在「问过就好」，而是可以检验的测量。',
    priority: 4,
  },
  {
    id: 'ur-about-face-4',
    categoryId: 'user-research',
    title: '交互设计精髓',
    author: 'Alan Cooper 等（库伯）',
    year: 'About Face 4 · 中文版',
    updatedAt: '2024-08-15',
    thoughts:
      '目标导向设计、人物角色（Persona）、场景与交互框架，覆盖从需求到方案的整体交互设计流程，适配桌面、Web、移动与触屏等产品形态。\n\n我学会了从目标、Persona 和场景出发组织方案，而不是直接堆功能。做需求分析和原型时，能先把为谁、在什么情况下解决什么说清楚。',
    priority: 5,
  },
  {
    id: 'ur-microinteractions',
    categoryId: 'user-research',
    title: '微交互',
    author: 'Dan Saffer（塞弗）',
    year: 2013,
    updatedAt: '2024-08-15',
    link: { href: libraryAssetUrls.urMicrointeractions, label: 'PDF · 下载' },
    thoughts:
      '讲触发器、规则、反馈、循环与模式——静音开关、通知、设置项等「小交互」如何决定产品质感，是自下而上的细节设计方法。\n\n我认识到很多体验差异来自反馈、等待、状态切换这类小细节。做细节设计时，我会关注用户当下的感受，也会用行为和数据检查改完是否真的更好。',
    priority: 6,
  },
  {
    id: 'ur-designing-design',
    categoryId: 'user-research',
    title: '设计中的设计',
    author: '原研哉',
    year: 2010,
    updatedAt: '2024-08-15',
    link: { href: libraryAssetUrls.urDesigningDesign, label: 'PDF · 下载' },
    thoughts:
      '从「再设计」日常用品出发，讨论设计如何重新发现日常、赋予生活以感知与意义，偏设计哲学与审美判断。\n\n我认识到产品不只有功能和效率，还有感知和意义这一层。做设计决策时，会多问用户如何感受、如何记住，而不只问能不能完成任务。',
    priority: 7,
  },
  {
    id: 'ur-social-psychology',
    categoryId: 'user-research',
    title: '社会心理学',
    author: '教材（常见译本 / 侯玉波等）',
    updatedAt: '2024-08-15',
    thoughts:
      '研究个体在社会情境中的认知、态度与行为：从众、说服、群体过程、偏见、人际吸引等。\n\n我理解了人在群体、舆论和协作场景里的行为，和单独使用产品时很不一样。做相关产品时，我会区分个体感受和群体规律，避免把个例当成普遍情况。',
    priority: 8,
  },
  {
    id: 'ur-developmental-psychology',
    categoryId: 'user-research',
    title: '发展心理学',
    author: '教材（如林崇德等）',
    updatedAt: '2024-08-15',
    thoughts:
      '个体毕生发展中的认知、社会性与道德发展阶段，帮助按年龄与生命周期理解能力与需求差异。\n\n我认识到用户的能力和需求会随年龄和人生阶段变化。做面向不同人群的产品时，不会默认所有人跟我想法一样，会把阶段差异当成需要验证的假设。',
    priority: 9,
  },
  {
    id: 'ur-educational-psychology',
    categoryId: 'user-research',
    title: '教育心理学',
    author: '教材（如陈琦、刘儒德等）',
    updatedAt: '2024-08-15',
    thoughts:
      '学习理论、动机、教学设计与评价，关注人如何习得、保持并应用新技能。\n\n我学会了从学习和动机角度思考 onboarding 和培训功能：用户愿不愿意学、能不能学会、学完后会不会用。设计时不只铺功能，也关心习得和实际使用。',
    priority: 10,
  },
  // —— 决策研究 ——
  {
    id: 'decision-cognitive-psychology',
    categoryId: 'decision',
    title: '认知心理学',
    author: '教材（如 Solso 等译本 / 国内认知教材）',
    updatedAt: '2026-04-08',
    thoughts:
      '系统阐述注意、知觉、记忆、语言、思维与问题解决等认知过程，以及信息如何被获取、表征、存储与提取。\n\n我开始从认知机制理解判断与决策的前置环节——个体如何加工信息、形成表征并据此作出选择。这是我研究生阶段「用户决策行为」方向的概念基础，也将与后续的实验设计与行为分析相衔接。',
    priority: 1,
  },
  {
    id: 'decision-general-psychology',
    categoryId: 'decision',
    title: '普通心理学',
    author: '教材（如彭聃龄等）',
    updatedAt: '2026-04-18',
    thoughts:
      '概述心理学的研究对象、基本方法与主要分支，涵盖心理过程、心理状态与心理结构，为进入各专题提供学科总览。\n\n作为进入研究生阶段的学科地图，它帮助我把握心理学各分支的边界与承接关系，避免在决策行为研究中断章取义。后续将在这一框架下，逐步聚焦与认知、判断及决策相关的理论与实证脉络。',
    priority: 2,
  },
  {
    id: 'decision-crowd',
    categoryId: 'decision',
    title: '乌合之众',
    author: '古斯塔夫·勒庞',
    year: 1895,
    updatedAt: '2026-04-28',
    thoughts:
      '分析群体情境下的匿名性、暗示、传染与领袖影响等机制，及其对个体理性判断的削弱与改变。\n\n我从历史脉络理解集体意见形成与非理性行为的早期论述，同时以当代社会心理学的实证研究对其加以批判性阅读。对于关注群体语境中的决策偏差与舆论环境，它提供了问题意识的起点，而非可直接外推的现代结论。',
    priority: 3,
  },
  // —— 人工智能 ——
  {
    id: 'ai-deep-learning',
    categoryId: 'ai',
    title: 'Deep Learning',
    author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    year: 2016,
    updatedAt: '2025-12-08',
    link: { href: libraryAssetUrls.deepLearningPdf, label: 'PDF · 下载' },
    thoughts:
      '从必要的数学出发，讲神经网络怎么建、怎么训，以及 CNN、RNN、生成模型这些常见结构各自解决什么问题。内容偏体系化，适合当深度学习的主线参考。\n\n花书帮我构建了深度学习模型的工作原理，让我可以更好地理解 AI 的本质，了解它的局限性和能力边界，构成了我能够读懂 AI 相关技术的理论基础。',
    featured: true,
    priority: 1,
  },
  {
    id: 'ai-modern-approach',
    categoryId: 'ai',
    title: '人工智能：现代方法',
    author: 'Stuart Russell, Peter Norvig（罗素、诺维格）',
    year: 2022,
    updatedAt: '2025-09-22',
    thoughts:
      '用「智能体」把 AI 里各大块串起来：搜索、逻辑与推理、规划、不确定性、机器学习、深度学习、NLP 等。更像一张知识地图，而不是只讲某一个热门模型。\n\n它帮我建立 AI 各子领域的整体框架，让我在遇到新概念时能判断它属于哪一类问题、通常沿什么思路展开。这是我理解 AI 广度，以及做 AI 功能时设定合理预期的基础。',
    featured: true,
    priority: 2,
  },
  {
    id: 'ai-boundaries-zhou',
    categoryId: 'ai',
    title: '智慧的疆界',
    author: '周志明',
    year: 2025,
    updatedAt: '2026-02-18',
    thoughts:
      '按时间线讲 AI 从图灵机、达特茅斯一路走到今天的大模型：三大学派、几轮起伏、以及人机关系怎么变。读起来偏故事和脉络，公式不多。\n\n它帮我串起 AI 发展的关键节点和几次方向转换，让我理解当前技术路线从何而来、哪些能力曾被高估或低估。做 AI 相关产品时，这有助于我区分短期可实现与容易被过度承诺的部分。',
    priority: 3,
  },
  {
    id: 'ai-agi-liujia',
    categoryId: 'ai',
    title: '通用人工智能',
    author: '刘嘉',
    year: 2025,
    updatedAt: '2025-06-14',
    thoughts:
      '从 AGI 聊开去：智能时代会怎么改我们的学法、工作方式和日常判断，重点不是堆技术细节，而是人该怎么跟更强的 AI 共处。\n\n它提醒我 AI 不只是工程问题，也关系到人的认知方式与决策空间。做 AI 辅助类产品时，我会用它校准哪些环节适合交给模型、哪些判断应留给人来完成。',
    priority: 4,
  },
  {
    id: 'ai-cs-overview',
    categoryId: 'ai',
    title: '计算机科学概论',
    author: 'J. Glenn Brookshear（布鲁克希尔）',
    year: 2022,
    updatedAt: '2026-03-12',
    thoughts:
      '计算机学科入门全景：算法、编程、系统、网络、数据库、AI 概论、计算理论等，从具体例子慢慢抽象到整体结构。\n\n它帮我补齐 AI 之外的计算机基础脉络，让我在讨论数据、系统与工程约束时不至于只从模型出发。这是我把 AI 能力落回真实产品环境时的参照。',
    priority: 5,
  },
  {
    id: 'ai-calculus-lifesaver',
    categoryId: 'ai',
    title: 'The Calculus Lifesaver',
    author: 'Adrian Banner',
    year: 2007,
    updatedAt: '2026-03-26',
    link: { href: libraryAssetUrls.calculusLifesaverMobi, label: 'MOBI · 下载' },
    thoughts:
      '微积分自学导读，用例子和直觉讲极限、导数、积分、级数这些，重在「为什么这样算」，而不是堆证明。\n\n它用更直觉的方式补上了读花书所需的数学语言，让我能跟上线性代数、概率与优化相关的章节。这是我继续深入 AI 技术阅读的前置台阶。',
    priority: 6,
  },
];

const DEFAULT_LIBRARY_PRIORITY = 999;

export function sortLibraryEntries(entries: LibraryEntry[]): LibraryEntry[] {
  return [...entries].sort((a, b) => {
    const ap = a.priority ?? DEFAULT_LIBRARY_PRIORITY;
    const bp = b.priority ?? DEFAULT_LIBRARY_PRIORITY;
    if (ap !== bp) return ap - bp;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

export function getEntriesForCategory(categoryId: LibraryCategoryId): LibraryEntry[] {
  return sortLibraryEntries(libraryEntries.filter((e) => e.categoryId === categoryId));
}
