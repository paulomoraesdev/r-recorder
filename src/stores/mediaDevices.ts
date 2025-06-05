import { writable } from 'svelte/store';

export const cameras = writable<MediaDeviceInfo[]>([]);
export const cameraId = writable('');
export const cameraEnabled = writable(false);

export const microphones = writable<MediaDeviceInfo[]>([]);
export const microphoneId = writable('');
export const microphoneEnabled = writable(false);

export async function updateDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cams = devices.filter((d) => d.kind === 'videoinput');
  const mics = devices.filter((d) => d.kind === 'audioinput');
  cameras.set(cams);
  microphones.set(mics);
  cameraId.update((id) => id || cams[0]?.deviceId || '');
  microphoneId.update((id) => id || mics[0]?.deviceId || '');
}

export function setPreferredCamera(id: string) {
  cameraId.set(id);
}

export function setPreferredMicrophone(id: string) {
  microphoneId.set(id);
}

export function setCameraEnabled(enabled: boolean) {
  cameraEnabled.set(enabled);
}

export function setMicrophoneEnabled(enabled: boolean) {
  microphoneEnabled.set(enabled);
}

