<script lang="ts">
  import chromeIcon from '../../assets/chrome.svg';
</script>

<div class="unsupported">
  <h2>This browser is not yet supported</h2>
  <p>This app requires APIs currently only supported in Chrome.</p>
  <a href="https://www.google.com/chrome/" target="_blank">
    <img src={chromeIcon} alt="Chrome" width="24" />
    Google Chrome
  </a>
</div>

<style>
.unsupported {
  text-align: center;
  padding: 1rem;
}
.unsupported a {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
}
</style>
