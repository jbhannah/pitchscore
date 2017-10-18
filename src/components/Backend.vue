<template>
  <div id="backend">
    <h1>Backend</h1>

    <table>
      <Player
        v-for="player in players"
        v-on:deletePlayer="deletePlayer"
        v-on:playerFinishedLap="playerFinishedLap"
        v-on:playerUnfinishedLap="playerUnfinishedLap"
        :has-buttons="true"
        :key="player['.key']"
        :player="player" />
    </table>

    <form id="addPlayer" v-on:submit.prevent="addPlayer">
      <input type="text" id="name" placeholder="Name" v-model="newPlayer.name" :class="{ error: !validation.name }" />
      <select v-model="newPlayer.carColor" :class="{ error: !validation.carColor }">
        <option v-for="carColor in carColors" :value="carColor">{{ carColor[0].toUpperCase() + carColor.slice(1) }}</option>
      </select>
      <select v-model="newPlayer.stickerColor" :class="{ error: !validation.stickerColor }">
        <option v-for="stickerColor in stickerColors" :value="stickerColor">{{ stickerColor[0].toUpperCase() + stickerColor.slice(1) }}</option>
      </select>
      <button type="submit">Add</button>
    </form>

    <button type="button" v-on:click="resetData">Reset Data</button>
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
      stickerColor: '',
      laps: []
    }

    return {
      blankPlayer,
      carColors,
      newPlayer: Object.assign({}, blankPlayer),
      stickerColors
    }
  },
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  computed: {
    validation: function () {
      return {
        name: !!this.newPlayer.name.trim() || (!this.newPlayer.carColor.trim() && !this.newPlayer.stickerColor.trim()),
        carColor: !!this.newPlayer.carColor.trim() || (!this.newPlayer.name.trim() && !this.newPlayer.stickerColor.trim()),
        stickerColor: !!this.newPlayer.stickerColor.trim() || (!this.newPlayer.name.trim() && !this.newPlayer.carColor.trim())
      }
    }
  },
  methods: {
    addPlayer: function () {
      this.$emit('addPlayer', this.newPlayer)
      this.newPlayer = Object.assign({}, this.blankPlayer)
      document.getElementById('name').focus()
    },
    deletePlayer: function (key) {
      this.$emit('deletePlayer', key)
    },
    playerFinishedLap: function (key) {
      this.$emit('playerFinishedLap', key)
    },
    playerUnfinishedLap: function (key) {
      this.$emit('playerUnfinishedLap', key)
    },
    resetData: function () {
      if (!confirm('Are you sure?')) { return }
      this.$emit('resetData')
    }
  },
  components: { Player }
}
</script>

<style>
.error {
  border: 1px solid red;
}
</style>
