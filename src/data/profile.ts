/** 站点「关于我 / 联系」个人信息。 */

/** 简历 PDF 所在目录（对应 public/profile/） */
export const RESUME_DIR = '/profile';

/**
 * 当前简历文件名。更新简历时：
 * 1. 将新 PDF 放入 public/profile/
 * 2. 只改下面这一行文件名
 * 3. 可删除旧 PDF（可选）
 */
export const resumeFileName = '王伟权-13502508112.pdf';

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
  role: 'AI 产品经理',
  location: '北京',
  status: '已离职',
  resumePath,
  contact: {
    email: 'leonardwangweiquan@gmail.com',
    phone: '13502508112',
  },
  social: {
    telegram: '',
    twitter: '',
    linkedin: 'https://www.linkedin.com/in/伟权-王-780885360',
  } satisfies ProfileSocial,
  tagline:
    '过去主要做数据与业务平台，最近在做 AI 助手，以及持续互动的 AI 角色。',
  background: {
    positioning:
      '我曾在伙伴云担任产品负责人，负责过 ASA 智能投放平台、ASO 下单平台，以及供内部投放团队使用的 AI Copilot。此前在闻博大数据和尚诚同力工作，做过金融业务系统和达人投放数据分析产品。',
    trajectory:
      '我也开发了一些 AI 相关的开源项目，探索角色如何保留共同经历，以及互动如何持续下去。目前在中央财经大学攻读应用心理学硕士，关注人机协同决策，以及人们如何理解和使用 AI 的建议。',
    approach:
      '我会从具体使用场景出发，通过原型、可运行的作品和实际反馈，逐步检查设计是否解决了问题。',
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
      title: 'DSH 角色养成插件（dsh-cultivation）',
      slug: 'dsh-cultivation',
      summary:
        '独立开发并发布的开源 DSH 插件：会话级角色绑定、好感度五阶段成长、分区记忆 + 追加日志自动归档；零依赖纯 JavaScript，角色段仅注入根会话、不浪费 token。',
      metric: {
        label: '开源发布',
        displayValue: 'npm v0.3.0-beta.1',
      },
    },
    {
      title: 'ASA 智能投放平台（投放管理+数据管理+风控一体化）',
      slug: 'asa-smart-delivery',
      summary:
        '0-1 完成 Apple Search Ads 智能投放平台，覆盖 投放端（关键词批量管理、出价策略、消耗监控与归因）、数据端（多源数据整合、关键词分类与画像、规则引擎）及风控端（客户信用额度、垫资消耗监控、自动停投）；支撑 1000+ 广告账户与 10+ 人投放团队日常运作。',
      metric: {
        label: '年均管理广告预算',
        displayValue: '3000 万美元+',
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
    tools: ['Python', 'SQL', 'DeepSeek API', 'MCP', 'JavaScript', 'Axure', 'AppsFlyer / Adjust'],
  } satisfies ProfileSkills,
  education: [
    {
      school: '中央财经大学',
      degree: '应用心理学 · 硕士（非全日制）',
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
