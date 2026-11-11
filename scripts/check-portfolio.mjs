import { readFile, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Run after `astro build`. This checks generated HTML, not just source templates.
// Browser interaction, visual quality, and remote services still require separate checks.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const projectSource = await readFile(join(root, 'src/data/workProjects.ts'), 'utf8');
const rawSlugs = [...projectSource.matchAll(/["']?slug["']?\s*:\s*["']([^"']+)["']/g)].map(match => match[1]);
const aliases = { 'asa-delivery-agent': 'ai-copilot-assistant' };
const slugs = rawSlugs.filter(slug => !Object.hasOwn(aliases, slug));
check(slugs.length === 16, '确认后的作品数量应为16件，ASA投放Agent不应独立计数。');
check(rawSlugs.length === new Set(rawSlugs).size, '原项目数据包含重复 slug。');

const routes = ['/', '/work', '/library', '/about', '/contact', '/news', ...slugs.map(slug => `/work/${slug}`)];
const pages = new Map();
for (const route of routes) {
  try {
    const html = await readFile(join(dist, route.slice(1), 'index.html'), 'utf8');
    pages.set(route, html);
    check(html.includes('有想进一步了解的作品，欢迎聊聊。'), `${route}: 缺少新版共享外壳。`);
    check(!/<a\b[^>]*href=["'][^"']*\/profile\//i.test(html), `${route}: 残留简历目录入口。`);
    check(!/查看简历|下载简历|打开简历|简历（PDF）/.test(html), `${route}: 残留简历文案。`);
    check(!/class=["'][^"']*\b(?:robot-assistant|engagement-float)\b/.test(html), `${route}: 残留悬浮机器人。`);
    check(html.includes('跳到正文'), `${route}: 缺少跳到正文入口。`);
    check(!/class=["'][^"']*\b(?:project-visual|visual-window|mock-assistant|mock-nav|lab-output)\b/.test(html), `${route}: 残留根据描述绘制的替代产品界面。`);
    if (route.startsWith('/work/')) {
      const headings = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)]
        .map(match => match[1].replace(/<[^>]*>/g, '').trim());
      check(JSON.stringify(headings) === JSON.stringify(['核心问题', '产品方案']), `${route}: 项目正文必须仅包含“核心问题”和“产品方案”两部分。`);
    }
  } catch (error) {
    errors.push(`${route}: 无法读取构建页面（${error.code ?? error.message}）。请先成功运行构建。`);
  }
}

let redirectsChecked = 0;
for (const [alias, canonical] of Object.entries(aliases)) {
  try {
    const html = await readFile(join(dist, 'work', alias, 'index.html'), 'utf8');
    check(/http-equiv=["']refresh["']/i.test(html) && html.includes(`/work/${canonical}`), `${alias}: 历史地址没有跳转到统一项目。`);
    redirectsChecked += 1;
  } catch {
    errors.push(`${alias}: 历史跳转页不存在。`);
  }
}

const home = pages.get('/') ?? '';
check([...home.matchAll(/class=["'][^"']*\bfeatured-work\b[^"']*["']/g)].length === 2, '首页不是恰好两件重点作品。');
check(!/用数据理解业务|数据与评估证据|商业代表作/.test(home), '首页残留旧方案的口号或分组。');
check(home.includes('class="home-page"'), '首页缺少独立样式范围。');
check(home.includes('产品负责人 · 产品方案、交互设计与落地推进'), '首页未展示 Copilot 已确认的职责。');
check(home.includes('当前为浏览器本地模拟，用于验证配置与使用流程，不代表已接入真实模型或工具。'), '首页应明确 Agent Lab 的模拟范围。');
check((home.match(/class="project-entry-context"/g) ?? []).length === 1, '首页职责仅应展示已有确认信息，不能为无职责数据的项目补造。');
for (const path of [
  '/prototypes/ai-copilot/architecture.html',
  '/prototypes/ASA投放Agent/index.html',
  'https://weipm.com/agent-workbench-demo/#/app',
  'https://weipm.com/agent-workbench-demo/#/admin',
  'https://github.com/leonardwwq/agent-workbench-demo',
]) {
  check(home.includes(path), `首页缺少真实作品入口：${path}`);
}

const index = pages.get('/work') ?? '';
check(!index.includes('project-entry-context') && !index.includes('project-entry-note'), '首页的补充信息不应改变作品索引的紧凑呈现。');
for (const slug of slugs) {
  check(index.includes(`href="/work/${slug}"`) || index.includes(`href="/work/${slug}/"`), `作品索引遗漏 ${slug}。`);
}
check(!/href=["']\/work\/asa-delivery-agent\/?["']/.test(index), '作品列表仍把ASA投放Agent当成独立项目。');
const positions = ['bobo-weibo', 'codex-subscription-lite', 'topsocial-shubo'].map(slug => index.indexOf(`href="/work/${slug}`));
check(positions.every(position => position >= 0) && positions[0] < positions[1] && positions[1] < positions[2], 'Codex Subscription必须排在波波之后、数播之前。');
const copilot = pages.get('/work/ai-copilot-assistant') ?? '';
for (const phrase of ['分析复用', '灵活使用', '完整工具', '操作与效果关联', 'Human-in-the-loop']) {
  check(copilot.includes(phrase), `Copilot缺少已确认重点：${phrase}`);
}
check(copilot.includes('/prototypes/ASA投放Agent/index.html'), 'Copilot没有保留合并后的交互原型。');
// Editorial treatment is opt-in: preserve confirmed copy and keep the other cases unchanged.
check(/class=["'][^"']*\bcase-editorial\b/.test(copilot), 'Copilot未启用案例阅读样板。');
check((copilot.match(/class=["']case-principle-index["']/g) ?? []).length === 4, 'Copilot应保留四项方案卡片。');
check(copilot.includes('执行环节通过 Human-in-the-loop 保留优化师的确认授权。'), 'Copilot授权说明被改写或遗漏。');
for (const id of ['problem', 'results']) {
  check(copilot.includes(`href="#${id}"`) && copilot.includes(`id="${id}"`), `Copilot章节锚点缺失：${id}`);
}
for (const slug of slugs.filter(slug => slug !== 'ai-copilot-assistant')) {
  check(!/class=["'][^"']*\bcase-editorial\b/.test(pages.get(`/work/${slug}`) ?? ''), `${slug}: 不应提前启用样板排版。`);
}
const lab = pages.get('/work/agent-lab') ?? '';
for (const path of ['https://weipm.com/agent-workbench-demo/#/app', 'https://weipm.com/agent-workbench-demo/#/admin']) {
  check(lab.includes(path), `Agent Lab 演示地址缺失或 hash 被改写：${path}`);
}
check(lab.includes('Everything is a plugin'), 'Agent Lab缺少已确认的DSH设计哲学说明。');
check(lab.includes('GitHub 源码') && lab.includes('本地模拟'), 'Agent Lab 没有区分源码与本地模拟。');
const contact = pages.get('/contact') ?? '';
check(contact.includes('href="mailto:') && contact.includes('href="tel:'), '联系页缺少邮箱或电话入口。');
const about = pages.get('/about') ?? '';
check(about.includes('已离职') && !/目前在伙伴云担任产品负责人|在职 · 到岗时间/.test(about), '关于页没有正确反映已离职状态。');
check(!/职业高光|能力呈现/.test(about), '关于页残留旧能力展示模块。');
for (const hook of ['data-library-entry-toggle', 'data-library-more']) {
  check((pages.get('/library') ?? '').includes(hook), `思考页缺少交互 hook：${hook}`);
}
for (const hook of ['data-news-root', 'data-news-filters', 'data-news-list']) {
  check((pages.get('/news') ?? '').includes(hook), `资讯页缺少交互 hook：${hook}`);
}

// Check internal anchor destinations, including preserved local prototypes.
const localDestinations = new Map();
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    try {
      const url = new URL(href, 'https://portfolio.invalid');
      const pathname = decodeURIComponent(url.pathname);
      const destination = resolve(dist, `.${pathname}`);
      const outside = relative(dist, destination).startsWith('..');
      check(!outside, `${route}: 站内链接越出构建目录：${href}`);
      if (outside) continue;
      if (!localDestinations.has(destination)) localDestinations.set(destination, { route, href });
    } catch {
      errors.push(`${route}: 站内链接格式无效：${href}`);
    }
  }
}
for (const [destination, { route, href }] of localDestinations) {
  try {
    const entry = await stat(destination);
    const page = entry.isDirectory() ? await stat(join(destination, 'index.html')) : entry;
    check(page.isFile(), `${route}: 站内入口不是文件：${href}`);
  } catch {
    errors.push(`${route}: 站内入口没有对应产物：${href}`);
  }
}

if (errors.length) {
  console.error(`作品集产物检查未通过（${errors.length} 项）：\n${errors.map(message => `- ${message}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`作品集产物检查通过：${pages.size} 个内容页面、${redirectsChecked} 个历史跳转、${slugs.length} 件作品、${localDestinations.size} 个站内入口。`);
  console.log('此结果不代表浏览器交互、视觉效果或远端服务已验收。');
}
