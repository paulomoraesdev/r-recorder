<script lang="ts">
  import ScreenOnlyIcon from './icons/ScreenOnlyIcon.svelte';
  import ScreenAndCameraIcon from './icons/ScreenAndCameraIcon.svelte';
  import CameraOnlyIcon from './icons/CameraOnlyIcon.svelte';
  import layoutStore, { type Layout } from '../../stores/layout';

  function setLayout(newLayout: Layout) {
    layoutStore.set(newLayout);
  }
</script>

<div class="layout-switcher">
  <button on:click={() => setLayout('screenOnly')}> <ScreenOnlyIcon /> Screen only </button>
  <button on:click={() => setLayout('screenAndCamera')}> <ScreenAndCameraIcon /> Screen and camera </button>
  <button on:click={() => setLayout('cameraOnly')}> <CameraOnlyIcon /> Camera only </button>
</div>

<style>
.layout-switcher {
  display: flex;
  gap: 0.5rem;
}
button {
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}
</style>

