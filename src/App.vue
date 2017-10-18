<template>
  <div id="app">
    <header>
      <span><router-link to="/" exact>PitchScore</router-link></span>
      <router-link to="backend">Backend</router-link>
    </header>
    <main>
      <router-view
        v-on:addPlayer="addPlayer"
        v-on:deletePlayer="deletePlayer"
        v-on:resetData="resetData"
        :players="players" />
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
const playersRef = db.ref('players')

export default {
  name: 'app',
  firebase: {
    players: playersRef
  },
  methods: {
    addPlayer: function (newPlayer) {
      playersRef.push(newPlayer)
    },
    deletePlayer: function (key) {
      playersRef.child(key).remove()
    },
    resetData: function () {
      playersRef.set([])
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
</style>
