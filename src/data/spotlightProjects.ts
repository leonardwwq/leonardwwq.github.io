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
    id: 'agentflow',
    title: 'Agent Flow',
    description:
      '这是我最近在做的个人项目 Agent Flow——一人用多个 AI 角色协作做项目的控制台，Dashboard 可交互演示已更新至 v0.2.0。欢迎直接打开 Demo，体验角色配置、工作流与「产出经你确认再交接」的完整路径。',
    homeDescription:
      'Agent Flow 最新 Demo 已上线：配置 AI 角色与工作流，在 Dashboard 一眼看清项目阶段与待确认交付。',
    homeEyebrow: '最近产品 Demo',
    tags: ['AI Agent', '工作流', 'Demo', '个人项目'],
    externalUrl: 'https://agentflow.weipm.com',
    ctaLabel: '查看 Demo',
    badge: 'Demo · v0.2.0',
    iconId: 'sparkles',
    showOnWork: true,
    showOnHome: true,
  },
];

export function getWorkSpotlights(): SpotlightProject[] {
  return spotlightProjects.filter((p) => p.showOnWork);
}

export function getHomeSpotlights(): SpotlightProject[] {
  return spotlightProjects.filter((p) => p.showOnHome);
}
