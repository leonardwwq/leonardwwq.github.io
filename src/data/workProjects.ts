/** 与 `public/prototypes/` 下的目录对应；用于 `/work` 列表与 `/work/[slug]` 详情。 */

import { axureDemoUrls } from './axureDemoUrls';

export type WorkCategoryId = 'platform' | 'prototype' | 'planned';

/** 各段可含 <strong> 标记关键词，详情页以 HTML 渲染 */
export type WorkCaseStudy = {
  background: string;
  goals: string;
  process: string;
  results: string;
};

/** 仅链接跳转、不做 iframe 嵌入的附加原型（如移动端、后台） */
export type WorkDemoLink = {
  label: string;
  path: string;
};

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
  /** 完整 https URL；Axure 云等站外演示，不在本站 iframe */
  demoExternalUrl?: string | null;
  iframeTitle: string;
  /** 便于「规划中」条目指向磁盘路径说明 */
  prototypesFolder: string;
  /** 详情页案例正文；未填则使用页面内模板占位 */
  caseStudy?: WorkCaseStudy;
  /** 详情页原型区下方的新窗口链接（不嵌入 iframe） */
  demoLinks?: WorkDemoLink[];
};

export const workCategories: {
  id: WorkCategoryId;
  title: string;
  intro: string;
}[] = [
  {
    id: 'platform',
    title: '完整业务系统',
    intro: '此模块为本人主导的完整业务系统，以TOB业务系统为主。完成从项目管理、需求分析、原型设计、开发跟进、测试验收、上线发布等全流程工作。',
  },
  {
    id: 'prototype',
    title: '探索性产品原型',
    intro: '基于业务场景的探索性产品原型，主要用于最小程度验证产品概念、交互流程、技术实现等。',
  },
  {
    id: 'planned',
    title: '规划中',
    intro: '目录已预留，原型接入后即可预览。',
  },
];

export function hasWorkDemo(project: WorkProject): boolean {
  return !!(project.demoPath || project.demoExternalUrl);
}

