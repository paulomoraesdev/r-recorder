<script lang="ts">
  export let label = '';
  export let options: { value: string; label: string }[] = [];
  export let value = '';
  export let onChange: (value: string) => void = () => {};
  function handleChange(e: Event) {
    onChange((e.target as HTMLSelectElement).value);
  }
</script>

<label class="device-select">
  <span>{label}</span>
  <div class="control">
    <slot />
    <select bind:value={value} on:change={handleChange}>
      {#each options as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  </div>
</label>

<style>
.device-select {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.control {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
select {
  padding: 0.25rem;
}
</style>
