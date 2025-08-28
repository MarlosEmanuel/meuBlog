<template>
  <div class="posts-container">
    <header class="blog-header">
      <h1>Tech Blog</h1>
      <p>Artigos e novidades sobre tecnologia</p>
    </header>

    <main class="posts-main">
      <p v-if="loading" class="info-message">Carregando posts...</p>
      <p v-if="error" class="error-message">{{ error }}</p>

      <div v-if="posts.length" class="posts-grid">
        <article v-for="post in posts" :key="post._id" class="post-card">
          <figure class="post-thumbnail">
            <img :src="`http://localhost:8080/${post.img}`" :alt="post.titulo">
          </figure>
          <div class="post-content">
            <h2 class="post-title">{{ post.titulo }}</h2>
            <p class="post-excerpt">{{ post.conteudo }}</p>
            <div class="post-meta">
              <small>Publicado em {{ formatarData(post.dataCriacao) }}</small>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPosts = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/posts");
        posts.value = response.data;
    } catch (err) {
        error.value = 'Houve um erro ao buscar os posts: ' + err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchPosts();
});

const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
</script>

---

### Estilo da Página (CSS)

Copie e cole este bloco de estilo em seu arquivo `<style scoped>`. Ele usa Flexbox e Grid para um layout responsivo e moderno.

```css
<style scoped>
/* Estilos Globais e do Container */
.posts-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f4f7f9;
  min-height: 100vh;
}

/* Cabeçalho do Blog */
.blog-header {
  background-color: #2c3e50;
  color: #fff;
  text-align: center;
  padding: 40px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.blog-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}
.blog-header p {
  font-size: 1.1rem;
  opacity: 0.8;
}

/* Seção Principal de Conteúdo */
.posts-main {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

/* Mensagens de Status (Carregando, Erro) */
.info-message, .error-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}
.error-message {
  color: #c0392b;
}

/* Grid de Posts */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

/* Estilo de Cada Card de Post */
.post-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.post-thumbnail {
  margin: 0;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}
.post-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.post-card:hover .post-thumbnail img {
  transform: scale(1.05);
}

.post-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.post-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.post-excerpt {
  color: #777;
  font-size: 1rem;
  flex-grow: 1;
}

.post-meta {
  color: #999;
  font-size: 0.85rem;
  margin-top: 15px;
}
</style>