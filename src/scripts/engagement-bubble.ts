/** 全站浮窗：停留超过 15 秒后提示可联系当面了解 */

const DELAY_MS = 15_000;
const CONTACT_PATH = '/contact';
const DISMISS_KEY = 'engagement-bubble-dismissed';

let timerId: ReturnType<typeof setTimeout> | null = null;

function clearTimer() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}

function isContactPage(): boolean {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return path === CONTACT_PATH;
}

function wasDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function getFloat(): HTMLElement | null {
  const el = document.querySelector('[data-engagement-float]');
  return el instanceof HTMLElement ? el : null;
}

function showFloat() {
  const el = getFloat();
  if (!el) return;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add('is-visible'));
}

function hideFloat() {
  const el = getFloat();
  if (!el) return;
  el.classList.remove('is-visible');
  el.hidden = true;
}

function scheduleShow() {
  clearTimer();
  const el = getFloat();
  if (!el || isContactPage() || wasDismissed()) return;

  hideFloat();
  timerId = setTimeout(showFloat, DELAY_MS);
}

function onDismissClick(event: MouseEvent) {
  const btn = (event.target as Element).closest('[data-engagement-dismiss]');
  if (!btn) return;
  event.preventDefault();
  try {
    sessionStorage.setItem(DISMISS_KEY, '1');
  } catch {
    /* ignore */
  }
  clearTimer();
  hideFloat();
}

let listening = false;

export function initEngagementBubble() {
  if (!getFloat()) return;

  scheduleShow();

  if (!listening) {
    listening = true;
    document.addEventListener('click', onDismissClick);
  }
}

initEngagementBubble();
document.addEventListener('astro:page-load', initEngagementBubble);
