<script lang="ts">
  import { startScreenshare } from '../../stores/streams';
</script>

<div class="placeholder">
  <h2>Record your screen</h2>
  <button on:click={startScreenshare}>Share screen</button>
</div>

<style>
.placeholder {
  text-align: center;
  padding: 1rem;
}
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>
