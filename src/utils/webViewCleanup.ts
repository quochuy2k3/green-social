import { CleanupConfig } from '@/types/map';

export function createCleanupJS(config: CleanupConfig): string {
  const { selectors, cssRules, useMutationObserver = true, debounceMs = 100 } = config;
  
  return `
(function() {
  let isCleaning = false;
  let timeoutId = null;
  
  const style = document.createElement('style');
  style.textContent = \`${cssRules}\`;
  style.id = 'webview-cleanup-styles';
  document.head.appendChild(style);
  
  function cleanup() {
    if (isCleaning) return;
    isCleaning = true;
    
    try {
      const elementsToRemove = [];
      for (const selector of ${JSON.stringify(selectors)}) {
        const elements = document.querySelectorAll(selector);
        elementsToRemove.push(...Array.from(elements));
      }
      
      elementsToRemove.forEach(el => {
        try {
          el.remove();
        } catch (e) {}
      });
    } finally {
      isCleaning = false;
    }
  }
  
  function debouncedCleanup() {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(cleanup, ${debounceMs});
  }
  
  cleanup();
  
  ${useMutationObserver ? `
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(debouncedCleanup);
    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true,
      attributes: false,
      characterData: false
    });
    
    setTimeout(() => observer.disconnect(), 30000);
  }
  ` : ''}
  
  if (typeof document !== 'undefined' && 'visibilityState' in document) {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        debouncedCleanup();
      }
    });
  }
  
  return true;
})();
`;
}

export const WINDY_CLEANUP_CONFIG: CleanupConfig = {
  selectors: [
    'div.rhpane.hide-on-picker-drag.top-border.right-border.mobiletablethide',
    '#search',
    '#logo-wrapper', 
    '#open-in-app',
    'section.mobile-calendar.fg-white.svelte-1hd22x0',
    'section#bottom-wrapper',
    'span[data-plugin="embed-ui"]',
    'span[data-plugin="bottom-right"]',
    'span[data-plugin="plugins"]'
  ],
  cssRules: `
    div.rhpane.hide-on-picker-drag.top-border.right-border.mobiletablethide,
    #search,
    #logo-wrapper,
    #open-in-app,
    section.mobile-calendar.fg-white.svelte-1hd22x0,
    section#bottom-wrapper,
    span[data-plugin="embed-ui"],
    span[data-plugin="bottom-right"],
    span[data-plugin="plugins"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `,
  useMutationObserver: true,
  debounceMs: 150
};

export const GREENMAP_CLEANUP_CONFIG: CleanupConfig = {
  selectors: [
    'div[data-name="0.0.0"][data-col-name="0.0.0"][data-type="slot"][data-editor="slot"].page-col.page-col-0-0-0.sticky',
    'div.map-search-bis',
    'div.toaster-list',
    'div.map-inner-container.left.bottom.right'
  ],
  cssRules: `
    div[data-name="0.0.0"][data-col-name="0.0.0"][data-type="slot"][data-editor="slot"].page-col.page-col-0-0-0.sticky,
    div.map-search-bis,
    div.toaster-list,
    div.map-inner-container.left.bottom.right {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `,
  useMutationObserver: true,
  debounceMs: 100
};
