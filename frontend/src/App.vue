<script setup>
  import Posts from './components/Post.vue'
</script>

<template>
  <main>
    <h1>Meu Blog</h1>
    <Posts />
  </main>
</template>

<style scoped>
  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem;
    font-family: sans-serif;
  }
</style>
