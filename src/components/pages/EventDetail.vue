<template>
  <div class="container">
    <div class="jumbotron">
	  <h1>Event detail</h1>
    </div>
  </hr>
  <div class="tab-pane fade in active">
   <div class="media bg-info">
     <img v-bind:src="newEvent.pic_url" v-model="newEvent.pic_url" class="pull-left media-object">
     <div class="well-lg rounded">
       <p class="text-info col-md-12">
         <h1><strong>{{newEvent.location.toLowerCase()}}: {{newEvent.name.toLowerCase()}} - date: {{newEvent.created.toLowerCase()}}</strong></h1>
         <h3><strong>detail:</strong></h3> <div class="text-center">{{newEvent.detail}}</div>
         <br></br>
         <div class="panel panel-primary well-sm col-sm-4">
           <h2 class="panel-heading text-center"> TICKET PRICING </h2>
			<table class="table table-hover table-condensed">
			    <thead>
			      <tr>
			        <th class="text-center">Ticket Type</th>
			        <th class="text-center">Ticket Price</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr>
			        <td class="text-center">Type A</td>
			        <td class="text-center"><span class="text-danger">${{newEvent.priceA}} AUD</span></td>
			      </tr>
			      <tr>
			        <td class="text-center">Type B</td>
			        <td class="text-center" ><span class="text-danger">${{newEvent.priceB}} AUD</span></td>
			      </tr>
			      <tr>
			        <td class="text-center">Type C</td>
			        <td class="text-center"><span class="text-danger">${{newEvent.priceB}} AUD</span></td>
			      </tr>
			   </tbody>
			</table>
			</hr>
			<br></br>
			<br></br>
         </div>
     </p>

       <div class="text-center col-md-4" style="padding:10px" >
         <a class="btn-lg btn-success" v-on:click.prevent="gotoLogin" v-if="!user" id="btn1">Login to purchase</a>
         <a class="btn-lg btn-success" v-on:click.prevent="purchase(newEvent)" v-if="user" id="btn1">Purchase</a>
       </div>
   </hr>
	<purchase :show="showModal" @close="showModal = false"></purchase>
     </div>
   </div>
  </div>
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
 			priceA: 0,
 			priceB: 0,
 			priceC: 0,
 			quantityA: 0,
 			quantityB: 0,
 			quantityC: 0,
 			rest: 0,
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
	width: 200px;
    float: left;
    margin: 20px;
    padding: 20px;
}

.container .panel{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(0%);

}

.container #btn1 {
    position: relative;
    top: 220px;
    transform: translateX(-50%) translateY(0%);

}



</style>
