<script lang="ts">
  import RecordButton from '../RecordButton/RecordButton.svelte';
  import { isRecording, startRecording, stopRecording, recordedBlob } from '../../stores/recording';
  import layoutStore from '../../stores/layout';
  import { cameraEnabled, microphoneEnabled } from '../../stores/mediaDevices';
  import { startCamera, startMicrophone, startScreenshare } from '../../stores/streams';
  import { requestPipWindow } from '../../stores/pictureInPicture';
  import { countingDown, count, startCountdown } from '../../stores/countdown';

  $: src = $recordedBlob ? URL.createObjectURL($recordedBlob) : '';

  async function prepareStreams() {
    if ($layoutStore !== 'screenOnly') {
      await startCamera();
    }
    if ($microphoneEnabled) {
      await startMicrophone();
    }
    if ($layoutStore !== 'cameraOnly') {
      await startScreenshare();
    }
  }

  async function toggleRecording() {
    if ($isRecording) {
      stopRecording();
    } else if (!$countingDown) {
      await prepareStreams();
      if ($layoutStore === 'cameraOnly') {
        await requestPipWindow();
      }
      startCountdown(3, () => startRecording());
    }
  }
</script>

<RecordButton on:click={toggleRecording} />

{#if $countingDown}
  <div class="countdown">{$count}</div>
{/if}

{#if $recordedBlob}
  <video controls {src} style="max-width:100%; margin-top:1rem;" />
{/if}

<style>
.countdown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
}
</style>
