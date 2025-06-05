<script lang="ts">
  import { onMount } from 'svelte';
  import DeviceSelect from '../DeviceSelect/DeviceSelect.svelte';
  import {
    cameras,
    cameraId,
    updateDevices,
    setPreferredCamera,
    cameraEnabled,
    setCameraEnabled,
  } from '../../stores/mediaDevices';

  onMount(updateDevices);
  $: options = $cameras.map((c) => ({ value: c.deviceId, label: c.label || c.deviceId }));
</script>

<DeviceSelect
  label="Camera"
  {options}
  bind:value={$cameraId}
  onChange={setPreferredCamera}
/>
<button on:click={() => setCameraEnabled(!$cameraEnabled)}>
  {$cameraEnabled ? 'Disable' : 'Enable'}
</button>

<style>
button {
  margin-top: 0.5rem;
}
</style>
