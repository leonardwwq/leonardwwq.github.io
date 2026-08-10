/** 站点「关于我 / 联系」个人信息；与简历 V11 对齐。 */

/** 简历 PDF 所在目录（对应 public/profile/） */
export const RESUME_DIR = '/profile';

/**
 * 当前简历文件名。更新简历时：
 * 1. 将新 PDF 放入 public/profile/
 * 2. 只改下面这一行文件名
 * 3. 可删除旧 PDF（可选）
 */
export const resumeFileName = '王伟权-AI-Agent产品经理-简历V11.pdf';

export const resumePath = `${RESUME_DIR}/${resumeFileName}`;

export type ProfileEducation = {
  school: string;
  degree: string;
  period: string;
  note?: string;
};

export type ProfileSocial = {
  telegram: string;
  twitter: string;
  linkedin: string;
};

export type ProfileBackground = {
  /** 我是谁 + 当前在做什么 */
  positioning: string;
  /** 职业主线 */
  trajectory: string;
  /** 工作方式 */
  approach: string;
};

export type ProfileHighlightMetric = {
  /** 用于 count-up 的目标数值；非纯数字指标可省略，直接展示 displayValue */
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  displayValue?: string;
};

export type ProfileHighlight = {
  title: string;
  slug: string;
  summary: string;
  metric: ProfileHighlightMetric;
};

export type ProfileSkills = {
  scenarios: string[];
  methods: string[];
  tools: string[];
};

