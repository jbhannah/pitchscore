<template>
  <li class="player">
    {{ player.name }}
    <button type="button" v-if="hasButtons" v-on:click="deletePlayer">🗑</button>
  </li>
</template>

<script>
export default {
  name: 'player',
  props: {
    player: {
      type: Object,
      required: true
    },
    hasButtons: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deletePlayer: function () {
      this.$emit('deletePlayer', this.player['.key'])
    }
  }
}
</script>

<style>

</style>
