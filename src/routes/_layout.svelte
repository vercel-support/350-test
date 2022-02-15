<script>
  import { stores, goto } from '@sapper/app';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  const { preloading, session, page } = stores();
	export let segment;
    
  function toggleNav() {
    showNav = !showNav;
  }
  
  function toggleNotifications() {
    showNotifications = !showNotifications;
  }
  
  function hideSideBars() {
    showNav = false;
    showNotifications = false;
  }
  </script>


<Header {segment} on:toggleNotifications={toggleNotifications} on:toggleNav={toggleNav} />

<main>
  <slot></slot>
</main>

<Footer/>


<style lang="scss" global>
  @import "./styles/global.scss";
</style>