<template>
<div class="container">
    <h1>Purchase History</h1>
    <hr />
    <div v-if="this.isAdmin===true">
      <div  v-for="ticket in history" :key="ticket['.key']"  >
      <table class="event">
        <tr>
          <th>
            {{ticket.eventName}}
          </th>
          <th>
            Buyer: {{ticket.buyer}}
          </th>
          <th>
          </th>
          <th>
            Order Date: {{ticket.created}}
          </th>
          <th>
            Order Number: {{ticket.ticketId}}
          </th>
        </tr>
        <tr>
          <td>
            Venue: {{ticket.location}}
          </td>
          <td>
          </td>
          <td>
            Tickets: <ul><li>Ticket A: ${{ticket.priceA}}</li>
            <li>Ticket B: ${{ticket.priceB}} </li>
            <li>Ticket C: ${{ticket.priceC}}</li></ul>
          </td>
          <td>
            Total: ${{ticket.total}}
          </td>
        </tr>
        <tr>
          <td>
            Date/Time: {{ticket.startDate}}
          </td>
          <td>
          </td>
          <td>
            Quantity: <ul><li>Ticket A: {{ticket.quantityA}}</li>
            <li>Ticket B: {{ticket.quantityB}} </li>
            <li>Ticket C: {{ticket.quantityC}}</li></ul>
          </td>
        </tr>
        <tr>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td> <a href="javascript:;" class="btn btn-primary" @click="viewDetail(event)">Save Ticket</a>
          </td>
        </tr>
      </table>
      <hr />
      </div>
    </div>
<div v-else>
  <div v-if="ticket.buyer==userTitle && !this.isAdmin"  v-for="ticket in history" :key="ticket['.key']"  >
  <table class="event">
    <tr>
      <th>
        {{ticket.eventName}}
      </th>
      <th>
        Buyer: {{ticket.buyer}}
      </th>
      <th>
      </th>
      <th>
        Order Date: {{ticket.created}}
      </th>
      <th>
        Order Number: {{ticket.ticketId}}
      </th>
    </tr>
    <tr>
      <td>
        Venue: {{ticket.location}}
      </td>
      <td>
      </td>
      <td>
        Tickets: <ul><li>Ticket A: ${{ticket.priceA}}</li>
        <li>Ticket B: ${{ticket.priceB}} </li>
        <li>Ticket C: ${{ticket.priceC}}</li></ul>
      </td>
      <td>
        Total: ${{ticket.total}}
      </td>
    </tr>
    <tr>
      <td>
        Date/Time: {{ticket.startDate}}
      </td>
      <td>
      </td>
      <td>
        Quantity: <ul><li>Ticket A: {{ticket.quantityA}}</li>
        <li>Ticket B: {{ticket.quantityB}} </li>
        <li>Ticket C: {{ticket.quantityC}}</li></ul>
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td> <a href="javascript:;" class="btn btn-primary" @click="viewDetail(event)">Save Ticket</a>
      </td>
    </tr>
  </table>
  <hr />
  </div>
</div>



    </div>
</template>
<script>

  import Vue from 'vue'
  import eventRepository from '../../data/EventRepository'
  import EventBus from '../../components/EventBus'
  import moment from 'moment'
  import * as firebase from "firebase";
  let db = firebase.database();
  let historyRef = db.ref('history')

  import Auth from '../../data/Auth'
  import checkAuth from '../../data/checkAuth'
  import purchase from './purchase'

  export default {
    data () {
      return {
        userTitle: firebase.auth().currentUser.email,
        purchaseHistory: [],
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
  			created: '',
        useremail : '',
  		},
      isAdmin: false,
      }
    },
    methods: {
      processUser(authed) {
        if (authed === null) {
          this.isAdmin = false
          return
        }
        this.isAdmin = checkAuth.isAdmin(authed.providerData[0].email)
      }
    },
    created() {
      // this.userTitle = firebase.auth().currentUser.email;
      this.$bindAsArray('history', historyRef);
      Auth.onAuth(this.processUser) // processUser everytime auth state changes (signs in or out)
      this.processUser(Auth.getAuth()) // processUser in case user is already signed in

      console.log(this.isAdmin + '123')

    }
  }
</script>

<style>
.event {
  table-layout: fixed;
  background-color: #E0E0E0;
  width: 100%;
}
.event th {
    background-color: #b3e6cc;
    color: black;
    padding: 10px;
    font-size: 16px;
}
.event td {
    padding: 8px;
}
</style>
