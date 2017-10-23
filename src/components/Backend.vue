<template>
  <div id="backend">
    <h1>Backend</h1>

    <table>
      <thead>
        <tr>
          <th colspan="4"></th>
          <th>Q</th>
          <th v-for="lap in lapCount">{{ lap }}</th>
        </tr>
      </thead>
      <tbody>
        <Player
          v-for="player in sortedPlayers"
          @deletePlayer="deletePlayer"
          @editPlayer="editPlayer"
          @playerFinishedLap="playerFinishedLap"
          @playerUnfinishedLap="playerUnfinishedLap"
          :has-buttons="true"
          :lapCount="lapCount"
          :key="player['.key']"
          :player="player" />
      </tbody>
    </table>

    <form @submit.prevent="addOrSavePlayer">
      <input id="name" placeholder="Name" type="text" v-model="newPlayer.name" :class="{ error: !validation.name }" />
      <label for="carColor">Car</label>
      <select id="carColor" v-model="newPlayer.carColor" :class="{ error: !validation.carColor }">
        <option v-for="carColor in carColors" :value="carColor">{{ carColor[0].toUpperCase() + carColor.slice(1) }}</option>
      </select>
      <label for="stickerColor">Sticker</label>
      <select for="stickerColor" v-model="newPlayer.stickerColor" :class="{ error: !validation.stickerColor }">
        <option v-for="stickerColor in stickerColors" :value="stickerColor">{{ stickerColor[0].toUpperCase() + stickerColor.slice(1) }}</option>
      </select>
      <button type="submit">{{ newPlayer.hasOwnProperty('.key') ? 'Save' : 'Add' }}</button>
      <button type="reset" @click="resetNewPlayer">Cancel</button>
    </form>

    <label for="lapCount">Laps</label>
    <input id="lapCount" type="number" min="1" v-model="mutableLapCount" />
    <button type="button" @click="resetLaps">Reset Laps</button>
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
  'silver',
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
      stickerColors,
      triedAddPlayer: false
    }
  },
  props: {
    lapCount: {
      type: Number,
      required: true
    },
    players: {
      type: Array,
      required: true
    }
  },
  computed: {
    isValid: function () {
      const validation = this.validation
      return Object.keys(validation).every((key) => validation[key])
    },
    mutableLapCount: {
      get: function () {
        return this.lapCount
      },
      set: function (lapCount) {
        this.$emit('setLapCount', parseInt(lapCount))
      }
    },
    sortedPlayers: function () {
      let players = this.players
      players.sort((a, b) => {
        if ((a.laps || []).length > 0 || (b.laps || []).length > 0) {
          return ((a.laps || [])[0] || this.players.length) - ((b.laps || [])[0] || this.players.length)
        } else if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        } else {
          return 0
        }
      })
      return players
    },
    validation: function () {
      return {
        name: !!this.newPlayer.name.trim() || (!this.newPlayer.carColor.trim() && !this.newPlayer.stickerColor.trim() && !this.triedAddPlayer),
        carColor: !!this.newPlayer.carColor.trim() || (!this.newPlayer.name.trim() && !this.newPlayer.stickerColor.trim() && !this.triedAddPlayer),
        stickerColor: !!this.newPlayer.stickerColor.trim() || (!this.newPlayer.name.trim() && !this.newPlayer.carColor.trim() && !this.triedAddPlayer)
      }
    }
  },
  methods: {
    addOrSavePlayer: function () {
      this.triedAddPlayer = true
      if (!this.isValid) { return }

      this.$emit('addOrSavePlayer', this.newPlayer)
      this.triedAddPlayer = false
      this.resetNewPlayer()

      document.getElementById('name').focus()
    },
    deletePlayer: function (key) {
      this.$emit('deletePlayer', key)
    },
    editPlayer: function (player) {
      this.newPlayer = Object.assign({}, player)
    },
    playerFinishedLap: function (key, tied = false) {
      this.$emit('playerFinishedLap', key, tied)
    },
    playerUnfinishedLap: function (key) {
      this.$emit('playerUnfinishedLap', key)
    },
    resetLaps: function () {
      if (confirm('Are you sure?')) { this.$emit('resetLaps') }
    },
    resetNewPlayer: function () {
      this.newPlayer = Object.assign({}, this.blankPlayer)
    }
  },
  components: { Player }
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}
</style>
