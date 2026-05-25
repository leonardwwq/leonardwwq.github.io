/** 站点「关于我 / 联系」个人信息；与简历 PDF 对齐。 */

/** 简历 PDF 所在目录（对应 public/profile/） */
export const RESUME_DIR = '/profile';

/**
 * 当前简历文件名。更新简历时：
 * 1. 将新 PDF 放入 public/profile/
 * 2. 只改下面这一行文件名
 * 3. 可删除旧 PDF（可选）
 */
export const resumeFileName = '王伟权-广告投放产品经理V5-2605.pdf';

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
  role: '产品经理',
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
  tagline: '用数据丈量，用逻辑抽象，用规则决策，用心理加温，从假设到交付的循环验证。为了做出有价值、有意义、有温度的产品。',
  background: {
    positioning:
      '产品管理与数据分析复合背景的产品经理。工业设计本科打底，目前在伙伴云担任产品负责人，主导 ASO 一站式下单平台与 ASA 智能投放后台的平台化与重构。',
    trajectory:
      '职业主线从单平台 0-1（波波微博数据）到多平台中台（TopSocial 数播），再到增长侧工具矩阵（ASO / ASA）——一直在做同一条 B 端数据与投放产品线，而非零散换赛道。',
    approach:
      '习惯把复杂业务流程拆成可评审的实现路径，用指标、漏斗和 A/B 测试驱动迭代；在投放与增长场景里，把运营经验沉淀为规则化、半自动化的产品能力，并结合 LLM 做文案与决策辅助，探索人机协同而非黑盒替代。',
  } satisfies ProfileBackground,
  highlights: [
    {
      title: 'ASA 智能投放平台',
      slug: 'asa-smart-delivery',
      summary: '自建 Apple Search Ads 投放后台，集成 AI 决策建议与一键应用，缩短看数改价路径。',
      metric: {
        label: '投放过程效率',
        displayValue: '显著提升',
      },
    },
    {
      title: 'ASA 投放 Agent',
      slug: 'asa-delivery-agent',
      summary: '嵌入投放上下文的 Agent 工作台：异常预警驱动归因解读，支持多选建议与可控采纳，验证「看数—决策—执行」闭环。',
      metric: {
        label: 'Agent 交互路径',
        displayValue: '闭环验证',
      },
    },
    {
      title: 'ASO 一站式下单平台',
      slug: 'aso-self-service',
      summary: '将 ASO 业务标准化为自助下单与交付，用埋点与漏斗持续优化获客全链路。',
      metric: {
        value: 117,
        suffix: '%',
        label: '获客机会提升',
      },
    },
    {
      title: '波波微博数据分析平台',
      slug: 'bobo-weibo',
      summary: '0-1 完成商业化落地，服务 Apple、华为、OPPO 等品牌，后续拆线多个轻量工具。',
      metric: {
        value: 100,
        suffix: ' 万+',
        label: '运营期年均收入',
      },
    },
  ] satisfies ProfileHighlight[],
  skills: {
    scenarios: [
      'ASO / ASA 增长工具',
      'B 端数据平台',
      '达人营销与投放全链路',
      '流程产品化',
    ],
    methods: [
      '复杂流程拆解',
      '指标与漏斗驱动',
      'A/B 验证',
      '0-1 到商业化',
      '跨角色对齐',
    ],
    tools: ['Axure', 'SQL', 'Python', 'Google Analytics', 'Tableau / ECharts'],
  } satisfies ProfileSkills,
  education: [
    {
      school: '中央财经大学',
      degree: '应用心理学 · 硕士',
      period: '2026.09 – 2028.06',
      note: '研究方向：用户决策行为与 AI 辅助系统设计',
    },
    {
      school: '东莞理工学院',
      degree: '工业设计 · 本科',
      period: '2017.09 – 2021.07',
      note: '产品设计流程与用户体验基础，问题拆解与需求抽象',
    },
    {
      school: '台湾佛光大学',
      degree: '视觉传达设计 · 本科交换',
      period: '2019.09 – 2020.07',
      note: '设计与认知科学交叉视角',
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
