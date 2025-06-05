import { writable } from 'svelte/store';

export type Layout = 'screenOnly' | 'screenAndCamera' | 'cameraOnly';

const layout = writable<Layout>('screenAndCamera');

export default {
  subscribe: layout.subscribe,
  set: layout.set,
};
