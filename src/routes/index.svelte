<script>
  import { stores } from '@sapper/app';
  import HomeLoggedOut from "./_HomeLoggedOut.svelte";
  
  const { session } = stores();
</script>

<svelte:head>
  <title>350 TEST</title>
</svelte:head>


<HomeLoggedOut />


<style>
</style>
