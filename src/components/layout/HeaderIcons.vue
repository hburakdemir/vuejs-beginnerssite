<template>
  <div class="flex items-center space-x-6 relative">
    <!-- Profile Dropdown -->
    <ProfileDropdown />

    <!-- Favorites -->
    <router-link to="/favorites" class="text-primary dark:text-secondary">
      <Icon icon="mdi:heart-outline" class="w-6 h-6" />
    </router-link>

    <!-- Cart -->
    <router-link to="/cart" class="relative text-primary dark:text-secondary">
      <Icon icon="material-symbols:shopping-cart-outline" class="w-6 h-6" />
      <span
        v-if="totalItems > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
      >
        {{ totalItems }}
      </span>
    </router-link>

    <!-- Dark Mode -->
    <button @click="toggleDarkMode" class="text-primary dark:text-secondary">
      <Icon v-if="isDarkMode" icon="material-symbols-light:light-mode-outline" class="w-6 h-6" />
      <Icon v-else icon="line-md:moon-loop" class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useCart } from "../../customHook/cartPage/useCart";

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

// Cart
const { cart, fetchCart } = useCart();
onMounted(() => fetchCart());
const totalItems = computed(() =>
  cart.value.products.reduce((sum, item) => sum + item.quantity, 0)
);
</script>
