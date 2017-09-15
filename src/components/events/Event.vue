<template>
  <div class="event">
    <h2>{{event.title}}</h2>
    <pre>{{event.content}}</pre>
    <button type="button" v-on:click.stop="remove">
      <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    <button class="edit" type="button" @click="updateModal">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
  </div>
</template>
<script>
  import eventRepository from '../../data/EventRepository'
  import EventBus from '../EventBus'

  export default {
    props: ['event'],
    methods: {
      remove () {
        eventRepository.remove(this.event, (err) => {
          if (err) {
            EventBus.$emit('alert', {type: 'error', message: err.message})
          }
        })
      },
      updateModal () {
        EventBus.$emit('event.selected', this.event)
      }
    }
  }
</script>

<style>
  .event {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 10px #ccc;
    padding: 16px;
    width: 320px;
    margin: 16px 0;
  }
  .event h2{
    /*font-size: 1.1em;*/
    margin-bottom: 8px;
  }
  .event pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
  .event button{
    background: none;
    border: none;
    font-size: 20px;
    opacity: 0;
    cursor: pointer;
    transition: opacity .5s;
    margin: 0 4px 0 0;
  }
  .event button.edit{
    float: right;
  }
  .event:hover, .event:focus{
    box-shadow: 0 1px 8px #797979;
  }
  .event:hover button, .event:focus button{
    opacity: 0.6;
  }
</style>
