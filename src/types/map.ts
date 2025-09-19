// Map Configuration Types
export interface MapConfig {
  id: string;
  name: string;
  description: string;
  url: string;
  cleanupConfig?: CleanupConfig;
}

export interface CleanupConfig {
  selectors: string[];
  cssRules: string;
  useMutationObserver?: boolean;
  debounceMs?: number;
}
