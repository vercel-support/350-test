<script>
  import { fade } from 'svelte/transition';
  
	export let title = null;
  export let subtitle = null;
  export let width = "regular";
  export let size = "regular";
  export let imageUrl = null;
  export let displayBannerImage = false;
  export let type = null;
  export let style = null;
  export let includeFade = true;
  export let includeOverlay = false;
  export let icon = null;
  export let innerImage = null;
  export let group = null; // if the entity belongs to a group
  
  const conditionalFade = (node, args) => includeFade ? fade(node, args) : {};
  
  let hasImage = false;
  let backgroundImage;
  let iconSrc = "";
  let groupBackgroundImage;
  let subtitleDisplay = subtitle;
  let showViewMoreSubtitle = false;
  let showViewLessSubtitle = false;
  
  if (subtitle) {
    if (subtitle.length > 200) {
      subtitleDisplay = subtitle.substring(0,200) + "...";
      showViewMoreSubtitle = true;
    }
  }
  
  switch(icon) {
    case "broadcast": iconSrc = "/images/icon-broadcast.png"; break;
  }
  
  if (type) {
    hasImage = true;
    displayBannerImage = true;
    switch(type) {
      case "page": imageUrl = "/images/banners/banner-about.jpg"; break;
      case "register": imageUrl = "/images/banners/banner-register.jpg"; break;
    }
  }
  
  $: 
  if (displayBannerImage && imageUrl) {
    backgroundImage = 'background-image: ';
    if (includeOverlay) {
      backgroundImage += 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),';
    }
    backgroundImage += 'url(' + imageUrl + ')';
    hasImage = true;
  }
  
  function viewMoreSubtitle() {
    subtitleDisplay = subtitle;
    showViewMoreSubtitle = false;
    showViewLessSubtitle = true;
  }
  
  function viewLessSubtitle() {
    subtitleDisplay = subtitle.substring(0,200) + "...";
    showViewMoreSubtitle = true;
    showViewLessSubtitle = false;
  }
</script>


<div class="banner {size} {style}" style="{backgroundImage}" class:with-image={hasImage} in:conditionalFade>
  <div class="container {width}">
    
    <div class="innerWrap">
    
      {#if innerImage}
        <div class="innerImage" style={groupBackgroundImage}></div>
      {/if}
    
      <div class="bannerInfo">
      
        {#if title}
          <div class="title">
            {#if icon}
              <div class="icon"><img src={iconSrc} width="20" alt="broadcast icon" /> </div>
            {/if}
            <h1>{@html title}</h1>
          </div>
        {/if}
        
        {#if group}
          <div class="group">In <a href="{group.path}/discussions">{group.label}</a></div>
        {/if}
        
        {#if subtitle}
        <div class="subtitle">
          {@html subtitleDisplay}
          {#if showViewMoreSubtitle}
          <span class="link" on:click={viewMoreSubtitle}>view more</span>
          {/if}
          {#if showViewLessSubtitle}
          <span class="link" on:click={viewLessSubtitle}>view less</span>
          {/if}
        </div>
        {/if}
        
        <slot></slot>
        
      </div>
    
    </div>
    
  </div>
</div>


<style lang="scss">
  @import "../../styles/palette.scss";
  
   .banner {
    padding: 64px 0 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  
  .banner.large {
    padding: 160px 0 50px;
  }
    
  .banner.no-background {
    background: none;
  }
  
  .banner.no-border {
    border: none;
  }
  
  .banner.no-padding {
    padding: 0;
  }
  
  .banner.border .innerWrap {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 40px;
  }
  
  .title {
    display: flex;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    min-width: 48px;
    margin-right: 16px;
    border-radius: 50%;
    background-color: #fda5bd;
  }
  
  h1 {
    margin-bottom: 8px;
    max-width: 95%;
  }
  
  .subtitle {
    max-width: 720px;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 1px;
    color: #757575;
  }
  
  .smallSubtitle .subtitle {
    font-size: 15px;
    line-height: 26px;
    max-width: 768px;
  }

  .with-image h1 {
    color: #fff;
  }
  
  .with-image .subtitle {
    color: #e0e0e0;
  }
  
  .banner.blank {
    padding-bottom: 0;
    border: none;
    box-shadow: none;
    background: none;
  }
  
  .innerWrap {
    display: flex;
    align-items: center;
  }
  
  .innerImage {
    background-size: cover;
    min-width: 200px;
    width: 200px;
    height: 140px;
    border-radius: 4px;
    box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.24);
    margin-right: 32px;
  }
  
  .group .innerImage {
    width: 160px;
    height: 160px;
    min-width: 160px;
  }
  
  .bannerInfo {
    flex: 1;
  }
  
  .link {
    text-decoration: underline;
    text-underline-position: under;
    outline: none;
    cursor: pointer;
    color: $primary-colour;
  }
  
  .group {
    margin-bottom: 16px;
  }
  
  .group a {
    color: #757575;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 1px;
  }
  
  @media only screen and (max-width: 767px) {
    .banner {
      padding: 40px 0 0 0;
    }
    
    h1 {
      font-size: 32px;
      line-height: 42px;
    }
    
    .innerImage {
      display: none;
    }
  }
</style>