/** 与 `public/prototypes/` 下的目录对应；用于 `/work` 列表与 `/work/[slug]` 详情。 */

import { axureDemoUrls } from './axureDemoUrls';
import type { WorkProjectIconId } from './workProjectIcons';

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
  /** 机器人悬浮提示短描述 */
  tooltipSummary?: string;
  /** 详情页顶部引言 */
  tagline: string;
  tags: string[];
  /** 列表卡片右上角 icon */
  iconId: WorkProjectIconId;
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
    title: 'ASA 智能投放平台（DSP + DMP + 风控一体化）',
    description:
      '在广告投放管理全链路中集成数据管理与财务风控能力，以规则引擎与 AI 辅助决策支撑投放策略优化，并保障客户垫资模式的资金安全。',
    tooltipSummary: 'ASA DSP + DMP + 风控一体化平台，整合投放管理、数据策略与垫资风控。',
    tagline:
      '将投放管理（DSP）、数据策略（DMP）与财务风控收口到同一平台，让运营在投放过程中不仅可获取可解释的优化建议并一键应用，还能实时掌控客户垫资消耗与信用风险，从「能投」走向「投得稳、管得住」。',
    tags: ['Apple Search Ads', 'DSP', 'DMP', '风控结算', '垫资管理', '智能投放', '用户增长'],
    iconId: 'megaphone',
    categoryId: 'platform',
    demoPath: '/prototypes/ASA智能投放平台/index.html',
    iframeTitle: 'ASA 智能投放平台原型预览',
    prototypesFolder: 'ASA智能投放平台',
    demoLinks: [
      { label: 'ASA 投放 Agent（探索原型）', path: '/prototypes/ASA投放Agent/index.html' },
    ],
    caseStudy: {
      background:
        '作为 <strong>Apple Search Ads</strong> 代理商，公司为客户提供广告投放服务并<strong>垫付广告款（月结）</strong>。原有投放后台在<strong>网络波动</strong>与工具扩展性上存在局限，投放运营难以稳定使用自研能力。团队选择自建 <strong>DSP + DMP + 风控一体化平台</strong>，集成更灵活的<strong>投放管理工具</strong>、沉淀可复用的<strong>投放数据</strong>，并解决客户垫资模式下的<strong>资金风险</strong>问题，从「能投」走向「可优化、可风控、可复盘」。',
      goals:
        '在保留原有业务能力的前提下完成<strong>平台重构</strong>，覆盖三大核心模块：<strong>DSP 端</strong>统一账户—系列—词表—广告投放主路径的信息架构与交互视觉，补齐<strong>投放辅助工具</strong>与<strong>报告总览</strong>能力；<strong>DMP 端</strong>整合苹果广告数据、第三方归因数据及业务端转化数据，建立统一数据资产管理体系，以<strong>关键词分类与受众画像</strong>支撑差异化出价；<strong>风控端</strong>设计客户信用额度管理、实时垫资消耗监控与自动停投机制，打通资金流转闭环。引入 <strong>AI 辅助投放决策助手</strong>，基于实时数据给出调整建议并支持<strong>一键应用</strong>。',
      process:
        '作为<strong>产品负责人</strong>，负责需求分析、信息架构、Axure 原型、开发跟进、测试验收到上线发布。按 <strong>DSP / DMP / 风控</strong>三大模块组织产品设计：<strong>DSP 端</strong>覆盖账户管理、广告系列/组/关键词、搜索词与否定词、SOV/CPP、报告总览等投放全链路，纳入全局概览、智能监测、MMP 授权等配套能力；<strong>DMP 端</strong>设计多源数据整合方案、关键词多维分类规则（通用词/高竞争词/高相关词/潜力词）及规则引擎；<strong>风控端</strong>设计客户信用额度管理、实时消耗监控预警、超限自动停投及资金对账结算功能。与研发对齐数据监听、多时区统计、监控通知等规则；复杂配置以分步向导与报告页降低认知负担。',
      results:
        '交付 <strong>DSP + DMP + 风控一体化投放平台</strong>，月均管理消耗约 <strong>200 万人民币 + 220 万美元</strong>，覆盖数千广告账户，支撑 10+ 人投放团队日常运作。形成从投放管理、数据策略到风控结算的完整闭环，<strong>AI 建议与一键应用</strong>缩短「看数—判断—改价」路径。基于平台数据与策略沉淀，完成<strong>智能投放 Agent 方案设计</strong>，为 AI 驱动投放演进提供储备。与波波等前序数据/投放类产品形成同一产品线上的能力递进。',
    },
  },
  {
    slug: 'asa-delivery-agent',
    title: 'ASA 投放 Agent',
    description:
      '基于DSP+DMP+风控平台的三栏Agent工作台探索原型：账户树 + 数据工作区 + 异常预警侧栏，以监测告警驱动可解释归因与多选建议采纳，验证「看数—决策—执行」闭环。',
    tooltipSummary: '基于平台数据与风控预警的投放 Agent 工作台，串联诊断分析与建议执行。',
    tagline:
      '不是独立聊天窗口，而是嵌入投放上下文的 Agent：异常先触发、数据可对照、建议可勾选、采纳仅执行选中项，强化 AI 决策说服力。基于 DSP + DMP + 风控平台的数据与策略沉淀，让 Agent 的建议有据可依。',
    tags: ['Apple Search Ads', 'AI Agent', '异常监测', '智能投放'],
    iconId: 'sparkles',
    categoryId: 'prototype',
    demoPath: '/prototypes/ASA投放Agent/index.html',
    iframeTitle: 'ASA 投放 Agent 原型预览',
    prototypesFolder: 'ASA投放Agent',
    caseStudy: {
      background:
        '在 <a href="/work/asa-smart-delivery">ASA 智能投放平台（DSP + DMP + 风控一体化）</a> 中，<strong>AI 辅助决策</strong>需解决两个问题：一是建议不能脱离<strong>账户/系列/组</strong>上下文悬浮；二是运营需要看到<strong>监测为何报警</strong>、<strong>依据哪些指标</strong>，才能信任并执行调价/受众等操作。基于平台 <strong>DSP + DMP + 风控</strong>的数据与策略沉淀，本探索原型将 Agent 收口为<strong>三栏工作台</strong>，与完整平台原型分离，专注验证交互与叙事。',
      goals:
        '验证「<strong>异常预警 → Agent 归因解读 → 多选建议 → 忽略/采纳</strong>」主路径是否清晰可演示。基于 <strong>DSP + DMP</strong> 的投放与归因数据，让建议项与中栏广告组数据<strong>名称与指标一致</strong>；结合<strong>风控端</strong>的消耗异常预警作为触发场景；<strong>采纳</strong>仅提交已勾选项，体现可控执行而非黑盒替代。',
      process:
        '基于 ASA 投放链路与 <strong>DSP + DMP + 风控</strong>平台既有的数据与规则体系，设计<strong>左栏三级树</strong>（账户—系列—组）、<strong>中栏层级工作区</strong>（配置 + 下属组表/指标）、<strong>右栏 Agent 面板</strong>（预警摘要、可折叠分析、建议多选、底部输入）。Mock 场景预设系列 CPA 环比 +32%（DSP 消耗监控数据），归因至两个广告组的 CPT/受众（DMP 画像数据），风控消耗阈值触发告警；建议含 2 条出价 + 1 条受众调整；静态 HTML/CSS/JS 实现选中联动与采纳反馈。',
      results:
        '交付可嵌入作品集的<strong>单页静态原型</strong>（<code>public/prototypes/ASA投放Agent/</code>），作为 <strong>DSP + DMP + 风控</strong>平台的<strong>探索性 Agent 形态</strong>单独展示，并在 ASA 案例页提供「更多原型」入口。后续可扩展对话记录 Tab、更多预警类型或与真实 ASA API 联调。',
    },
  },
  {
    slug: 'aso-self-service',
    title: 'ASO 一站式下单平台',
    description:
      '将 ASO 业务标准化为可自助完成的下单与交付流程：以营销前台承接获客，以数据埋点与转化分析持续优化全链路效率。',
    tooltipSummary: 'ASO 自助下单平台，标准化获客、下单与交付全流程。',
    tagline:
      '让小微客户无需反复商务对接即可在平台上一键下单，销售侧则获得新的规模化获客入口；用行为数据看清流失路径并驱动流程迭代。',
    tags: ['ASO', '自助下单', '增长获客', '数据驱动'],
    iconId: 'smartphone',
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
    tooltipSummary: '微博达人数据平台，支持选人评估、话题监测与投放复盘。',
    tagline:
      '为品牌与运营团队提供可解释的微博话题监测与分析能力，缩短从「感知热点」到「判断行动」的路径；支持达人筛选、投放追踪与传播复盘在同一平台内完成。',
    tags: ['微博', '数据产品', '0-1 产品', '达人营销'],
    iconId: 'bar-chart-3',
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
        '作为<strong>产品负责人</strong>，负责需求分析、信息架构、Axure 原型、开发跟进、测试验收到上线发布。深入访谈品牌与运营需求后，按<strong>投放全流程</strong>拆解能力：博主查找与详情（含排行、比对、监控、回采）、博文与话题监测、品牌与热搜分析、投放/传播报告及数据导出等，将 <strong>PC 前台、移动端与后台</strong>运营（财务、需求与权限）纳入同一产品叙事。在指标设计上与研发对齐开放数据字段与影响力模型，用 <strong>PCA 降维</strong>等方式沉淀可复用的<strong>「影响力」</strong>表达，避免品牌方面对多维原始数据无从下手。针对性设计<strong>达人对比、传播路径分析、自动化数据报告、追踪监测与舆情类提醒</strong>，并规划 <strong>Chatbot 文案生成助手</strong>等增效工具；复杂分析以分步详情与报告页降低一次性认知负担，优先保证主路径可评审、可排期。文案助手探索原型见 <a href="/work/demo-ai-chat">AI 投放文案生成助手</a>。',
      results:
        '产品完成<strong>商业化落地</strong>，运营期<strong>年均收入超过百万元</strong>，曾服务 <strong>Apple、华为、创维、OPPO</strong> 等品牌方，并支撑多所高校<strong>社会科学科研</strong>数据需求。交付可交互原型与上线系统，形成从数据采集、分析工具到会员订购的完整 <strong>B 端闭环</strong>；<strong>监测与报告</strong>类能力成为品牌复盘与达人合作的常用入口。后续将高频单点能力<strong>拆线独立售卖</strong>：<a href="/work/demo-ad-assistant">投放助手</a>（数据导出）、<a href="/work/demo-hotsearch-engine">热搜引擎</a>（历史热搜查询），以及 <a href="/work/demo-ai-chat">AI 投放文案生成助手</a>，与主平台数据联动。后续因公司战略调整，该业务线停止运营；本项目经验（<strong>数据产品 0-1、投放全链路工具化</strong>）延续至作品集内 ASA、ASO、数播等后续平台类作品。',
    },
  },
  {
    slug: 'topsocial-shubo',
    title: 'TopSocial 数据分析平台',
    description:
      '整合微博、抖音、小红书等多平台达人数据与工具的多平台服务中台：支撑跨平台 KOL 筛选、营销分析与投放协作，并将下单与效果验收流程产品化。',
    tooltipSummary: '跨平台 KOL 数据中台，统一筛选、下单、验收与效果复盘。',
    tagline:
      '把跨平台「筛选—下单—排期—验收—复盘」收口到同一工作台，用标准化流程与行为数据缩短从感知到交付的决策路径。',
    tags: ['多平台', '数据产品', 'KOL 投放', '流程产品化', '用户行为分析', 'B 端'],
    iconId: 'layers',
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
    tooltipSummary: '分期信贷流程平台，贯通申请、授信评估与运营审核链路。',
    tagline:
      '将「申请—授信—运营审核」收口为可同屏评审的信贷主链路，让业务、风控与研发对齐用户侧展示与后台校验规则，降低分散文档带来的口径歧义。',
    tags: ['分期信贷', '授信', '运营后台', '合规流程', 'B 端'],
    iconId: 'credit-card',
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
    title: 'AI 投放文案生成助手',
    description:
      '集成文案生成辅助工具：根据达人特点与品牌调性自动生成多版投放文案初稿，支持编辑优化，并与波波达人分析平台协同推荐。',
    tooltipSummary: 'AI 投放文案助手，基于达人画像生成多版文案并支持编辑优化。',
    tagline:
      '把「选人—写稿—改稿—投放」中的创意环节产品化：会话式生成多版初稿，注入达人画像与品牌配置，缩短品牌运营的内容生产路径。',
    tags: ['AI', '达人营销', '文案生成', '商业化', '波波'],
    iconId: 'sparkles',
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/chatgpt/index.html',
    iframeTitle: 'AI 投放文案生成助手原型预览',
    prototypesFolder: 'demo/chatgpt',
    demoLinks: [
      { label: '落地页（快捷场景）', path: '/prototypes/demo/chatgpt/落地页面.html' },
      { label: '会话页（多版初稿）', path: '/prototypes/demo/chatgpt/会话页面.html' },
      { label: '使用指南', path: '/prototypes/demo/chatgpt/操作指南.html' },
    ],
    caseStudy: {
      background:
        '品牌在<strong>微博达人投放</strong>中，选定博主后仍需撰写贴合<strong>达人风格</strong>与<strong>品牌调性</strong>的种草/宣发文案。运营往往反复试错、多轮沟通，<strong>创意产出慢</strong>且难复用历史爆款表达；若与选人分析割裂，文案容易「像品牌自说自话」而非达人原生口吻。需要在<strong>波波微博数据分析平台</strong>的达人画像与历史内容数据基础上，提供可嵌入工作流的<strong>文案生成辅助</strong>能力。',
      goals:
        '以<strong>独立产品模块</strong>交付文案生成能力，并验证「<strong>生成 → 多版对比 → 编辑优化 → 复制投放</strong>」主路径。支持根据<strong>达人特点</strong>与<strong>品牌调性</strong>一次生成<strong>多版投放文案初稿</strong>；允许用户<strong>个性化编辑</strong>；与波波达人分析平台<strong>账号与数据联动</strong>，基于达人画像与历史数据给出更具吸引力的表达方向，提升投放效率与内容创意质量。',
      process:
        '作为<strong>独立拆线产品</strong>搭建 <strong>会话式文案生成</strong>能力（落地页、会话页、操作指南），复用会员/次数/模型切换等商业化框架，并与波波打通达人上下文注入。落地页设计<strong>投放文案、达人画像、品牌调性</strong>三类快捷场景；会话页展示<strong>多版初稿并列</strong>与复制、编辑态；在<strong>波波达人详情/对比页</strong>预留带入画像（昵称、内容标签、近期爆款话题等）的入口。与研发对齐 Prompt 结构（达人上下文 + 品牌约束 + 输出条数/字数）及跨产品跳转协议。',
      results:
        '产品已<strong>单独拆线并商业化上线</strong>，与波波微博数据分析平台保持<strong>产品联动</strong>：支持从达人详情带入画像、生成多版初稿、编辑后复制投放。主路径「<strong>带入达人 → 描述品牌 → 生成多版 → 编辑复制</strong>」在上线环境中可用，与数据选人等能力形成「选人—写稿—投放—复盘」协同，显著提升投放效率与内容创意。站内保留 <strong>Axure 交互原型</strong>（三页入口）供作品集演示。',
    },
  },
  {
    slug: 'demo-miniprogram-mall',
    title: '小程序商城系统',
    description:
      '微信小程序商城与管理后台的产品方案：覆盖浏览选购、活动限购、购物车与订单履约等标准电商 MVP 链路。',
    tooltipSummary: '小程序商城与后台方案，覆盖选购下单到订单履约主链路。',
    tagline:
      '在约定范围内将「小程序选购 + 后台运营」收口为可评审的 Axure 主路径，便于交付对齐与研发排期。',
    tags: ['小程序', '电商', 'Axure 原型', 'B 端后台'],
    iconId: 'shopping-bag',
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/小程序商城系统/前台/index.html',
    iframeTitle: '小程序商城前台预览',
    prototypesFolder: 'demo/小程序商城系统',
    demoLinks: [
      { label: '小程序前台', path: '/prototypes/demo/小程序商城系统/前台/index.html' },
      { label: '管理后台', path: '/prototypes/demo/小程序商城系统/后台/index.html' },
    ],
    caseStudy: {
      background:
        '客户需要一套可运营的<strong>微信小程序商城</strong>，并配套<strong>管理后台</strong>完成商品与订单日常管理。原有下单方式分散、流程不统一，希望在 MVP 范围内跑通「注册—选购—下单—履约」；用户侧偏<strong>企业采购</strong>场景（注册公司名称展示、账号审核等），不宜做成复杂营销中台。',
      goals:
        '在约定范围内交付<strong>可交互 Axure 原型</strong>与交互说明，跑通主路径并覆盖常见边界：前台完成品类浏览、搜索、商品/活动详情、购物车加购与下单、订单列表与状态查看；后台完成商品与分类维护、活动配置、订单取消/配送/完成及客户与管理员管理。支撑客户<strong>评审定稿与研发估时</strong>，能力定位为标准电商闭环而非功能堆砌。',
      process:
        '对接客户需求后拆分<strong>小程序前台 / 管理后台</strong>信息架构并搭建原型。前台约 <strong>11 个页面</strong>：登录注册（手机号与验证码校验）、首页品类与懒加载、商品详情与活动页、购物车（货品维度、活动限购、下架/无库存/规格变更等<strong>失效态</strong>）、订单与个人信息、企业账号审核态等。后台覆盖<strong>商品与分类 CRUD、活动管理、订单履约操作、客户与管理员</strong>等模块，并标注权限与状态流转。输出页面级交互规则（如限购、订单确认弹窗），便于研发对齐字段与状态机。',
      results:
        '按期交付 <strong>Axure 交互原型</strong>与需求/交互说明，客户基于稿件<strong>自行组织研发</strong>。系统体量相对精简，聚焦标准双端电商能力；无公开经营数据可陈述。案例体现<strong>小程序 + B 端后台</strong>的信息架构、主路径与异常态设计，以及项目制场景下的范围管理与交付节奏。',
    },
  },
  {
    slug: 'demo-ad-assistant',
    title: '投放助手',
    description:
      '从波波拆出的轻量投放工具：跨平台作品/账号数据获取与导出，按条数购买权益，服务「只要导出」的用户。',
    tooltipSummary: '轻量投放工具，提供跨平台数据获取、记录与导出能力。',
    tagline:
      '把高频「获取—导出」从全量分析平台中分流，用条数权益跑通轻量投放数据闭环。',
    tags: ['波波衍生', '投放工具', '数据导出', '按量付费', '多平台'],
    iconId: 'download',
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/投放助手/index.html',
    iframeTitle: '投放助手原型预览',
    prototypesFolder: 'demo/投放助手',
    caseStudy: {
      background:
        '<a href="/work/bobo-weibo">波波微博数据分析平台</a>能力完整，但部分客户<strong>仅需作品/账号数据导出</strong>，不愿为达人分析、监测报告等全量功能付费。需在保留核心数据能力的前提下，降低使用与付费门槛，避免「大平台配小需求」带来的流失。',
      goals:
        '将「<strong>获取 → 记录 → 导出</strong>」独立产品化：支持微博、抖音、小红书、今日头条等平台的<strong>批量作品/账号数据拉取</strong>；提供导出全部/导出错误、使用记录与截图、发布凭证存档等配套能力；采用<strong>按条数购买、全平台共用权益</strong>的计费方式，使轻量用户可预期成本。',
      process:
        '从波波<strong>数据导出与监测</strong>相关能力抽离信息架构，搭建 Axure 原型（批量获取、分平台定制工具详情、获取记录、购买与权益记录等）。统一「权益无区分、全平台共用条数」规则，并在页面中标注已用/剩余条数。与研发对齐与波波<strong>账号与数据源</strong>的联动方式，优先保证主路径可评审、可排期。',
      results:
        '产品已<strong>独立上线并商业化售卖</strong>，承接「只要导出」客群，与波波主平台<strong>互补而非替代</strong>。无公开经营数据可陈述；案例体现<strong>高频能力拆线、按量付费与多平台 IA</strong> 等产品判断。站内保留 Axure 原型供作品集演示。',
    },
  },
  {
    slug: 'demo-hotsearch-engine',
    title: '热搜引擎',
    description:
      '从波波拆出的历史热搜查询产品：多平台关键词检索、热榜与监控，会员分层与数据导出。',
    tooltipSummary: '历史热搜查询工具，支持多平台检索、监控与结果导出。',
    tagline:
      '把热搜查询与导出从主平台独立成轻入口，用会员与次数规则验证增值付费。',
    tags: ['波波衍生', '热搜', '数据导出', '会员', '多平台'],
    iconId: 'flame',
    categoryId: 'prototype',
    demoPath: '/prototypes/demo/热搜引擎/index.html',
    iframeTitle: '热搜引擎原型预览',
    prototypesFolder: 'demo/热搜引擎',
    caseStudy: {
      background:
        '<a href="/work/bobo-weibo">波波</a>内已具备话题/热搜相关分析能力，但不少用户<strong>只需查历史热搜、导出结果列表</strong>，不需要达人选人、传播报告等重型模块。适合将热搜能力<strong>拆为独立轻量产品</strong>，单独入口与会员体系，降低认知与付费门槛。',
      goals:
        '交付独立 MVP：<strong>历史热搜关键词检索</strong>，支持多平台与榜单筛选（含微博、抖音及后续扩展的知乎、今日头条、百度等）；配套热榜浏览、热搜/热词监控；明确<strong>会员与非会员</strong>差异（如结果模糊、每日次数、导出需先完成搜索）；支撑数据导出与会员购买闭环。',
      process:
        '拆出首页、热搜查询、热榜聚焦、监控类页面及会员购买/购买记录/个人中心等模块。迭代多平台榜单与「全部平台」检索规则；将部分权限由禁用改为<strong>点击触发升级弹窗</strong>，优化非会员体验与转化路径。与波波侧能力保持数据与账号联动，原型中沉淀搜索、翻页、导出等交互说明。',
      results:
        '产品已<strong>独立上线</strong>，与波波<strong>并列售卖、能力联动</strong>，体量小于主平台但覆盖明确的单点需求。无公开经营数据可陈述。案例体现<strong>能力拆线、会员分层与多平台热搜 IA</strong>。站内保留 Axure 原型供作品集演示。',
    },
  },
  {
    slug: 'saas-community',
    title: '社群运营 SaaS',
    description:
      '实习期参与社群运营 SaaS：在既定需求下完成 10 个功能模块的 Axure 原型与交互说明，用于评审对齐与研发估时。',
    tooltipSummary: '社群运营 SaaS 实习项目，交付模块化原型与交互说明文档。',
    tagline:
      '早期 B 端原型实践——把模块级页面与状态流转做成可演示稿件，支撑团队讨论而非独立定义业务方案。',
    tags: ['产品实习', 'Axure 原型', '社群运营', 'B 端', '交互设计'],
    iconId: 'users',
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

export function getWorkTooltipSummary(slug: string): string | null {
  const project = getWorkProject(slug);
  if (!project) return null;
  return project.tooltipSummary?.trim() || project.description.trim() || null;
}
