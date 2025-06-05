<script lang="ts">
  import { FFmpeg } from '@ffmpeg/ffmpeg';
  import { fetchFile, toBlobURL } from '@ffmpeg/util';
  import { onMount, onDestroy } from 'svelte';

  export let isOpen = false;
  export let blob: Blob | null = null;
  export let onClose: () => void = () => {};
  $: src = blob ? URL.createObjectURL(blob) : '';

  let ffmpeg: FFmpeg;
  let status: 'idle' | 'loading' | 'converting' = 'idle';
  let progress = 0;
  let statusMessage = '';

  onMount(() => {
    ffmpeg = new FFmpeg();
    ffmpeg.on('log', ({ message }) => {
      if (message.includes('configuration')) {
        statusMessage = 'Initializing encoder...';
      }
    });
    ffmpeg.on('progress', ({ progress: p }) => {
      status = 'converting';
      const pct = Math.round(Math.abs(p) * 100);
      progress = pct;
      statusMessage = `Converting video... ${pct}%`;
    });
  });

  onDestroy(() => {
    ffmpeg.off('log', () => {});
    ffmpeg.off('progress', () => {});
  });

  function downloadWebm() {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recording.webm';
    link.click();
    URL.revokeObjectURL(url);
    onClose();
  }

  async function convertToMp4() {
    if (!blob) return;
    status = 'loading';
    statusMessage = 'Loading FFmpeg libraries...';
    progress = 0;

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    statusMessage = 'Processing input file...';
    await ffmpeg.writeFile('input.webm', await fetchFile(blob));

    statusMessage = 'Starting conversion...';
    await ffmpeg.exec(['-i', 'input.webm', '-c:v', 'libx264', 'output.mp4']);

    statusMessage = 'Reading converted file...';
    const data = await ffmpeg.readFile('output.mp4');
    const url = URL.createObjectURL(new Blob([data as Uint8Array], { type: 'video/mp4' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recording.mp4';
    link.click();
    URL.revokeObjectURL(url);

    status = 'idle';
    statusMessage = '';
    onClose();
  }
</script>

{#if isOpen && blob}
  <div class="modal">
    <video {src} controls></video>
    {#if status !== 'idle'}
      <p>{statusMessage}</p>
      {#if status === 'converting'}
        <div class="progress"><div class="bar" style="width: {progress}%"></div></div>
      {/if}
    {:else}
      <div class="actions">
        <button on:click={convertToMp4}>Convert to MP4</button>
        <button on:click={downloadWebm}>Download (WEBM)</button>
        <button on:click={onClose}>Close</button>
      </div>
    {/if}
  </div>
{/if}

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
video {
  max-width: 80%;
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.progress {
  width: 80%;
  height: 4px;
  background: #444;
  margin-top: 1rem;
}
.bar {
  height: 100%;
  background: #007bff;
}
</style>
