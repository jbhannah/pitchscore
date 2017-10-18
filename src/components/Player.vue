<template>
  <tr class="player">
    <td>
      <span class="puck" :class="player.carColor">
        <Vector class="sticker" :src="require('@/assets/sticker.svg')" :class="player.stickerColor" />
      </span>
    </td>
    <td>
      {{ player.name }}
    </td>
    <td v-if="hasButtons">
      <button type="button" v-if="hasButtons" v-on:click="deletePlayer">🚫</button>
    </td>
    <td v-if="hasButtons">
      <button type="button" v-if="hasButtons && (player.laps || []).length > 0" v-on:click="playerUnfinishedLap">⏪</button>
    </td>
    <td v-for="pos in player.laps">{{ pos }}</td>
    <td v-if="hasButtons">
      <button type="button" v-if="hasButtons && (player.laps || []).length < 3" v-on:click="playerFinishedLap">⏩</button>
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
    playerFinishedLap: function () {
      this.$emit('playerFinishedLap', this.player['.key'])
    },
    playerUnfinishedLap: function () {
      this.$emit('playerUnfinishedLap', this.player['.key'])
    }
  },
  components: { Vector }
}
</script>

<style scoped>
td {
  min-width: 2rem;
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
