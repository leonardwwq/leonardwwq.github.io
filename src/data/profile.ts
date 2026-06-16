/** 站点「关于我 / 联系」个人信息；与简历 PDF 对齐。 */

/** 简历 PDF 所在目录（对应 public/profile/） */
export const RESUME_DIR = '/profile';

/**
 * 当前简历文件名。更新简历时：
 * 1. 将新 PDF 放入 public/profile/
 * 2. 只改下面这一行文件名
 * 3. 可删除旧 PDF（可选）
 */
export const resumeFileName = '王伟权-广告投放产品经理-V7.pdf';

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
  role: '投放系统产品经理',
  location: '北京',
  status: '在职',
  resumePath,
  contact: {
    email: 'Oldschooldevotee@Foxmail.com',
    phone: '13502508112',
  },
  social: {
    telegram: 'https://t.me/+8613502508112',
    twitter: '',
    linkedin: 'https://www.linkedin.com/in/伟权-王-780885360',
  } satisfies ProfileSocial,
  tagline:
    '5 年产品经验，聚焦广告投放与增长方向。主导 Apple Search Ads 智能投放平台（DSP + DMP + 风控一体化）全链路产品设计，覆盖广告投放管理、数据管理及财务风控三大核心模块；用数据丈量、用规则决策，把「看数—判断—执行—复盘」做成可复用的产品能力。',
  background: {
    positioning:
      '具备从 0 到 1 设计投放平台、投放数据分析工具及增长产品的落地能力。目前在伙伴云担任产品负责人，主导 Apple Search Ads 智能投放平台（DSP + DMP + 风控一体化）与 ASO 一站式下单平台，月均管理消耗约 200 万人民币 + 220 万美元。',
    trajectory:
      '职业主线从金融风控业务系统（闻博大数据）到达人投放数据分析（尚诚 / TopSocial 数播），再到 Apple Search Ads 智能投放平台（DSP + DMP + 风控一体化）与 ASO 增长工具矩阵——风控基因延续，持续围绕 B 端投放与数据分析产品线演进，而非零散换赛道。',
    approach:
      '习惯把投放全流程拆成可评审的实现路径，用指标、漏斗和 A/B 测试驱动迭代；将运营经验沉淀为规则化策略——DSP 端（关键词批量管理、出价策略、消耗监控）、DMP 端（多源数据整合、关键词分类与受众画像、规则引擎）、风控端（客户信用额度管理、垫资消耗监控、自动停投），对接 AppsFlyer / Adjust 归因数据支撑决策，探索人机协同而非黑盒替代。',
  } satisfies ProfileBackground,
  highlights: [
    {
      title: 'ASA 智能投放平台（DSP + DMP + 风控一体化）',
      slug: 'asa-smart-delivery',
      summary:
        '0-1 完成 Apple Search Ads 智能投放平台，覆盖 DSP 端（关键词批量管理、出价策略、消耗监控与归因）、DMP 端（多源数据整合、关键词分类与画像、规则引擎）及风控端（客户信用额度、垫资消耗监控、自动停投）；支撑 1000+ 广告账户与 10+ 人投放团队日常运作。',
      metric: {
        label: '月均管理消耗',
        displayValue: '200 万+ / 220 万$',
      },
    },
    {
      title: 'ASA 投放 Agent',
      slug: 'asa-delivery-agent',
      summary:
        '基于 DSP + DMP + 风控的数据与策略沉淀，完成智能投放 Agent 方案设计：自定义规则编辑引擎，覆盖数据异常判断 → 策略推荐 → 一键采纳，为平台向 AI 驱动投放演进提供储备。',
      metric: {
        label: '规则引擎路径',
        displayValue: '闭环设计',
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
      'Apple Search Ads 投放全链路（DSP 投放管理）',
      '数据管理平台（DMP：多源整合、关键词画像、规则引擎）',
      '风控与财务结算（信用额度、垫资监控、自动停投）',
      '智能投放 Agent / 规则引擎',
      '增长与获客优化',
      'B 端投放数据分析',
    ],
    methods: [
      'DSP + DMP + 风控一体化产品设计',
      '关键词策略与归因模型',
      '指标体系与漏斗分析',
      'A/B 测试',
      '0-1 到商业化',
      '跨角色协同',
    ],
    tools: ['SQL', 'Python', 'AppsFlyer / Adjust', 'Google Analytics', 'Axure'],
  } satisfies ProfileSkills,
  education: [
    {
      school: '中央财经大学',
      degree: '应用心理学 · 硕士（非全日制，在读）',
      period: '2026.09 – 2028.06',
      note: '研究方向：用户决策行为、AI 辅助系统设计及数据驱动的增长策略',
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
