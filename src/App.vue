<template>
  <div id="app">
    <header>
      <span><router-link to="/" exact>PitchScore</router-link></span>
      <router-link to="backend">Backend</router-link>
    </header>
    <main>
      <router-view
        @addOrSavePlayer="addOrSavePlayer"
        @deletePlayer="deletePlayer"
        @playerFinishedLap="playerFinishedLap"
        @playerUnfinishedLap="playerUnfinishedLap"
        @resetLaps="resetLaps"
        @setLapCount="setLapCount"
        :lapCount="lapCount['.value'] || 0"
        :players="players" />
    </main>
  </div>
</template>

<script>
import Firebase from 'firebase'

const app = Firebase.initializeApp(process.env.FIREBASE_CONFIG)
const db = app.database()
const playersRef = db.ref('players')
const lapCountRef = db.ref('lapCount')

const defaultLapCount = 2

export default {
  name: 'app',
  firebase: {
    lapCount: {
      source: lapCountRef,
      asObject: true
    },
    players: playersRef
  },
  methods: {
    findPlayerByKey: function (key) {
      return this.players.find(p => p['.key'] === key)
    },
    addOrSavePlayer: function (newPlayer) {
      const key = newPlayer['.key']
      delete newPlayer['.key']

      if (typeof key === 'undefined') {
        playersRef.push(newPlayer)
      } else {
        playersRef.child(key).update(newPlayer)
      }
    },
    deletePlayer: function (key) {
      const player = this.findPlayerByKey(key)
      const laps = (player.laps || []).length

      for (let i = 0; i < laps; i++) { this.playerUnfinishedLap(key) }

      playersRef.child(key).remove()
    },
    playerFinishedLap: function (key, tied = false) {
      const player = this.findPlayerByKey(key)
      let laps = player.laps || []
      const lap = laps.length
      const place = Math.max(...this.players.map(p => (p.laps || [])[lap] || 0)) + (tied ? 0 : 1)

      if (place === 0) return

      laps.push(place)
      playersRef.child(key).update({ laps })
    },
    playerUnfinishedLap: function (key) {
      let laps = this.findPlayerByKey(key).laps || []
      const place = laps.pop()
      if (typeof place === 'undefined') return

      const lap = laps.length
      playersRef.child(key).update({ laps })

      if (this.players.find(p => (p.laps || [])[lap] === place)) return

      this.players.forEach(p => {
        if (p['.key'] === key || (p.laps || []).length <= lap || p.laps[lap] < place) return

        let laps = p.laps
        laps[lap] = laps[lap] - 1
        if (laps[lap] === 0) return

        playersRef.child(p['.key']).update({ laps })
      })
    },
    resetLaps: function () {
      this.players.forEach(p => playersRef.child(p['.key']).update({ laps: [] }))
      this.setLapCount(defaultLapCount)
    },
    setLapCount: function (lapCount) {
      lapCountRef.set(lapCount)
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  margin: 40px 40px 0;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: inline-block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

header a {
  color: #fff;
  text-decoration: none;
}

header .router-link-active {
  font-weight: 600;
}

table {
  border-spacing: 0;
}
</style>
