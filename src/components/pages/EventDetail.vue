<template>
  <div class="container">
	  <h1>Event detail</h1>
	  <hr />
	  <div class="tab-pane fade in active">
			<div class="media">
				<img v-bind:src="newEvent.pic_url" v-model="newEvent.pic_url" class="pull-left media-object">
				<div class="media-body">
					<div class="text-info col-sm-12">
					  <b>{{newEvent.location}}: {{newEvent.name}} | Date: {{newEvent.created}}</b>
					</div>
					<div class="col-sm-12 text-right" style="padding-bottom:10px">
						<strong>Type A - Price: </strong> <span class="text-danger">{{newEvent.priceA}} USD</span>  |
						<strong>Type B - Price: </strong> <span class="text-danger">{{newEvent.priceB}} USD</span>  |
						<strong>Type C - Price: </strong> <span class="text-danger">{{newEvent.priceC}} USD</span>
					</div>
					<div class="text-left"><strong>Description:</strong> {{newEvent.description}}</div>
					<div class="text-right" style="padding:10px">
						<a class="btn btn-success my-2 my-sm-0" v-on:click.prevent="gotoLogin" v-if="!user">Login to purchase</a>
						<a class="btn btn-success my-2 my-sm-0" v-on:click.prevent="purchase(newEvent)" v-if="user">Purchase</a>
					</div>
					<div class="text-left"><strong>Detail:</strong> {{newEvent.detail}}</div>
				</div>
			</div>
	  </div>
	  <purchase :show="showModal" @close="showModal = false"></purchase>
  </div>

</template>

<script>

import eventRepository from '../../data/EventRepository'
  import EventBus from '../../components/EventBus'
  import * as firebase from "firebase";
  let db = firebase.database();
  let eventsRef = db.ref('events')
import moment from 'moment'
import Auth from '../../data/Auth'
  import checkAuth from '../../data/checkAuth'
  import purchase from './purchase'
export default {
	  components: {
		    purchase
		  },
  data () {
    return {
       newEvent: {
  			name: '',
  			pic_url: '',
  			location: '',
  			description: '',
  			detail: '',
  			price: 0,
  			rest: 0,
  			quantity: 0,
  			seats_available: 0,
  			created: moment().format('MM/DD/YYYY hh:mm')
  		},
		user: null,
		showModal: false
    }
  },
  methods:{
  	processUser (authed) {
		if (authed === null) {
		  this.user = null
		  return
		}
		this.user = {
		  isAdmin: checkAuth.isAdmin(authed.providerData[0].email)
		}
	  },
	  gotoLogin () {
		  this.$router.push('/auth')
		},
		purchase(event){
			console.log("gotoPurchase11");
			console.log(event);
			EventBus.$emit('open-modal-purchase',event);
			this.showModal = true;
		}

  },
  created() {
    	Auth.onAuth(this.processUser) // processUser everytime auth state changes (signs in or out)
        this.processUser(Auth.getAuth()) // processUser in case user is already signed in
  		this.id = this.$route.params.id;
  		eventsRef.child(this.id)
	    .once('value')
	    .then((snapshot) => {
			  var value = snapshot.val();
			  this.newEvent = value;
			});

	}
}
</script>

<style>
.media img{
	width:200px;
}


</style>
