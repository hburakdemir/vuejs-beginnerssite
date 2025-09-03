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

onMounted(() => {
  fetchProductsHero();
  updateVisibleItems();
  window.addEventListener("resize", updateVisibleItems);
});
onUnmounted(() => window.removeEventListener("resize", updateVisibleItems));

// büyük slider
function updateVisibleItems() {
  if (window.innerWidth < 768) visibleItems.value = 1;
  else if (window.innerWidth < 1024) visibleItems.value = 2;
  else visibleItems.value = 4;
}

// büyük slider
const nextSlide = () => {
  if (currentIndex.value < productList.value.length - visibleItems.value) currentIndex.value++;
};
const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

// mini slider
const nextImage = (i) => {
  if (activeImageIndexes.value[i] < productList.value[i].images.length - 1) activeImageIndexes.value[i]++;
};
const prevImage = (i) => {
  if (activeImageIndexes.value[i] > 0) activeImageIndexes.value[i]--;
};
</script>

