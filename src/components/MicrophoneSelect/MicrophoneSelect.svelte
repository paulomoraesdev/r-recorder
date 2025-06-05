<script lang="ts">
  import { onMount } from 'svelte';
  import DeviceSelect from '../DeviceSelect/DeviceSelect.svelte';
  import {
    microphones,
    microphoneId,
    updateDevices,
    setPreferredMicrophone,
    microphoneEnabled,
    setMicrophoneEnabled,
  } from '../../stores/mediaDevices';

  onMount(updateDevices);
  $: options = $microphones.map((m) => ({ value: m.deviceId, label: m.label || m.deviceId }));
</script>

<DeviceSelect
  label="Microphone"
  {options}
  bind:value={$microphoneId}
  onChange={setPreferredMicrophone}
/>
<button on:click={() => setMicrophoneEnabled(!$microphoneEnabled)}>
  {$microphoneEnabled ? 'Disable' : 'Enable'}
</button>

<style>
button {
  margin-top: 0.5rem;
}
</style>
