<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with User Info -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <div v-if="userLoading" class="animate-pulse">
            <div class="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div class="h-6 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
          <div v-else-if="userError" class="text-red-600">
            <p>{{ userError }}</p>
          </div>
          <div v-else class="space-y-4">
            <div class="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
              <svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ user.name || 'User' }}</h1>
              <p class="text-gray-600">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Left Side - User Reviews -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="p-6 border-b">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-4.276 1.022a1 1 0 01-1.236-1.236l1.022-4.276A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              My Reviews
            </h2>
          </div>
          
          <div class="p-6">
            <!-- Loading State -->
            <div v-if="reviewsLoading" class="space-y-4">
              <div v-for="i in 3" :key="i" class="animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="errorMessage" class="text-red-600 p-4 bg-red-50 rounded-md">
              {{ errorMessage }}
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="text-green-600 p-4 bg-green-50 rounded-md mb-4">
              {{ successMessage }}
            </div>

            <!-- Reviews List -->
            <div v-if="reviews.length > 0" class="space-y-4">
              <div v-for="review in reviews" :key="review._id" 
                   class="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center space-x-2">
                    <div class="flex text-yellow-400">
                      <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</span>
                  </div>
                  <button @click="deleteReview(review._id)" 
                          class="text-red-500 hover:text-red-700 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p class="text-gray-800">{{ review.text }}</p>
                <div v-if="review.productId" class="mt-2 text-sm text-blue-600">
                  Product ID: {{ review.productId }}
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!reviewsLoading && !errorMessage" class="text-center py-8">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-4.276 1.022a1 1 0 01-1.236-1.236l1.022-4.276A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              <p class="text-gray-500">No reviews yet</p>
            </div>
          </div>
        </div>

        <!-- Right Side - Cart Items -->
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="p-6 border-b">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 17a2 2 0 100 4 2 2 0 000-4zM9 17a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              My Cart
            </h2>
          </div>

          <div class="p-6">
            <!-- Loading State -->
            <div v-if="loading" class="space-y-4">
              <div v-for="i in 3" :key="i" class="animate-pulse">
                <div class="flex space-x-4">
                  <div class="w-16 h-16 bg-gray-200 rounded"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cart Error -->
            <div v-else-if="error" class="text-red-600 p-4 bg-red-50 rounded-md">
              {{ error }}
            </div>

            <!-- Cart Message -->
            <div v-if="message" :class="messageType === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" 
                 class="p-4 rounded-md mb-4">
              {{ message }}
            </div>

            <!-- Cart Items -->
            <div v-if="cart.products && cart.products.length > 0" class="space-y-4">
              <div v-for="item in cart.products" :key="item.productId" 
                   class="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">{{ item.name || `Product ${item.productId}` }}</h3>
                  <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
                  <p v-if="item.price" class="text-sm font-medium text-green-600">${{ item.price }}</p>
                </div>

                <div class="flex items-center space-x-2">
                  <button @click="addToCart(item.productId)" 
                          :disabled="updatingItems.has(item.productId)"
                          class="p-1 text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  
                  <span class="text-lg font-medium min-w-8 text-center">{{ item.quantity }}</span>
                  
                  <button @click="removeFromCart(item.productId)" 
                          :disabled="updatingItems.has(item.productId)"
                          class="p-1 text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Cart Total -->
              <div class="border-t pt-4">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-medium">Total Items:</span>
                  <span class="text-lg font-bold text-blue-600">
                    {{ cart.products.reduce((total, item) => total + item.quantity, 0) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Empty Cart -->
            <div v-else-if="!loading && !error" class="text-center py-8">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 17a2 2 0 100 4 2 2 0 000-4zM9 17a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p class="text-gray-500">Your cart is empty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {useReviews} from '../customHook/productPage/useReviews.js'
import {useCart} from '../customHook/cartPage/useCart.js'
export default {
  name: 'ProfilePage',
  setup() {
    // User data
    const user = ref({})
    const userLoading = ref(true)
    const userError = ref('')

    // Use composables
    const {
      reviews,
      errorMessage,
      successMessage,
      fetchReviews,
      deleteReview
    } = useReviews()

    const {
      cart,
      loading,
      error,
      message,
      messageType,
      updatingItems,
      fetchCart,
      addToCart,
      removeFromCart
    } = useCart()

    const reviewsLoading = ref(true)

    // Fetch user information
    const fetchUserInfo = async () => {
      try {
        userLoading.value = true
        userError.value = ''
        
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
        if (!token) {
          userError.value = 'Please log in to view your profile'
          return
        }

        const { data } = await axios.post('http://localhost:3000/api/auth/login', {}, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (data.success) {
          user.value = data.user
        } else {
          userError.value = data.message || 'Failed to fetch user information'
        }
      } catch (err) {
        console.error('User fetch error:', err)
        userError.value = err.response?.data?.message || 'Failed to fetch user information'
      } finally {
        userLoading.value = false
      }
    }

    // Format date helper
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    // Initialize data on component mount
    onMounted(async () => {
      await fetchUserInfo()
      
      // Fetch reviews
      reviewsLoading.value = true
      await fetchReviews()
      reviewsLoading.value = false
      
      // Fetch cart
      await fetchCart()
    })

    return {
      // User data
      user,
      userLoading,
      userError,
      
      // Reviews
      reviews,
      reviewsLoading,
      errorMessage,
      successMessage,
      deleteReview,
      
      // Cart
      cart,
      loading,
      error,
      message,
      messageType,
      updatingItems,
      addToCart,
      removeFromCart,
      
      // Helpers
      formatDate
    }
  }
}
</script>