<template>
  <div class="container" id="printarea">
	  <h1><img src="../../assets/quicktix_logo.jpg" style="width:50px" /> Thanks for your purchase!</h1>
	  <hr />
	  <div class="tab-pane fade in active well-lg">
			<div class="media well-lg">
				<img v-bind:src="history.pic_url" v-model="history.pic_url" class="pull-left media-object">
				<div class="media-body">
					<div class="col-sm-9">
						<div class="text-info col-sm-12" style="padding-bottom:10px;padding-top:20px">
						  <strong>TicketID: </strong><span class="text-danger">{{history.ticketId}}</span>
						</div>
						<div class="text-info col-sm-12" style="padding-bottom:10px">
						  <strong>Event name: </strong><span class="text-danger">{{history.eventName}}</span>
						</div>
						<div class="text-info col-sm-12" style="padding-bottom:10px">
						  <strong>Location: </strong><span class="text-danger">{{history.location}}</span>
						</div>
						<div class="text-info col-sm-12" style="padding-bottom:10px">
						  <strong>Date time: </strong><span class="text-danger">{{history.startDate}}</span>
						</div>
						<div class="text-info col-sm-12" style="padding-bottom:10px">
						  <strong>Buyer: </strong><span class="text-danger">{{history.buyer}}</span>
						</div>
						<div class="text-info col-sm-12" style="padding-bottom:10px"  v-if="history.quantityA > 0">
							<strong>Type A - Price: </strong> <span class="text-danger">{{history.priceA}} x {{history.quantityA}} = {{history.priceA * history.quantityA}} AUD</span>
						</div>
						<div class="text-info col-sm-12" style="padding-bottom:10px" v-if="history.quantityB > 0">
							<strong>Type B - Price: </strong> <span class="text-danger">{{history.priceB}} x {{history.quantityB}} = {{history.priceB * history.quantityB}} AUD</span>
						</div>
						<div class="text-info col-sm-12" style="padding-bottom:10px" v-if="history.quantityC > 0">
							<strong>Type C - Price: </strong> <span class="text-danger">{{history.priceC}} x {{history.quantityC}} = {{history.priceC * history.quantityC}} AUD</span>
						</div>
						<div class="col-sm-12 text-left"  style="padding-bottom:10px" ><strong>Total:</strong> {{history.total}} USD</div>
						<div class="col-sm-12 text-left"  style="padding-bottom:10px" ><strong>Purchase date/time:</strong> {{history.created}}</div>
					</div>
					<div class="col-sm-12">
						<div class="text-center" style="padding:10px">
							<a class="btn btn-success my-2 my-sm-0" v-on:click.prevent="printnow">Print Ticket</a>
						</div>
					</div>
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
  let historyRef = db.ref('history')
import moment from 'moment'
  import checkAuth from '../../data/checkAuth'

export default {
  data () {
    return {
    	history: {
      		childKey: '',
  			buyer: '',
  			eventName: '',
  			total: 0,
  			priceA: 0,
  			priceB: 0,
  			priceC: 0,
  			quantityA: 0,
  			quantityB: 0,
  			quantityC: 0,
  			created: moment().format('MM/DD/YYYY hh:mm')
  		},
  		domain: document.referrer.split('/')[2]
    }
  },
  methods:{
	  printnow: function () {
	      console.log('printnow' )
	      var mywindow = window.open('', 'PRINT', 'height=400,width=600');

	      mywindow.document.write('<html><head><title>' + document.title + '</title>');
	      mywindow.document.write('</head><body >');
	      mywindow.document.write(document.getElementById('printarea').innerHTML);
	      mywindow.document.write('</body></html>');

	      mywindow.document.close(); // necessary for IE >= 10
	      mywindow.focus(); // necessary for IE >= 10

	      mywindow.print();
	      mywindow.close();
	    }

  },
  created() {
	  this.id = this.$route.params.id;
	  historyRef.child(this.id)
	    .once('value')
	    .then((snapshot) => {
			  var value = snapshot.val();
			  this.history = value;
			});
	}
}
</script>

<style>
.media img{
	width:200px;
}


</style>
