<template>
<transition name="modal">
<div class="modal-mask" v-show="show">
    <div class="modal-container">
    <form class="form-horizontal">
        <div class="modal-header">
            <h3>Order detail</h3>
        </div>
        <div class="modal-body">
        	    <div>Event name: {{event.name}}</div>
                <div class="form-group">
                	<label class="col-sm-3 control-label">Select Type</label>
                	<div class="col-sm-4">
                	<select v-model="event.price" class="form-control">
					  <option v-bind:value="{ number: event.priceA }">A</option>
					  <option v-bind:value="{ number: event.priceB }">B</option>
					  <option v-bind:value="{ number: event.priceC }">C</option>
					</select>
					</div>
        		</div>
                <div class="form-group">
                	<label class="col-sm-3 control-label">Quantity</label>
                	<div class="col-sm-4">
                		<input v-model.number="quantity" type="number" min="1" placeholder="quantity" class="form-control">
                    </div>
                    <label class="col-sm-6 control-label">Total: <span v-model="total">{{event.price.number * quantity}}</span> USD</label>
                </div>
                <div class="text-center" style="padding: 10px;"><img src="../../assets/pay-icon.png" style="width: 50%"/></div>
                <div class="form-group">
                	<label class="col-sm-4 control-label">Card number</label>
                    <div class="col-sm-8"><input type="number" placeholder="Card number" class="form-control"></div>
                </div>
                <div class="form-group">
                	<label class="col-sm-4 control-label">Expired Date</label>
                    <div class="col-sm-4"><input v-model.number="month" min="1" max="12" placeholder="Month" class="form-control"></div>
                    <div class="col-sm-4"><input v-model.number="year" placeholder="Year" class="form-control"></div>
                </div>
                <div class="form-group">
                	<label class="col-sm-4 control-label">CVC</label>
                    <div class="col-sm-8"><input v-model="cvc" type="text" placeholder="CVC" class="form-control"></div>
                </div>
        </div>
        <div class="modal-footer text-center">
            <a href="#" class="btn btn-default modal-default-button" @click="dismissModal()">
                Cancel
            </a>
                <a href="#" class="btn btn-success modal-default-button" @click="buy()">
                Buy
            </a>
        </div>
        </form>
    </div>
</div>
</transition>
</template>
<script>
  import Vue from 'vue'
  import eventRepository from '../../data/EventRepository'
  import EventBus from '../../components/EventBus'
  import moment from 'moment'
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
  			price: 0,
  			rest: 0,
  			quantity: 0,
  			seats_available: 0,
  			created: moment().format('MM/DD/YYYY hh:mm')
  		},
  		total: 0,
  		quantity: 1,
  		month: 1,
  		year: 1900,
  		cvc: ''
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
      	//store history
      	alert("Proccessing...");
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

.form-label > .form-control {
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

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
