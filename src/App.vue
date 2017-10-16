<template>
  <div id="app">
    <header>
      <span>PitchScore</span>
    </header>
    <main>
      <router-view :players="players" v-on:addPlayer="addPlayer"></router-view>
    </main>
  </div>
</template>

<script>
import Firebase from 'firebase'

const config = {
  databaseURL: 'https://pitch-score.firebaseio.com'
}

const app = Firebase.initializeApp(config)
const db = app.database()
const players = db.ref('players')

export default {
  name: 'app',
  firebase: {
    players
  },
  methods: {
    addPlayer: function (newPlayer) {
      players.push(newPlayer)
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
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
