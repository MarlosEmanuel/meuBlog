<template>
    <div class="posts">
        <h2>Posts</h2>
        <p v-if="loading">Carregando posts...</p>
        <p v-if="error">{{ error }}</p>

        <div v-if="posts.length">
            <div v-for="post in posts" :key="post._id" class="post-item">
                <h3>{{ post.titulo }}</h3>
                <p>{{ post.conteudo }}</p>
                <small>Criado em: {{ formatarData(post.dataCriacao) }}</small>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    // Variáveis reativas para gerenciar o estado
    const posts = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // Função assíncrona para buscar os dados
    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/posts");
            posts.value = response.data;
        } catch (err) {
            // Use 'err' em vez de 'error' para evitar conflito com a variável reativa
            error.value = 'Houve um erro ao buscar os posts: ' + err.message;
        } finally {
            loading.value = false;
        }
    };

    // Chame a função quando o componente for montado
    onMounted(() => {
        fetchPosts();
    });

    // Função para formatar a data
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
</script>

<style scoped>
    .posts {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
    .post-item {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
        color: #35495e;
    }
</style>