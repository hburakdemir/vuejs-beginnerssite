<template>
  <div class="bg-white dark:bg-black min-h-screen transition-colors duration-300">
    <Navbar />
    <router-view class="min-h-screen" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const Navbar = defineAsyncComponent(() => import('./components/layout/Navbar.vue'));
</script>
