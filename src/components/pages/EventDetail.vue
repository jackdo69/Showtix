<template>
  <div class="container">
  <h1>Event detail</h1>
  <hr />
  <div class="row">
      <div class="col-sm-3" v-model="newEvent.pic_url">
        <img v-bind:src="newEvent.pic_url">
      </div>
      <div class="col-sm-6">
        <p class="text-info">
          <b>{{newEvent.location}}: {{newEvent.name}} | Date: {{newEvent.created}}</b>
        </p>
        <p>Description: {{newEvent.description}}</p>
        <p>Detail: {{newEvent.detail}}</p>
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



export default {
  data () {
    return {
       newEvent: {
  			name: '',
  			pic_url: '',
  			location: '',
  			description: '',
  			detail: '',
  			price: '',
  			seats_available: '',
  			created: moment().format('MM/DD/YYYY hh:mm')
  		}
    }
  },
  methods:{
  	
  },
  created() {
  		var self = this;
  		this.id = this.$route.params.id;
  		eventsRef.child(this.id)
	    .once('value')
	    .then((snapshot) => {
			  var value = snapshot.val();
			  this.newEvent = value;
				     console.log(this.newEvent.name);
			});
			
	}
}
</script>

<style>

</style>
