import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

import Home from "./views/home/Home.vue";
import About from "./views/AboutUs.vue";
import Contact from "./views/Contact.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Cart from "./views/Cart.vue";
import Profile from "./views/Profile.vue";

const routes = [
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/contact", name: "Contact", component: Contact },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true }, //meta login sayfası yönlendire
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("@/views/ProductDetail.vue"),
  },
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
      // Token hiç yoksa
      return next({ name: "Login", query: { redirect: to.fullPath } });
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // saniye cinsinden

      if (decoded.exp < now) {
        // Token süresi dolmuş
        localStorage.removeItem("authToken");
        alert("Oturum süreniz doldu, lütfen tekrar giriş yapın.");
        return next({ name: "Login", query: { redirect: to.fullPath } });
      }
    } catch (err) {
      // Token bozuksa
      localStorage.removeItem("authToken");
      return next({ name: "Login" });
    }
  }

  next();
});

export default router;
