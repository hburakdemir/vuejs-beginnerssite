<template>
  <div class="min-h-screen transition-colors duration-300">
    <!-- Main Container -->
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <h1
        class="mb-24 text-4xl font-bold text-center text-primary dark:text-secondary md:text-5xl"
      >
        About Us
      </h1>

      <!-- First Section - 35% height, Left text + Right image -->
      <div class="mb-20 md:h-[45vh] md:mb-20">
        <div class="flex flex-col h-full gap-6 md:flex-row">
          <!-- Left Text Section -->
          <div class="flex-1">
            <div
              class="flex flex-col h-full w-full p-4 text-secondary bg-primary rounded-3xl justify-center dark:text-primary dark:bg-secondary md:p-6"
            >
              <h3 class="mb-4 text-xl text-secondary  dark:text-primary text-center font-semibold">
                Welcome to Our Fashion World
              </h3>
              <p class="mb-3 text-md text-center leading-relaxed">
                2010 yılından beri fashion sektöründe kaliteli ve şık kıyafetler
                sunuyoruz.
              </p>
              <p class="mb-3 text-md text-center leading-relaxed">
               We have been offering quality and stylish clothing in the fashion industry since 2010.
              </p>
              <p class="mb-3 text-md text-center leading-relaxed">
             By following current trends, we aim to offer quality products at affordable prices.
              </p>
              <p class="text-md text-center leading-relaxed">
             We are pleased to welcome you to our store and provide online service.
              </p>
            </div>
          </div>

          <!-- Right Image Section -->
          <div class="flex-1 h-full">
  <div class="overflow-hidden h-full rounded-3xl">
    <img src="/images/about-1.jpg" class="w-full h-full object-cover rounded-3xl" />
  </div>
</div>

        </div>
      </div>

      <!-- Second Section - 35% height, 25%-50%-25% layout -->
      <div class="h-auto mb-8">
        <div class="flex flex-col h-full gap-6 md:flex-row">
          <!-- Left 25% -->
          <div
            class="hidden w-full items-center justify-center md:flex md:w-1/4"
          >
            
          </div>

          <!-- Center 50% - Description -->
          <div
            class="flex w-full text-center items-center justify-center md:w-1/2"
          >
            <div class="w-full text-secondary dark:text-primary p-6 bg-primary rounded-3xl dark:bg-secondary">
              <h3 class="mb-4 text-xl text-red dark:text-red font-semibold">Our Vision</h3>
              <p class="mb-4 text-base leading-relaxed">
                Our core mission is to be a pioneer in the fashion world, offer our customers the best shopping experience, and add value to the industry with a sustainable fashion approach.
              </p>
              <p class="text-base leading-relaxed">
                Operating on our three principles of quality, style, and customer satisfaction, we offer collections that appeal to people of all ages and tastes.
              </p>
            </div>
          </div>

          <!-- Right 25% -->
          
        </div>
      </div>

      <!-- Third Section - 50%-50% layout with images and button -->
      <<div class="flex flex-col md:flex-row gap-6">
  <!-- Left Image -->
  <div class="flex-1 h-64 md:h-[40vh] overflow-hidden rounded-3xl">
    <img
      src="/images/about-2.jpg"
      alt="Koleksiyon 1"
      class=" object-cover object-center"
    />
  </div>

  <!-- Right Image with Button -->
  <div class="flex-1 relative h-64 md:h-[40vh] overflow-hidden rounded-3xl">
    <img
      src="/images/about-3.jpg"
      alt="Koleksiyon 2"
      class=" object-cover object-center"
    />

    <!-- Overlay Button -->
    <div class="absolute inset-0 flex items-center justify-center">
      <button
        class="px-6 py-3 bg-secondary text-primary font-semibold rounded-3xl hover:bg-gray-100 transition-colors duration-200"
        @click="navigateToProducts"
      >
        Shop Now
      </button>
    </div>
  </div>
</div>

    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";



const fetchProductsAbout = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/products?section=about");

  } 
  catch (err) {
    console.error("Error fetching products about:", err);
  }
};

onMounted(() => {
  fetchProductsAbout();

})


</script>



<style scoped></style>