export const workProjects: WorkProject[] = [
  {
    slug: 'bobo-weibo',
    title: '波波微博数据分析平台',
    description: '针对微博生态的数据监测与可视化平台：提供从投放前到投放后全流程的数据洞察。',
    tagline: '为运营与内容团队提供可解释的微博话题监测与分析能力，缩短从「感知热点」到「判断行动」的路径。品牌与运营团队可以快速理解话题热度与内容结构，从而做出数据驱动的决策。',
    tags: ['数据产品', 'B 端', '0-1产品'],
    categoryId: 'platform',
    demoPath: '/prototypes/波波/前台/首页.html',
    iframeTitle: '波波微博数据分析前台原型预览',
    prototypesFolder: '波波',
    demoLinks: [
      { label: '移动端原型', path: '/prototypes/波波/移动端/首页.html' },
      { label: '后台原型', path: '/prototypes/波波/后台/登录.html' },
    ],
    caseStudy: {
      background:
        '微博是品牌<strong>宣发与种草</strong>的重要阵地。除以明星为主的传统宣发外，<strong>达人经济</strong>推动下，选择与产品匹配的博主成为有效路径，但达人侧<strong>商业化路径与运营策略</strong>仍不成熟。品牌方在「选谁合作、历史表现如何复盘、投放后效果能否持续追踪」上长期面临<strong>数据分散、历史数据难聚合分析、投放结果难对齐</strong>等痛点。需要基于<strong>微博开放数据</strong>的采集与<strong>可视化</strong>，为<strong>选人与投放决策</strong>提供可解释的依据，并在平台化产品内承接后续合作与复盘。',
      goals:
        '聚合达人及相关内容数据，以<strong>可视化与结构化报告</strong>支撑品牌方选人与投放决策；围绕商业合作链条设计工具能力，覆盖从发现达人、对比评估、传播分析到投放监测与报告输出，降低多方协作中的<strong>信息断层</strong>。在筛选维度多、数据量大的前提下，引入 <strong>PCA 降维</strong>等分析方法抽取主成分表征<strong>博主影响力</strong>，压缩品牌方的认知与决策成本。为运营与品牌角色交付可落地的 <strong>B 端产品方案</strong>（含会员与订单等商业化能力），使<strong>「感知热点—判断行动—追踪复盘」</strong>可在同一工作台内完成。',
      process:
        '作为<strong>产品负责人</strong>，负责需求分析、信息架构、Axure 原型、开发跟进、测试验收到上线发布。深入访谈品牌与运营需求后，按<strong>投放全流程</strong>拆解能力：博主查找与详情（含排行、比对、监控、回采）、博文与话题监测、品牌与热搜分析、投放/传播报告及数据导出等，将 <strong>PC 前台、移动端与后台</strong>运营（财务、需求与权限）纳入同一产品叙事。在指标设计上与研发对齐开放数据字段与影响力模型，用 <strong>PCA 降维</strong>等方式沉淀可复用的<strong>「影响力」</strong>表达，避免品牌方面对多维原始数据无从下手。针对性设计<strong>达人对比、传播路径分析、自动化数据报告、追踪监测与舆情类提醒</strong>，并规划 <strong>Chatbot 文案生成助手</strong>等增效工具；复杂分析以分步详情与报告页降低一次性认知负担，优先保证主路径可评审、可排期。',
      results:
        '产品完成<strong>商业化落地</strong>，运营期<strong>年均收入超过百万元</strong>，曾服务 <strong>Apple、华为、创维、OPPO</strong> 等品牌方，并支撑多所高校<strong>社会科学科研</strong>数据需求。交付可交互原型与上线系统，形成从数据采集、分析工具到会员订购的完整 <strong>B 端闭环</strong>；<strong>监测与报告</strong>类能力成为品牌复盘与达人合作的常用入口。后续因公司战略调整，该业务线停止运营；本项目经验（<strong>数据产品 0-1、投放全链路工具化</strong>）延续至作品集内 ASA、ASO、数播等后续平台类作品。',
    },
  },
  {
    slug: 'asa-smart-delivery',
    title: 'ASA 智能投放平台',
    description: 'Apple Search Ads 相关投放与监测能力的控制台原型。',
    tagline: '围绕账户、系列与监测链路组织工作台任务，降低投放运营在多模块间切换的成本。',
    tags: ['商业化', '广告投放系统', '用户增长'],
    categoryId: 'platform',
    demoPath: '/prototypes/ASA智能投放平台/报告总览.html',
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
    description:
      '面向社群运营团队的 B 端 SaaS：成员触达、活动编排与数据看板在同一工作台内串联。',
    tagline:
      '把「拉新—活跃—转化—复盘」收口为可协作的任务流，降低运营在多工具间切换与对账的成本。',
    tags: ['SaaS', '社群运营', 'B 端', 'Axure 云'],
    categoryId: 'platform',
    demoPath: null,
    demoExternalUrl: axureDemoUrls.saasCommunity,
    iframeTitle: '社群运营 SaaS 原型预览',
    prototypesFolder: 'axure-cloud',
    caseStudy: {
      background:
        '业务侧同时在用群工具、表格与投放后台，<strong>活动排期、成员分层与效果复盘</strong>分散在多个系统里；运营同学需要反复导出、对齐口径，<strong>协作成本高</strong>且难追溯决策依据。',
      goals:
        '为运营、增长与客服角色提供<strong>统一工作台</strong>：覆盖<strong>成员管理、触达编排、活动配置与效果看板</strong>；让关键路径可在单产品内完成，并支持按活动/渠道复盘。',
      process:
        '梳理四类角色的高频任务与权限边界，按<strong>「成员—触达—活动—数据」</strong>建立信息架构；优先交付列表、详情与配置向导等<strong>主路径</strong>，将高级自动化与开放 API 留作后续迭代；原型在 Axure 中串联关键状态与异常提示，供评审对齐。',
      results:
        '交付可交互 <strong>Axure 原型</strong>（托管于 Axure 云）与页面说明，支撑<strong>需求评审与研发估时</strong>；运营侧反馈任务流更清晰，后续可按模块拆分迭代上线。',
    },
  },
  {
    slug: 'finance-system',
    title: '金融系统',
    description:
      '金融业务前台与流程型能力原型：账户、订单与合规相关操作在同一套界面语言下呈现。',
    tagline:
      '在合规约束下组织账户与交易视角的任务结构，让业务与风控能在同一稿件上对齐流程与字段。',
    tags: ['金融', 'B 端', '流程', 'Axure 云'],
    categoryId: 'platform',
    demoPath: null,
    demoExternalUrl: axureDemoUrls.financeSystem,
    iframeTitle: '金融系统原型预览',
    prototypesFolder: 'axure-cloud',
    caseStudy: {
      background:
        '金融产品涉及<strong>开户、充值、交易与结算</strong>等多环节，业务、风控与客服对<strong>字段口径与操作顺序</strong>要求高；分散的文档难以在评审中快速对齐<strong>「用户看到什么、系统校验什么」</strong>。',
      goals:
        '沉淀一套可演示的前台与流程稿件：明确主角色（用户、运营、审核）在关键节点的操作与反馈；保证<strong>敏感操作有确认、状态可追溯</strong>，便于<strong>合规与研发</strong>共同评审。',
      process:
        '按<strong>监管与业务约束</strong>划分模块优先级，先打通<strong>开户—入金—交易—查询</strong>等主链路，再补充运营后台与异常处理页；<strong>字段与状态机</strong>在原型中标注说明，复杂规则以<strong>分步向导</strong>降低一次性认知负担。',
      results:
        '输出 <strong>Axure 云</strong>可分享的交互原型，用于<strong>跨部门评审</strong>与迭代记录；减少口头描述歧义，为后续拆分为正式需求与接口文档提供基线。',
    },
  },
];

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug);
}
