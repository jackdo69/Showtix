<template> <transition name="modal">
<div class="modal-mask" v-show="show">
	<div class="modal-container">
		<form class="form-horizontal">
			<div class="modal-header">
				<h3>Order detail: {{event.name}}</h3>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label class="col-sm-6 control-label">Quantity Type A</label>
					<div class="col-sm-4">
						<input v-model="event.quantityA" type="hidden">
						<input v-model="event.quantityB" type="hidden">
						<input v-model="event.quantityC" type="hidden">
						<input v-model="quantityA" type="number" min="0" placeholder="quantity" class="form-control">
						<span v-if="errA" style="color:red">Error: out of range</span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-6 control-label">Quantity Type B</label>
					<div class="col-sm-4">
						<input v-model="quantityB" type="number" min="0" placeholder="quantity" class="form-control">
						<span v-if="errB" style="color:red">Error: out of range</span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-6 control-label">Quantity Type C</label>
					<div class="col-sm-4">
						<input v-model="quantityC" type="number" min="0" placeholder="quantity" class="form-control">
						<span v-if="errC" style="color:red">Error: out of range</span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-6 control-label">Total: <span
						v-model="total">{{event.priceA * quantityA + event.priceB * quantityB + event.priceC * quantityC}}</span> USD
					</label>
				</div>
				<div class="text-center" style="padding: 10px;">
					<img src="../../assets/pay-icon.png" style="width: 50%" />
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label">Card number</label>
					<div class="col-sm-8">
						<input type="number" placeholder="Card number"
							class="form-control">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label">Expired Date</label>
					<div class="col-sm-4">
						<input v-model.number="month" min="1" max="12" placeholder="Month"
							class="form-control">
					</div>
					<div class="col-sm-4">
						<input v-model.number="year" placeholder="Year"
							class="form-control">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label">CVC</label>
					<div class="col-sm-8">
						<input v-model="cvc" type="text" placeholder="CVC"
							class="form-control">
					</div>
				</div>
			</div>
			<div class="modal-footer text-center">
				<a href="#" class="btn btn-default modal-default-button"
					@click="dismissModal()"> Cancel </a> <a href="#"
					class="btn btn-success modal-default-button" @click="buy()">
					Buy </a>
			</div>
		</form>
	</div>
</div>
</transition> </template>

<script>
  import Vue from 'vue'
  import eventRepository from '../../data/EventRepository'
  import EventBus from '../../components/EventBus'
  import * as firebase from "firebase";
  let db = firebase.database();
  let eventsRef = db.ref('events')
  let historyRef = db.ref('history')
	import moment from 'moment'
	import Auth from '../../data/Auth'
	
  export default {
	  props: ['show'],
    data () {
      return {
        event: {
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
  		history: {
      		childKey: '',
  			buyer: '',
  			eventName: '',
  			startDate: '',
  			pic_url: '',
  			location: '',
  			ticketId: '',
  			total: 0,
  			priceA: 0,
  			priceB: 0,
  			priceC: 0,
  			quantityA: 0,
  			quantityB: 0,
  			quantityC: 0,
  			created: moment().format('MM/DD/YYYY hh:mm')
  		},
  		total: 0,
  		quantityA: 1,
  		quantityB: 0,
  		quantityC: 0,
  		month: 1,
  		year: 1990,
  		cvc: '',
  		errA: false,
  		errB: false,
  		errC: false,
      }
    },
    watch:{
    	quantityA: function(val){
    		if(Number(val) > Number(this.event.quantityA)){
    			this.errA = true;
    			alert("Error: out of range");
    			this.quantityA = this.event.quantityA; 
    		}else{
    			this.errA = false;
    		}
    	},
    	quantityB: function(val){
    		if(Number(val) > Number(this.event.quantityB)){
    			this.errB = true;
    			alert("Error: out of range");
    			this.quantityB = this.event.quantityB;
    		}else{
    			this.errB = false;
    		}
    	},
    	quantityC: function(val){
    		if(Number(val) > Number(this.event.quantityC)){
    			this.errC = true;
    			alert("Error: out of range");
    			this.quantityC = this.event.quantityC;
    		}else{
    			this.errC = false;
    		}
    	}
      	
      },
    created () {    	
      EventBus.$on('open-modal-purchase', (event) => {
    	  this.event = Vue.util.extend({}, event)
    	  //this.$emit('open');
      })
    },
    beforeDestroy () {
      EventBus.$off('open-modal-purchased')
    },

    methods: {
      dismissModal () {
        this.$emit('close');
      },
      buy () {
      	//update event Quantity
      	this.event.quantityA = Number(this.event.quantityA) - Number(this.quantityA);
      	this.event.quantityB = Number(this.event.quantityB) - Number(this.quantityB);
      	this.event.quantityC = Number(this.event.quantityC) - Number(this.quantityC);
      	
      	var childKey = this.$route.params.id;
      	//console.log("childKey:" + childKey);
      	eventsRef.child(childKey).set(this.event)
      	//console.log("buy:buy");
      	//console.log(this.event);
      	//store history
      	var authed = Auth.getAuth();
      	this.history.childKey = childKey;
      	this.history.priceA = this.event.priceA;
      	this.history.priceB= this.event.priceB;
      	this.history.priceC= this.event.priceC;
      	this.history.quantityA= this.quantityA;
      	this.history.quantityB= this.quantityB;
      	this.history.quantityC= this.quantityC;
      	this.history.buyer = authed.providerData[0].email;
      	this.history.eventName= this.event.name;
      	this.history.total= this.event.priceA * this.quantityA + this.event.priceB * this.quantityB + this.event.priceC * this.quantityC;
      	this.history.startDate = this.event.created;
      	this.history.pic_url = this.event.pic_url;
      	this.history.location = this.event.location;
      	this.history.ticketId = Math.floor(Math.random() * (99999 -11111 +1)) + 11111;
      	var path = historyRef.push(this.history);
      	console.log(path.key);
      	this.$emit('close');
      	//https://test-e9402.firebaseio.com/history/-KvaWusPCqhX37VfDcLy
      	this.$router.push({ name:'/printOrder/:id', params: { id: path.key } })
			
      }
    }
  }
</script>
<style>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	transition: opacity .3s ease;
}

.modal-container {
	width: 500px;
	margin: 40px auto 0;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 5px 0;
}

.text-right {
	text-align: right;
}

.text-center {
	text-align: center;
}

.form-label {
	display: block;
	margin-bottom: 1em;
}

.form-label>.form-control {
	margin-top: 0.5em;
}

.form-control {
	display: block;
	width: 100%;
	padding: 0.5em 1em;
	line-height: 1.5;
	border: 1px solid #ddd;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container, .modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
