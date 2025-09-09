<template>
  <div class="max-w-[90rem] p-6 mx-auto text-primary dark:text-secondary">
    <h1 class="font-bold text-center text-3xl mb-4">Profile</h1>

    <!-- Profil Bilgileri -->
    <div
      class="max-w-xl w-full h-full mx-auto mb-8 p-6 text-center rounded-xl shadow-lg shadow-primary dark:shadow-secondary hover:shadow-blue-400 dark:hover:shadow-blue-900 hover:scale-110 hover:rounded-3xl transition duration-[800ms]"
    >
      <h1 class="text-2xl font-bold capitalize">{{ user.name }}</h1>
      <p class="text-xl">{{ user?.email }}</p>
    </div>

    <!-- Mesajlar -->
    <div
      v-if="successMessage"
      class="text-green-500 mb-2 text-center font-medium"
    >
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="text-red-500 mb-2 text-center font-medium">
      {{ errorMessage }}
    </div>

    <div class="flex flex-col gap-6 lg:flex-row">
      <!-- Sol: Yorumlar -->
      <div
        class="overflow-x-hidden overflow-y-auto max-h-[600px] p-4 rounded-xl lg:w-1/2 shadow-lg shadow-primary dark:shadow-secondary hover:shadow-blue-400 dark:hover:shadow-blue-900 hover:scale-105 hover:rounded-3xl transition duration-[800ms]"
      >
        <h2 class="text-xl font-semibold text-center mb-4">My Reviews</h2>
        <div v-if="comments.length">
          <ul class="space-y-4">
            <li
              v-for="comment in comments"
              :key="comment._id"
              class="relative flex flex-col md:flex-row gap-4 p-4 rounded-xl shadow-lg shadow-blue-400 dark:shadow-blue-700 hover:shadow-blue-900 dark:hover:shadow-blue-400 hover:scale-110 hover:rounded-3xl transition duration-900 hover:bg-secondary hover:text-primary"
            >
              <!-- Resim -->
              <img
                v-if="comment.product.images?.length"
                :src="comment.product.images[0]"
                alt="Ürün resmi"
                class="object-cover w-full md:w-32 h-48 rounded-xl cursor-pointer"
                @click="$router.push(`/product/${comment.product._id}`)"
              />

              <!-- Yorum İçeriği -->
              <div
                class="flex-1 flex flex-col md:flex-row md:items-center md:gap-4 w-full"
              >
                <div class="flex-1 text-center md:text-left">
                  <span class="block underline font-medium text-sm"
                    >Product</span
                  >
                  <span class="block font-semibold">{{
                    comment.product.name
                  }}</span>
                </div>

                <div class="flex-1 text-center md:text-left">
                  <span class="block underline font-medium text-sm">Price</span>
                  <span class="block font-semibold"
                    >{{ comment.product.price }} $</span
                  >
                </div>

                <div class="flex-1 text-center md:text-left">
                  <span class="block underline font-medium text-sm"
                    >My Comment</span
                  >
                  <span class="block font-semibold">{{ comment.text }}</span>
                </div>
              </div>

              <!-- Silme Butonu -->
              <span
                v-if="comment.user === user?.id"
                @click="handleDelete(comment._id)"
                class="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-700 transition"
              >
                <Icon icon="ic:outline-delete" class="w-5 h-5" />
              </span>
            </li>
          </ul>
        </div>
        <div v-else class="text-center text-gray-500">
          Henüz yorum yapmadınız.
        </div>
      </div>

      <!-- Sağ: Favoriler -->
      <div
        class="overflow-x-hidden overflow-y-auto max-h-[600px] p-4 rounded-xl lg:w-1/2
         shadow-lg shadow-primary dark:shadow-secondary hover:shadow-blue-400 dark:hover:shadow-blue-900 hover:scale-105 hover:rounded-3xl transition duration-[800ms]"
      >
        <h2 class="mb-4 text-xl font-semibold text-center">My Favorites</h2>
        <div
          v-if="favorites.length"
          class="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div
            v-for="product in favorites"
            :key="product._id"
            class="p-3 flex flex-col items-center hover:dark:text-primary
             rounded-xl shadow-lg shadow-blue-400 dark:shadow-blue-700 hover:shadow-blue-900 dark:hover:shadow-blue-400 hover:scale-110 hover:rounded-3xl transition duration-900 hover:bg-secondary hover:text-primary"
          >
            <img
              :src="product.images?.[0]"
              alt="Ürün"
              class="object-cover w-full h-32 mb-2 rounded-xl cursor-pointer"
              @click="$router.push(`/product/${product._id}`)"
            />
            <p class="text-sm font-medium">{{ product.name }}</p>
            <p class="text-sm">{{ product.price }} ₺</p>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          Henüz favori eklemediniz.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const user = ref(null);
const comments = ref([]);
const favorites = ref([]);
const successMessage = ref("");
const errorMessage = ref("");

// Token ve user bilgisi
const token = localStorage.getItem("authToken");
if (token) {
  const decoded = jwtDecode(token);
  user.value = {
    id: decoded.userId,
    name: decoded.username,
    email: decoded.email,
  };
}

// Yorumları çek
const fetchComments = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/comments/user/${user.value.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data.comments) comments.value = res.data.comments;
  } catch (err) {
    console.error(err);
    errorMessage.value =
      err.response?.data?.message || "Yorumlar yüklenirken hata oluştu";
  }
};

// Favorileri çek
const fetchFavorites = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/favorites/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.favorites)
      favorites.value = res.data.favorites.map((f) => f.product);
  } catch (err) {
    console.error(err);
  }
};

// Yorum silme
const handleDelete = async (commentId) => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!token) {
    errorMessage.value = "Lütfen giriş yapın!";
    return;
  }

  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/comments/${commentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      comments.value = comments.value.filter((c) => c._id !== commentId);
      successMessage.value = "Yorum başarıyla silindi";
    } else {
      errorMessage.value = data.message;
    }
  } catch (err) {
    console.error(err);
    errorMessage.value =
      err.response?.data?.message || "Yorum silinirken hata oluştu";
  }
};

onMounted(async () => {
  if (!token) return;
  await fetchComments();
  await fetchFavorites();
});
</script>

<style scoped>
/* İsteğe bağlı: scroll bar ve hover efektleri */
</style>
