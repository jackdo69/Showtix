<template>
  <div id="app" class="container">

        <div v-if="!isAuthenticated" id="loginContainer">
          <div class="row">
            <div class="col-md-12">

              <h3 style="text-align: center;">Manage Account</h3>

              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input v-model:email="auth.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input v-model:password="auth.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>

                <div v-if="auth.message !== ''" class="alert" role="alert"
                  :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                  <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                  <p><strong>{{auth.message}}</strong></p>
                </div>

                <button type="button" @click="login" class="btn btn-primary">Login</button>

                <button type="button" @click="signUp" class="btn btn-success">Signup</button>

              </form>
            </div>
          </div>
        </div>

        <div v-if="isAuthenticated" id="content">

          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Welcome {{displayName()}}</h3>
                </div>

                <div class="panel-body">
                  <p>You have been currently logged-in using firebase.</p>
                  <br/>
                  <h4>{{displayName()}} Profile Details</h4>
                  <hr/>
                  <form class="form-horizontal">
                    <div class="form-group">
                      <label for="inputUserName" class="col-sm-2 control-label">Username</label>
                      <div class="col-sm-10">
                        <input v-model="auth.userName" type="text" class="form-control" id="inputUserName" placeholder="Username">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-offset-2 col-sm-10">
                        <button @click="updateProfile" type="button" class="btn btn-default">Update Profile</button>
                      </div>
                    </div>
                  </form>
                  <div v-if="auth.message !== ''" class="alert" role="alert"
                    :class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
                    <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
                    <p><strong>{{auth.message}}</strong></p>
                  </div>
                </div>

                <div class="panel-footer">
                  <button @click="signOut" class="btn btn-danger" type="button">Signout</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

</template>

<script>
export default {
  data:function() {
    return {
        auth: {
          user: null,
          email: '',
          password: '',
          message: '',
          userName: '',
          hasErrors: false
        }
      }
  },

    methods: {

      /**
       * Authenticate the user
       *
       * @param object event
       */
      login: function (event) {
        var vm = this;
        vm.auth.message = '';
        vm.auth.hasErrors = false;

        if (vm.auth.email === '' || vm.auth.password === '') {
          alert('Please provide the email and password');
          return;
        }
        // Sign-in the user with the email and password
        firebase.auth().signInWithEmailAndPassword(vm.auth.email, vm.auth.password)
          .then(function (data) {
            vm.auth.user = firebase.auth().currentUser;
          }).catch(function(error) {
            vm.auth.message = error.message;
            vm.auth.hasErrors = true;
          });
      },

      /**
       * Create a new user account
       *
       * @param object event
       */
      signUp: function (event) {
        var vm = this;
        vm.auth.message = '';
        vm.auth.hasErrors = false;

        if (vm.auth.email === '' || vm.auth.password === '') {
          alert('Please provide the email and password');
          return;
        }

        // Create a new user in firebase
        firebase.auth().createUserWithEmailAndPassword(vm.auth.email, vm.auth.password)
          .then(function (data) {
            vm.auth.message = 'Successfully created user';
            vm.auth.user = firebase.auth().currentUser;
            vm.auth.email = '';
            vm.auth.password = '';
          }).catch(function(error) {
            vm.auth.message = error.message;
            vm.auth.hasErrors = true;
          });
      },

      /**
       * Signout the currently logged-in user
       */
      signOut: function () {
        // Signout the user using firebase
        firebase.auth().signOut()
          .then(function(error) {
            this.auth.user = firebase.auth().currentUser;
            this.auth.message = 'User signed out Successfully';
          }.bind(this), function (error) {
            alert('Failed to signout user, try again later');
          });
      },

      /**
       * Update the user profile details.
       */
      updateProfile: function () {
        if (this.auth.userName === '') {
          alert('Please provide a username to update.');
          return;
        }

        var user = firebase.auth().currentUser,
          vm = this;

        user.updateProfile({
          displayName: vm.auth.userName
        }).then(function() {
          vm.auth.message = 'Successfully udpated user profile.';
        }, function(error) {
          vm.auth.message = 'Failed to update user profile.';
          vm.auth.hasErrors = true;
        });
      },

      /**
       * Dismiss the alert message
       */
      dismissAlert: function () {
        this.auth.message = '';
        this.auth.hasErrors = false;
      },

      /**
       * Display name computed property
       */
      displayName: function () {
        return this.auth.user.displayName ?
          this.auth.user.displayName : this.auth.user.email;
      }

    },

    computed: {

      /**
       * Determines if the user is authenticated
       *
       * @return boolean
       */
      isAuthenticated: function () {
        // This function changes the auth.user state when
        // the auth status of user changes.
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            this.auth.user = user;
          } else {
            this.auth.user = null;
          }
        }.bind(this));

        return (this.auth.user !== null);
      }

    },

  //end of auth
}
</script>
