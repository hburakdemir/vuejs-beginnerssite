<template>
  <section class="py-12">
    <div class="mb-10 text-center">
      <h2 class="text-4xl font-bold text-primary dark:text-secondary">
        Highlights
      </h2>
    </div>

    

    <div class="max-w-7xl mx-auto">
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500"
          :style="{
            transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`,
          }"
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
                  :icon="
                    isFavorite(product._id) ? 'mdi:heart' : 'mdi:heart-outline'
                  "
                  :class="
                    isFavorite(product._id) ? 'text-red-500' : 'text-white'
                  "
                />
              </span>

              <!-- Product Name -->
              <div
                class="absolute top-2 left-2 bg-black bg-opacity-20 text-secondary px-2 py-1 rounded-3xl text-sm font-semibold"
              >
                {{ product.name }}
              </div>

              <!-- Price & Stock -->
              <div
                class="absolute bottom-10 left-2 bg-black bg-opacity-50 text-secondary px-2 py-1 rounded text-sm"
              >
                Last: {{ product.quantity }} | ${{ product.price }}
              </div>

              <!-- Optional Image Slider Buttons -->
              <button
                v-if="product.images.length > 1"
                @click="prevImage(i)"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-secondary p-2 rounded-full"
              >
                <Icon icon="mdi:chevron-left" class="w-6 h-6" />
              </button>
              <button
                v-if="product.images.length > 1"
                @click="nextImage(i)"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-secondary p-2 rounded-full"
              >
                <Icon icon="mdi:chevron-right" class="w-6 h-6" />
              </button>
            </div>

            <!-- + Icon -->
            <div class="flex justify-end mt-2">
              <button
                @click="handleAddToCart(product._id)"
                class="flex p-2 bg-primary dark:bg-secondary text-secondary dark:text-primary hover:bg-red-900 dark:hover:bg-red-900 max-h-8 max-w-8 justify-center items-center rounded-full"
              >
                <Icon icon="mdi:plus" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Slider Controls -->
      <div class="flex justify-center mt-4 space-x-4">
        <button @click="prevSlide" class="text-primary dark:text-secondary">
          <Icon icon="mdi:chevron-left" class="w-6 h-6" />
        </button>
        <button @click="nextSlide" class="text-primary dark:text-secondary">
          <Icon icon="mdi:chevron-right" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { fetchProducts } from "../../customHook/fetchProducts";
import { useCart } from "../../customHook/cartPage/useCart";
import Swal from "sweetalert2";

const {
  productList,
  activeImageIndexes,
  favorites,
  currentIndex,
  visibleItems,
  isFavorite,
  toggleFavorite,
  nextSlide,
  prevSlide,
  nextImage,
  prevImage,
} = fetchProducts("hero");
const { addToCart, error, message, messageType 
  
} = useCart();


const handleAddToCart = async (productId) => {
  await addToCart(productId);

  // useCart içindeki reactive ref'leri kullan
  if (!message.value) return;

  Swal.fire({
  timer:3000,
   timerProgressBar: true,
  text: message.value,
  icon: messageType.value === "success" ? "success" : "error",
  showConfirmButton: true,
  confirmButtonText: "OK",
  customClass: {
    popup: "my-swal-popup",
    confirmButton: "my-swal-button",
    content: "my-swal-content"
  }
});

};



</script>
<style> 
/* tek swal fire var burada  */
body.swal2-shown > [aria-hidden='true'] {
  transition: 0.1s filter;
  filter: blur(10px);
  border-radius: 1rem;
}
.my-swal-popup {
  width: auto; 
  padding: 1rem 1.5rem; 
  background-color: #f9fafb; 
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem; 
  color: #111827; 
  transition: all 0.2s;
}
.my-swal-popup:hover {
  border-radius: 5rem;
}

.my-swal-button {
  background-color: black; 
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(209, 213, 219, 0.5);
  cursor: pointer;
}

.my-swal-button:hover{
    background-color: white;
    color:black;
    font-size: large;

}

</style>