<template>
  <div class="admin-container">
    <header class="admin-header">
      <h1>Painel de Administração</h1>
      <button v-if="isLoggedIn" @click="logout" class="logout-btn">Sair</button>
    </header>

    <main class="admin-main">
      <section v-if="!isLoggedIn" class="login-card">
        <h2>Fazer Login</h2>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Usuário/Email:</label>
            <input type="text" id="username" v-model="loginForm.username" required>
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" v-model="loginForm.password" required>
          </div>
          <button type="submit" class="submit-btn">Entrar</button>
          <p v-if="loginError" class="error-message">{{ loginError }}</p>
        </form>
      </section>

      <section v-if="isLoggedIn" class="create-post-card">
        <h2>Criar Novo Post</h2>
        <form @submit.prevent="handleCreatePost" class="post-form">
          <div class="form-group">
            <label for="post-titulo">Título do Post:</label>
            <input type="text" id="post-titulo" v-model="postForm.titulo" required>
          </div>
          <div class="form-group">
            <label for="post-conteudo">Conteúdo:</label>
            <textarea id="post-conteudo" v-model="postForm.conteudo" rows="8" required></textarea>
          </div>
          <div class="form-group">
            <label for="post-img">Imagem (JPEG, PNG, GIF, até 5MB):</label>
            <input type="file" id="post-img" @change="handleImageUpload" accept="image/jpeg,image/png,image/gif" required>
          </div>
          <button type="submit" class="submit-btn">Publicar Post</button>
          <p v-if="postMessage" :class="{'success-message': postSuccess, 'error-message': !postSuccess}">
            {{ postMessage }}
          </p>
          <p v-if="postError" class="error-message">{{ postError }}</p>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Variáveis de estado para login
const isLoggedIn = ref(false);
const loginForm = ref({
  username: '',
  password: ''
});
const loginError = ref(null);

// Variáveis de estado para criação de post
const postForm = ref({
  titulo: '',
  conteudo: '',
  img: null
});
const postMessage = ref(null);
const postSuccess = ref(false);
const postError = ref(null);

// Base URL da API
const API_BASE_URL = 'http://localhost:8080/api';

// Configura o Axios para enviar cookies em requisições de origem cruzada
axios.defaults.withCredentials = true;

// --- Funções de Autenticação ---

// Esta função verifica se o usuário está logado fazendo uma requisição a uma rota protegida
const checkAuth = async () => {
  try {
    // Rota protegida para verificar a autenticação (você precisa criar essa rota no backend)
    await axios.get(`${API_BASE_URL}/admin/check-auth`);
    isLoggedIn.value = true;
  } catch (err) {
    isLoggedIn.value = false;
  }
};

const handleLogin = async () => {
  loginError.value = null;
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, {
      username: loginForm.value.username,
      password: loginForm.value.password,
    });
    
    if (response.status === 200) {
      isLoggedIn.value = true;
      loginForm.value = { username: '', password: '' };
      console.log('Login bem-sucedido!');
    }
  } catch (err) {
    console.error('Erro no login:', err);
    // Erro 401 do backend indica credenciais inválidas
    if (err.response && err.response.status === 401) {
      loginError.value = 'Falha no login. Verifique suas credenciais.';
    } else {
      loginError.value = 'Erro de conexão. Tente novamente mais tarde.';
    }
  }
};

const logout = async () => {
  // Você pode criar uma rota de logout no backend para limpar o cookie
  try {
    await axios.post(`${API_BASE_URL}/admin/logout`);
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
  } finally {
    isLoggedIn.value = false;
    console.log('Logout realizado.');
  }
};

// --- Funções de Criação de Post ---

const handleImageUpload = (event) => {
  postForm.value.img = event.target.files[0];
};

const handleCreatePost = async () => {
  postMessage.value = null;
  postError.value = null;

  if (!postForm.value.img) {
    postError.value = 'Por favor, selecione uma imagem.';
    return;
  }

  const formData = new FormData();
  formData.append('titulo', postForm.value.titulo);
  formData.append('conteudo', postForm.value.conteudo);
  formData.append('img', postForm.value.img);

  try {
    const response = await axios.post(`${API_BASE_URL}/admin/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    postMessage.value = 'Post publicado com sucesso!';
    postSuccess.value = true;
    postForm.value = { titulo: '', conteudo: '', img: null };
    document.getElementById('post-img').value = '';
    console.log('Post criado:', response.data);
  } catch (err) {
    console.error('Erro ao criar post:', err);
    postMessage.value = 'Erro ao publicar post. Tente novamente.';
    postSuccess.value = false;
    if (err.response && err.response.status === 401) {
      postError.value = 'Sessão expirada ou não autorizado. Faça login novamente.';
      logout();
    } else {
      postError.value = err.response ? err.response.data.error || err.response.data.message : err.message;
    }
  }
};

// --- Ciclo de Vida ---
onMounted(() => {
  checkAuth();
});
</script>

---

### Estilo da Página de Administração (CSS)

(O CSS não precisa de mudanças, pois já está correto)

```css
<style scoped>
/* Estilos Globais do Admin */
.admin-container {
  font-family: 'Inter', sans-serif;
  background-color: #eef2f5;
  min-height: 100vh;
  color: #333;
  display: flex;
  flex-direction: column;
}
.admin-container {
  font-family: 'Inter', sans-serif; /* Usando Inter como padrão */
  background-color: #eef2f5;
  min-height: 100vh;
  color: #333;
  display: flex;
  flex-direction: column;
}

/* Cabeçalho do Admin */
.admin-header {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
}
.admin-header h1 {
  margin: 0;
  font-size: 1.8rem;
}
.logout-btn {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
.logout-btn:hover {
  background-color: #c0392b;
}

/* Seção Principal */
.admin-main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

/* Estilos de Card (Login e Criar Post) */
.login-card, .create-post-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.6rem;
}

/* Estilos de Formulário */
.login-form, .post-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group textarea,
.form-group input[type="file"] {
  width: calc(100% - 20px); /* Ajusta para padding */
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #fcfcfc;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

/* Botões de Submissão */
.submit-btn {
  background-color: #28a745; /* Verde para sucesso/publicar */
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 10px;
}
.submit-btn:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

/* Mensagens de Feedback */
.error-message {
  color: #c0392b;
  background-color: #fef2f2;
  border: 1px solid #efdada;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 10px;
  text-align: center;
}
.success-message {
  color: #28a745;
  background-color: #eafbea;
  border: 1px solid #d4edda;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 10px;
  text-align: center;
}
</style>