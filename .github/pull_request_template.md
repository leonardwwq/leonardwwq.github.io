## 变更说明

- 

## 为什么要改

- 

## 影响范围

- [ ] 首页 `src/pages/index.astro`
- [ ] 案例库 `src/pages/work/index.astro`
- [ ] 思考库 `src/pages/library/index.astro`
- [ ] 案例详情 `src/pages/work/[slug].astro`
- [ ] 关于我 `src/pages/about.astro`
- [ ] 联系我 `src/pages/contact.astro`
- [ ] 全局样式 `src/styles/global.css`
- [ ] 布局骨架 `src/layouts/BaseLayout.astro`
- [ ] 其他（请补充）

## 设计与文案规范自检

### 视觉规范（`public/spotify/DESIGN.md`）
- [ ] 背景/表面/文字/强调色使用统一 token（`#121212/#181818/#1f1f1f + #1ed760`）
- [ ] 按钮、卡片、标签、导航使用统一几何（pill/circle）与层级阴影
- [ ] 页面分区结构保持一致（`page-head`、`content-section`、`shelf-head`）
- [ ] hover/active/focus 交互状态与现有页面一致

### 文案规范（`public/spotify/COPY_GUIDE.md`）
- [ ] 页面头是否包含 `meta + title + sub`
- [ ] 分区标题是否短且可扫描（2-8 字优先）
- [ ] 按钮与链接是否使用统一动作词（查看/浏览/打开/下载/联系/返回）
- [ ] 是否避免中英文混写动作词（如 `View Details`）
- [ ] `简历（PDF）` 写法是否统一
- [ ] 图标按钮是否有可访问标签（`aria-label`）

## 验证记录

- [ ] 本地 lints 通过
- [ ] 本地构建通过（`npm run build`）
- [ ] 关键页面手动回归（桌面 + 移动）

## 截图 / 录屏（可选）

- Before:
- After:

## 风险与回滚

- 风险点：
- 回滚方式：
