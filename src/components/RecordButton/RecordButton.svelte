<script lang="ts">
  export let onClick: () => void = () => {};
</script>

<button class="record-button" on:click={onClick}>
  <div class="icon" />
</button>

<style>
.record-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: red;
}
</style>
