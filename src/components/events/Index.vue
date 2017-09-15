<template>
  <div class="events" ref="events">
    <event v-for="event in filteredEvents"
          :event="event">
    </event>
  </div>
</template>
<script>
  import eventRepository from '../../data/EventRepository'
  import Masonry from 'masonry-layout'
  import EventBus from '../../components/EventBus'
  import Event from './Event'

  export default {
    components: {
      Event
    },
    data () {
      return {
        events: [],
        searchQuery: ''
      }
    },
    watch: {
      'filteredEvents': {
        handler () {
          this.$nextTick(() => {
            this.masonry.reloadItems()
            this.masonry.layout()
          })
        }
      },
      deep: true
    },
    computed: {
      filteredEvents () {
        return this.events.filter((event) => {
          if (this.searchQuery) return (event.title.indexOf(this.searchQuery) !== -1 || event.content.indexOf(this.searchQuery) !== -1) // returns truthy if query is found in title or content
          return true
        })
      }
    },
    mounted () {
      this.masonry = new Masonry(this.$refs.events, {
        itemSelector: '.event',
        columnWidth: 320,
        gutter: 16,
        fitWidth: false
      })

      eventRepository.on('added', (event) => {
        this.events.unshift(event)
      })
      eventRepository.on('changed', ({key, title, content}) => {
        let outdatedEvent = eventRepository.find(this.events, key)
        outdatedEvent.title = title
        outdatedEvent.content = content
      })
      eventRepository.on('removed', ({key}) => {
        let eventToRemove = eventRepository.findIndex(this.events, key)
        this.events.splice(eventToRemove, 1)
      })
      EventBus.$on('search', (searchQuery) => {
        this.searchQuery = searchQuery
      })
      eventRepository.attachFirebaseListeners()
    },
    destroyed () {
      eventRepository.detachFirebaseListeners()
      this.events = []
    }
  }
</script>
<style>
  .events {
    margin: 0px
  }
</style>
