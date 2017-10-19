<template>
  <div id="frontend">
    <table>
      <thead>
        <tr>
          <th colspan="2"></th>
          <th>Lap 1</th>
          <th>Lap 2</th>
        </tr>
      </thead>
      <tbody>
        <Player v-for="player in sortedPlayers" :key="player['.key']" :player="player" />
      </tbody>
    </table>
  </div>
</template>

<script>
import Player from '@/components/Player'

export default {
  name: 'frontend',
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedPlayers: function () {
      return this.players
        .filter((p) => (p.laps || []).length > 0)
        .sort((a, b) => a.laps[0] - b.laps[0])
    }
  },
  components: { Player }
}
</script>

<style scoped>
tr {
  font-size: 1.2rem;
}
</style>
