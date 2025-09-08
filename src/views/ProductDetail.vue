<template>
  <div
    v-if="product"
    class="grid md:grid-cols-3 md:pt-20 pt-10 p-4 w-screen h-screen bg-secondary dark:bg-primary"
  >
    <!-- Sol taraf (Resim) -->
    <div class="flex justify-center relative rounded-3xl">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="md:w-[500px] md:h-[800px] w-full h-full object-cover object-center rounded-3xl shadow-lg"
      />
      <!-- Favori iconu -->
      <span
        @click="toggleFavorite"
        class="absolute top-2 md:right-20 right-6  cursor-pointer text-3xl drop-shadow-lg"
      >
        <Icon
          :icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
          :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
        />
      </span>
    </div>

    <!-- Orta taraf (Bilgiler) -->
    <div class="flex flex-col justify-start space-y-4 p-4">
      <!-- Ürün Adı -->
      <h1 class="text-3xl font-bold text-primary dark:text-secondary">
        {{ product.name }}
      </h1>

      <!-- Quantity -->
      <p class="text-lg text-primary dark:text-secondary">
        Quantity: {{ product.quantity }}
      </p>

      <!-- Price -->
      <p class="text-2xl font-semibold text-primary dark:text-secondary">
        ${{ product.price }}
      </p>

      <!-- Material (tıklanabilir, wikipedia link) -->
      <p
        class="inline-block self-start text-primary dark:text-secondary px-2 py-1 rounded cursor-pointer"
        @click="openMaterial"
      >
        Material: {{ product.material || "Unknown" }}
      </p>

      <!-- Size / ShoeSize based on product.baseType -->
      <div v-if="product.baseType === 'clothes'">
        <label class="block mb-1">Size</label>
        <select
          v-model="selectedSize"
          class="w-32 px-2 text-secondary dark:text-primary py-2 bg-primary dark:bg-secondary rounded-xl"
        >
          <option value="" disabled>Select Size</option>
          <option v-for="s in clothingSizes" :key="s" :value="s">
            {{ s }}
          </option>
        </select>
      </div>

      <div v-else-if="product.baseType === 'shoes'">
        <label class="block mb-1 bg-red-900">Shoe Size</label>
        <select
          v-model="selectedShoeSize"
          class="w-32 px-2 py-1 border rounded"
        >
          <option value="" disabled>Select Shoe Size</option>
          <option v-for="s in shoeSizes" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <div v-else-if="product.baseType === 'accessory'">
        <label class="block mb-1">Size</label>
        <select v-model="selectedSize" class="w-32 px-2 py-1 border rounded">
          <option value="" disabled>Select Size</option>
          <option v-for="s in accessorySizes" :key="s" :value="s">
            {{ s }}
          </option>
        </select>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="handleAddToCart(product._id)"
        class="mt-4 mx-1 px-6 py-2 bg-primary text-secondary dark:bg-secondary dark:text-primary rounded-lg shadow hover:bg-opacity-80 transition w-full"
      >
        Add to Cart
      </button>
    </div>

    <!-- Sağ taraf (Yorumlar) -->
    <div class="border-l pl-6 flex flex-col h-full">
      <h2 class="text-2xl font-semibold mb-4 text-primary dark:text-secondary">Reviews</h2>

      <!-- Yorum listesi -->
      <div class="space-y-3 flex-1 overflow-y-auto">
  <div
    v-for="(review, index) in reviews"
    :key="index"
    class="relative p-4 border rounded-lg bg-secondary text-primary dark:bg-primary dark:text-secondary"
  >
    <!-- Kullanıcı adı -->
    <p class="font-medium capitalize border-b border-gray-400 dark:border-gray-600 pb-1">
      {{ review.user?.name || "Anonim" }}
    </p>

    <!-- Review başlığı -->
    <p class="mt-2 font-semibold">Review:</p>

    <!-- Yorum metni -->
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
      {{ review.text }}
    </p>

    <!-- Silme ikonu -->
    <span
      v-if="review.user && review.user._id === userId"
      @click="deleteReview(review._id)"
      class="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-500"
    >
      <Icon icon="ic:outline-delete" class="w-5 h-5" />
    </span>
  </div>

        <!-- Yorum ekleme alanı -->
        <div class="mt-4">
          <textarea
            v-model="newReview"
            placeholder="Write your review..."
            class="w-full p-2 border rounded-lg resize-none"
            rows="3"
          ></textarea>
          <button
            @click="submitReview(product._id)"
            class="mt-2 px-4 py-2 bg-primary text-secondary dark:bg-secondary dark:text-primary rounded-lg shadow hover:bg-opacity-80 transition"
          >
            Add Review
          </button>

          <!-- Hata veya başarı mesajları -->
          <p v-if="errorMessage" class="text-red-500 mt-2">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="text-green-500 mt-2">
            {{ successMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="text-gray-500 flex-1">No reviews yet.</p>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProduct } from "../customHook/productPage/useProduct";
import { useReviews } from "../customHook/productPage/useReviews";
import { useCart } from "../customHook/cartPage/useCart";
import Swal from "sweetalert2";

// Reactive değişkenler
const selectedSize = ref("");
const selectedShoeSize = ref("");
const userId = ref(null); // <<< önce tanımla

// Backend'den gelen decodedToken varsa al
const decodedTokenStr =
  localStorage.getItem("decodedToken") ||
  sessionStorage.getItem("decodedToken");
if (decodedTokenStr) {
  try {
    const decodedToken = JSON.parse(decodedTokenStr);
    userId.value = decodedToken.userId; // artık reactive
  } catch (err) {
    console.error("Decoded token parse hatası:", err);
  }
}


const { product, isFavorite, fetchProduct, toggleFavorite 

} = useProduct();
const {
  reviews,
  newReview,
  errorMessage,
  successMessage,
  fetchReviews,
  submitReview,
  deleteReview,
} = useReviews();

const  {addToCart,message,messageType
} = useCart();


onMounted(() => {
  fetchProduct();
  fetchReviews();
  console.log(reviews.value);
});



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


