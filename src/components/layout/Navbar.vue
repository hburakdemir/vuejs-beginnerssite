<template>
  <header class="bg-white dark:bg-black border-b">
    <div class="max-w-7xl  flex items-center justify-between p-4 lg:px-12">
      <!-- Sol: Logo -->
      <router-link to="/" class="md:text-2xl text-md font-bold  dark:text-white whitespace-nowrap">
        Quick Shop
      </router-link>

      <!-- Orta: Navbar Items -->
      <nav class="flex space-x-6 text-gray-800 text-[10px] md:text-xs dark:text-white ml-8">
  <a href="/" class="hover:text-primary whitespace-nowrap">Home</a>
  <a href="/about" class="hover:text-primary whitespace-nowrap">About Us</a>
  <a href="/contact" class="hover:text-primary whitespace-nowrap">Contact</a>
</nav>

<!-- Sağ: Dark / Light Mode -->
<div class="ml-auto">
  <button @click="toggleDarkMode" class="text-black dark:text-white">
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

const scrollToSection = (href) => {
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
