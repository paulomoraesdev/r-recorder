import { writable, get } from 'svelte/store';

import { composeStreams } from '../services/composer';

import { pipWindow } from './pictureInPicture';
import layoutStore from './layout';
import {
  cameraStream,
  microphoneStream,
  screenshareStream,
  stopAllStreams,
} from './streams';

export const isRecording = writable(false);
export const recordedBlob = writable<Blob | null>(null);

let recorder: MediaRecorder | null = null;
let chunks: Blob[] = [];

export function startRecording() {
  const layout = get(layoutStore);
  const camera = get(cameraStream);
  const mic = get(microphoneStream);
  const screen = get(screenshareStream);
  const stream = composeStreams(
    layout === 'screenOnly' ? null : camera,
    mic,
    layout === 'cameraOnly' ? null : screen,
  );
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
  chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
    recordedBlob.set(new Blob(chunks, { type: chunks[0]?.type || 'video/webm' }));
    pipWindow.update((w) => {
      w?.close();
      return null;
    });
    stopAllStreams();
  };
  recorder.start();
  isRecording.set(true);
}

export function stopRecording() {
  recorder?.stop();
  isRecording.set(false);
}
