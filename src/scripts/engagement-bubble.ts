/** 全站机器人导览：固定右下角浮窗 */

import { getWorkProject, getWorkTooltipSummary } from '../data/workProjects';

const DISMISS_KEY = 'engagement-bubble-dismissed';
const HOVER_DELAY_MS = 200;
const THINKING_STEPS = 3;
const TYPE_INTERVAL_MS = 36;
const LOOK_MAX_DISTANCE_PX = 260;
const EYE_LERP = 0.16;
const BODY_LERP = 0.085;
const HEAD_LERP = 0.1;
const IDLE_BLEND_LERP = 0.08;
const IDLE_DELAY_MS = 900;
const BLINK_MIN_INTERVAL_MS = 1800;
const BLINK_MAX_INTERVAL_MS = 4200;
const BLINK_DURATION_MS = 180;

type RobotMessage = {
  text: string;
  href: string;
  ariaLabel: string;
};

type CaseHoverHit = {
  key: string;
  href: string;
  ariaLabel: string;
  summary: string;
};

type AssistantElements = {
  root: HTMLElement;
  speaker: HTMLElement | null;
  shell: HTMLElement | null;
  head: HTMLElement | null;
  message: HTMLElement | null;
  cta: HTMLAnchorElement | null;
  eyeLeft: HTMLElement | null;
  eyeRight: HTMLElement | null;
};

let floatAssistant: AssistantElements | null = null;

let dismissed = false;
let listening = false;
let hasFinePointer = false;
let reducedMotion = false;
let hoverTimer: ReturnType<typeof setTimeout> | null = null;
let thinkingTimer: ReturnType<typeof setInterval> | null = null;
let typingTimer: ReturnType<typeof setInterval> | null = null;
let pendingHoverKey: string | null = null;
let activeHoverKey: string | null = null;
let flowToken = 0;

let mouseX = 0;
let mouseY = 0;
let hasPointerSample = false;
let pointerClientX = 0;
let pointerClientY = 0;
let eyeX = 0;
let eyeY = 0;
let bodyX = 0;
let bodyY = 0;
let headX = 0;
let headY = 0;
let idleBlend = 0;
let lastPointerMoveAt = 0;
let blinkStartAt = -1;
let nextBlinkAt = 0;
let eyeRaf = 0;

function wasDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function normalizePath(path: string): string {
  return path.replace(/\/$/, '') || '/';
}

function collectAssistant(selector: string): AssistantElements | null {
  const root = document.querySelector(selector);
  if (!(root instanceof HTMLElement)) return null;
  return {
    root,
    speaker: root.querySelector('.robot-assistant'),
    shell: root.querySelector('.robot-shell'),
    head: root.querySelector('.robot-head'),
    message: root.querySelector('[data-robot-message]'),
    cta: root.querySelector('[data-robot-cta]'),
    eyeLeft: root.querySelector('[data-robot-eye-left]'),
    eyeRight: root.querySelector('[data-robot-eye-right]'),
  };
}

function setAssistantVisible(assistant: AssistantElements | null, isVisible: boolean) {
  if (!assistant) return;
  if (!isVisible) {
    assistant.root.classList.remove('is-visible');
    assistant.root.hidden = true;
    return;
  }
  assistant.root.hidden = false;
  requestAnimationFrame(() => assistant.root.classList.add('is-visible'));
}

function setAssistantSpeaking(assistant: AssistantElements | null, isSpeaking: boolean) {
  if (!assistant) return;
  assistant.speaker?.classList.toggle('is-speaking', isSpeaking);
}

function setAssistantThinking(assistant: AssistantElements | null, isThinking: boolean) {
  if (!assistant) return;
  assistant.speaker?.classList.toggle('is-thinking', isThinking);
}

