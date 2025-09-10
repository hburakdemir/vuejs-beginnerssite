<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 transition-all duration-1000 text-primary dark:text-secondary"
  >
    <div class="max-w-5xl mx-auto space-y-6 ">
      <h1
        class="text-center font-bold text-3xl  dark: my-12"
      >
        Your Cart
      </h1>

      <!-- Her Ürün Kutusu -->
      <div
        v-for="item in cart.products"
        :key="item.productId._id"
        class="bg-transparent rounded-3xl shadow-md p-4 border-e-8 border-t-4 dark:border-secondary border-primary"
      >
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <!-- Resim -->
          <div
            class="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden mx-auto md:mx-0"
          >
            <img
              :src="item.productId.images?.[0]"
              :alt="item.productId.name"
              class="w-full h-full object-cover cursor-pointer"
              @click="$router.push(`/product/${item.productId._id}`)"
              loading="lazy"
            />
          </div>

          <!-- Ürün Adı -->
          <div
            class="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 class="text-lg  dark: font-semibold">
              {{ item.productId.name }}
            </h3>
          </div>

          <!-- Miktar -->
          <div class="flex flex-col items-center">
            <p class=" dark: mb-2">Miktar</p>
            <div class="flex items-center space-x-2">
              <button
                @click="removeFromCart(item.productId._id)"
                class="px-3 py-1 bg-primary dark:bg-secondary text-secondary dark:text-primary rounded hover:rounded-3xl font-extrabold justify-center items-center transition-all duration-500"
              >
                -
              </button>
              <span class="font-medium text-primary dark:text-secondary text-lg">
                {{ item.quantity }}
              </span>
              <button
                @click="addToCart(item.productId._id)"
                class="px-3 py-1 bg-primary dark:bg-secondary text-secondary dark:text-primary rounded hover:rounded-3xl font-extrabold justify-center items-center transition-all duration-500"
              >
                +
              </button>
            </div>
          </div>

          <!-- Malzeme -->
          <div class="flex flex-col items-center text-lg  dark: font-semibold ">
            <p class=" underline">Malzeme</p>
            <span>
              {{ item.productId.material || "Belirtilmemiş" }}
            </span>
          </div>

          <!-- Fiyat -->
          <div class="flex flex-col items-center">
            <p class=" dark: font-semibold">Fiyat</p>
            <span
              class=" dark: font-semibold text-lg"
            >
              {{ item.productId.price.toLocaleString("en-EN") }}$
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useCart } from "../customHook/cartPage/useCart";

const { cart, fetchCart,addToCart, removeFromCart} = useCart();

onMounted(async () => {
  await fetchCart(); // fetch tamamlanana kadar bekle
  console.log("Cart products after fetch:", cart.value.products);
  console.log("products ", cart.products);
});

// Eğer her değişiklikte loglamak istersen:
watch(
  () => cart.value.products,
  (newProducts) => {
    console.log("Updated cart products:", newProducts);
  },
  { deep: true }
);

</script>


<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
