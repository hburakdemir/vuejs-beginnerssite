<template>
  <div class="max-w-7xl p-6 mx-auto text-primary dark:text-secondary">
    <!-- Navigation Line -->
    <div class="flex items-center justify-center mb-8 relative">
      <div class="w-full h-px bg-gray-300 dark:bg-gray-600"></div>
      <div class="absolute bg-white dark:bg-gray-900 px-8 flex gap-8">
        <router-link 
          to="/profile/favorites" 
          class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium transition-colors duration-200"
        >
          Favorites
        </router-link>
        <router-link 
          to="/profile/reviews" 
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200 border-b-2 border-blue-600"
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
    <h1 class="font-bold text-center text-3xl mb-8">My Reviews</h1>

    <!-- Messages -->
    <div v-if="successMessage" class="text-green-500 mb-4 text-center font-medium bg-green-50 dark:bg-green-900 p-3 rounded-lg">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="text-red-500 mb-4 text-center font-medium bg-red-50 dark:bg-red-900 p-3 rounded-lg">
      {{ errorMessage }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading reviews...</p>
    </div>

    <!-- Reviews List -->
    <div v-else-if="comments.length" class="space-y-6">
      <div 
        v-for="comment in comments" 
        :key="comment._id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-blue-400 dark:shadow-blue-700 hover:shadow-blue-900 dark:hover:shadow-blue-400 hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        <div class="flex flex-col lg:flex-row">
          <!-- Product Image -->
          <div class="lg:w-64 relative">
            <img 
              v-if="comment.product.images?.length"
              :src="comment.product.images[0]" 
              :alt="comment.product.name"
              class="w-full h-48 lg:h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
              @click="$router.push(`/product/${comment.product._id}`)"
              @error="handleImageError"
            />
            <div v-else class="w-full h-48 lg:h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Icon icon="material-symbols:image-not-supported-outline" class="w-12 h-12 text-gray-400" />
            </div>
            
            <!-- Delete button -->
            <button 
              v-if="comment.user === user?.id"
              @click="handleDelete(comment._id)"
              class="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 shadow-lg"
              title="Delete review"
            >
              <Icon icon="material-symbols:delete-outline" class="w-4 h-4" />
            </button>
          </div>

          <!-- Review Content -->
          <div class="flex-1 p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <!-- Product Name -->
              <div>
                <span class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Product</span>
                <h3 
                  class="font-semibold text-lg cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
                  @click="$router.push(`/product/${comment.product._id}`)"
                >
                  {{ comment.product.name }}
                </h3>
              </div>

              <!-- Price -->
              <div>
                <span class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Price</span>
                <span class="font-semibold text-lg text-blue-600 dark:text-blue-400">
                  ${{ comment.product.price }}
                </span>
              </div>

              <!-- Rating (if available) -->
              <div v-if="comment.rating">
                <span class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rating</span>
                <div class="flex items-center gap-1">
                  <Icon 
                    v-for="star in 5" 
                    :key="star"
                    :icon="star <= comment.rating ? 'material-symbols:star' : 'material-symbols:star-outline'"
                    :class="star <= comment.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                    class="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            <!-- Review Text -->
            <div class="mb-4">
              <span class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">My Review</span>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ comment.text }}</p>
            </div>

            <!-- Review Date -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(comment.createdAt) }}
              </span>
              <button 
                @click="$router.push(`/product/${comment.product._id}`)"
                class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="mb-4">
        <Icon icon="material-symbols:rate-review-outline" class="w-16 h-16 text-gray-400 mx-auto" />
      </div>
      <h3 class="text-xl font-medium mb-2 text-gray-600 dark:text-gray-400">No reviews yet</h3>
      <p class="text-gray-500 dark:text-gray-500 mb-6">Start reviewing products you've purchased to share your experience</p>
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
import { jwtDecode } from "jwt-decode"
import axios from "axios"

// Reactive data
const comments = ref([])
const loading = ref(true)
const successMessage = ref("")
const errorMessage = ref("")
const user = ref(null)

// Initialize user
const initializeUser = () => {
  try {
    const token = localStorage.getItem("authToken")
    if (token) {
      const decoded = jwtDecode(token)
      user.value = {
        id: decoded.userId,
        name: decoded.username,
        email: decoded.email,
      }
    }
  } catch (error) {
    console.error("Token decode error:", error)
    errorMessage.value = "Authentication error. Please login again."
  }
}

// Fetch comments
const fetchComments = async () => {
  if (!user.value) return
  
  loading.value = true
  errorMessage.value = ""
  
  try {
    const token = localStorage.getItem("authToken")
    if (!token) {
      throw new Error("No authentication token found")
    }

    const response = await axios.get(
      `http://localhost:3000/api/comments/user/${user.value.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (response.data.comments) {
      comments.value = response.data.comments
    }
  } catch (error) {
    console.error("Error fetching comments:", error)
    errorMessage.value = error.response?.data?.message || "Failed to load reviews"
  } finally {
    loading.value = false
  }
}


const handleDelete = async (commentId) => {
  if (!confirm("Are you sure you want to delete this review?")) return
  
  try {
    const token = localStorage.getItem("authToken")
    if (!token) {
      throw new Error("No authentication token found")
    }

    const response = await axios.delete(
      `http://localhost:3000/api/comments/${commentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (response.data.success) {
      comments.value = comments.value.filter((c) => c._id !== commentId)
      successMessage.value = "Review deleted successfully"
      setTimeout(() => successMessage.value = "", 3000)
    } else {
      throw new Error(response.data.message || "Failed to delete review")
    }
  } catch (error) {
    console.error("Error deleting comment:", error)
    errorMessage.value = error.response?.data?.message || "Failed to delete review"
    setTimeout(() => errorMessage.value = "", 3000)
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "Unknown date"
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return "Invalid date"
  }
}

// Handle image error
const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/300x200?text=No+Image"
}

onMounted(async () => {
  initializeUser()
  if (user.value) {
    await fetchComments()
  } else {
    loading.value = false
    errorMessage.value = "Please login to view your reviews"
  }
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