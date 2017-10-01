import adminAcc from './admin.json';
import EventEmitter from 'events'
import * as firebase from "firebase";
import Vue from 'vue'
import VueFire from 'vuefire'

class CheckAuth extends EventEmitter {
	  constructor () {
	    super()
	  }
	  isAdmin(email) {
	    	var isAdmin = false;
	    	var i =0;
	    	for (i in adminAcc) {
			    if(adminAcc[i] == email){
			    	isAdmin = true;
			    }
			}

	    	console.log("CheckAuth isAdmin:" + isAdmin);
			return isAdmin;
	    }
}

export default new CheckAuth()
