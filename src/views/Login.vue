<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-800 to-indigo-200 dark:from-primary dark:to-primary flex items-center justify-center p-4 transition-colors duration-300"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-4">
        <h1 class="text-4xl font-bold text-secondary mb-2">Quick Shop</h1>
        <p class="text-secondary">Welcome back</p>
      </div>

      <!-- Login Form -->
      <div
        class="backdrop-blur-3xl rounded-3xl p-8 shadow-3xl border-e-8 border-b-4 border-y-2 border-secondary"
      >
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-secondary mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-primary dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:rounded-3xl"
              placeholder="email@example.com"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-secondary mb-2"
            >
              Password
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                class="w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-primary dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:rounded-3xl"
                placeholder="Enter your password"
                required
                minlength="8"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.rememberMe"
                class="rounded border-gray-300 text-blue-950 focus:ring-blue-950 focus:ring-2"
              />
              <span class="ml-2 text-sm text-secondary">Remember me</span>
            </label>
            <button
              type="button"
              @click="showForgotPassword = true"
              class="text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm hover:underline transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !(form.email && form.password)"
            class="w-full bg-blue-950 hover:bg-blue-900 hover:rounded-3xl text-secondary font-medium py-3 px-4 rounded-lg transition-all duration-200 transform disabled:cursor-not-allowed disabled:bg-primary disabled:text-secondary dark:disabled:bg-secondary dark:disabled:text-primary flex justify-center items-center gap-2"
          >
            <ArrowPathIcon
              v-if="loading"
              class="animate-spin -ml-1 h-5 w-5 text-secondary"
            />
            <span>{{ loading ? "Signing in..." : "Sign In" }}</span>
          </button>

          <!-- Error Message -->
          <div
            v-if="error"
            class="bg-red-500/20 border border-red-500/30 text-red-900 dark:text-red-400 px-4 py-3 rounded-lg text-sm"
          >
            {{ error }}
          </div>

          <!-- Success Message -->
          <div
            v-if="success"
            class="bg-green-500/20 border border-green-900 text-green-950 dark:text-green-400 px-4 py-3 rounded-lg text-sm"
          >
            {{ success }}
          </div>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div
              class="w-full border-t border-gray-300 dark:border-gray-600"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-transparent text-secondary"
              >Or continue with</span
            >
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="space-y-3">
          <button
            type="button"
            @click="handleGoogleLogin"
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:rounded-3xl bg-secondary dark:bg-gray-800/70 text-primary dark:text-secondary hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            @click="handleFacebookLogin"
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:rounded-3xl bg-secondary dark:bg-gray-800/70 text-primary dark:text-secondary hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <svg
              class="w-5 h-5 mr-3 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Continue with Facebook
          </button>
        </div>

        <!-- Register Link -->
        <div class="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Don't have an account?
          <a
            href="/register"
            class="text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
          >
            Create account
          </a>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div
      v-if="showForgotPassword"
      class="fixed inset-0 bg-primary/50 flex items-center justify-center p-4 z-50"
      @click.self="showForgotPassword = false"
    >
      <div
        class="backdrop-blur-lg bg-secondary/30 dark:bg-primary/30 rounded-2xl p-6 max-w-md w-full border border-secondary/20 dark:border-gray-700/30"
      >
        <h3
          class="text-xl font-semibold text-gray-800 dark:text-secondary mb-4"
        >
          Forgot Password
        </h3>
        <p class="text-gray-800 dark:text-gray-300 text-sm mb-4">
          Enter your email address and we'll send you a password reset link.
        </p>
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <input
            type="email"
            v-model="forgotEmail"
            class="w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-900 dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your email address"
            required
          />
          <div class="flex gap-3">
            <button
              type="button"
              @click="showForgotPassword = false"
              class="flex-1 bg-gray-500/50 hover:bg-gray-500/70 text-secondary py-2 px-4 hover:rounded-3xl rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-950 hover:bg-blue-900 hover:rounded-3xl text-secondary py-2 px-4 rounded-lg transition-all duration-200"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";

const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const showPassword = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref("");
const isDarkMode = ref(false);
const showForgotPassword = ref(false);
const forgotEmail = ref("");

const handleLogin = async () => {
  if (form.value.password.length < 8) {
    error.value = "Password must be at least 8 characters";
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const { data } = await axios.post("http://localhost:3000/api/auth/login", {
      email: form.value.email,
      password: form.value.password,
      rememberMe: form.value.rememberMe,
    });

    success.value = "Login successful! Redirecting...";
    console.log("Gelen user bilgileri:", data);

    // Token sakla
    if (data.token) {
      if (form.value.rememberMe) {
        sessionStorage.setItem("authToken", data.token);
      } else {
        localStorage.setItem("authToken", data.token);
      }
    }

    if (data.decodedToken) {
      localStorage.setItem("decodedToken", JSON.stringify(data.decodedToken));
    }

    if (data.user) {
      localStorage.setItem("user info",JSON.stringify(data.user));
    }

    // UI’da hem token hem decoded token göstermek
    console.log("Token:", data.token);
    console.log("Decoded Token:", data.decodedToken);
    console.log("User:", data.user);

    // Redirect
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (err) {
    console.error("Login error:", err);
    if (err.response && err.response.data) {
      error.value = err.response.data.message || "Invalid email or password";
    } else {
      error.value = "Connection error. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = () => {
  console.log("Google login clicked");
};

const handleFacebookLogin = () => {
  console.log("Facebook login clicked");
};

</script>

<style scoped></style>