function applyMessageToAssistant(assistant: AssistantElements | null, data: RobotMessage) {
  if (!assistant) return;
  if (assistant.message) assistant.message.textContent = data.text;
  if (assistant.cta) {
    assistant.cta.href = data.href;
    assistant.cta.setAttribute('aria-label', data.ariaLabel);
  }
}

function applyMessage(data: RobotMessage) {
  applyMessageToAssistant(floatAssistant, data);
}

function clearHoverTimer() {
  if (hoverTimer !== null) {
    clearTimeout(hoverTimer);
    hoverTimer = null;
  }
}

function clearThinkingTimer() {
  if (thinkingTimer !== null) {
    clearInterval(thinkingTimer);
    thinkingTimer = null;
  }
}

function clearTypingTimer() {
  if (typingTimer !== null) {
    clearInterval(typingTimer);
    typingTimer = null;
  }
}

function clearAsyncTimers() {
  clearHoverTimer();
  clearThinkingTimer();
  clearTypingTimer();
}

function hideSpeech() {
  flowToken += 1;
  clearAsyncTimers();
  setAssistantSpeaking(floatAssistant, false);
  setAssistantThinking(floatAssistant, false);
  activeHoverKey = null;
  pendingHoverKey = null;
}

function showNow(message: RobotMessage) {
  if (dismissed) return;
  applyMessage(message);
  setAssistantSpeaking(floatAssistant, true);
}

function resolveCaseHoverTarget(target: Element): CaseHoverHit | null {
  const topicCarrier = target.closest('[data-robot-topic="work-detail"]');
  if (!(topicCarrier instanceof HTMLElement)) return null;

  const anchor = topicCarrier.closest('a[href]');
  if (!(anchor instanceof HTMLAnchorElement)) return null;

  const rawHref = anchor.getAttribute('href') || '';
  if (!rawHref.startsWith('/')) return null;

  const href = normalizePath(rawHref);
  if (!href.startsWith('/work/')) return null;

  const slug = href.slice('/work/'.length);
  if (!slug || slug.includes('/')) return null;

  const summary = getWorkTooltipSummary(slug);
  if (!summary) return null;

  const project = getWorkProject(slug);
  if (!project) return null;

  return {
    key: `case:${slug}`,
    href,
    ariaLabel: `前往 ${project.title}`,
    summary,
  };
}

function startTypingFlow(hit: CaseHoverHit, token: number) {
  const chars = Array.from(hit.summary);
  let index = 0;
  setAssistantThinking(floatAssistant, false);
  showNow({
    text: '',
    href: hit.href,
    ariaLabel: hit.ariaLabel,
  });

  typingTimer = setInterval(() => {
    if (token !== flowToken) {
      clearTypingTimer();
      return;
    }

    index += 1;
    showNow({
      text: chars.slice(0, index).join(''),
      href: hit.href,
      ariaLabel: hit.ariaLabel,
    });

    if (index >= chars.length) {
      clearTypingTimer();
      activeHoverKey = hit.key;
    }
  }, TYPE_INTERVAL_MS);
}

function startThinkingFlow(hit: CaseHoverHit) {
  flowToken += 1;
  const token = flowToken;
  clearAsyncTimers();
  pendingHoverKey = hit.key;
  activeHoverKey = null;
  setAssistantSpeaking(floatAssistant, false);

  hoverTimer = setTimeout(() => {
    if (token !== flowToken) return;
    pendingHoverKey = null;
    activeHoverKey = hit.key;

    const thinkingSeconds = THINKING_STEPS;
    let step = 1;
    setAssistantThinking(floatAssistant, true);

    const renderThinking = () => {
      showNow({
        text: `思考中（${step}s）`,
        href: hit.href,
        ariaLabel: hit.ariaLabel,
      });
    };

    renderThinking();
    thinkingTimer = setInterval(() => {
      if (token !== flowToken) {
        clearThinkingTimer();
        return;
      }

      step += 1;
      if (step <= thinkingSeconds) {
        renderThinking();
        return;
      }

      clearThinkingTimer();
      startTypingFlow(hit, token);
    }, 1000);
  }, HOVER_DELAY_MS);
}

