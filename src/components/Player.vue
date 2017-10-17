<template>
  <li class="player">
    <span class="puck" :class="player.carColor">
      <Vector class="sticker" :src="require('@/assets/sticker.svg')" :class="player.stickerColor" />
    </span>
    {{ player.name }}
    <button type="button" v-if="hasButtons" v-on:click="deletePlayer">🗑</button>
  </li>
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
    }
  },
  components: { Vector }
}
</script>

<style>
.puck {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.puck.black  { background-color: black;  }
.puck.blue   { background-color: blue;   }
.puck.green  { background-color: green;  }
.puck.orange { background-color: orange; }
.puck.pink   { background-color: pink;   }
.puck.red    { background-color: red;    }
.puck.yellow { background-color: yellow; }
.puck.white  { background-color: white;  }

.sticker {
  width: 70%;
  margin-top: 15%;
  margin-left: 15%;
}

.sticker.black path { fill: black; }
.sticker.pink  path { fill: pink;  }
.sticker.white path { fill: white; }
</style>
