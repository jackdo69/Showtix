<template>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <!-- <a class="navbar-brand" href="#">Navbar</a> -->
  <div id="logo">
            <img src="./assets/quicktix_logo.jpg" />
  </div>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <router-link to="/" class="nav">
        <a>Main events</a>
      </router-link>
      <router-link to="/Auth" class="nav">
        <a>Accounts</a>
      </router-link>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>


      <router-view></router-view>
    </div>

</template>

<script>

</script>

<style scoped>
  .nav {
    display: block;
    text-align: center;
    padding: 8px 8px;
    text-decoration: none;
    border-radius: 2px;
    border: 1px;
  }
  .nav:hover { background-color: #90EE90;}
  img {
    height: 100px;
  }
</style>
