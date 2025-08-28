<template>
  <header class="app-header">
    <nav class="nav-links">
      <router-link to="/">Posts</router-link>
      <router-link to="/admin">Admin</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
  .app-header {
    background-color: #2c3e50;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-links a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    font-weight: bold;
    font-size: 1.1rem;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: #3498db;
  }
  
  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem;
    font-family: sans-serif;
  }
</style>