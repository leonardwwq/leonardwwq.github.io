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
    intro: '此模块为本人主导的完整业务系统，以toB业务系统为主。完成从项目管理、需求分析、原型设计、开发跟进、测试验收、上线发布等全流程工作。',
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
    slug: 'asa-smart-delivery',
    title: 'ASA 智能投放平台',
    description:
      '面向 Apple Search Ads 的自建智能投放工作台：在账户与系列全链路中集成辅助工具与 AI 决策建议，并以报表与监测支撑投放复盘。',
    tagline:
      '将原本分散的投放操作、数据查看与调整建议收口到同一后台，让运营在账户投放过程中即可获取可解释的建议并一键应用，降低对外部链路不稳定性的依赖。',
    tags: ['Apple Search Ads', '广告投放系统', '智能投放', '用户增长'],
    categoryId: 'platform',
    demoPath: '/prototypes/ASA智能投放平台/index.html',
    iframeTitle: 'ASA 智能投放平台原型预览',
    prototypesFolder: 'ASA智能投放平台',
    caseStudy: {
      background:
        '依赖第三方或外部链路的 <strong>Apple Search Ads（ASA）</strong> 投放后台，在<strong>网络波动</strong>与工具扩展性上存在局限，投放运营难以稳定使用自研能力。团队选择<strong>自建 ASA 智能投放后台</strong>，以便集成更灵活的<strong>自研投放工具</strong>、沉淀可复用的<strong>投放数据</strong>，并为后续 <strong>AI 决策</strong>与<strong>报表类办公场景</strong>提供数据基础，从「能投」走向「可优化、可复盘」的<strong>智能投放</strong>服务，并延续既有<strong>投放全链路工具化</strong>产品经验。',
      goals:
        '在保留原有业务能力的前提下完成<strong>平台重构</strong>：统一<strong>账户—系列—词表—广告</strong>等投放主路径的信息架构，升级<strong>交互与视觉</strong>；补齐<strong>投放辅助工具</strong>与<strong>报告总览</strong>等能力，减少多系统切换。引入 <strong>AI 辅助投放决策助手</strong>，在账户投放过程中基于实时数据给出<strong>调整建议</strong>，并支持<strong>一键应用</strong>，使「智能」落在可执行操作上。通过<strong>自建数据库</strong>积累投放数据，支撑模型训练与更稳定的<strong>监测、日报与决策</strong>输出。',
      process:
        '作为<strong>产品负责人</strong>，负责需求分析、信息架构、Axure 原型、开发跟进、测试验收到上线发布。在原有功能结构上做<strong>交互与业务逻辑重设计</strong>，按投放链路组织<strong>账户管理、广告系列/组/关键词、搜索词与否定词、SOV/CPP、报告总览</strong>等模块，并纳入<strong>全局概览、智能监测、MMP 授权与客户管理</strong>等配套能力。完成交互与视觉升级后，叠加<strong>投放辅助工具</strong>与 <strong>AI 决策助手</strong>（建议展示 + <strong>一键应用</strong>），与研发对齐<strong>数据监听、多时区统计、监控通知</strong>等规则；复杂配置以分步向导与报告页降低认知负担，优先保证主路径可评审、可排期。',
      results:
        '交付可交互<strong>原型与重构后的投放后台</strong>，形成从账户操作、辅助工具到<strong>报告与智能监测</strong>的一体化工作台；<strong>AI 建议与一键应用</strong>缩短「看数—判断—改价/调价」路径，投放过程<strong>效率显著提升</strong>。与波波等前序数据/投放类产品形成同一产品线上的能力递进。',
    },
  },
  {
    slug: 'aso-self-service',
    title: 'ASO 一站式下单平台',
    description:
      '将 ASO 业务标准化为可自助完成的下单与交付流程：以营销前台承接获客，以数据埋点与转化分析持续优化全链路效率。',
    tagline:
      '让小微客户无需反复商务对接即可在平台上一键下单，销售侧则获得新的规模化获客入口；用行为数据看清流失路径并驱动流程迭代。',
    tags: ['ASO', '自助下单', '增长获客', '数据驱动'],
    categoryId: 'platform',
    demoPath: '/prototypes/ASO自主下单平台/前台/index.html',
    iframeTitle: 'ASO 一站式下单平台前台预览',
    prototypesFolder: 'ASO自主下单平台',
    demoLinks: [
      { label: '后台原型', path: '/prototypes/ASO自主下单平台/后台/index.html' },
    ],
    caseStudy: {
      background:
        'ASO 业务中，<strong>小微客户</strong>往往仍需销售投入大量精力做<strong>商务对接</strong>，导致流程耗时长、资源占用高；以销售<strong>主动获客</strong>为主的模式<strong>效率低、性价比不佳</strong>。团队以<strong>平台为基点</strong>拓展获客渠道与方式，在保留服务能力的同时，把零散沟通改为可规模化的<strong>线上下单入口</strong>，为后续标准化交付铺路。',
      goals:
        '将 ASO 业务<strong>标准化、流程化</strong>，规范<strong>下单—承接—交付</strong>链路，使客户可在平台<strong>一键完成</strong>选购与下单，节省双方沟通时间、提高协同效率。在浏览与使用各环节部署<strong>埋点</strong>，通过<strong>桑基图</strong>等可视化对用户行为建模，识别<strong>流失路径</strong>并据此优化流程。以<strong>转化率、流失率、跳出率、业务平均交付时间</strong>等核心指标建立持续监控与迭代机制。',
      process:
        '作为<strong>产品负责人</strong>，负责需求分析、信息架构、Axure 原型、开发跟进、测试验收到上线发布。落地时先<strong>抽象业务逻辑</strong>，完成下单、承接与交付的产品设计，前台覆盖<strong>营销首页、各 ASO 服务选购页、注册登录与个人中心</strong>等主路径，后台配套<strong>数据看板、订单与财务统计、用户管理</strong>等运营能力。与研发对齐埋点方案与指标口径，用桑基图等分析<strong>漏斗与流失节点</strong>，按数据反馈迭代页面结构与下单步骤，优先保证主路径可评审、可排期。',
      results:
        '平台落地后<strong>获客机会提升约 117%</strong>，<strong>获客机会成本</strong>由 2025 年度均值约 <strong>48 元</strong>降至 2026 年度均值约 <strong>32 元</strong>；从业务沟通到最终交付的<strong>全流程效率提升约 43%</strong>（其中沟通环节约 30%、交付环节约 20%、财务环节约 50%）。形成「<strong>前台获客—自助下单—后台履约与数据复盘</strong>」的闭环，与 ASA 等投放类产品共同构成增长侧工具矩阵。',
    },
  },
  {
    slug: 'bobo-weibo',
    title: '波波微博数据分析平台',
    description:
      '面向品牌与运营的微博数据平台：聚合达人开放数据，支撑选人对比、话题监测与投放传播报告，覆盖投放全链路洞察。',
    tagline:
      '为品牌与运营团队提供可解释的微博话题监测与分析能力，缩短从「感知热点」到「判断行动」的路径；支持达人筛选、投放追踪与传播复盘在同一平台内完成。',
    tags: ['微博', '数据产品', '0-1 产品', '达人营销'],
    categoryId: 'platform',
    demoPath: '/prototypes/波波/前台/index.html',
    iframeTitle: '波波微博数据分析前台原型预览',
    prototypesFolder: '波波',
    demoLinks: [
      { label: '移动端原型', path: '/prototypes/波波/移动端/index.html' },
      { label: '后台原型', path: '/prototypes/波波/后台/index.html' },
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
    slug: 'topsocial-shubo',
    title: 'TopSocial 数据分析平台',
    description:
      '整合微博、抖音、小红书等多平台达人数据与工具的多平台服务中台：支撑跨平台 KOL 筛选、营销分析与投放协作，并将下单与效果验收流程产品化。',
    tagline:
      '把跨平台「筛选—下单—排期—验收—复盘」收口到同一工作台，用标准化流程与行为数据缩短从感知到交付的决策路径。',
    tags: ['多平台', '数据产品', 'KOL 投放', '流程产品化', '用户行为分析', 'B 端'],
    categoryId: 'platform',
    demoPath: '/prototypes/Topsocial数播/前台/index.html',
    iframeTitle: 'TopSocial 数据分析平台前台原型预览',
    prototypesFolder: 'Topsocial数播',
    demoLinks: [
      { label: '后台原型', path: '/prototypes/Topsocial数播/后台/index.html' },
    ],
    caseStudy: {
      background:
        '公司在微博、抖音、小红书等平台分别沉淀了数据分析能力，客户在做<strong>跨平台达人筛选</strong>时需在多系统间切换，<strong>人工下单与沟通成本高</strong>，服务难以标准化，数据资产也难以统一沉淀。需要在保留各平台能力的基础上，整合为<strong>多平台服务中台</strong>，支撑达人投放全链路的可复用交付。',
      goals:
        '完成<strong>全站体验重构</strong>与服务<strong>流程产品化</strong>：建立可复用的 B 端体验规范，降低关键路径跳出；通过<strong>全平台埋点</strong>与行为看板驱动迭代。将客户下单、投放排期与效果验收改为<strong>线上自助流程</strong>，缩短项目周期；建设<strong>投放效果分析报告</strong>能力，把报告产出从人工天级压缩到小时级；输出跨平台数据采集规范，支撑<strong>数据资产沉淀</strong>与后续智能化基础。',
      process:
        '作为<strong>核心负责人</strong>，主导 UI/UX 改版并沉淀 B 端体验优化 SOP（含核心交互原则）；设计覆盖<strong>12 个核心行为事件</strong>的埋点方案与用户行为分析看板，驱动多轮功能迭代；抽象<strong>自助下单</strong>主路径（下单 → 排期 → 验收），并联调<strong>效果分析报告</strong>模块。按中台思路组织<strong>多平台 KOL 资源、营销工具、会员与权限、投放/需求协作、后台资源与用户统计</strong>等能力；输出<strong>跨平台数据采集规范</strong>并推动为公司级数据治理标准。',
      results:
        '关键路径<strong>跳出率下降 25%</strong>；客户平均<strong>投放决策周期由 15 天缩短至 5 天</strong>，投放工单<strong>交付准时率达 95%+</strong>；自助下单上线后<strong>尾部客户工单量增长 200%</strong>，单项目周期<strong>由 3 个月缩短至 1 个月</strong>；报告产出<strong>由 3 天缩短至 2 小时</strong>。沉淀<strong>「数据采集 → 服务封装 → 流程自动化」</strong>的可复用 B 端框架；行为数据为后续<strong>智能推荐</strong>等能力预留基础。与<strong>波波微博数据分析平台</strong>形成「单平台 0-1 → 多平台整合与流程化」的能力递进。',
    },
  },
  {
    slug: 'finance-system',
    title: '分期信贷平台',
    description:
      '分期信贷业务的用户申请、授信评估与运营审核流程：在合规约束下统一申请入口、额度管理与后台审核的信息架构，支撑主链路可演示、状态可追溯。',
    tagline:
      '将「申请—授信—运营审核」收口为可同屏评审的信贷主链路，让业务、风控与研发对齐用户侧展示与后台校验规则，降低分散文档带来的口径歧义。',
    tags: ['分期信贷', '授信', '运营后台', '合规流程', 'B 端'],
    categoryId: 'platform',
    demoPath: null,
    demoExternalUrl: axureDemoUrls.financeSystem,
    iframeTitle: '分期信贷平台原型预览',
    prototypesFolder: 'axure-cloud',
    caseStudy: {
      background:
        '<strong>分期信贷</strong>业务在<strong>用户申请、风控授信与贷后运营</strong>上分角色协作，对<strong>字段口径、审批状态与额度规则</strong>要求高。若仅靠分散文档，业务、风控、研发与客服难以快速对齐<strong>「用户看到什么、系统校验什么、后台审什么」</strong>；敏感操作还需前置<strong>二次确认与留痕</strong>，否则易在评审与开发阶段反复返工。',
      goals:
        '打通<strong>借款申请/授信入口 → 授信评估与额度管理 → 运营/审核后台</strong>主链路，使申请进度、额度结果与审核动作<strong>状态可追溯、异常可处理</strong>。在负责人与业务框架下，由本人对分工模块交付可评审的 <strong>Axure 交互稿与字段/状态说明</strong>，支撑排期、研发对齐与<strong>上线验收</strong>，减少口头描述歧义。',
      process:
        '作为<strong>产品专员</strong>，在负责人与<strong>监管及业务约束</strong>下，对<strong>借款申请与授信入口、授信评估/额度管理、运营审核后台</strong>三模块端到端负责：需求梳理、信息架构、Axure 原型、开发跟进至测试验收。申请侧覆盖<strong>注册实名、申请向导、材料提交与进度查询</strong>，敏感步骤配确认与错误反馈；授信侧呈现<strong>额度、评估结果及冻结/调整</strong>等状态，并与风控规则对齐字段标注；运营后台支持<strong>待审队列、详情审阅、通过/拒绝/补件与操作日志</strong>。与研发对齐<strong>状态机与接口字段</strong>，联合业务与风控做跨部门原型评审；复杂规则以<strong>分步向导与分 tab</strong>降低一次性认知负担，优先保证主路径可评审、可排期。',
      results:
        '上述三模块均已<strong>上线并通过验收</strong>；交付可分享的 <strong>Axure 交互原型</strong>与配套说明，形成需求拆分与接口对齐基线，支撑<strong>业务—风控—研发</strong>同屏评审并减少返工。与波波、数播等作品中的 <strong>B 端流程产品</strong>经验形成补充，体现从营销数据场景到<strong>金融合规流程</strong>的产品协作能力。',
    },
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
    tags: ['投放工具', '插件产品', '原型演示'],
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
      '实习期参与社群运营 SaaS：在既定需求下完成 10 个功能模块的 Axure 原型与交互说明，用于评审对齐与研发估时。',
    tagline:
      '早期 B 端原型实践——把模块级页面与状态流转做成可演示稿件，支撑团队讨论而非独立定义业务方案。',
    tags: ['产品实习', 'Axure 原型', '社群运营', 'B 端', '交互设计'],
    categoryId: 'prototype',
    demoPath: null,
    demoExternalUrl: axureDemoUrls.saasCommunity,
    iframeTitle: '社群运营 SaaS 原型预览',
    prototypesFolder: 'axure-cloud/社群运营SaaS',
    caseStudy: {
      background:
        '花儿绽放时期，团队推进面向社群运营场景的 <strong>B 端 SaaS</strong>，希望缓解运营在 <strong>群工具、表格与活动排期</strong> 等多处切换、难以对齐口径等问题。本人以 <strong>产品实习生</strong> 身份参与，在导师与产品负责人给出的需求框架下协作，<strong>对业务全貌的理解主要来自评审与文档</strong>，而非独立调研。',
      goals:
        '团队侧：为运营相关角色提供可讨论的 <strong>一体化工作台</strong> 方向（成员、触达、活动与数据等模块）。本人侧：在分工范围内 <strong>高质量交付原型</strong>——完成 <strong>10 个功能模块</strong> 的可交互 Axure 稿件与 <strong>交互说明文档</strong>，覆盖主路径与关键异常状态，支撑 <strong>需求评审与研发估时</strong>。',
      process:
        '接收模块级需求说明与线框/字段约束，在 Axure 中搭建 <strong>列表、详情、配置向导</strong> 等页面，并串联空状态、权限提示、提交反馈等状态。按 <strong>「成员—触达—活动—数据」</strong> 等既定信息架构拆模块，迭代时根据评审意见调整布局与文案。输出可供研发与业务 <strong>同屏评审</strong> 的交互原型，并补充 <strong>交互文档</strong> 说明操作顺序与规则要点。',
      results:
        '按期交付 <strong>10 个功能模块</strong> 原型及配套交互说明，用于团队 <strong>评审与排期讨论</strong>；无本人主导的上线或经营指标可陈述。个人层面沉淀了 <strong>B 端信息架构、Axure 协作流程与需求文档化</strong> 的入门能力，为后续在波波、数播等项目中的 <strong>产品负责人</strong> 角色打下基础。',
    },
  },
];

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug);
}
