<template>
  <div v-once v-html="src"></div>
</template>

<script>
export default {
  name: 'vector',
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
