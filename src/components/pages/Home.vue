<template>
    <div class="container">
      <h1>Main events</h1>
      <hr />
      <div class="tab-pane fade in active" v-for="event in events" :key="event['.key']">
		<div class="media">
			<img v-bind:src="event.pic_url" v-model="event.pic_url" class="pull-left media-object">
			<div class="media-body">
				<p class="text-info col-sm-12">
				  <b>{{event.location}}: {{event.name}} | Date: {{event.created}}</b>
				</p>
				<p><strong>Description:</strong> {{event.description}}</p>
				<p class="text-right">
					<a href="javascript:;" class="btn btn-primary" @click="viewDetail(event)">View Details</a>
				</p>
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
  			price: 0,
  			rest: 0,
  			quantity: 0,
  			seats_available: 0,
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
  .media img {
    width: 200px;
    float: left;
    border: 1px;
    margin: 5px;
  }
  ul { list-style-type: none; }

  .tab-pane{
	    padding-bottom: 30px;
  }
</style>
