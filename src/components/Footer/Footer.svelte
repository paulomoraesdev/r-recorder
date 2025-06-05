<script lang="ts">
  import MainRecordButton from '../MainRecordButton/MainRecordButton.svelte';
  import CameraSelect from '../CameraSelect/CameraSelect.svelte';
  import MicrophoneSelect from '../MicrophoneSelect/MicrophoneSelect.svelte';
  import ShapeSelect from '../ShapeSelect/ShapeSelect.svelte';
  import TeleprompterSelect from '../TeleprompterSelect/TeleprompterSelect.svelte';
</script>

<footer class="footer">
  <div></div>
  <MainRecordButton />
  <div class="devices">
    <TeleprompterSelect />
    <ShapeSelect />
    <MicrophoneSelect />
    <CameraSelect />
  </div>
</footer>

<style>
.footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: 8px;
  margin-top: 1rem;
}
.devices {
  display: flex;
  gap: 0.5rem;
  justify-self: end;
}
</style>
