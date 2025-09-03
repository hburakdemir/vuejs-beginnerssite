<template>
  <header class="bg-secondary dark:bg-primary border-b">
    <div class="  flex  justify-between p-4 lg:px-12">
      
      <!-- Sol: Logo + Navbar -->
      <div class="flex items-center space-x-8">
        <!-- Logo -->
        <router-link
          to="/"
          class="md:text-2xl text-md font-bold dark:text-secondary whitespace-nowrap"
        >
          Quick Shop
        </router-link>

        <!-- Navbar Items -->
        <nav class=" space-x-5 text-gray-800 text-[10px] md:text-xs dark:text-secondary">
          <router-link to="/" class="hover:text-red-900 whitespace-nowrap">Home</router-link>
          <router-link to="/about" class="hover:text-red-900 whitespace-nowrap">About Us</router-link>
          <router-link to="/contact" class="hover:text-red-900 whitespace-nowrap">Contact</router-link>
        </nav>
      </div>

      <!-- Sağ: Dark / Light Mode -->
      <button @click="toggleDarkMode" class="text-primary dark:text-secondary md:ml-80">
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
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const isDarkMode = ref(localStorage.getItem("theme") === "dark");

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
</script>
