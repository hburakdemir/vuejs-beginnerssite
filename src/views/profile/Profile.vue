<template>
  <div class="max-w-7xl p-6 mx-auto text-primary dark:text-secondary">
    <!-- Navigation Line -->
    <div class="flex items-center justify-center mb-8 relative">
      <div class="w-full h-px bg-gray-300 dark:bg-gray-600"></div>
      <div class="absolute bg-white dark:bg-gray-900 px-8 flex gap-8">
        <router-link 
          to="/profile/favorites" 
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
        >
          Favorites
        </router-link>
        <router-link 
          to="/profile/reviews" 
          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
        >
          Reviews
        </router-link>
      </div>
    </div>

    <!-- Profile Details Title -->
    <h1 class="font-bold text-center text-3xl mb-8">Profile Details</h1>

    <!-- Profile Section -->
    <div class="max-w-2xl mx-auto mb-8">
      <div class="flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl shadow-lg shadow-primary dark:shadow-secondary hover:shadow-blue-400 dark:hover:shadow-blue-900 transition duration-300">
        
        <!-- Profile Photo Section -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {{ getUserInitial() }}
          </div>
          <button 
            @click="handleChangePhoto"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Change Photo
          </button>
        </div>

        <!-- User Info Section -->
        <div class="flex-1 w-full space-y-4">
          <!-- Username Field -->
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-2">Username</label>
              <div v-if="!isEditingUsername" class="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="startEditUsername">
                {{ user?.name || 'Not set' }}
              </div>
              <input 
                v-else
                v-model="editedUsername"
                @blur="saveUsername"
                @keyup.enter="saveUsername"
                @keyup.escape="cancelEditUsername"
                ref="usernameInput"
                class="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Enter username"
              />
            </div>
            <button 
              v-if="!isEditingUsername"
              @click="startEditUsername"
              class="mt-6 p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <Icon icon="material-symbols:edit" class="w-5 h-5" />
            </button>
          </div>

          <!-- Email Field -->
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-2">Email</label>
              <div v-if="!isEditingEmail" class="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="startEditEmail">
                {{ user?.email || 'Not set' }}
              </div>
              <input 
                v-else
                v-model="editedEmail"
                @blur="saveEmail"
                @keyup.enter="saveEmail"
                @keyup.escape="cancelEditEmail"
                ref="emailInput"
                type="email"
                class="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Enter email"
              />
            </div>
            <button 
              v-if="!isEditingEmail"
              @click="startEditEmail"
              class="mt-6 p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <Icon icon="material-symbols:edit" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div v-if="successMessage" class="text-green-500 mb-4 text-center font-medium bg-green-50 dark:bg-green-900 p-3 rounded-lg max-w-2xl mx-auto">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="text-red-500 mb-4 text-center font-medium bg-red-50 dark:bg-red-900 p-3 rounded-lg max-w-2xl mx-auto">
      {{ errorMessage }}
    </div>

    <!-- Divider -->
    <div class="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>

    <!-- Notifications Section -->
    <div class="max-w-2xl mx-auto">
      <div class="p-6 rounded-xl shadow-lg shadow-primary dark:shadow-secondary hover:shadow-blue-400 dark:hover:shadow-blue-900 transition duration-300">
        <h2 class="text-xl font-semibold mb-4">Notifications</h2>
        <div class="flex items-start gap-4">
          <div class="flex-1">
            <p class="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Receive newsletters, promotions and news from Quick Shop Company</strong>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Quick Shop will process your data to send you information about our products and services, promotions, surveys, raffles, based on our legitimate interest, and updates from the creators you follow, if you have consented to this. Your data will not be disclosed to third parties. They will be communicated outside the EU under the terms of the privacy policy. You can opt out of our notifications with the slider. 
              <a href="#" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">More information</a>
            </p>
          </div>
          <div class="flex items-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="notificationsEnabled" 
                class="sr-only peer"
                @change="handleNotificationToggle"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

// Reactive data
const user = ref(null)
const successMessage = ref("")
const errorMessage = ref("")
const notificationsEnabled = ref(false)

// Edit states
const isEditingUsername = ref(false)
const isEditingEmail = ref(false)
const editedUsername = ref("")
const editedEmail = ref("")

// Refs for inputs
const usernameInput = ref(null)
const emailInput = ref(null)

// Token and user info
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

// Get user initial for profile photo
const getUserInitial = () => {
  if (!user.value?.name) return "U"
  return user.value.name.charAt(0).toUpperCase()
}

// Username editing functions
const startEditUsername = async () => {
  isEditingUsername.value = true
  editedUsername.value = user.value?.name || ""
  await nextTick()
  usernameInput.value?.focus()
}

const saveUsername = () => {
  if (editedUsername.value.trim()) {
    user.value.name = editedUsername.value.trim()
    // TODO: API call to save username
    successMessage.value = "Username updated successfully"
    setTimeout(() => successMessage.value = "", 3000)
  }
  isEditingUsername.value = false
}

const cancelEditUsername = () => {
  isEditingUsername.value = false
  editedUsername.value = ""
}

// Email editing functions
const startEditEmail = async () => {
  isEditingEmail.value = true
  editedEmail.value = user.value?.email || ""
  await nextTick()
  emailInput.value?.focus()
}

const saveEmail = () => {
  if (editedEmail.value.trim() && isValidEmail(editedEmail.value.trim())) {
    user.value.email = editedEmail.value.trim()
    // TODO: API call to save email
    successMessage.value = "Email updated successfully"
    setTimeout(() => successMessage.value = "", 3000)
  } else {
    errorMessage.value = "Please enter a valid email address"
    setTimeout(() => errorMessage.value = "", 3000)
  }
  isEditingEmail.value = false
}

const cancelEditEmail = () => {
  isEditingEmail.value = false
  editedEmail.value = ""
}

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Photo change handler
const handleChangePhoto = () => {
  // TODO: Implement photo upload functionality
  console.log("Change photo clicked")
  successMessage.value = "Photo change functionality will be implemented"
  setTimeout(() => successMessage.value = "", 3000)
}

// Notification toggle handler
const handleNotificationToggle = () => {
  // TODO: API call to save notification preference
  const status = notificationsEnabled.value ? "enabled" : "disabled"
  successMessage.value = `Notifications ${status}`
  setTimeout(() => successMessage.value = "", 3000)
}

// Clear messages
const clearMessages = () => {
  successMessage.value = ""
  errorMessage.value = ""
}

onMounted(() => {
  initializeUser()
  if (!user.value) {
    errorMessage.value = "Please login to view your profile"
  }
})
</script>

<style scoped>
/* Custom styles if needed */
</style>