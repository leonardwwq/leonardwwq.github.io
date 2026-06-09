/** AI 资讯：加载 JSON、按日分组、分类筛选 */

type NewsItem = {
  date: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  url: string;
};

type NewsData = {
  updated_at: string;
  items: NewsItem[];
};

const ALL_FILTER = '__all__';
const NEWS_URL = '/news/ai-news.json';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDateHeading(iso: string): string {
  const [y, m, d] = iso.split('-').map((part) => Number(part));
  if (!y || !m || !d) return iso;
  return `${y} 年 ${m} 月 ${d} 日`;
}

function isValidNewsData(data: unknown): data is NewsData {
  if (!data || typeof data !== 'object') return false;
  const record = data as Record<string, unknown>;
  if (typeof record.updated_at !== 'string' || !Array.isArray(record.items)) return false;
  return record.items.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const row = item as Record<string, unknown>;
    return (
      typeof row.date === 'string' &&
      typeof row.category === 'string' &&
      typeof row.title === 'string' &&
      typeof row.summary === 'string' &&
      typeof row.source === 'string' &&
      typeof row.url === 'string'
    );
  });
}

function sortItems(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

function groupByDate(items: NewsItem[]): [string, NewsItem[]][] {
  const groups = new Map<string, NewsItem[]>();
  for (const item of items) {
    const list = groups.get(item.date) ?? [];
    list.push(item);
    groups.set(item.date, list);
  }
  return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
}

function getCategories(items: NewsItem[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      categories.push(item.category);
    }
  }
  return categories;
}

function renderItem(item: NewsItem): string {
  const url = escapeHtml(item.url);
  return `
    <article class="panel news-item" data-news-item data-category="${escapeHtml(item.category)}">
      <div class="tag-row news-item__tags">
        <span class="tag">${escapeHtml(item.category)}</span>
      </div>
      <h3 class="news-item__title">
        <a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>
      </h3>
      <p class="muted news-item__summary">${escapeHtml(item.summary)}</p>
      <p class="news-item__source">
        <span class="muted">${escapeHtml(item.source)}</span>
        <span class="news-item__source-sep" aria-hidden="true">·</span>
        <a class="shelf-action news-item__source-link" href="${url}" target="_blank" rel="noopener noreferrer">打开原文</a>
      </p>
    </article>
  `;
}

function renderDateGroups(groups: [string, NewsItem[]][]): string {
  return groups
    .map(([date, items], index) => {
      const latestClass = index === 0 ? ' news-date-group--latest' : '';
      return `
        <section class="news-date-group${latestClass}" data-news-date-group>
          <h2 class="news-date-heading">${escapeHtml(formatDateHeading(date))}</h2>
          <div class="news-date-items">
            ${items.map(renderItem).join('')}
          </div>
        </section>
      `;
    })
    .join('');
}

function renderFilters(categories: string[]): string {
  const allBtn = `<button type="button" class="tag is-active" data-news-filter="${ALL_FILTER}" aria-pressed="true">全部</button>`;
  const categoryBtns = categories
    .map(
      (cat) =>
        `<button type="button" class="tag" data-news-filter="${escapeHtml(cat)}" aria-pressed="false">${escapeHtml(cat)}</button>`,
    )
    .join('');
  return allBtn + categoryBtns;
}

function setListState(listEl: Element, message: string) {
  listEl.innerHTML = `<p class="news-state muted">${escapeHtml(message)}</p>`;
}

function applyFilter(root: Element, category: string) {
  root.querySelectorAll('[data-news-filter]').forEach((btn) => {
    const value = btn.getAttribute('data-news-filter');
    const active = value === category;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  root.querySelectorAll('[data-news-item]').forEach((item) => {
    const itemCategory = item.getAttribute('data-category');
    const visible = category === ALL_FILTER || itemCategory === category;
    item.classList.toggle('is-hidden', !visible);
  });

  root.querySelectorAll('[data-news-date-group]').forEach((group) => {
    const hasVisible = Boolean(group.querySelector('[data-news-item]:not(.is-hidden)'));
    group.classList.toggle('is-hidden', !hasVisible);
  });
}

function onNewsClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const filterBtn = target.closest('[data-news-filter]');
  if (!filterBtn) return;

  const root = filterBtn.closest('[data-news-root]');
  const category = filterBtn.getAttribute('data-news-filter');
  if (!root || !category) return;

  event.preventDefault();
  applyFilter(root, category);
}

let listening = false;

async function loadNews(root: Element) {
  const filtersEl = root.querySelector('[data-news-filters]');
  const updatedEl = root.querySelector('[data-news-updated]');
  const listEl = root.querySelector('[data-news-list]');
  if (!filtersEl || !updatedEl || !listEl) return;

  setListState(listEl, '正在加载资讯…');
  filtersEl.innerHTML = '';
  filtersEl.hidden = true;
  updatedEl.textContent = '';
  updatedEl.hidden = true;

  try {
    const response = await fetch(NEWS_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: unknown = await response.json();
    if (!isValidNewsData(data) || data.items.length === 0) {
      setListState(listEl, '暂无资讯。更新 ai-news.json 后刷新页面即可查看。');
      return;
    }

    const sorted = sortItems(data.items);
    const groups = groupByDate(sorted);
    const categories = getCategories(sorted);

    filtersEl.innerHTML = renderFilters(categories);
    filtersEl.hidden = false;

    updatedEl.textContent = `数据更新于 ${data.updated_at}`;
    updatedEl.hidden = false;

    listEl.innerHTML = renderDateGroups(groups);
    applyFilter(root, ALL_FILTER);
  } catch {
    setListState(listEl, '资讯加载失败，请刷新页面重试。');
  }
}

export function initNewsPage() {
  const root = document.querySelector('[data-news-root]');
  if (!root) return;

  if (!listening) {
    listening = true;
    document.addEventListener('click', onNewsClick);
  }

  void loadNews(root);
}

initNewsPage();
document.addEventListener('astro:page-load', initNewsPage);
