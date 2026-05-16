/** 与 `public/prototypes/` 下的目录对应；用于 `/work` 列表与 `/work/[slug]` 详情。 */

export type WorkCategoryId = 'platform' | 'prototype' | 'planned';

export type WorkProject = {
  slug: string;
  title: string;
  /** 列表卡片摘要 */
  description: string;
  /** 详情页顶部引言 */
  tagline: string;
  tags: string[];
  categoryId: WorkCategoryId;
  /** 相对站点根路径的可嵌入 HTML；暂无文件则为 null */
  demoPath: string | null;
  iframeTitle: string;
  /** 便于「规划中」条目指向磁盘路径说明 */
  prototypesFolder: string;
};

export const workCategories: {
  id: WorkCategoryId;
  title: string;
  intro: string;
}[] = [
  {
    id: 'platform',
    title: '平台与前台',
    intro: '完整业务前台或平台型需求：与公开原型目录一一对应。',
  },
  {
    id: 'prototype',
    title: '原型演示',
    intro: '探索性原型，集中在 prototypes/demo/ 下。',
  },
  {
    id: 'planned',
    title: '规划中',
    intro: '目录已预留，原型接入后即可预览。',
  },
];

export const workProjects: WorkProject[] = [
  {
    slug: 'bobo-weibo',
    title: '波波微博数据分析平台',
    description: '面向微博生态的数据监测与分析前台：帮助业务快速理解话题热度与内容结构。',
    tagline: '为运营与内容团队提供可解释的微博话题监测与分析能力，缩短从「感知热点」到「判断行动」的路径。',
    tags: ['数据产品', 'B 端', '原型演示'],
    categoryId: 'platform',
    demoPath: '/prototypes/波波/前台/首页.html',
    iframeTitle: '波波微博数据分析前台原型预览',
    prototypesFolder: '波波',
  },
  {
    slug: 'asa-smart-delivery',
    title: 'ASA 智能投放平台',
    description: 'Apple Search Ads 相关投放与监测能力的控制台原型。',
    tagline: '围绕账户、系列与监测链路组织工作台任务，降低投放运营在多模块间切换的成本。',
    tags: ['增长投放', 'B 端', '控制台'],
    categoryId: 'platform',
    demoPath: '/prototypes/ASA智能投放平台/index.html',
    iframeTitle: 'ASA 智能投放平台原型预览',
    prototypesFolder: 'ASA智能投放平台',
  },
  {
    slug: 'aso-self-service',
    title: 'ASO 自主下单平台',
    description: '面向 ASO 服务的营销前台与自助下单流程。',
    tagline: '把套餐、关键词与履约说明收口到同一套前台叙事里，支撑自助选购与转化。',
    tags: ['营销前台', '自助下单', '原型演示'],
    categoryId: 'platform',
    demoPath: '/prototypes/ASO自主下单平台/前台/index.html',
    iframeTitle: 'ASO 自主下单平台前台预览',
    prototypesFolder: 'ASO自主下单平台',
  },
  {
    slug: 'topsocial-shubo',
    title: 'Topsocial 数播',
    description: '社媒投放与资源侧前台能力的原型集合。',
    tagline: '覆盖资源浏览、需求提交与沟通链路的前台页面，便于对齐多方角色。',
    tags: ['社媒投放', '前台', '原型演示'],
    categoryId: 'platform',
    demoPath: '/prototypes/Topsocial数播/前台/index.html',
    iframeTitle: 'Topsocial 数播前台预览',
    prototypesFolder: 'Topsocial数播',
  },
  {
    slug: 'demo-ai-chat',
    title: 'AI 对话产品原型（ChatGPT 风格）',
    description: '会话、落地与引导流程的 Axure / 原型导出演示。',
    tagline: '用于推敲会话容器、空状态与核心转化路径的交互稿件。',
    tags: ['原型演示', 'AI', '会话'],
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/chatgpt/index.html',
    iframeTitle: 'AI 对话原型预览',
    prototypesFolder: 'demo/chatgpt',
  },
  {
    slug: 'demo-miniprogram-mall',
    title: '小程序商城系统',
    description: '商城前台链路：商品、订单与个人中心等页面原型。',
    tagline: '对齐小程序场景下的浏览与下单路径，便于评审关键触点。',
    tags: ['小程序', '电商', '原型演示'],
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/小程序商城系统/前台/index.html',
    iframeTitle: '小程序商城前台预览',
    prototypesFolder: 'demo/小程序商城系统',
  },
  {
    slug: 'demo-ad-assistant',
    title: '投放助手',
    description: '投放工具侧购买、权益与数据能力的页面原型。',
    tagline: '聚焦投放工具付费与使用记录，支撑插件类产品的 IA 讨论。',
    tags: ['投放工具', 'B 端', '原型演示'],
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/投放助手/index.html',
    iframeTitle: '投放助手原型预览',
    prototypesFolder: 'demo/投放助手',
  },
  {
    slug: 'demo-hotsearch-engine',
    title: '热搜引擎',
    description: '热搜查询、会员与购买记录相关前台演示。',
    tagline: '围绕热搜查询与增值能力的原型切片，用于验证信息流与付费动机。',
    tags: ['热点', '增值', '原型演示'],
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/热搜引擎/index.html',
    iframeTitle: '热搜引擎原型预览',
    prototypesFolder: 'demo/热搜引擎',
  },
  {
    slug: 'saas-community',
    title: '社群运营 SaaS',
    description: '社群运营方向产品稿件占位；原型接入后在此嵌入预览。',
    tagline: '目录已建：将在此整理社群运营场景下的核心任务流与协作机制。',
    tags: ['SaaS', '规划中'],
    categoryId: 'planned',
    demoPath: null,
    iframeTitle: '社群运营 SaaS 原型预览',
    prototypesFolder: '社群运营SaaS',
  },
  {
    slug: 'finance-system',
    title: '金融系统',
    description: '金融业务侧原型占位；接入静态导出后可预览。',
    tagline: '目录已建：后续在此沉淀合规流程与账户视角下的任务结构。',
    tags: ['金融', '规划中'],
    categoryId: 'planned',
    demoPath: null,
    iframeTitle: '金融系统原型预览',
    prototypesFolder: '金融系统',
  },
];

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug);
}
