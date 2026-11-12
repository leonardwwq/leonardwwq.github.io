import { workProjects, type WorkProject } from './workProjects';

/** 以下文案已逐项确认：列表写“是什么”，详情仅保留核心问题与产品方案。 */
export type CaseSection = {
  title: '核心问题' | '产品方案';
  paragraphs: string[];
  points?: { title: string; text: string }[];
  closing?: string;
};
export type ProjectPresentation = {
  title: string;
  summary: string;
  status: string;
  role?: string;
  demoLabel?: string;
  note?: string;
  sections: CaseSection[];
};

/** 用户确认：ASA 投放 Agent 是 AI Copilot 的原型，不是另一件作品。 */
export const projectAliases: Record<string, string> = {
  'asa-delivery-agent': 'ai-copilot-assistant',
};
export const featuredSlugs = ['ai-copilot-assistant', 'agent-lab'];
export const homeOtherSlugs = ['dsh-cultivation', 'dsh-tavern', 'asa-smart-delivery', 'prd-builder'];
const readingOrder = [
  ...featuredSlugs, ...homeOtherSlugs,
  'bobo-weibo', 'codex-subscription-lite', 'topsocial-shubo', 'aso-self-service',
  'demo-ai-chat', 'demo-ad-assistant', 'demo-hotsearch-engine',
  'finance-system', 'demo-miniprogram-mall', 'saas-community',
];
export const orderedProjects = workProjects
  .filter(project => !projectAliases[project.slug])
  .sort((a, b) => readingOrder.indexOf(a.slug) - readingOrder.indexOf(b.slug));

function details(
  problem: string | string[],
  points: [string, string][],
  options: { introduction?: string; closing?: string } = {},
): CaseSection[] {
  return [
    { title: '核心问题', paragraphs: typeof problem === 'string' ? [problem] : problem },
    {
      title: '产品方案',
      paragraphs: options.introduction ? [options.introduction] : [],
      points: points.map(([title, text]) => ({ title, text })),
      closing: options.closing,
    },
  ];
}

