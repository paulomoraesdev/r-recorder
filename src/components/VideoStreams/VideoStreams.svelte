<script lang="ts">
  import { onMount } from 'svelte';
  import layoutStore from '../../stores/layout';
  import { cameraStream, screenshareStream, startCamera, startScreenshare } from '../../stores/streams';
  let screenVideo: HTMLVideoElement;
  let cameraVideo: HTMLVideoElement;

  onMount(() => {
    if ($layoutStore !== 'cameraOnly') startScreenshare();
    if ($layoutStore !== 'screenOnly') startCamera();
  });

  $: if (screenVideo) screenVideo.srcObject = $screenshareStream;
  $: if (cameraVideo) cameraVideo.srcObject = $cameraStream;
</script>

<div class="videos">
  {#if $layoutStore !== 'cameraOnly'}
    <video bind:this={screenVideo} autoplay muted></video>
  {/if}
  {#if $layoutStore !== 'screenOnly'}
    <video bind:this={cameraVideo} autoplay muted></video>
  {/if}
</div>

<style>
.videos {
  position: relative;
}
video {
  max-width: 100%;
}
video:last-child {
  position: absolute;
  width: 20%;
  bottom: 10px;
  right: 10px;
}
</style>
