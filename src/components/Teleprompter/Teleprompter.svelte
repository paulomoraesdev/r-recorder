<script lang="ts">
  import { onMount } from 'svelte';
  export let onClose: () => void;
  let textarea: HTMLTextAreaElement;
  let text = '';
  let isPlaying = false;
  let speed = 0.2;
  let scrollContainer: HTMLDivElement;
  let content: HTMLDivElement;
  let animationId: number;

  const togglePlay = () => {
    isPlaying = !isPlaying;
    if (isPlaying) animate();
    else cancelAnimationFrame(animationId);
  };

  const animate = () => {
    if (!isPlaying) return;
    scrollContainer.scrollTop += speed;
    if (scrollContainer.scrollTop + scrollContainer.clientHeight >= content.clientHeight) {
      isPlaying = false;
      return;
    }
    animationId = requestAnimationFrame(animate);
  };

  const changeSpeed = (delta: number) => {
    speed = Math.min(2, Math.max(0.1, Number((speed + delta).toFixed(1))));
  };

  onMount(() => () => cancelAnimationFrame(animationId));
</script>

<div class="teleprompter">
  <button class="close" on:click={onClose}>x</button>

  <div class="input" style:display={isPlaying ? 'none' : 'block'}>
    <textarea bind:this={textarea} bind:value={text} placeholder="Start typing..." />
    <button on:click={togglePlay}>Start</button>
  </div>

  <div bind:this={scrollContainer} class="scroll" style:display={!isPlaying ? 'none' : 'block'}>
    <div bind:this={content} class="content">{text}</div>
  </div>

  <div class="controls" style:display={isPlaying ? 'flex' : 'none'}>
    <button on:click={() => changeSpeed(-0.1)}>-</button>
    <span>{speed.toFixed(1)}</span>
    <button on:click={() => changeSpeed(0.1)}>+</button>
    <button on:click={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
  </div>
</div>

<style>
.teleprompter {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 1rem;
  border-radius: 4px;
  width: 300px;
}
.close {
  position: absolute;
  top: 4px;
  right: 4px;
}
.scroll {
  height: 200px;
  overflow-y: auto;
  margin-bottom: 0.5rem;
}
.content {
  white-space: pre-line;
}
textarea {
  width: 100%;
  height: 150px;
}
.controls {
  display: flex;
  gap: 0.25rem;
}
</style>
