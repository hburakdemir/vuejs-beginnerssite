<template>
  <div
    v-if="product"
    class="grid md:grid-cols-3 md:pt-20 pt-10 p-4 w-screen h-screen bg-secondary dark:bg-primary"
  >
    <!-- Sol taraf (Resim) -->
    <div class="flex justify-center rounded-3xl">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="md:w-[500px] md:h-[800px] w-full h-full object-cover object-center rounded-3xl shadow-lg"
      />
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
        <select v-model="selectedSize" class="w-32 px-2  text-secondary dark:text-primary py-2 bg-primary dark:bg-secondary rounded-xl">
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
        @click="addToCart"
        class="mt-4 mx-1 px-6 py-2 bg-primary text-secondary dark:bg-secondary dark:text-primary rounded-lg shadow hover:bg-opacity-80 transition w-full"
      >
        Add to Cart
      </button>
    </div>

    <!-- Sağ taraf (Yorumlar) -->
    <div class="border-l pl-6">
      <h2 class="text-2xl font-semibold mb-4">Reviews</h2>
      <div v-if="reviews && reviews.length > 0" class="space-y-3">
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <p class="font-medium">{{ review.user }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ review.comment }}
          </p>
        </div>
      </div>
      <p v-else class="text-gray-500">No reviews yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const product = ref(null);
const route = useRoute();

const selectedSize = ref("");
const selectedShoeSize = ref("");

// Product verisini çek
const fetchProduct = async () => {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${route.params.id}`
  );
  product.value = data;
};
onMounted(fetchProduct);

// Size seçenekleri
const clothingSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const shoeSizes = Array.from({ length: 15 }, (_, i) => i + 36); // 36-50
const accessorySizes = ["S", "M"];

// Material link açma
const openMaterial = () => {
  if (product.value.material) {
    window.open(
      `https://en.wikipedia.org/wiki/${product.value.material}`,
      "_blank"
    );
  }
};

// Add to Cart
const addToCart = async () => {
  try {
    const payload = {
      userId: "dummyUserId123", // gerçek kullanıcı id buraya
      productId: product.value._id,
      size: selectedSize.value || null,
      shoeSize: selectedShoeSize.value || null,
    };

    const res = await axios.post(
      "http://localhost:3000/api/addToCart",
      payload
    );
    console.log("Added to cart:", res.data);
    alert("Product added to cart!");
  } catch (err) {
    console.error(err);
    alert("Error adding to cart");
  }
};
</script>
