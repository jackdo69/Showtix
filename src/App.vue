<template>
  <div>
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import EventBus from './components/EventBus'
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app',
  components: {
    HeaderBar,
  },
  data () {
    return {
      alerts: []
    }
  },
  beforeDestroy () {
    EventBus.$off('alert')
  },
  methods: {
    showAlert (alert) {
      this.alerts.push(alert)
      setTimeout(() => {
        this.alerts.splice(alert, 1)
      }, alert.duration || 1500)
    }
  }
}
</script>

<style scoped>
 
</style>
