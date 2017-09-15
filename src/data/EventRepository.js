import EventEmitter from 'events'
import Firebase from 'firebase'
import Auth from '../data/Auth'

class EventRepository extends EventEmitter {

  constructor () {
    super()
    this.ref = Firebase.database().ref('events')
  }
  get uid () {
    let user = Firebase.auth().currentUser
    if (user) {
      return user.uid
    }
    return null
  }

  get journalid () {
    var path = window.location.pathname.split('/detail/')
    return path[1]
  }

  get eventsRef () {
    // return Firebase.database().ref(`users/${this.uid}/journals/${this.journalid}/events`)
    return Firebase.database().ref('users').child(this.uid).child('journals')
    .child(this.journalid).child('events')
  }
  create ({title = '', content = ''}, onComplete) {
    this.eventsRef.push({title, content}, onComplete)
  }
  update ({key, title = '', content = ''}, onComplete) {
    this.eventsRef.child(key).update({title, content}, onComplete) // key is used to find the child, a new event object is made without the key, to prevent key being inserted in Firebase
  }
  remove ({key}, onComplete) {
    this.eventsRef.child(key).remove(onComplete)
  }
  attachFirebaseListeners () {
    Auth.onAuth((user) => {
      this.emit('userAuth', user)
      this.eventsRef.on('child_added', this.onAdded, this)
      this.eventsRef.on('child_removed', this.onRemoved, this)
      this.eventsRef.on('child_changed', this.onChanged, this)
    })
  }

  detachFirebaseListeners () {
    this.eventsRef.off('child_added', this.onAdded, this)
    this.eventsRef.off('child_removed', this.onRemoved, this)
    this.eventsRef.off('child_changed', this.onChanged, this)
  }
  onAdded (snapshot) {
    let event = this.snapshotToEvent(snapshot)
    // propagate event outwards with event
    this.emit('added', event)
  }
  onRemoved (oldSnapshot) {
    let event = this.snapshotToEvent(oldSnapshot)
    this.emit('removed', event)
  }
  onChanged (snapshot) {
    let event = this.snapshotToEvent(snapshot)
    this.emit('changed', event)
  }
  onError (err) {
    console.log(err)
  }
  // processes the snapshots to consistent event with key
  snapshotToEvent (snapshot) {
    // we will need the key often, so we always want to have the key included in the event
    let key = snapshot.key
    let event = snapshot.val()
    event.key = key
    return event
  }
  // Finds the index of the event inside the array by looking for its key
  findIndex (events, key) {
    return events.findIndex(event => event.key === key)
  }
  // Finds the event inside the array by looking for its key
  find (events, key) {
    return events.find(event => event.key === key)
  }
}
export default new EventRepository() // this instance will be shared across imports
