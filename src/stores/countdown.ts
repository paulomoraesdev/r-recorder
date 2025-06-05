import { writable } from 'svelte/store';

export const countingDown = writable(false);
export const count = writable(3);

export function startCountdown(seconds: number, callback: () => void) {
  count.set(seconds);
  countingDown.set(true);
  const interval = setInterval(() => {
    count.update((n) => {
      if (n <= 1) {
        clearInterval(interval);
        countingDown.set(false);
        callback();
        return 0;
      }
      return n - 1;
    });
  }, 1000);
}
