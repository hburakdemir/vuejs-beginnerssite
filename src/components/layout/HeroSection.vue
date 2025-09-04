<template>
  <section class="py-12">
    <div class="mb-10 text-center">
      <h2 class="text-4xl font-bold text-primary dark:text-secondary">Highlights</h2>
    </div>

    <div class="max-w-7xl mx-auto">
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500"
          :style="{ transform: `translateX(-${(currentIndex * 100) / visibleItems}%)` }"
        >
          <div
            v-for="(product, i) in productList"
            :key="i"
            class="flex-none px-2 w-1/4"
          >
            <div class="relative w-full h-[500px] rounded-lg overflow-hidden">
              <!-- Image -->
              <img
                :src="product.images[activeImageIndexes[i]]"
                :alt="product.name"
                class="w-full h-full object-cover cursor-pointer"
                @click="$router.push(`/product/${product._id}`)"
                loading="lazy"
              />
              <!-- Favorite Icon -->
<span
  class="absolute top-2 right-2 text-3xl cursor-pointer drop-shadow-lg"
  @click.stop="toggleFavorite(product._id)"
>
  <Icon
    :icon="isFavorite(product._id) ? 'mdi:heart' : 'mdi:heart-outline'"
    :class="isFavorite(product._id) ? 'text-red-500' : 'text-white'"
  />
</span>




              <!-- Product Name -->
              <div class="absolute top-2 left-2 bg-black bg-opacity-20 text-secondary px-2 py-1 rounded-3xl text-sm font-semibold">
                {{ product.name }}
              </div>

              <!-- Price & Stock -->
              <div class="absolute bottom-10 left-2 bg-black bg-opacity-50 text-secondary px-2 py-1 rounded text-sm">
                Last: {{ product.last }} | ${{ product.price }}
              </div>

              <!-- Optional Image Slider Buttons -->
              <button
                v-if="product.images.length > 1"
                @click="prevImage(i)"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-secondary p-2 rounded-full"
              >
                <Icon icon="mdi:chevron-left" class="w-6 h-6"/>
              </button>
              <button
                v-if="product.images.length > 1"
                @click="nextImage(i)"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-secondary p-2 rounded-full"
              >
                <Icon icon="mdi:chevron-right" class="w-6 h-6"/>
              </button>
            </div>

            <!-- + Icon -->
            <div class="flex justify-end mt-2">
              <button class="flex p-2 bg-primary dark:bg-secondary text-secondary dark:text-primary hover:bg-red-900 dark:hover:bg-red-900 max-h-8 max-w-8 justify-center items-center rounded-full">
                <Icon icon="mdi:plus" class="w-6 h-6"/>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- Main Slider Controls -->
      <div class="flex justify-center mt-4 space-x-4">
        <button @click="prevSlide" class="text-primary dark:text-secondary">
          <Icon icon="mdi:chevron-left" class="w-6 h-6"/>
        </button>
        <button @click="nextSlide" class="text-primary dark:text-secondary">
          <Icon icon="mdi:chevron-right" class="w-6 h-6"/>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import axios from "axios";

const currentIndex = ref(0);
const visibleItems = ref(4);
const productList = ref([]);
const activeImageIndexes = ref([]);
const favorites = ref([]); // favori productId listesi

// Kullanıcının token'ını al
const getAuthToken = () => {
  return sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
};

// Products fetch
const fetchProductsHero = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/products?section=hero");
    productList.value = res.data.map(p => ({
      ...p,
      images: Array.isArray(p.images) ? p.images : [p.images]
    }));
    activeImageIndexes.value = productList.value.map(() => 0);
  } catch (err) {
    console.error(err);
  }
};

// Favorites fetch
const fetchFavorites = async () => {
  try {
    const token = getAuthToken();
    if (!token) return;

    const res = await axios.get("http://localhost:3000/api/favorites", {
      headers: { Authorization: `Bearer ${token}` }
    });

    // sadece productId listesi
    favorites.value = res.data.favorites.map(f => f.product._id);
  } catch (err) {
    console.error(err);
  }
};

// Favori kontrol
const isFavorite = (productId) => favorites.value.includes(productId);

// Toggle
const toggleFavorite = async (productId) => {
  try {
    const token = getAuthToken();
    if (!token) return;

    await axios.post(
      `http://localhost:3000/api/favorites/${productId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Toggle mantığına göre favori listesi güncelle
    if (favorites.value.includes(productId)) {
      favorites.value = favorites.value.filter(id => id !== productId);
    } else {
      favorites.value.push(productId);
    }
  } catch (err) {
    console.error(err);
  }
};

// Slider helpers
function updateVisibleItems() {
  if (window.innerWidth < 768) visibleItems.value = 1;
  else if (window.innerWidth < 1024) visibleItems.value = 2;
  else visibleItems.value = 4;
}

const nextSlide = () => {
  if (currentIndex.value < productList.value.length - visibleItems.value) currentIndex.value++;
};
const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const nextImage = (i) => {
  if (activeImageIndexes.value[i] < productList.value[i].images.length - 1) activeImageIndexes.value[i]++;
};
const prevImage = (i) => {
  if (activeImageIndexes.value[i] > 0) activeImageIndexes.value[i]--;
};

onMounted(() => {
  fetchProductsHero();
  fetchFavorites();
  updateVisibleItems();
  window.addEventListener("resize", updateVisibleItems);
});
onUnmounted(() => window.removeEventListener("resize", updateVisibleItems));
</script>



