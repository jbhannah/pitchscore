<template>
  <div id="frontend">
    <ul>
      <Player v-for="player in players" :key="player['.key']" :player="player" />
    </ul>
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
  components: { Player }
}
</script>

<style>
</style>
