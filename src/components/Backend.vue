<template>
  <div class="backend">
    <h1>Backend</h1>

    <ul>
      <li v-for="player in players">{{ player.name }}</li>
    </ul>

    <form id="addPlayer" v-on:submit.prevent="addPlayer">
      <input type="text" v-model="newPlayer.name" placeholder="Name" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'backend',
  data () {
    const blankPlayer = {
      name: '',
      carColor: '',
      stickerColor: ''
    }

    return {
      blankPlayer,
      newPlayer: Object.assign({}, blankPlayer)
    }
  },
  props: {
    players: Array
  },
  methods: {
    addPlayer: function () {
      this.$emit('addPlayer', this.newPlayer)
      this.newPlayer = Object.assign({}, this.blankPlayer)
    }
  }
}
</script>

<style>

</style>
