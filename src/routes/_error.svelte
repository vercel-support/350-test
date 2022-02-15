<script>
  import Banner from "../components/Banner.svelte";
  
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>


<svelte:head>
	<title>{status} {error.message}</title>
</svelte:head>

<div class="wrapper">

  <div class="block">
    <div class="error-status">{status}</div>
    <div class="error-message">{error.message}</div>
    <div class="link"><a href="/">Go to home page</div>
  </div>

</div>


<style>
  .wrapper {
    display: flex;
    height: 100vh;
    padding-bottom: 200px;
    justify-content: center;
    align-items: center;
  }
  
  .block {
    display: flex;
    flex-direction: column;
    width: 480px;
    height: 480px;
    padding: 40px;
    align-items: center;
    justify-content: center;
    border-style: solid 4px #fff;
    border-radius: 50%;
    background-image: url(/images/404.jpg);
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 1px 1px 24px 0 rgb(0 0 0 / 24%);
  }
  
  .error-status {
    color: #fff;
    font-size: 64px;
    line-height: 68px;
    font-family: 'Univers Next Bold';
  }
  
  .error-message {
    font-size: 28px;
    line-height: 36px;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    color: #fff;
  }
  
  .link a {
    color: #fff;
    text-decoration: underline;
  }
  
  @media only screen and (max-width: 500px) {
    .block {
      width: 300px;
      height: 300px;
    }
  }
</style>