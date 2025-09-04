<template>
  <header class="bg-secondary dark:bg-primary border-b">
    <div class="flex justify-between p-4 lg:px-12">
      <!-- Sol: Logo + Navbar -->
      <div class="flex items-center space-x-8">
        <router-link
          to="/"
          class="md:text-2xl text-md font-bold dark:text-secondary whitespace-nowrap"
        >
          Quick Shop
        </router-link>

        <nav class="space-x-5 text-gray-800 text-[10px] md:text-xs dark:text-secondary">
          <router-link to="/" class="hover:text-red-900 whitespace-nowrap">Home</router-link>
          <router-link to="/about" class="hover:text-red-900 whitespace-nowrap">About Us</router-link>
          <router-link to="/contact" class="hover:text-red-900 whitespace-nowrap">Contact</router-link>
        </nav>
      </div>

      <!-- Sağ: Iconlar -->
      <div class="flex items-center space-x-6 relative">
        <!-- Giriş Yap (Dropdown) -->
        <div class="relative">
          <button @click="toggleDropdown" class="text-primary dark:text-secondary">
            <Icon icon="gg:profile" class="w-6 h-6" />
          </button>

          <!-- Dropdown -->
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
          >
            <router-link
              to="/login"
              class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="closeDropdown"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="closeDropdown"
            >
              Register
            </router-link>
          </div>
        </div>

        <!-- Favorilerim -->
        <router-link to="/favorites" class="text-primary dark:text-secondary">
          <Icon icon="mdi:heart-outline" class="w-6 h-6" />
        </router-link>

        <!-- Sepet -->
        <router-link to="/cart" class="text-primary dark:text-secondary">
          <Icon icon="material-symbols:shopping-cart-outline" class="w-6 h-6" />
        </router-link>

        <!-- koyu mod -->
        <button @click="toggleDarkMode" class="text-primary dark:text-secondary">
          <Icon
            v-if="isDarkMode"
            icon="material-symbols-light:light-mode-outline"
            class="w-6 h-6"
          />
          <Icon
            v-else
            icon="line-md:moon-loop"
            class="w-6 h-6"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";

const isDarkMode = ref(localStorage.getItem("theme") === "dark");
const isDropdownOpen = ref(false);

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

// Dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const closeDropdown = () => {
  isDropdownOpen.value = false;
};

// dışarı tıklayınca menü kapansın
const handleClickOutside = (e) => {
  const dropdown = document.querySelector(".relative");
  if (dropdown && !dropdown.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};
onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
</script>
