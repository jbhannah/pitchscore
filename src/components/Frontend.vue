<template>
  <div id="frontend">
    <span v-if="sortedPlayers.length === 0">Waiting for players…</span>
    <table v-if="sortedPlayers.length > 0">
      <thead>
        <tr>
          <th colspan="3">Lap</th>
          <th v-for="lap in lapCount">{{ lap }}</th>
        </tr>
      </thead>
      <tbody>
        <Player v-for="player in sortedPlayers" :key="player['.key']" :lapCount="lapCount" :player="player" />
      </tbody>
    </table>
  </div>
</template>

<script>
import Player from '@/components/Player'

export default {
  name: 'frontend',
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
    sortedPlayers: function () {
      let players = this.players.filter(p => (p.laps || []).length > 0)

      if (players.every(p => p.laps.length === this.lapCount + 1)) {
        return players.sort((a, b) => a.laps[this.lapCount] - b.laps[this.lapCount])
      }

      return players.sort((a, b) => a.laps[0] - b.laps[0])
    }
  },
  components: { Player }
}
</script>

<style>
#frontend {
  font-size: 1.2rem;
}
</style>
