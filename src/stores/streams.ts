import { writable, get } from 'svelte/store';

import { cameraId, microphoneId, cameraEnabled, microphoneEnabled } from './mediaDevices';

export const cameraStream = writable<MediaStream | null>(null);
export const microphoneStream = writable<MediaStream | null>(null);
export const screenshareStream = writable<MediaStream | null>(null);

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((t) => t.stop());
}

export async function startCamera() {
  if (!get(cameraEnabled)) {
    cameraStream.set(null);
    return null;
  }
  const id = get(cameraId);
  const constraints: MediaStreamConstraints = {
    video: id ? { deviceId: { exact: id } } : true,
    audio: false,
  };
  stopStream(get(cameraStream));
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  cameraStream.set(stream);
  return stream;
}

export async function startMicrophone() {
  if (!get(microphoneEnabled)) {
    microphoneStream.set(null);
    return null;
  }
  const id = get(microphoneId);
  const constraints: MediaStreamConstraints = {
    audio: id ? { deviceId: { exact: id } } : true,
    video: false,
  };
  stopStream(get(microphoneStream));
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  microphoneStream.set(stream);
  return stream;
}

export async function startScreenshare() {
  try {
    stopStream(get(screenshareStream));
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
    stream.getVideoTracks()[0].onended = () => screenshareStream.set(null);
    screenshareStream.set(stream);
    return stream;
  } catch {
    return null;
  }
}

export function stopAllStreams() {
  stopStream(get(cameraStream));
  stopStream(get(microphoneStream));
  stopStream(get(screenshareStream));
  cameraStream.set(null);
  microphoneStream.set(null);
  screenshareStream.set(null);
}
