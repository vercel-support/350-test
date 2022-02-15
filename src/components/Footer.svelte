<footer>
  <div class="container">
    <div class="footer-left">
      @Copyright 2022 The 350 Club Ltd.
    </div>
    <div class="footer-right">
      <a href="/pages/terms-of-use">Terms of use</a>
      <a href="/pages/privacy-policy">Privacy and cookies</a>
    </div>
  </div>
</footer>


<style>
  footer {
    width: 100%;
    background-color: #32010e;
    color: #fff;
    font-size: 14px;
    line-height: 22px;
    padding: 40px 0;
  }
  
  footer .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  a {
    color: #fff;
    text-decoration: underline;
    margin-left: 24px;
  }
  
  @media only screen and (max-width: 767px) {
    footer .container {
      display: block;
    }
    
    .footer-left {
      margin-bottom: 24px;
    }
    
    a {
      display: block;
      margin: 0 0 8px 0;
    }
  }
</style>