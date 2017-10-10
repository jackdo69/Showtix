<template>
<div class="bg-light">
    <nav class="navbar navbar-inverse navbar-light">
	  <div class="container">
		  <div class="row">
				<div class="navbar-header">
					<div id="logo">
							<img src="../assets/quicktix_logo.jpg" />
						</div>
				</div>
				<ul class="nav navbar-nav navbar-left" style="padding-left: 50px;">
				 	<li class="scroll">
					<router-link to="/home">
					<a>Main events</a>
					</router-link>
					</li>
					<li  v-if="!user" class="scroll">
					<router-link to="/Auth">
					  <a>Accounts</a>
					</router-link>
					</li>
					<li v-if="user && user.isAdmin == true">
					<router-link to="/eventManager" class="nav">
					  <a>Event Manager</a>
					  </router-link>
					</li>
					<li  v-if="user">
				  		<router-link :to="{ name: '/user', params: { userId: user.userTitle }}">{{user.userTitle}}</router-link>
					</li>
					<li><a class="nav"  href="#" v-on:click.prevent="signOut" v-if="user">Logout
					</a></li>
					<li></li>
				</ul>
				<div id="search" class="navbar-collapse collapse navbar-right">
				  <form class="form-inline my-2 my-lg-0">
					  <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
					  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>
				</div>
		  </div>
	  </div>
	</nav>
</div>
</template>
<script>
 import * as firebase from "firebase";
 import Auth from '../data/Auth'
  import EventBus from './EventBus'
  import checkAuth from '../data/checkAuth'

  export default {
    data () {
      return {
        user: null
      }
    },
    watch: {

    },
    created() {
    	Auth.onAuth(this.processUser) // processUser everytime auth state changes (signs in or out)
        this.processUser(Auth.getAuth()) // processUser in case user is already signed in
      },
    methods: {
    	processUser (authed) {
            if (authed === null) {
              this.user = null
              return
            }
            this.user = {
              userTitle: authed.providerData[0].displayName || authed.providerData[0].email || '', // if there's no displayName, take the email, if there's no email, use an empty string
              imageUrl: authed.providerData[0].photoURL || 'https://www.gravatar.com/avatar/', // Firebase 3 no longer supports auto Gravatar image fetch
              isAdmin: checkAuth.isAdmin(authed.providerData[0].email)
            }
          },
          toDetail(){
            console.log(this.user.userTitle)
            EventBus.$emit('user', this.user.userTitle)
            const userKey = this.user.userTitle
            this.$router.push({name:'/user/:id', params: {id: userKey}})
          },
          signOut () {
              Auth.signOut()
              this.$router.push('/auth')
            }
    },
    computed: {

      /**
       * Determines if the user is authenticated
       *
       * @return boolean
       */
      isAuthenticated: function () {

    	  console.log("processUser:" + isAuthenticated);
    	  firebase.auth().onAuthStateChanged(function(user) {
          	  if (user) {
          	    // User is signed in.
          		this.user = user;
          		  console.log("User is signed in:" + user.displayName);
          		  console.log("User is signed in:" + user.email);
          		  return true;
          	  } else {
          		this.user = null;
          	    // No user is signed in.
          		  console.log("No user is signed in:");
          		  return false;
          	  }
          	});
      }

    }
  }
</script>
<style>
.navbar-inverse .navbar-nav>li>a {
    color: #337ab7;
}
.navbar-inverse .navbar-nav>li>a:focus, .navbar-inverse .navbar-nav>li>a:hover{
	color: #90EE90;
}

.navbar-inverse {
    background-color: transparent;
    border-color: transparent;
}

#search{
	padding-top:10px;
}
  header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
    height: 50px;
    background: #333;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,.4);
  }
  header input {
    display: block;
    width: 480px;
    margin: 0 auto;
    height: 30px;
    border: none;
    padding: 0 16px;
    border-radius: 2px;
  }
  header span {
    padding: 15px;
    color: #fff;
    position: absolute;
    right: 95px;
    top: 1px;
  }
  header img {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    position: absolute;
    right: 60px;
    top: 8px;
  }
  header a {
    position: absolute;
    display: block;
    color: #fff;
    right: 15px;
    top: 10px;
    font-size: 25px;
    cursor: pointer;
    transition: color .2s;
  }
  /*header a:focus, header a:hover {
    color: #c2f442;
  }*/
  @media screen and (max-width: 1200px) {
    header span{
      display: none;
    }
  }
  @media screen and (max-width: 720px) {
    header input{
      width: calc(100% - 64px);
      margin: 0 0 0 16px;
    }
    header span, header img {
      display: none;
    }
  }

  .nav {
	    display: block;
	    text-align: center;
	    padding: 8px 8px;
	    text-decoration: none;
	    border-radius: 2px;
	    border: 1px;
	  }
  #logo img {
	    height: 100px;
	  }

	  .scroll:hover{
	  background-color: #90EE90;
	  }

	  .navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:focus, .navbar-inverse .navbar-nav>.active>a:hover{
	   background-color: #90EE90;
	  }
</style>
