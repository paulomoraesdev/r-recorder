<script lang="ts">
import DeviceSelect from '../DeviceSelect/DeviceSelect.svelte';
import { isTeleprompterOpen } from '../../stores/ui';
import TeleprompterIcon from '../ShapeSelect/icons/TeleprompterIcon.svelte';
$: teleValue = $isTeleprompterOpen ? 'show' : 'hide';
function change(v: string) {
  isTeleprompterOpen.set(v === 'show');
}
</script>

<DeviceSelect
  label="Teleprompter"
  options={[{ value: 'hide', label: 'Hide' }, { value: 'show', label: 'Show' }]}
  bind:value={teleValue}
  onChange={change}
>
  <TeleprompterIcon />
</DeviceSelect>