function isPointerOnSiteContent(target: Element): boolean {
  const contentRoot = target.closest('.shell, .site-sidebar, .site-header, .site-footer');
  const inAssistant = target.closest('[data-engagement-float]');
  return !!contentRoot && !inAssistant;
}

function onPointerMove(event: PointerEvent) {
  const now = performance.now();
  lastPointerMoveAt = now;
  hasPointerSample = true;
  pointerClientX = event.clientX;
  pointerClientY = event.clientY;
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;

  if (!hasFinePointer || dismissed) return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  if (target.closest('[data-engagement-float]')) {
    return;
  }

  if (!isPointerOnSiteContent(target)) {
    hideSpeech();
    return;
  }

  const hit = resolveCaseHoverTarget(target);
  if (!hit) {
    hideSpeech();
    return;
  }

  if (activeHoverKey === hit.key || pendingHoverKey === hit.key) {
    return;
  }

  startThinkingFlow(hit);
}

function onPointerLeaveDocument() {
  if (!hasFinePointer || dismissed) return;
  hasPointerSample = false;
  hideSpeech();
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function scheduleNextBlink(now: number) {
  const interval = BLINK_MIN_INTERVAL_MS + Math.random() * (BLINK_MAX_INTERVAL_MS - BLINK_MIN_INTERVAL_MS);
  nextBlinkAt = now + interval;
}

function resolveLookTarget(assistant: AssistantElements | null): { x: number; y: number } {
  if (!assistant || !hasPointerSample || !hasFinePointer || dismissed) return { x: 0, y: 0 };
  const anchor = assistant.head ?? assistant.shell ?? assistant.root;
  const rect = anchor.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rawX = (pointerClientX - centerX) / LOOK_MAX_DISTANCE_PX;
  const rawY = (pointerClientY - centerY) / LOOK_MAX_DISTANCE_PX;
  return {
    x: clamp(rawX, -1, 1),
    y: clamp(rawY, -1, 1),
  };
}

function resetAssistantMotion(assistant: AssistantElements | null) {
  if (!assistant) return;
  if (assistant.shell) assistant.shell.style.transform = 'none';
  if (assistant.head) assistant.head.style.transform = 'none';
  if (assistant.eyeLeft) assistant.eyeLeft.style.transform = 'translate(0px, 0px)';
  if (assistant.eyeRight) assistant.eyeRight.style.transform = 'translate(0px, 0px)';
}

function tickEyes() {
  const now = performance.now();
  const idleWanted = hasFinePointer && !dismissed && now - lastPointerMoveAt >= IDLE_DELAY_MS ? 1 : 0;
  idleBlend += (idleWanted - idleBlend) * IDLE_BLEND_LERP;

  if (!reducedMotion) {
    if (blinkStartAt < 0 && now >= nextBlinkAt) {
      blinkStartAt = now;
    }
    if (blinkStartAt >= 0 && now - blinkStartAt >= BLINK_DURATION_MS) {
      blinkStartAt = -1;
      scheduleNextBlink(now);
    }
  }

  const blinkProgress = blinkStartAt >= 0 ? clamp((now - blinkStartAt) / BLINK_DURATION_MS, 0, 1) : 0;
  const blinkCloseness = blinkStartAt >= 0 ? Math.sin(Math.PI * blinkProgress) : 0;
  const eyeOpenScale = 1 - blinkCloseness * 0.85;

  const lookTarget = resolveLookTarget(floatAssistant);
  eyeX += (lookTarget.x - eyeX) * EYE_LERP;
  eyeY += (lookTarget.y - eyeY) * EYE_LERP;
  bodyX += (lookTarget.x - bodyX) * BODY_LERP;
  bodyY += (lookTarget.y - bodyY) * BODY_LERP;
  headX += (lookTarget.x - headX) * HEAD_LERP;
  headY += (lookTarget.y - headY) * HEAD_LERP;

  const updateAssistantEyes = (assistant: AssistantElements | null) => {
    if (!assistant) return;
    const idleBodyX = Math.sin(now * 0.0011) * 0.55 * idleBlend;
    const idleBodyY = Math.cos(now * 0.00095) * 0.42 * idleBlend;
    const idleBodyRotate = Math.sin(now * 0.001) * 1.2 * idleBlend;
    const bodyShiftX = bodyX * 2.45 + idleBodyX;
    const bodyShiftY = bodyY * 1.8 + idleBodyY;
    const bodyRotate = bodyX * 2.4 + idleBodyRotate;

    const idleHeadX = Math.sin(now * 0.0016) * 0.28 * idleBlend;
    const idleHeadY = Math.cos(now * 0.0012) * 0.22 * idleBlend;
    const idleHeadRotate = Math.sin(now * 0.0014) * 0.6 * idleBlend;
    const headShiftX = headX * 0.95 + idleHeadX;
    const headShiftY = headY * 0.68 + idleHeadY;
    const headRotate = headX * 1.15 + idleHeadRotate;

    const idleEyeX = Math.sin(now * 0.002) * 0.5 * idleBlend;
    const idleEyeY = Math.cos(now * 0.0017) * 0.38 * idleBlend;
    const eyeShiftX = eyeX * 7.1 + idleEyeX;
    const eyeShiftY = eyeY * 5.1 + idleEyeY;

    if (assistant.shell) {
      assistant.shell.style.transform = `translate(${bodyShiftX}px, ${bodyShiftY}px) rotate(${bodyRotate}deg)`;
    }

    if (assistant.head) {
      assistant.head.style.transform = `translate(${headShiftX}px, ${headShiftY}px) rotate(${headRotate}deg)`;
    }
    if (assistant.eyeLeft) {
      assistant.eyeLeft.style.transform = `translate(${eyeShiftX}px, ${eyeShiftY}px) scaleY(${eyeOpenScale})`;
    }
    if (assistant.eyeRight) {
      assistant.eyeRight.style.transform = `translate(${eyeShiftX}px, ${eyeShiftY}px) scaleY(${eyeOpenScale})`;
    }
  };

  updateAssistantEyes(floatAssistant);
  eyeRaf = window.requestAnimationFrame(tickEyes);
}

function onDismissClick(event: MouseEvent) {
  const button = (event.target as Element).closest('[data-engagement-dismiss]');
  if (!button) return;
  event.preventDefault();
  dismissed = true;
  try {
    sessionStorage.setItem(DISMISS_KEY, '1');
  } catch {
    /* ignore */
  }
  hideSpeech();
  setAssistantVisible(floatAssistant, false);
}

function attachListenersOnce() {
  if (listening) return;
  listening = true;
  document.addEventListener('click', onDismissClick);
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', onPointerLeaveDocument);
}

function setupMotionPrefs() {
  hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  hasPointerSample = false;
  pointerClientX = window.innerWidth * 0.5;
  pointerClientY = window.innerHeight * 0.5;
  lastPointerMoveAt = performance.now();
  blinkStartAt = -1;
  scheduleNextBlink(lastPointerMoveAt);
}

export function initEngagementBubble() {
  floatAssistant = collectAssistant('[data-engagement-float]');
  if (!floatAssistant) return;

  setupMotionPrefs();
  dismissed = wasDismissed();
  attachListenersOnce();

  setAssistantVisible(floatAssistant, !dismissed);
  hideSpeech();

  if (!reducedMotion && eyeRaf === 0) {
    eyeRaf = window.requestAnimationFrame(tickEyes);
  } else if (reducedMotion) {
    resetAssistantMotion(floatAssistant);
  }
}

initEngagementBubble();
document.addEventListener('astro:page-load', initEngagementBubble);
