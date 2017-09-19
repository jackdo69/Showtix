<template>
<div>
<div class="container">
<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">Add a Event</h3>
	</div>
	<div class="panel-body">
		<form id="form">
			<div class="row">
			  <div class="col-xl-6">
			    <div class="form-group">
				<label for="name">Event Name</label>
				<input name="name" v-model="newEvent.name" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" class="form-control" placeholder="Event Name">
				<i v-show="errors.has('name')" class="fa fa-warning"></i>
            	<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
			</div>
			<div class="form-group">
				<label for="basic-url">Pic URL</label>
				<input v-model="newEvent.pic_url" type="text" class="form-control" id="pic_url">
			</div>
			<div class="form-group">
				<label for="description">description</label>
				<input v-model="newEvent.description" type="text" class="form-control" id="description" placeholder="Event description">
			</div>
			<div class="form-group">
				<label for="location">location</label>
				<input v-model="newEvent.location" type="text" class="form-control" id="location" placeholder="Event location">
			</div>
			<div class="form-group">
			<label for="price">price</label>
			<input name="price" v-model="newEvent.price" type="text" class="form-control" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('price') }" placeholder="Event price">
			<i v-show="errors.has('price')" class="fa fa-warning"></i>
            	<span v-show="errors.has('price')" class="help is-danger">{{ errors.first('price') }}</span>
		</div>
		<div class="form-group">
			<label for="seats_available">seats_available</label>
			<input v-model="newEvent.seats_available" type="text" class="form-control" id="seats_available" placeholder="Event seats_available">
		</div>
		<div class="form-group">
			<label for="seats_available">Created</label>
			<input v-model="newEvent.created" type="text" class="form-control" id="created" placeholder="created">
		</div>
			  </div>
			  <div class="col-xl-6">
			     <div class="form-group">
				<label for="detail">detail</label>
				<textarea v-model="newEvent.detail" name="" id="detail" cols="60" rows="10"></textarea>
			</div>
			<a class="btn btn-success my-2 my-sm-0" v-if="newEvent['.key']" v-on:click="updateEvent(newEvent)">Update</a>
			<a class="btn btn-success my-2 my-sm-0" v-if="!newEvent['.key']" v-on:click="addEvent">Add Event</a>
			  </div>
			          
			</div>
		</form>
	</div>
</div>
</div>
<div class="container">
<div class="panel panel-default">
	<!-- Default panel contents -->
	<div class="panel-heading">Events</div>
	<!-- Table -->
	<table class="table table-striped">
		<tr>
			<th>Event Name</th>
			<th>Pic URL</th>
			<th>location</th>
			<th style="width:20%">description</th>
			<th>price</th>
			<th>seats_available</th>
			<th>created</th>
			<th>Actions</th>
		</tr>
		<tr v-for="event in events" :key="event['.key']">
			<td contenteditable v-model="newEvent.name">{{event.name}}</td>
			<td v-model="newEvent.pic_url"><img v-bind:src="event.pic_url"></td>
			<td>{{event.location}}</td>
			<td>{{event.description}}</td>
			<td>{{event.price}}</td>
			<td>{{event.seats_available}}</td>
			<td>{{event.created}}</td>
			<td>
				<button v-on:click="editEvent(event)" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>
				<button v-on:click="removeEvent(event)" type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>
			</td>
		</tr>
	</table>
</div>

<ul class="errors">
</ul>
</div>
</div>
</template>
<script>
  import eventRepository from '../../data/EventRepository'
  import EventBus from '../../components/EventBus'
  import Event from './Event'
  import * as firebase from "firebase";
  //import toastr from 'toastr'
  let db = firebase.database();
  let eventsRef = db.ref('events')
import moment from 'moment'

/*- Name
- Pic URL
- Time
- Location
- Short Description (display on Home)
- Detail (Display on Detail page)
- Price (Display on detail Page)
- Seats available (Display on Detail Page)*/

  
  export default {
    components: {
      Event
    },
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
    watch: {
     
    },
    methods: {
		addEvent: function () {
			alert("addEvent::validate:");
			this.$validator.validateAll().then((result) => {
		       	alert("validateBeforeSubmit" + result);
		        if (result) {
					eventsRef.push(this.newEvent);
					this.newEvent.name= '';
					this.newEvent.pic_url= '';
					this.newEvent.location= '';
					this.newEvent.description= '';
					this.newEvent.detail= '';
					this.newEvent.price= '';
					this.newEvent.seats_available= '';
					this.newEvent.created= moment().format('MM/DD/YYYY hh:mm');
					return true;
				}else{
		        	alert("From false!" + this.validate);
		          	return false;
		        }
		      });
		},
		editEvent: function(event) {
			// Set event values to form
			this.newEvent = event
		},
		updateEvent: function(event) {
			console.log("addEvent::validate:");
			this.$validator.validateAll().then((result) => {
		       	alert("validateBeforeSubmit" + result);
		        if (result) {
					//event.name = "changed"
					const childKey = event['.key'];
					/*
					 * Firebase doesn't accept speacial chars as value
					 * so delete `.key` property from the event
					 */
					delete event['.key'];
					/*
					 * Set the updated event value
					 */
					this.$firebaseRefs.events.child(childKey).set(event)
					return true;
				}else{
		        	alert("From false!" + this.validate);
		          	return false;
		        }
	      });
		}, 
    removeEvent: function (event) {
      eventsRef.child(event['.key']).remove()
			//toastr.success('Event removed successfully')
      		alert("Event removed successfully");
    }, 
		
  },
	// Explicitly set binding data to firebase as an array.
	created() {
		this.$bindAsArray('events', eventsRef);
	}
  }
</script>
<style>
  .events {
    margin: 0px
  }
  
  .col-6{    
padding: 20px;
  width: 50%;}
  
  .table-striped img{
	  width:100px;
  }
  .is-danger{
   color:red;
  }
</style>
