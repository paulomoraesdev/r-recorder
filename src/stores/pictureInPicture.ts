import { writable } from 'svelte/store';

import { stopRecording } from './recording';

export const pipWindow = writable<Window | null>(null);

export async function requestPipWindow() {
  const { documentPictureInPicture } = window as unknown as {
    documentPictureInPicture: {
      requestWindow(options: { width: number; height: number }): Promise<Window>;
    };
  };
  const win = await documentPictureInPicture.requestWindow({
    width: 300,
    height: 300,
  });
  win.onpagehide = () => {
    stopRecording();
    pipWindow.set(null);
  };
  const css = [...document.styleSheets]
    .map((s) => [...s.cssRules].map((r) => r.cssText).join(''))
    .filter(Boolean)
    .join('\n');
  const style = document.createElement('style');
  style.textContent = css;
  win.document.head.appendChild(style);
  pipWindow.set(win);
  return win;
}
