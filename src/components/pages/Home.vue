<template>
    <div class="container">
      <h1>Main events</h1>
      <hr />
        <ul>
              <li class="single_event" v-for="event in events" :key="event['.key']">
                <div class="row">
                  <div class="col-sm-3" v-model="newEvent.pic_url">
                    <img v-bind:src="event.pic_url">
                  </div>
                  <div class="col-sm-6">
                    <p class="text-info">
                      <b>{{event.location}}: {{event.name}} | Date: {{event.created}}</b>
                    </p>
                    <p>Description: {{event.description}}</p>
                  </div>
                  <div class="col-sm-3">
                    <a href="javascript:;" class="btn btn-primary" @click="viewDetail(event)">View Details</a>
                  </div>
              </div>
              <hr />
              </li>
        </ul>
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
      events: [],
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
  	viewDetail: function(event) {
			console.log("viewDetail:" + event);
			this.newEvent = event;
			const childKey = event['.key'];
			this.$router.push({ name:'/eventDetail/:id', params: { id: childKey } })
		}
  },
  created() {
		this.$bindAsArray('events', eventsRef);
	}
}
</script>

<style scoped>
  .right {float: right;}
  img {
    height: 100px;
    float: left;
    border: 1px;
    margin: 5px;
  }
  .single_event {
    /*border: red;*/
    margin: auto;
    padding-top: 5px;
  }
  ul { list-style-type: none; }
</style>
