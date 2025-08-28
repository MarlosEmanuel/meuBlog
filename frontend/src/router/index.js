import { createRouter, createWebHistory } from 'vue-router';
import Post from '../components/Post.vue';
import AdminView from '../components/AdminView.vue';

const routes = [
  {
    path: '/',
    name: 'posts',
    component: Post
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;