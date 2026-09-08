/**
 * Progressive enhancement para los CTA/FAB de WhatsApp (spec §9.4).
 *
 * Reglas duras que este archivo respeta:
 * - Cero backend: no hay fetch/XHR, solo lectura del DOM y del viewport.
 * - Los enlaces son <a href> reales; si este script no corre (JS
 *   desactivado), los enlaces igual navegan. Todo lo de aqui es
 *   decorativo/UX, nunca la condicion para que el enlace funcione.
 */

const DESKTOP_QUERY = '(min-width: 768px)';
const LOADING_LABEL = 'Abriendo WhatsApp…';
const LOADING_MS = 1200;
const ERROR_CHECK_MS = 2500;

function syncTargetAttribute(link: HTMLAnchorElement): void {
  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
  if (isDesktop) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  } else {
    link.removeAttribute('target');
    link.removeAttribute('rel');
  }
}

function handleClick(link: HTMLAnchorElement): void {
  // Bloquea doble activacion mientras la navegacion esta "en curso".
  if (link.dataset.waLoading === 'true') return;
  link.dataset.waLoading = 'true';

  const labelEl = link.querySelector<HTMLElement>('[data-wa-label]');
  const originalLabel = labelEl?.textContent ?? '';
  if (labelEl) labelEl.textContent = LOADING_LABEL;

  const errorPanel = link.id
    ? document.querySelector<HTMLElement>(`[data-wa-error-panel-for="${link.id}"]`)
    : null;

  const restoreTimer = window.setTimeout(() => {
    if (labelEl) labelEl.textContent = originalLabel;
    link.dataset.waLoading = 'false';
  }, LOADING_MS);

  const errorTimer = window.setTimeout(() => {
    // Si seguimos visibles pasado el margen esperado, probablemente la
    // navegacion a WhatsApp no ocurrio (app no instalada, bloqueo, etc).
    if (document.visibilityState === 'visible' && errorPanel) {
      errorPanel.hidden = false;
    }
  }, ERROR_CHECK_MS);

  window.addEventListener(
    'pagehide',
    () => {
      window.clearTimeout(restoreTimer);
      window.clearTimeout(errorTimer);
    },
    { once: true },
  );
}

function initErrorPanelDismiss(): void {
  document.querySelectorAll<HTMLElement>('[data-wa-error-dismiss]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.closest<HTMLElement>('[data-wa-error-panel-for]');
      if (panel) panel.hidden = true;
    });
  });
}

function initVirtualKeyboardGuard(fab: HTMLElement): void {
  const viewport = window.visualViewport;
  if (!viewport) return;

  const update = (): void => {
    const active = document.activeElement;
    const isTextInputFocused =
      active instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(active.tagName);
    const keyboardLikelyOpen = viewport.height < window.innerHeight * 0.75;
    fab.classList.toggle('is-hidden-by-keyboard', isTextInputFocused && keyboardLikelyOpen);
  };

  viewport.addEventListener('resize', update);
  document.addEventListener('focusin', update);
  document.addEventListener('focusout', update);
}

function initFooterCollisionGuard(fab: HTMLElement): void {
  const legalBlock = document.querySelector<HTMLElement>('[data-wa-footer-guard]');
  if (!legalBlock || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      fab.classList.toggle('is-hidden-by-footer', entry.isIntersecting);
    },
    // Encoge el viewport efectivo al tamaño de la caja de exclusion del FAB
    // (72px) para detectar colision solo cuando el bloque legal entra ahi.
    { root: null, rootMargin: '0px 0px -72px 0px', threshold: 0 },
  );
  observer.observe(legalBlock);
}

export function initWhatsappBehavior(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-wa-link]');
  links.forEach((link) => {
    syncTargetAttribute(link);
    link.addEventListener('click', () => handleClick(link));
  });

  window.addEventListener('resize', () => {
    links.forEach(syncTargetAttribute);
  });

  initErrorPanelDismiss();

  const fab = document.querySelector<HTMLElement>('[data-testid="fab-whatsapp"]');
  if (fab) {
    initVirtualKeyboardGuard(fab);
    initFooterCollisionGuard(fab);
  }
}
