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
      <select v-model="newPlayer.carColor">
        <option v-for="carColor in carColors" :value="carColor">{{ carColor[0].toUpperCase() + carColor.slice(1) }}</option>
      </select>
      <select v-model="newPlayer.stickerColor">
        <option v-for="stickerColor in stickerColors" :value="stickerColor">{{ stickerColor[0].toUpperCase() + stickerColor.slice(1) }}</option>
      </select>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import Player from '@/components/Player'

const carColors = [
  'black',
  'blue',
  'green',
  'orange',
  'pink',
  'red',
  'yellow',
  'white'
]

const stickerColors = [
  'black',
  'pink',
  'white'
]

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
      carColors,
      stickerColors,
      newPlayer: Object.assign({}, blankPlayer)
    }
  },
  props: {
    players: {
      type: Array,
      required: true
    }
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