export const profile = {
  name: '王伟权',
  role: 'AI Agent产品经理',
  location: '北京',
  status: '在职',
  resumePath,
  contact: {
    email: 'leonardwangweiquan@gmail.com',
    phone: '13502508112',
  },
  social: {
    telegram: 'https://t.me/+861****8112',
    twitter: '',
    linkedin: 'https://www.linkedin.com/in/伟权-王-780885360',
  } satisfies ProfileSocial,
  tagline:
    'AI Agent 产品经理，同时具备 Agent 工程实现能力与心理学研究背景。主导 AI Copilot 智能助手从 0 到 1 落地（MCP 协议 + 上下文感知），产品已上线供内部投放团队使用；能用 Python 手写完整 Agent 循环，也在开展人机协同决策研究——用可解释的 AI 辅助决策，提升真实场景的人机协作效率。',
  background: {
    positioning:
      'AI Agent 产品经理，同时具备 Agent 工程实现能力与心理学研究背景。目前在伙伴云担任产品负责人，主导 AI Copilot 智能助手（基于 MCP 协议的上下文感知 AI Agent）从 0 到 1 的架构设计与落地，产品已上线供内部投放团队使用，选词效率提升 75%+、运营操作量降低 87%+；此前主导 ASA 智能投放平台（投放管理+数据管理+风控一体化）与 ASO 一站式下单平台。',
    trajectory:
      '职业主线从金融业务系统（闻博大数据）到达人投放数据分析（尚诚同力 · 波波），再到 AI Agent 产品与人机协同方向（伙伴云 · AI Copilot + ASA + ASO）——产品能力持续沉淀，2025 年起聚焦 AI Agent 产品化，并同步攻读应用心理学硕士（人机协同决策方向），用研究与工程双线支撑 AI 辅助决策产品设计。',
    approach:
      '习惯把复杂业务拆成可评审的实现路径：Agent 侧基于 MCP 协议标准化工具编排，以「AI 建议→人工确认→自动执行」的人机协作闭环保留人的最终决策权；数据侧用指标、漏斗与 A/B 测试驱动迭代；研究侧用心理学实验与 Bootstrap 中介分析验证「AI 如何影响人的决策」，再回到产品设计。',
  } satisfies ProfileBackground,
  highlights: [
    {
      title: 'AI Copilot 智能助手',
      slug: 'ai-copilot-assistant',
      summary:
        '基于 MCP 协议的上下文感知 AI Agent 产品，主导从架构设计到方案落地的全链路产品设计，实现「AI建议→人工确认→自动执行」的人机协作闭环；产品已上线供内部投放团队使用。',
      metric: {
        value: 75,
        suffix: '%+',
        label: '关键词选词效率提升',
      },
    },
    {
      title: 'ASA 智能投放平台（投放管理+数据管理+风控一体化）',
      slug: 'asa-smart-delivery',
      summary:
        '0-1 完成 Apple Search Ads 智能投放平台，覆盖 投放端（关键词批量管理、出价策略、消耗监控与归因）、数据端（多源数据整合、关键词分类与画像、规则引擎）及风控端（客户信用额度、垫资消耗监控、自动停投）；支撑 1000+ 广告账户与 10+ 人投放团队日常运作。',
      metric: {
        label: '年均管理广告预算',
        displayValue: '5000 万美元+',
      },
    },
    {
      title: 'ASA 投放 Agent',
      slug: 'asa-delivery-agent',
      summary:
        '基于 投放管理+数据管理+风控的数据与策略沉淀，完成智能投放 Agent 方案设计：自定义规则编辑引擎，覆盖数据异常判断 → 策略推荐 → 一键采纳，为平台向 AI 驱动投放演进提供储备。',
      metric: {
        label: '规则引擎路径',
        displayValue: '闭环设计',
      },
    },
    {
      title: '人机协同决策实验平台（导师课题）',
      slug: 'human-ai-experiment-platform',
      summary:
        '在导师指导下推进的心理学实验 Agent 平台——三层架构（design 实验参数结构化配置 → sim/run 多智能体模拟 → analyze Bootstrap 中介分析+可视化），以纯 Python + JSON Schema 构建，不依赖现成实验框架；支撑「焦虑→认知偏差→献血意愿」中介机制研究。',
      metric: {
        label: '项目阶段',
        displayValue: '概念设计',
      },
    },
    {
      title: 'ASO 一站式下单平台',
      slug: 'aso-self-service',
      summary: '主导 ASO 业务平台化转型，将人工商务对接流程标准化为自助下单与交付，用埋点与漏斗持续优化获客全链路。',
      metric: {
        value: 33,
        suffix: '%',
        label: '获客成本下降',
      },
    },
    {
      title: '波波微博数据分析平台',
      slug: 'bobo-weibo',
      summary: '0-1 完成达人投放数据分析平台商业化落地，服务 Apple、华为、OPPO 等头部品牌及高校科研团队。',
      metric: {
        value: 100,
        suffix: ' 万+',
        label: '年收入',
      },
    },
  ] satisfies ProfileHighlight[],
  skills: {
    scenarios: [
      'AI Agent 产品设计（MCP 协议、工具编排、上下文感知）',
      '人机协作闭环设计（AI 建议→人工确认→自动执行）',
      '投放管理+数据管理+风控一体化平台',
      '心理学实验设计与数据全流程分析',
      '数据产品商业化',
      '增长与获客优化',
    ],
    methods: [
      'Agent 架构设计（LLM 推理 + 工具调用 + 多轮对话）',
      '手写 Agent 循环（Python + Tool Calling，不依赖框架）',
      '提示词工程与行为边界定义',
      'Bootstrap 中介分析',
      '指标体系与漏斗分析',
      'A/B 测试与 0-1 商业化',
    ],
    tools: ['Python', 'SQL', 'DeepSeek API', 'MCP', 'Axure', 'AppsFlyer / Adjust'],
  } satisfies ProfileSkills,
  education: [
    {
      school: '中央财经大学',
      degree: '应用心理学 · 硕士（非全日制，周末上课，不影响全职工作）',
      period: '2026.09 – 2028.06',
      note: '研究方向：人机协同决策、AI 辅助系统中的信任与决策行为；导师为人机协同决策方向，自 2026 年 5 月起提前进入课题组参与研究',
    },
    {
      school: '东莞理工学院',
      degree: '工业设计 · 本科',
      period: '2017.09 – 2021.07',
      note: '产品设计流程与用户体验原则，问题拆解与需求抽象',
    },
    {
      school: '台湾佛光大学',
      degree: '视觉传达设计 · 本科交换',
      period: '2019.09 – 2020.07',
      note: '拓展交互设计与美学理解视野',
    },
  ] satisfies ProfileEducation[],
};

export type SocialLinkKey = keyof ProfileSocial;

export const socialLabels: Record<SocialLinkKey, string> = {
  telegram: 'Telegram',
  twitter: 'X（推特）',
  linkedin: 'LinkedIn',
};

export function getActiveSocialLinks(): { key: SocialLinkKey; label: string; href: string }[] {
  return (Object.keys(profile.social) as SocialLinkKey[])
    .filter((key) => profile.social[key].trim() !== '')
    .map((key) => ({
      key,
      label: socialLabels[key],
      href: profile.social[key],
    }));
}
