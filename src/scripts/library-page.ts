/** 思考库：展开更早、条目手风琴、分类标题吸顶 */

function syncSiteHeaderOffset() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  document.documentElement.style.setProperty(
    '--site-header-offset',
    `${Math.ceil(header.getBoundingClientRect().height)}px`,
  );
}

function setArchiveOpen(section: Element, open: boolean) {
  section.classList.toggle('is-archive-open', open);
  const moreBtn = section.querySelector('[data-library-more]');
  const archive = section.querySelector('[data-library-archive]');
  const count = archive?.querySelectorAll('[data-library-entry]').length ?? 0;
  if (moreBtn) {
    moreBtn.setAttribute('aria-expanded', String(open));
    moreBtn.textContent = open ? `收起更早（${count}）` : `展开更早（${count}）`;
  }
}

function toggleEntry(section: Element, entry: Element, toggle: Element) {
  const accordion = section.querySelector('[data-library-accordion]');
  if (!accordion) return;

  const wasOpen = entry.classList.contains('is-open');

  accordion.querySelectorAll('[data-library-entry]').forEach((el) => {
    el.classList.remove('is-open');
    const btn = el.querySelector('[data-library-entry-toggle]');
    btn?.setAttribute('aria-expanded', 'false');
    const sr = btn?.querySelector('.sr-only');
    if (sr) sr.textContent = '展开';
  });

  if (!wasOpen) {
    entry.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    const sr = toggle.querySelector('.sr-only');
    if (sr) sr.textContent = '收起';
  }
}

function onLibraryClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const moreBtn = target.closest('[data-library-more]');
  if (moreBtn) {
    event.preventDefault();
    const section = moreBtn.closest('[data-library-category]');
    if (!section) return;
    const open = !section.classList.contains('is-archive-open');
    setArchiveOpen(section, open);
    return;
  }

  const toggle = target.closest('[data-library-entry-toggle]');
  if (!toggle) return;

  event.preventDefault();
  const section = toggle.closest('[data-library-category]');
  const entry = toggle.closest('[data-library-entry]');
  if (!section || !entry) return;
  toggleEntry(section, entry, toggle);
}

let listening = false;

export function initLibraryPage() {
  if (!document.querySelector('[data-library-category]')) return;

  syncSiteHeaderOffset();

  if (!listening) {
    listening = true;
    document.addEventListener('click', onLibraryClick);
    window.addEventListener('resize', syncSiteHeaderOffset, { passive: true });
  }
}

initLibraryPage();
document.addEventListener('astro:page-load', initLibraryPage);
