
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/home/Home.vue';
import About from './views/AboutUs.vue';
import Contact from './views/Contact.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Cart from './views/Cart.vue';
import Profile from './views/Profile.vue';


const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
   {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue')
  },
 
  


  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
