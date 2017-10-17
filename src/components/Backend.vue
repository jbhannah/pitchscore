<template>
  <div class="backend">
    <h1>Backend</h1>

    <ul>
      <Player
        v-for="player in players"
        v-on:deletePlayer="deletePlayer"
        :has-buttons="true"
        :key="player['.key']"
        :player="player" />
    </ul>

    <form id="addPlayer" v-on:submit.prevent="addPlayer">
      <input type="text" v-model="newPlayer.name" placeholder="Name" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import Player from '@/components/Player'

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
    },
    deletePlayer: function (key) {
      this.$emit('deletePlayer', key)
    }
  },
  components: { Player }
}
</script>

<style>

</style>
