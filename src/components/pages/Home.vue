<template>
<div class="container">
  <div class="jumbotron rounded">
    <h1>welcome to SHOWTIX</h1>
    <p>a simple, affordable and efficient ticket reservation system for your next event</p>
  </div>
  <div class="page-header text-center">
    <h1>main events</h1>
  </div>
  <div class="tab-pane rounded fade in active" v-for="event in filteredEvents" :key="event['.key']">
    <div class="media bg-info">
      <img v-bind:src="event.pic_url" v-model="event.pic_url" class="pull-left media-object">
      <div class="well-lg rounded">
        <p class="text-info col-md-12">
          <h2 class="media-heading text-left"> <span class="detailLabels">concert: </span>{{event.name.toLowerCase()}}</h2>
          <h2 class="media-heading text-left"> <span class="detailLabels">venue: </span>{{event.location.toLowerCase()}}</h2>
          <h3 class="media-heading text-left"> <span class="detailLabels">date: </span>{{event.created.toLowerCase()}}</h3>
        </p>
        <p class="text-left"><strong>event description:</strong> {{event.description}}</p>
        <p class="text-right">
          <a href="javascript:;" class="btn-lg btn-primary" @click="viewDetail(event)" style="padding: 10px;">view details</a>
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
  data() {
    return {
      events: [],
      searchQuery: '',
      newEvent: {
        name: '',
        pic_url: '',
        location: '',
        description: '',
        detail: '',
        price: 0,
        rest: 0,
        quantity: 0,
        created: moment().format('MM/DD/YYYY hh:mm')
      }
    }
  },
  computed: {
    filteredEvents() {
      return this.events.filter((event) => {
        if (this.searchQuery) {
          return (event.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1 || event.description.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1)
        }
        return this.events
      })
    }
  },
  methods: {
    viewDetail: function(event) {
      console.log("viewDetail:" + event);
      this.newEvent = event;
      const childKey = event['.key'];
      this.$router.push({
        name: '/eventDetail/:id',
        params: {
          id: childKey
        }
      })

    }
  },
  created() {
    this.$bindAsArray('events', eventsRef);
  },
  mounted() {
    EventBus.$on('search', (searchQuery) => {
      this.searchQuery = searchQuery;
      console.log(this.searchQuery)
    })
  }
}
</script>

<style scoped>
.right {
  float: right;
}

.media img {
  width: 200px;
  float: left;
  border: 1px;
  margin: 5px;
  padding: 25px;
}

ul {
  list-style-type: none;
}

.tab-pane {
  padding-bottom: 30px;
}

.detailLabels {
  font-weight: bolder;
  font-style: italic
}

.h1 {
  font-weight: bolder;
}

.h2 {
  font-style: italic;
}

.text-right {
  padding: 50px;
}

.text-left {
  padding-left: 25px;
}

.page-header {
  font-size: 72;
}
</style>
