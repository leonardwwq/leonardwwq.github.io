/** 外链置顶项目：案例库置顶模块与首页全宽卡片；点击直达项目站 Demo。 */

import type { WorkProjectIconId } from './workProjectIcons';

export type SpotlightProject = {
  id: string;
  title: string;
  /** 案例库置顶模块用 */
  description: string;
  /** 首页全宽卡用 */
  homeDescription: string;
  /** 首页可选 eyebrow */
  homeEyebrow?: string;
  tags: string[];
  externalUrl: string;
  ctaLabel?: string;
  badge?: string;
  iconId?: WorkProjectIconId;
  showOnWork: boolean;
  showOnHome: boolean;
};

export const spotlightProjects: SpotlightProject[] = [
  {
    id: 'asa-smart-delivery',
    title: 'ASA 智能投放平台',
    description:
      '作为产品负责人主导的完整业务系统：投放管理、数据管理和垫资风控一体化。年均管理超 3000 万美元广告预算、覆盖 1000+ 广告账户。',
    homeDescription:
      '我作为产品负责人从需求分析做到上线发布的完整业务系统：年均管理超 3000 万美元广告预算、覆盖 1000+ 广告账户、支撑 10+ 人投放团队。投放主链路、多源数据策略与客户垫资风控收口到同一平台，AI 建议可一键应用到投放动作，把「看数—判断—改价」压成一条线。',
    homeEyebrow: '代表作 · 产品负责人全流程',
    tags: ['完整业务系统', 'Apple Search Ads', '投放 + 数据 + 风控', '产品负责人'],
    externalUrl: '/work/asa-smart-delivery',
    ctaLabel: '查看完整案例',
    badge: '年均管理 3000 万美元预算',
    iconId: 'megaphone',
    // 2026-10-23 起首页置顶位暂时下线（用户决定这个板块先不弄）。
    // 需要恢复时把 showOnHome 设回 true 即可，数据都还在。
    showOnWork: false,
    showOnHome: false,
  },
];

export function getWorkSpotlights(): SpotlightProject[] {
  return spotlightProjects.filter((p) => p.showOnWork);
}

export function getHomeSpotlights(): SpotlightProject[] {
  return spotlightProjects.filter((p) => p.showOnHome);
}
