<template>
  <div class="max-w-7xl p-6 mx-auto text-primary dark:text-secondary">
    <!-- Navigation Line -->
    <div class="flex items-center justify-center mb-8 relative">
      <div class="w-full h-px bg-gray-300 dark:bg-gray-600"></div>
      <div class="absolute bg-white dark:bg-gray-900 px-8 flex gap-8">
        <router-link 
          to="/profile/favorites" 
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200 border-b-2 border-blue-600"
        >
          Favorites
        </router-link>
        <router-link 
          to="/profile/reviews" 
          class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium transition-colors duration-200"
        >
          Reviews
        </router-link>
      </div>
    </div>

    <!-- Back to Profile -->
    <div class="mb-6">
      <router-link 
        to="/profile"
        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
      >
        <Icon icon="material-symbols:arrow-back" class="w-5 h-5" />
        Back to Profile
      </router-link>
    </div>

    <!-- Page Title -->
    <h1 class="font-bold text-center text-3xl mb-8">My Favorites</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading favorites...</p>
    </div>

    <!-- Favorites Grid -->
    <div v-else-if="favoriteProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="product in favoriteProducts" 
        :key="product._id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-blue-400 dark:shadow-blue-700 hover:shadow-blue-900 dark:hover:shadow-blue-400 hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        <div class="relative">
          <img 
            :src="product.images?.[0]" 
            :alt="product.name"
            class="w-full h-48 object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
            @click="$router.push(`/product/${product._id}`)"
          />
          <span
            class="absolute top-2 right-2 text-3xl cursor-pointer drop-shadow-lg"
            @click.stop="toggleFavorite(product._id)"
          >
            <Icon
              :icon="isFavorite(product._id) ? 'mdi:heart' : 'mdi:heart-outline'"
              :class="isFavorite(product._id) ? 'text-red-500' : 'text-white'"
            />
          </span>
        </div>
        <div class="p-4">
          <h3 
            class="font-medium text-lg mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
            @click="$router.push(`/product/${product._id}`)"
          >
            {{ product.name }}
          </h3>
          <p class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
            ${{ product.price }}
          </p>
          <button 
            @click="$router.push(`/product/${product._id}`)"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
          >
            View Product
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="mb-4">
        <Icon icon="material-symbols:favorite-outline" class="w-16 h-16 text-gray-400 mx-auto" />
      </div>
      <h3 class="text-xl font-medium mb-2 text-gray-600 dark:text-gray-400">No favorites yet</h3>
      <p class="text-gray-500 dark:text-gray-500 mb-6">Start adding products to your favorites to see them here</p>
      <router-link 
        to="/products"
        class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors duration-200 font-medium"
      >
        Browse Products
        <Icon icon="material-symbols:arrow-forward" class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { fetchProducts as useProducts } from "../../customHook/fetchProducts"

// destructure from composable
const { favoriteProducts, favoriteIds, isFavorite, toggleFavorite, fetchFavorites } = useProducts()

const loading = ref(true)

// Component mount olduğunda verileri composable’dan al
onMounted(async () => {
  loading.value = true
  await fetchFavorites()
  loading.value = false
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
