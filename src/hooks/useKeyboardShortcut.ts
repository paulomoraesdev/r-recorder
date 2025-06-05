import { onMount } from 'svelte';

export function useKeyboardShortcut(key: string, callback: () => void) {
  const handler = (event: KeyboardEvent) => {
    const modifier = navigator.platform.startsWith('Mac') ? event.metaKey : event.ctrlKey;
    if (event.key === key && modifier) {
      event.preventDefault();
      callback();
    }
  };

  onMount(() => {
    document.body.addEventListener('keydown', handler);
    return () => document.body.removeEventListener('keydown', handler);
  });
}
