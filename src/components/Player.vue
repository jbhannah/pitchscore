<template>
  <tr class="player">
    <td>
      <span class="puck" :class="player.carColor">
        <Vector class="sticker" :src="require('@/assets/sticker.svg')" :class="player.stickerColor" />
      </span>
    </td>
    <td class="name" :class="{ completed: (player.laps || []).length === 3 }">
      {{ player.name }}
    </td>
    <td v-if="hasButtons">
      <button type="button" v-on:click="editPlayer">✏️</button>
      <button type="button" v-on:click="deletePlayer">🚫</button>
    </td>
    <td v-if="hasButtons">
      <button type="button" v-if="(player.laps || []).length > 0" v-on:click="playerUnfinishedLap">⏪</button>
    </td>
    <td class="lap" v-if="hasButtons || n > 1" v-for="n in 3">
      {{ (player.laps || [])[n - 1] }}
    </td>
    <td v-if="hasButtons && (player.laps || []).length < 3">
      <button type="button" v-on:click="playerFinishedLap">⏩</button>
      <button type="button" v-on:click="playerTiedLap" v-if="(player.laps || []).length > 0">🔀</button>
    </td>
  </tr>
</template>

<script>
import Vector from '@/components/Vector'

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
      this.$emit('playerUnfinishedLap', this.player['.key'])
    }
  },
  components: { Vector }
}
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: #eee;
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
.puck.pink   { background-color: lightpink; }
.puck.red    { background-color: red; }
.puck.yellow { background-color: gold; }
.puck.white  { background-color: antiquewhite; }

.sticker {
  width: 70%;
  margin-top: 15%;
  margin-left: 15%;
}

.sticker.black path { fill: black; }
.sticker.pink  path { fill: hotpink; }
.sticker.white path { fill: white; }
</style>
