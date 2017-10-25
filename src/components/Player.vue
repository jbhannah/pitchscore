<template>
  <tr class="player">
    <td>
      <span class="puck" :class="player.carColor">
        <Vector class="sticker" :src="require('@/assets/sticker.svg')" :class="player.stickerColor" />
      </span>
    </td>
    <td class="name" :class="{ completed: (player.laps || []).length === lapCount + 1 }">
      {{ player.name | trim | capitalize }}
    </td>
    <td v-if="hasButtons">
      <button type="button" @click="editPlayer">✏️</button>
      <button type="button" @click="deletePlayer">🚫</button>
    </td>
    <td v-if="hasButtons">
      <button type="button" @click="playerUnfinishedLap" v-if="(player.laps || []).length > 0">⏪</button>
    </td>
    <td class="lap" v-if="hasButtons || lap > 1" v-for="lap in (lapCount + 1)">
      {{ (player.laps || [])[lap - 1] }}
    </td>
    <td v-if="hasButtons && (player.laps || []).length <= lapCount">
      <button type="button" @click="playerFinishedLap">⏩</button>
      <button type="button" v-if="(player.laps || []).length > 0" @click="playerTiedLap">🔀</button>
    </td>
  </tr>
</template>

<script>
import Vector from '@/components/Vector'
import { capitalize, trim } from '@/util/filters'

export default {
  name: 'player',
  props: {
    hasButtons: {
      type: Boolean,
      default: false
    },
    lapCount: {
      type: Number,
      required: true
    },
    player: {
      type: Object,
      required: true
    }
  },
  methods: {
    deletePlayer: function () {
      if (confirm('Really delete player?')) {
        this.$emit('deletePlayer', this.player['.key'])
      }
    },
    editPlayer: function () {
      this.$emit('editPlayer', {
        '.key': this.player['.key'],
        name: this.player.name,
        carColor: this.player.carColor,
        stickerColor: this.player.stickerColor
      })
    },
    playerFinishedLap: function () {
      this.$emit('playerFinishedLap', this.player['.key'])
    },
    playerTiedLap: function () {
      this.$emit('playerFinishedLap', this.player['.key'], true)
    },
    playerUnfinishedLap: function () {
      if (confirm('Really undo lap finish?')) {
        this.$emit('playerUnfinishedLap', this.player['.key'])
      }
    }
  },
  components: { Vector },
  filters: { capitalize, trim }
}
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: #f6f6f6;
}

td {
  min-width: 2rem;
  padding: 3px;
}

td.name {
  font-weight: bold;
}

td.name.completed {
  text-decoration: line-through;
}

td.lap {
  text-align: center;
}

td.lap:last-child {
  font-weight: bold;
}

.puck {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.puck.black  { background-color: black; }
.puck.blue   { background-color: mediumblue; }
.puck.green  { background-color: green; }
.puck.orange { background-color: darkorange; }
.puck.pink   { background-color: hotpink; }
.puck.red    { background-color: firebrick; }
.puck.white  { background-color: antiquewhite; }
.puck.yellow { background-color: gold; }

.sticker {
  width: 70%;
  margin-top: 15%;
  margin-left: 15%;
}

.sticker.black  path { fill: black; }
.sticker.pink   path { fill: fuchsia; }
.sticker.silver path { fill: lightgray; }
.sticker.white  path { fill: white; }
</style>
