<script>
  import { goto, stores } from '@sapper/app';
  import { createEventDispatcher, onMount } from 'svelte';
  import { slide } from 'svelte/transition';
	
  export let segment;
  
  const { session, page } = stores();
  const dispatch = createEventDispatcher();
  
  let showSearch = false;
  let searchKeyword = "";
  let countUnreadNotifications = 0;
  let countUnreadConversations = 0;
  let countersTimeOut;
  let countersTimeOutStarted;
  
  $: classLoggedOut = ($session.currentUser)?"":"logged-out";
  $: isAdminUser = ($session.currentUser && $session.currentUser.roles.includes("administrator"));
  
  function log_out() {
    dispatch("logout");
  }
  
  function toggleNav() {
    dispatch("toggleNav");
  }
  
  function toggleNotifications() {
    countUnreadNotifications = 0;
    dispatch("toggleNotifications");
  }
  
  function toggleSearch() {
    showSearch = !showSearch;
  }
  
  function focusSearchInput() {
    document.getElementById("header-search-input").focus();
  }
  
  function search() {
    if (searchKeyword != "") {
      goto("search?k=" + searchKeyword);
      searchKeyword = "";
    }
  }
  
  // this is called when we press a key
  function submitSearch(e) {
    // if it's the enter key and if the search input is focussed, perform the search
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 && document.activeElement === document.getElementById("header-search-input")) {
      toggleSearch();
      search();
    }
  }

</script>


<header class="{classLoggedOut}">

  <div class="main-header">
  
    <div class="header-left">
      <a href="/" class="logo">
        {#if $session.currentUser}
        <img src="/images/logo-350.png" alt="250 Club" width="172" class="desktop" />
        {:else}
        <img src="/images/logo-350-white.png" alt="250 Club" width="172" class="desktop" />
        {/if}
        <img src="/images/logo-350-round-white.png" alt="350 Club" width="38" class="mobile" />
      </a>
    </div>
    
    <nav>
      <ul>

          <li class="desktop"><a href="/">Home</a></li>
          <li class="desktop"><a href="/pages/about">About</a></li>
          <li class="desktop"><a href="/register">Take your place</a></li>
          <li class="desktop"><a href="login">Login</a></li>
          <li class="desktop social"><a href="https://twitter.com/the350c" target="new"><img src="/images/icon-twitter-white.png" width="20" alt="Twitter" /></a></li>
          <li class="desktop social"><a href="https://linkedin.com/company/the350club" target="new"><img src="/images/icon-linkedin-white.png" width="20" alt="LinkedIn" /></a></li>
      </ul>
    </nav>
    
  </div>
  
</header>



<style lang="scss">
  @import "../styles/palette.scss";

  header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
  }
  
  header.logged-out {
    position: absolute;
    z-index: 10;
  }

  .search {
    background: #fff;
    border-bottom: solid 1px #f0f0f0;
  }

  .search-container {
    padding: 24px 0;
    display: flex;
  }

  .main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    height: 80px;
    width: 100%;
    background: $primary-colour;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.24);
  }
  
  .logged-out .main-header {
    box-shadow: none;
    background: none;
  }

  .header-left {
    display: flex;
    align-items: center;
  }
  
  a.logo {
    margin-right: 16px;
  }
  
  a.logo:hover {
    opacity: 1;
  }

  ul {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 20px 0 0;
    padding: 0;
    display: inline-block;
    float: left;
    background: none;
    position: relative;
  }

  li:last-child {
    margin-right: 0;
  }

  li.small {
    margin-right: 24px;
  }
  
  li.link {
    cursor: pointer;
    opacity: 1;
    transition: background-color 400ms ease, opacity 400ms ease; 
  }
  
  li.link:hover {
    opacity: 0.6;
  }

  li:after {
    display: none;
  }

  li a, li span {
    font-family: 'Univers Next Medium', sans-serif;
    color: #fff;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 1px;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 400ms ease;
    border-bottom: 2px solid transparent;
    padding-bottom: 6px;
  }
  
  .logged-out li a, .logged-out li span {
    color: #fff;
  }

  li a:hover, li span:hover {
    opacity: .64;
  }

  li a.selected {
    border-bottom-color: #fff;
    color: #fff;
  }
  
  li.social {
    margin-right: 16px;
  }
  
  li.social a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding-top: 5px;
  }
  
  li.create-content a {
    display: flex;
    height: 24px;
    width: 24px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fff;
  }
  
  li.create-content img {
    top: 4px;
    position: relative;
  }
  
  button.search {
    background: $primary-colour url(/images/icon-magnify-white.png) center center no-repeat;
    background-size: 24px 24px;
    text-indent: -9999px;
    width: 64px;
    border: none;
    outline: none;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -4px;
  }
  
  button.search:hover {
    opacity: 1;
  }
  
  .burger-menu {
    display: none;
  }
  
  .tablet {
    display: none;
  }
  
  .mobile {
    display: none;
  }
  
  @media only screen and (max-width: 1220px) {
    li.desktop {
      display: none;
    }
    
    .tablet {
      display: block;
    }
    
    .burger-menu {
      display: block;
    }
  }
  
  @media only screen and (max-width: 767px) {
    .desktop {
      display: none;
    }
    
    .mobile {
      display: block;
    }
    
    .main-header {
      padding: 20px 16px;
    }
    
    .search-container {
      padding-left: 12px;
      padding-right: 12px;
    }
    
    li.small {
      margin-right: 16px;
    }
    
    li.account {
      margin-right: 0;
    }
    
    .create-content,
    .logout {
      display: none;
    }
  }
</style>