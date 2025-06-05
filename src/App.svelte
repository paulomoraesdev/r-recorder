<script lang="ts">
import LayoutSwitcher from './components/LayoutSwitcher/LayoutSwitcher.svelte';
import Teleprompter from './components/Teleprompter/Teleprompter.svelte';
import VideoStreams from './components/VideoStreams/VideoStreams.svelte';
import RecordingModal from './components/RecordingModal/RecordingModal.svelte';
import BrowserNotSupported from './components/BrowserNotSupported/BrowserNotSupported.svelte';
import GitHubButton from './components/GitHubButton/GitHubButton.svelte';
import Placeholder from './components/Placeholder/Placeholder.svelte';
import Footer from './components/Footer/Footer.svelte';
import layoutStore from './stores/layout';
import { screenshareStream } from './stores/streams';
import { isTeleprompterOpen } from './stores/ui';
import { recordedBlob } from './stores/recording';

const unsupported = typeof MediaRecorder === 'undefined' || !navigator.mediaDevices;
</script>

{#if unsupported}
  <BrowserNotSupported />
{:else}
  <main>
    <h1>Recorder <GitHubButton /></h1>
    <LayoutSwitcher />
    {#if $screenshareStream || $layoutStore === 'cameraOnly'}
      <VideoStreams />
    {:else}
      <Placeholder />
    {/if}
    {#if $isTeleprompterOpen}
      <Teleprompter onClose={() => isTeleprompterOpen.set(false)} />
    {/if}
    <RecordingModal isOpen={$recordedBlob !== null} blob={$recordedBlob} onClose={() => recordedBlob.set(null)} />
    <Footer />
  </main>
{/if}

<style>
main {
  padding: 1rem;
  font-family: sans-serif;
}
</style>
