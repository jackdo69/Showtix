<template>
<div class="container">
	<form class="form-horizontal">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Edit User's detail</h3>
			</div>
			<div class="panel-body">
				<div class="form-group">
					<label class="col-sm-2 control-label" for="name">Username</label>
					<div class="col-sm-10">
						<input v-model="newUser.username" name="name" type="text" class="form-control" placeholder="Username">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="email">Email</label>
					<div class="col-sm-10">
						<span class="form-control">{{userTitle}}</span> <input v-model="newUser.email" name="email" type="hidden">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="name">Full name</label>
					<div class="col-sm-10">
						<!-- <input v-model="newUser.fullname" name="name" type="text" class="form-control" placeholder="Full name"> -->
						<input name="name" v-model="newUser.fullname" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" class="form-control" placeholder="Fullname">
            <i v-show="errors.has('name')" class="fa fa-warning"></i>
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="name">Phone number</label>
					<div class="col-sm-10">
						<!-- <input v-model="newUser.phoneNo" type="text" class="form-control input-medium bfh-phone" data-format="+61 (ddd) ddd-dddd"> -->
						<input name="phone" v-model="newUser.phoneNo" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" class="form-control input-medium bfh-phone" placeholder="Phone">
            <i v-show="errors.has('phone')" class="fa fa-warning"></i>
            <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="name">Date of Birth</label>
					<div class="col-sm-10">
						<input v-model="newUser.dob" type="date" class="form-control" id="dob" placeholder="Date of Birth">
					</div>
				</div>
				<legend>Address Details</legend>
				<!-- Text input-->
				<div class="form-group">
					<label class="col-sm-2 control-label" for="textinput">Line 1</label>
					<div class="col-sm-10">
						<input v-model="newUser.add1" type="text" placeholder="Address Line 1" class="form-control">
					</div>
				</div>
				<!-- Text input-->
				<div class="form-group">
					<label class="col-sm-2 control-label" for="textinput">Line 2</label>
					<div class="col-sm-10">
						<input v-model="newUser.add2" type="text" placeholder="Address Line 2" class="form-control">
					</div>
				</div>
				<!-- Text input-->
				<div class="form-group">
					<label class="col-sm-2 control-label" for="textinput">City</label>
					<div class="col-sm-10">
						<input v-model="newUser.city" type="text" placeholder="City" class="form-control">
					</div>
				</div>
				<!-- Text input-->
				<div class="form-group">
					<label class="col-sm-2 control-label" for="textinput">State</label>
					<div class="col-sm-4">
						<input v-model="newUser.state" type="text" placeholder="State" class="form-control">
					</div>

					<label class="col-sm-2 control-label" for="textinput">Postcode</label>
					<div class="col-sm-4">
						<!-- <input v-model="newUser.postcode" type="text" placeholder="Post Code" class="form-control"> -->
						<input name="postcode" v-model="newUser.postcode" v-validate="'required|numeric|max:4'" :class="{'input': true, 'is-danger': errors.has('postcode') }" type="text" placeholder="postcode" class="form-control">
            <i v-show="errors.has('postcode')" class="fa fa-warning"></i>
            <span v-show="errors.has('postcode')" class="help is-danger">{{ errors.first('postcode') }}</span>
					</div>
				</div>
				<!-- Text input-->
				<div class="form-group">
					<label class="col-sm-2 control-label" for="textinput">Country</label>
					<div class="col-sm-10">
						<input v-model="newUser.country" type="text" placeholder="Country" class="form-control">
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<div class="pull-right">
							<a class="btn btn-success my-2 my-sm-0" v-on:click="addUser"><span v-if="newUser.email == ''">Add Details</span><span v-if="newUser.email !== ''">Update</span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
</template>

<script>
	import * as firebase from "firebase";
	let db = firebase.database();
	let usersRef = db.ref('users');

	export default {
		data () {
			return {
				userId : '',
				userTitle : '',
				newUser : {
					email : '',
					username : '',
					fullname : '',
					phoneNo : '',
					dob : '',
					add1 : '',
					add2 : '',
					city : '',
					state : '',
					postcode : '',
					country : ''
				},
			}
		},
		created () {
			this.userId = this.$route.params.userId;
			var uid = firebase.auth().currentUser.uid;
			this.userTitle = firebase.auth().currentUser.email;
			usersRef.child(uid)
				.once('value')
				.then((snapshot) => {
					var value = snapshot.val();
					if (value) {
						this.newUser = value;
					}
					console.log(this.newUser);
				});

		},
		methods : {
			addUser : function() {
				alert('Update details')
				this.newUser.email = this.userTitle;
				//usersRef.push(this.newUser);
				var uid = firebase.auth().currentUser.uid;
				usersRef.child(uid).set(this.newUser)
			}
		}
	}
</script>

<style>
</style>
