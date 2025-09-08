<template>

    <div class="flex justify-between items-center p-4 lg:px-12">
    
      <router-link
        to="/"
        class="md:text-2xl text-md font-bold dark:text-secondary whitespace-nowrap"
      >
        Quick Shop
      </router-link>

      <nav
        class="hidden lg:flex space-x-5 text-gray-800 text-[10px] md:text-xs dark:text-secondary"
      >
        <router-link to="/" class="hover:text-red-900 whitespace-nowrap"
          >Home</router-link
        >
        <router-link to="/about" class="hover:text-red-900 whitespace-nowrap"
          >About Us</router-link
        >
        <router-link to="/contact" class="hover:text-red-900 whitespace-nowrap"
          >Contact</router-link
        >
      </nav>

      <!-- hamburger -->
      <div class="flex items-center space-x-6 relative">
        
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="text-primary dark:text-secondary"
          >
            <Icon icon="gg:profile" class="w-6 h-6" />
          </button>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-40 dark:bg-secondary bg-primary dark:text-primary text-secondary rounded-lg shadow-lg z-50 text-center"
          >
            <router-link
              v-if="!isLoggedIn"
              to="/login"
              class="block px-4 py-2 text-sm hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary rounded-md"
              @click="closeDropdown"
            >
              Login
            </router-link>
            <router-link
              v-if="!isLoggedIn"
              to="/register"
              class="block px-4 py-2 text-sm hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary rounded-md"
              @click="closeDropdown"
            >
              Register
            </router-link>

            <router-link
              v-if="isLoggedIn"
              to="/profile"
              class="block px-4 py-2 text-sm hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary rounded-md"
              @click="closeDropdown"
            >
              Profile
            </router-link>
            <button
              v-if="isLoggedIn"
              @click="logout"
              class="w-full px-4 py-2 text-sm hover:bg-secondary hover:text-primary dark:hover:bg-primary dark:hover:text-secondary rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        
        <router-link to="/favorites" class="text-primary dark:text-secondary">
          <Icon icon="mdi:heart-outline" class="w-6 h-6" />
        </router-link>

      
        <router-link
          to="/cart"
          class="text-primary dark:text-secondary relative"
        >
          <span
            v-if="totalItems > 0"
            class="absolute -top-3 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
          >
            {{ totalItems }}
          </span>
          <Icon icon="material-symbols:shopping-cart-outline" class="w-6 h-6" />
        </router-link>

        
        <button
          @click="toggleDarkMode"
          class="text-primary dark:text-secondary"
        >
          <Icon
            v-if="isDarkMode"
            icon="material-symbols-light:light-mode-outline"
            class="w-6 h-6"
          />
          <Icon v-else icon="line-md:moon-loop" class="w-6 h-6" />
        </button>

      
        <button
          @click="toggleMobileMenu"
          class="lg:hidden text-primary dark:text-secondary"
        >
          <Icon icon="mdi:menu" class="w-6 h-6" />
        </button>
      </div>
    </div>

   
    <div
      v-if="isMobileMenuOpen"
      class="absolute right-0 mt-2 w-40 text-sm bg-secondary text-primary dark:bg-primary dark:text-secondary rounded-md"
    >
      <nav class="flex flex-col space-y-2 p-4">
        <router-link to="/" class="hover:text-red-900">Home</router-link>
        <router-link to="/about" class="hover:text-red-900"
          >About Us</router-link
        >
        <router-link to="/contact" class="hover:text-red-900"
          >Contact</router-link
        >
        <div class="border-t border-gray-300 my-2"></div>
      </nav>
    </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useCart } from "../customHook/cartPage/useCart";

const isLoggedIn = ref(false);
const user = ref(null);
const isDropdownOpen = ref(false);
const isDarkMode = ref(localStorage.getItem("theme") === "dark");
const isMobileMenuOpen = ref(false);


const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const closeDropdown = () => {
  isDropdownOpen.value = false;
};
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleClickOutside = (e) => {
  const dropdown = document.querySelector(".relative > div");
  if (dropdown && !dropdown.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  const tokenStr =
    localStorage.getItem("decodedToken") ||
    sessionStorage.getItem("decodedToken");
  if (tokenStr) {
    try {
      const decoded = JSON.parse(tokenStr);
      if (decoded?.userId) {
        isLoggedIn.value = true;
        user.value = {
          id: decoded.userId,
          name: decoded.username,
          email: decoded.email,
        };
      }
    } catch (err) {
      console.error("AAAA HATA 111:", err);
    }
  }
});

const logout = () => {
  localStorage.removeItem("decodedToken");
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("decodedToken");
  sessionStorage.removeItem("authToken");
  isLoggedIn.value = false;
  user.value = null;
  closeDropdown();
  window.location.href = "/";
};

onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
);

const toggleDarkMode = () => {
  const html = document.documentElement;
  if (isDarkMode.value) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  isDarkMode.value = !isDarkMode.value;
};

const { fetchCart, cart } = useCart();
const totalItems = computed(() => {
  return cart.value.products.reduce((sum, item) => sum + item.quantity, 0);
});

onMounted(() => {
  fetchCart();
});
</script>
