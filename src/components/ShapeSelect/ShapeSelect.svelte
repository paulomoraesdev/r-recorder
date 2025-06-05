<script lang="ts">
  import DeviceSelect from '../DeviceSelect/DeviceSelect.svelte';
  import CircleIcon from './icons/CircleIcon.svelte';
  import SquareIcon from './icons/SquareIcon.svelte';
import shapeStore from '../../stores/cameraShape';
$: shapeValue = $shapeStore ? 'circle' : 'square';
function change(v: string) {
  shapeStore.set(v === 'circle');
}
</script>

<DeviceSelect
  label="Camera shape"
  options={[{ value: 'square', label: 'Square' }, { value: 'circle', label: 'Circle' }]}
  bind:value={shapeValue}
  onChange={change}
>
  <svelte:fragment />
</DeviceSelect>
<div class="icons">
  <span role="button" tabindex="0" on:click={() => shapeStore.set(false)} on:keydown={(e) => e.key === 'Enter' && shapeStore.set(false)}><SquareIcon /></span>
  <span role="button" tabindex="0" on:click={() => shapeStore.set(true)} on:keydown={(e) => e.key === 'Enter' && shapeStore.set(true)}><CircleIcon /></span>
</div>

<style>
.icons {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
}
span { cursor: pointer; }
</style>