const presentation: Record<string, ProjectPresentation> = {
  'ai-copilot-assistant': {
    title: 'AI Copilot',
    summary: '基于 Human-in-the-loop 授权机制，内置投放平台、代办投放全流程操作的 AI 助手。',
    status: '内部上线',
    role: '产品负责人 · 产品方案、交互设计与落地推进',
    demoLabel: '打开 Copilot 原型（ASA 内）',
    note: '与 ASA 智能投放平台共用一套原型。进入导航栏页面后，点击顶部「召唤小伙」打开助手；原型展示前端交互，工具调用与人机协作机制可结合架构图查看。',
    sections: details(
      '传统投放依赖优化师反复试错，得到结果前难以判断策略优劣。人工看数的范围、深度和频率有限，调价响应也受精力限制；试错积累又依赖个人，难以持续复用。',
      [
        ['分析复用', '将分析方法与试错经验沉淀为可复用能力，用于后续任务。'],
        ['灵活使用', '按任务调用分析与操作能力，支持定时监测、按需优化。'],
        ['完整工具', '提供覆盖投放全流程的操作工具，让 AI 能直接完成任务。'],
        ['操作与效果关联', '记录每次操作及其后续效果，为复盘和下一轮优化提供依据。'],
      ],
      { closing: '执行环节通过 Human-in-the-loop 保留优化师的确认授权。' },
    ),
  },
  'agent-lab': {
    title: 'Agent Lab',
    summary: '以配置驱动 AI 工具搭建与使用的 Agent 工作台原型。',
    status: '浏览器本地模拟',
    note: '当前为浏览器本地模拟，用于验证配置与使用流程，不代表已接入真实模型或工具。',
    sections: details(
      '不同 AI 能力接入产品时，往往需要重复开发入口、输入表单和结果页面，扩展成本高；能力之间的输入输出也相互割裂，用户需要反复搬运结果。',
      [
        ['能力抽象', '统一定义 Agent、功能、输入要求和结果模板，减少逐项定制。'],
        ['配置驱动', '在配置端新增或调整能力，使用端据此生成入口、表单与结果展示。'],
        ['结果复用', '支持引用已有任务结果，让不同能力之间的任务能够衔接。'],
        ['运行追踪', '记录请求、结果、执行轨迹与额度变化，便于检查运行过程和消耗。'],
      ],
      { introduction: '参考 DSH「Everything is a plugin」的设计哲学，将具体能力与工作台分离，通过统一配置接入，避免每新增一项能力就重新开发一套页面。' },
    ),
  },
  'dsh-cultivation': {
    title: 'DSH Cultivation',
    summary: '基于共同经历与关系演化、用于长期互动的 AI 角色养成插件。',
    status: '开源插件',
    sections: details(
      '仅靠静态角色设定和历史对话，难以持续表达共同经历如何改变角色的看法、关系与行为。记住发生过什么，不等于这些经历会影响下一次互动。',
      [
        ['事实与判断分离', '分别记录共同经历与角色的主观看法，让判断能够被后续经历修正。'],
        ['经历驱动变化', '将互动积累为关系、心情与成长状态，持续影响后续回复。'],
        ['状态变化可控', '通过代码校验状态更新，并保留用户对角色和记忆的管理权。'],
        ['养成能力独立', '以插件提供人物发展能力，既可独立用于对话，也可为 <a href="/work/dsh-tavern">Tavern</a> 等应用提供支持。'],
      ],
    ),
  },
  'dsh-tavern': {
    title: 'DSH Tavern',
    summary: '以剧本为骨架、让 AI 角色带着自身立场与想法参与剧情的 D&D 式文字冒险原型。',
    status: '可运行原型',
    sections: details(
      [
        '<strong>固定脚本的限制：</strong>需要预写大量剧情分支，人物反应仍受既定规则限制，难以根据情境灵活表现自己的立场与性格。',
        '<strong>纯 AI 演绎的限制：</strong>自由度高，但剧情容易发散，长会话中事件逐渐失去联系，故事连贯性与演绎质量不稳定。',
      ],
      [
        ['剧本约束下的自由演绎', '保留剧本的结构与故事主线，让 AI 在情境和角色边界内灵活发挥，兼顾连贯性与探索空间。'],
        ['人物立场驱动反应', '分别维护人物的经历、判断和关系，让角色根据自身处境回应，而不是照固定分支表演。'],
        ['玩家选择持续影响故事', '将行动与关系变化带入后续剧情，让自由互动积累为有前后联系的故事，增加选择的意义与可玩性。'],
      ],
    ),
  },
  'asa-smart-delivery': {
    title: 'ASA 智能投放平台',
    summary: '面向 Apple Search Ads 代理业务，将广告投放、数据管理与垫资风控整合在一起的业务平台。',
    status: '业务平台',
    role: '产品负责人 · 需求、原型与上线推进',
    demoLabel: '打开平台原型',
    sections: details(
      '代理投放既要管理广告效果，也要承担为客户垫付广告款的资金风险。广告、归因与业务数据口径不一，影响策略判断；客户按月结算、广告持续消耗，又要求资金风险能及时约束投放，而不只是事后对账。',
      [
        ['以投放流程组织业务', '围绕账户、广告系列和关键词统一日常操作，将分散的管理工作集中到同一平台。'],
        ['用统一数据支撑策略', '整合广告、归因与业务转化数据，统一指标口径，通过关键词分类与策略规则复用投放判断。'],
        ['让资金约束进入投放流程', '将客户信用额度与实际消耗关联，配合预警、超限停投及对账结算，在持续投放过程中控制垫资风险。'],
        ['财务规则与核算', '覆盖费用、账单、返点、渠道对账、收付款、利润与提成，明确计算口径、历史规则及跨模块状态衔接。使用 <a href="/work/prd-builder">PRD Builder Skill</a> 完成了配套需求材料，见 <a href="/work/prd-builder/asa-finance/">财务系统 PRD 实际产出</a>。'],
        ['为 AI Copilot 提供基础', '统一业务数据与指标口径，提供可调用的投放工具，为 <a href="/work/ai-copilot-assistant">AI Copilot</a> 的分析和执行操作提供基础。Copilot 已包含在同一套平台原型中。'],
      ],
    ),
  },
  'prd-builder': {
    title: 'PRD Builder',
    summary: '按需求复杂度组织分析流程、用于指导 AI 编写产品需求文档的 Skill。',
    status: '开源工具',
    demoLabel: '查看实际产出 · ASA 财务 PRD',
    note: 'ASA 财务系统材料是使用本 Skill 完成、可用于需求评审与研发对齐的实际业务产出，不是虚构示例；另保留反馈需求示例展示交付形式。',
    sections: details(
      '用同一套流程处理所有需求，小改动容易分析过度、交付冗余；复杂项目又容易遗漏状态、权限和异常。文档看似完整，却未必足以指导实际开发，还会消耗不必要的时间与上下文。',
      [
        ['按复杂度选择流程', '根据业务状态、风险与依赖关系，选择轻量、标准或项目模式，而不是按需求文字长短判断。'],
        ['按需分析与交付', '只加载当前任务需要的材料，按实际需要产出规格、原型和评审文件，避免小需求走完整套重流程。'],
        ['保持交付一致', '以 PRD 为统一依据，让文档、规格和原型描述同一套需求。'],
        ['检查能否落地', '明确状态变化、权限、异常处理与验收要求，减少表面完整、实际无法执行的说明。'],
        ['用于真实业务', '使用该 Skill 完成 <a href="/work/prd-builder/asa-finance/">ASA 财务系统 13 个模块的需求材料</a>，将结算、金额精度、历史规则、权限及跨模块依赖落实到 PRD、规格与评审文件中。'],
      ],
    ),
  },
  'bobo-weibo': {
    title: '波波微博数据分析平台',
    summary: '基于微博达人与传播数据、用于品牌选人与投放复盘的数据分析平台。',
    status: '曾商业化运营',
    sections: details(
      '品牌投放需要判断选谁、内容传播得怎样、合作是否有效，但相关数据分散、比较口径不一，选人和效果评估依赖人工整理，投前判断也难与投后表现对应。',
      [
        ['让达人可比较', '汇集账号与内容数据，将多维指标组织成统一的达人画像与影响力评估，支持筛选和对比。'],
        ['贯穿投放评估', '关联投前选人、投中内容与话题监测、投后传播分析，让投放判断与实际表现能够前后对照。'],
        ['将数据服务产品化', '把查询、监测、报告与导出组织为可订购的服务，通过会员与订单承接商业化。'],
      ],
    ),
  },
  'codex-subscription-lite': {
    title: 'Codex Subscription 轻量版',
    summary: '基于上游精简、用于在 DSH 中接入 Codex 订阅模型的非官方插件分支。',
    status: '非官方 fork',
    sections: details(
      '上游插件同时承担订阅接入和多项扩展能力，部分功能与宿主重复，增加了配置、兼容与维护成本。',
      [
        ['收敛插件职责', '基于 WSL043 上游项目，保留订阅模型接入、登录与账号管理等必要能力。'],
        ['复用宿主能力', '移除搜索、生图等重复功能，避免插件与宿主各自维护一套相同能力，保留必要的手机远控相关设置。'],
      ],
    ),
  },
  'topsocial-shubo': {
    title: 'TopSocial 数据分析平台（数播）',
    summary: '以多平台达人数据为基础、贯通品牌下单与投放交付的营销服务平台。',
    status: '业务平台',
    sections: details(
      '跨平台投放需要拼接不同平台的达人数据，下单、排期和效果验收又依赖人工沟通。已有的数据与服务能力相互分散，难以形成标准化、可规模交付的业务。',
      [
        ['统一跨平台资源', '整合微博、抖音、小红书等平台的达人数据与工具，让客户在同一平台查找和评估投放资源。'],
        ['将服务流程产品化', '把下单、排期、交付和效果验收组织为线上流程，减少客户与运营之间的反复沟通。'],
        ['将效果报告标准化', '统一投放数据与报告结构，减少人工整理，让不同项目能够复用同一套交付方式。'],
      ],
    ),
  },
  'aso-self-service': {
    title: 'ASO 一站式下单平台',
    summary: '面向小微客户、将 ASO 服务标准化为线上购买与交付流程的自助下单平台。',
    status: '业务平台',
    sections: details(
      'ASO 服务依赖人工商务对接，小微客户也需要反复沟通才能下单，承接与交付成本高；获客主要依赖主动销售，难以低成本扩大客户覆盖。',
      [
        ['将服务标准化', '明确服务内容、下单要求与交付规则，减少每笔订单重复沟通。'],
        ['打通自助下单与履约', '前台承接服务选购与下单，后台统一管理订单、交付和财务，将人工对接转为线上流程。'],
        ['用行为数据改善转化', '记录获客到下单的关键行为，通过漏斗与流失路径识别问题，持续优化获客渠道和下单流程。'],
      ],
    ),
  },
  'demo-ai-chat': {
    title: 'AI 投放文案生成助手',
    summary: '基于达人画像与品牌要求、用于生成微博投放文案的 AI 写作工具。',
    status: '曾商业化上线',
    sections: details(
      '选定达人后，品牌仍需重新整理达人风格、传达品牌要求并反复改稿。数据选人与内容创作相互割裂，生成的文案也容易只有品牌表达，缺少达人自身的特点。',
      [
        ['将达人数据带入创作', '复用波波平台的达人画像与内容特点，让写稿建立在已有选人信息上。'],
        ['同时约束达人与品牌表达', '结合达人风格、品牌调性和文案要求生成初稿，减少泛化、同质化的内容。'],
        ['保留人工定稿', '提供多版初稿供比较和修改，由使用者确认最终表达，再用于投放。'],
      ],
    ),
  },
  'demo-ad-assistant': {
    title: '投放助手',
    summary: '按数据条数付费、用于批量获取和导出多平台投放数据的轻量工具。',
    status: '曾商业化上线',
    sections: details(
      '部分用户只需要获取、导出作品或账号数据，不需要完整的达人分析与监测平台。购买整套服务，使用范围和付费成本与实际需求不匹配。',
      [
        ['将单点需求独立成产品', '从波波拆出数据获取与导出能力，独立售卖，不要求用户购买完整平台。'],
        ['统一多平台数据获取', '支持批量获取不同平台的作品与账号数据，集中查看和导出结果。'],
        ['按实际用量付费', '以数据条数计费，不同平台共用额度，让购买量与实际需求对应。'],
      ],
    ),
  },
  'demo-hotsearch-engine': {
    title: '热搜引擎',
    summary: '基于历史热搜数据、用于跨平台热点查询与追踪的检索工具。',
    status: '曾商业化上线',
    sections: details(
      '热榜不断更新，用户难以回查特定关键词过去的上榜记录；而只为查询和导出历史热搜购买完整分析平台，成本与需求不匹配。',
      [
        ['将历史热搜独立成服务', '从波波拆出热搜查询能力，按关键词、平台与榜单检索历史记录。'],
        ['结合回查与持续关注', '将历史查询、当前热榜与关键词监测放在同一产品中，兼顾复盘和后续追踪。'],
        ['按使用需求设计权益', '围绕查询次数、结果可见范围与数据导出设置会员分层，不绑定完整的数据分析平台。'],
      ],
    ),
  },
  'finance-system': {
    title: '分期信贷平台',
    summary: '围绕授信与额度管理、连接用户借款申请和运营审核的分期信贷平台。',
    status: '业务系统',
    role: '产品专员 · 负责分工模块',
    note: '本人参与申请、授信及运营审核等分工模块，不表述为独立主导整个平台。',
    sections: details(
      '借款申请、授信和审核涉及不同角色，申请资料、额度结果与审批状态必须保持一致。规则与状态不清，容易导致用户申请和后台处理脱节。',
      [
        ['统一申请与审核流程', '明确提交、补件、通过和拒绝等状态，让用户进度与后台处理对应。'],
        ['将授信规则落实到额度管理', '明确额度展示、调整与异常处理规则，保持用户侧结果与后台判断一致。'],
        ['按角色划分操作边界', '区分申请人、审核人员等角色的可见信息与操作权限，敏感操作保留确认与记录。'],
      ],
    ),
  },
  'demo-miniprogram-mall': {
    title: '小程序商城系统',
    summary: '面向企业采购、覆盖选购下单与后台履约的微信小程序商城方案。',
    status: '项目制原型交付',
    note: '交付范围为原型与交互说明，由客户自行组织研发。',
    sections: details(
      '客户需要将分散的采购下单方式统一为线上流程，同时处理企业账号审核、商品可售规则与订单履约，前台购买和后台处理不能相互脱节。',
      [
        ['贯通采购与履约', '前台完成商品选购和下单，后台围绕同一订单组织处理、配送与完成。'],
        ['纳入企业准入要求', '通过企业资料与账号审核，明确哪些客户可以进入采购流程。'],
        ['明确交易边界', '统一商品下架、库存不足、规格变化及活动限购等规则，避免无效商品继续进入交易。'],
      ],
    ),
  },
  'saas-community': {
    title: '社群运营 SaaS',
    summary: '将成员管理、用户触达与活动运营集中组织的社群运营 SaaS 原型。',
    status: '实习期原型',
    note: '实习期参与，按既定需求完成分工模块的原型与交互说明。',
    sections: details(
      '社群运营依赖群工具、表格和临时沟通，成员信息、触达任务与活动进度分散，难以统一管理和协同处理。',
      [
        ['统一运营信息', '围绕成员、触达、活动与数据组织工作台，减少不同工具之间的信息割裂。'],
        ['明确协作流程', '通过角色权限、任务状态与处理反馈，明确不同运营人员可以做什么、任务推进到哪里。'],
      ],
    ),
  },
};

export function describeProject(project: WorkProject): ProjectPresentation {
  const slug = projectAliases[project.slug] ?? project.slug;
  const info = presentation[slug];
  if (!info) throw new Error(`缺少已确认项目文案：${slug}`);
  return info;
}

export const featuredProjects = featuredSlugs
  .map(slug => orderedProjects.find(project => project.slug === slug))
  .filter((project): project is WorkProject => Boolean(project));

export function projectLinks(project: WorkProject) {
  const info = describeProject(project);
  const links: { label: string; path: string }[] = [];
  if (project.demoPath) links.push({ label: info.demoLabel ?? '打开交互原型', path: project.demoPath });
  if (project.demoExternalUrl) links.push({
    label: /github\.com\//i.test(project.demoExternalUrl) ? 'GitHub 源码' : '打开外部原型',
    path: project.demoExternalUrl,
  });
  links.push(...(project.demoLinks ?? []));
  const seen = new Set<string>();
  return links.filter(link => {
    if (seen.has(link.path)) return false;
    seen.add(link.path);
    return true;
  });
}
