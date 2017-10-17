<template>
<div>
	<header-bar></header-bar>
	<router-view></router-view>
</div>
</template>
<script>
	import HeaderBar from './components/HeaderBar';
	export default {
		name : 'app',
		components : {
			HeaderBar
		},
		data () {
			return {
				alerts : []
			}
		}
	}
</script>

<style scoped>
</style>
