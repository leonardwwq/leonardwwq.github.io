# Contributing Guide

## 目标

本项目默认遵循 Spotify 风格的视觉与文案规范。  
提交任何页面、布局、组件改动前，请先对齐以下规范：

- 视觉规范：`public/spotify/DESIGN.md`
- 文案规范：`public/spotify/COPY_GUIDE.md`
- PR 自检模板：`.github/pull_request_template.md`

---

## 开发流程

1. **先看规范**
   - 修改 UI 前先阅读 `DESIGN.md`
   - 修改按钮/标题/提示语前先阅读 `COPY_GUIDE.md`

2. **再做改动**
   - 优先复用现有样式结构与类名（如 `page-head`、`content-section`、`shelf-head`）
   - 避免新增无必要的内联样式，尽量在 `src/styles/global.css` 维护统一规则

3. **本地验证**
   - 运行：`npm run build`
   - 如涉及交互，至少手动检查桌面与移动两种视图

4. **提交 PR**
   - 使用仓库 PR 模板
   - 勾选视觉规范与文案规范自检项
   - 补充必要截图（Before / After）

---

## 关键约定（摘要）

### 视觉
- 深色层级统一：`#121212 / #181818 / #1f1f1f`
- 强调色统一：`#1ed760`
- 组件几何统一：pill / circle 优先
- 分区结构统一：`page-head`、`content-section`、`shelf-head`

### 文案
- 动作词统一：`查看 / 浏览 / 打开 / 下载 / 联系 / 返回`
- 避免中英文混写动作词（例如 `View Details`）
- 简历写法统一：`简历（PDF）`

---

## 常见改动建议

- **新增页面**：先搭 `page-head`，再按 `content-section` 分区
- **新增按钮**：优先使用现有按钮文案模式（动词 + 对象）
- **新增卡片/列表**：优先复用 `card`、`panel`、`shelf` 相关结构

---

## 简历更新最小流程（低维护）

当你只更新简历，不希望牵动全站改版时，只检查以下 5 项：

1. **文件名是否对齐**
   - `src/data/profile.ts` 中的 `resumeFileName` 与 `public/profile/` 实际文件名一致。

2. **首页职位与方向是否过期**
   - `src/pages/index.astro` 的首屏定位仍与当前求职方向一致。

3. **首页关键数字是否一致**
   - 仅核对 2-3 个核心结果指标（如转化提升、效率提升、收入量级）是否与最新简历一致。

4. **关于我状态是否一致**
   - `src/data/profile.ts` 中 `role / location / status` 是否仍为最新状态。

5. **联系方式是否有效**
   - `src/data/profile.ts` 中邮箱、手机号、社交链接是否可用。

> 原则：网站保持稳定叙事，简历按投递场景更新。  
> 每次简历更新只做“关键事实同步”，避免结构性大改。

---

## 不建议的做法

- 跳过规范直接改视觉细节
- 单页局部“特立独行”的配色或交互态
- 大量内联样式导致后续难以维护
