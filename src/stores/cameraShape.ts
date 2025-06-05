import { writable } from 'svelte/store';

const initial = (() => {
  if (typeof localStorage === 'undefined') return true;
  return localStorage.getItem('cameraShape') === 'circle';
})();

const isCircleStore = writable<boolean>(initial);

isCircleStore.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cameraShape', value ? 'circle' : 'square');
  }
});

export default {
  subscribe: isCircleStore.subscribe,
  set: isCircleStore.set,
};
