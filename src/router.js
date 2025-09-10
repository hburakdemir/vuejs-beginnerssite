import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

import Home from "./views/home/Home.vue";
import About from "./views/AboutUs.vue";
import Contact from "./views/Contact.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";

import Profile from "./views/profile/Profile.vue";
import Favorites from "./views/profile/Favorites.vue";
import Reviews from "./views/profile/Reviews.vue";
import HomeContent from "./views/home/HomeContet.vue";
import Cart from "./views/Cart.vue";

const routes = [
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/products",name: "HomeContent",component: HomeContent, },
  { path: "/cart",name: "Cart",component: Cart, meta: { requiresAuth: true } },
  { path: "/profile",name: "Profile",component: Profile, meta: { requiresAuth: true }, },
  { path: "/profile/favorites",name: "Favorites",component: Favorites, meta: { requiresAuth: true }, },
  { path: "/favorites",name: "Favorites",component: Favorites, meta: { requiresAuth: true }, },
  { path: "/profile/reviews",name: "Reviews",component: Reviews, meta: { requiresAuth: true }, },
  { path: "/product/:id",name: "ProductDetail",component: () => import("@/views/ProductDetail.vue"),},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔹 Global Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken");

  if (to.meta.requiresAuth) {
    if (!token) {
     
      return next({ name: "Login", query: { redirect: to.fullPath } });
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; 

      if (decoded.exp < now) {
       
        localStorage.removeItem("authToken");
        alert("Oturum süreniz doldu, lütfen tekrar giriş yapın.");
        return next({ name: "Login", query: { redirect: to.fullPath } });
      }
    } catch (err) {
      
      localStorage.removeItem("authToken");
      return next({ name: "Login" });
    }
  }

  next();
});

export default router;
