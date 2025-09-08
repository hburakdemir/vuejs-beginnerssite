<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-800 to-indigo-200 dark:from-primary dark:to-primary flex items-center justify-center p-4 transition-colors duration-300"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-4">
        <h1 class="text-4xl font-bold text-secondary mb-2">Quick Shop</h1>
        <p
         class="text-secondary">
          Create your account</p>
      </div>

      <!-- Register Form -->
      <div
        class="backdrop-blur-3xl rounded-3xl p-8 shadow-3xl border-e-8 border-b-4 border-y-2 border-secondary"
      >
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-secondary mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="input-focus w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 hover:rounded-3xl rounded-lg text-primary dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="input-focus w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 hover:rounded-3xl rounded-lg text-primary dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              placeholder="email@example.com"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-secondary mb-2">
              Password
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                class="input-focus w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 hover:rounded-3xl rounded-lg text-primary dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                placeholder="At least 8 characters"
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

          <!-- Password Confirm Input -->
          <div>
            <label
              for="passwordConfirm"
              class="block text-sm font-medium text-secondary mb-2"
            >
              Confirm Password
            </label>
            <div class="relative">
              <input
                :type="showPasswordConfirm ? 'text' : 'password'"
                id="passwordConfirm"
                v-model="form.passwordConfirm"
                class="input-focus w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 hover:rounded-3xl rounded-lg text-primary dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                :class="{
                  'border-red-500 dark:border-red-400':
                    form.password &&
                    form.passwordConfirm &&
                    form.password !== form.passwordConfirm,
                }"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                @click="showPasswordConfirm = !showPasswordConfirm"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <EyeIcon v-if="!showPasswordConfirm" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
            <p
              v-if="
                form.password &&
                form.passwordConfirm &&
                form.password !== form.passwordConfirm
              "
              class="text-red-800 dark:text-red-600 text-sm mt-1"
            >
              Passwords doesnt match
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled=" loading || !(form.password && form.passwordConfirm && form.name && form.email && form.password === form.passwordConfirm)"
            class="w-full bg-blue-950 hover:bg-blue-900 hover:rounded-3xl text-secondary font-medium py-3 px-4 rounded-lg transition-all duration-200 transform disabled:cursor-not-allowed disabled:bg-primary disabled:text-secondary dark:disabled:bg-secondary dark:disabled:text-primary flex justify-center items-center gap-2"
          >
            <span v-if="loading" class="inline-flex items-center">
              <ArrowPathIcon
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary"
              />
              Creating account...
            </span>
            <span v-else >Create Account</span>
          </button>
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
            class="bg-green-500/20  border border-green-900 text-green-950 dark:text-green-400 px-4 py-3 rounded-lg text-sm"
          >
            {{ success }}
          </div>
        </form>

        <!-- Links -->
        <div class="mt-6 space-y-4">
          <div class="text-center">
            <button
              @click="showForgotPassword = true"
              class="text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm hover:underline transition-colors"
            >
              Forgot your password?
            </button>
          </div>

          <div class="text-center text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?
            <a
              href="/login"
              class="text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              Login
            </a>
          </div>
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
        <h3 class="text-xl font-semibold text-gray-800 dark:text-secondary mb-4">
          Forgot Password
        </h3>
        <p class="text-gray-800 dark:text-gray-300 text-sm mb-4">
          Enter your email address and we'll send you a password reset link.
        </p>
        <form @submit.prevent="handleForgotPassword">
          <input
            type="email"
            v-model="forgotEmail"
            class="w-full px-4 py-3 bg-secondary dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-900 dark:text-secondary placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
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
              class="flex-1 bg-blue-950 hover:bg-blue-900 hover:rounded-3xl text-secondary py-2 px-4 rounded-lg transition-all duration-600"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";

// Yeni import
import { validateRegisterForm } from "../helper/validation";

const router = useRouter();
const form = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref("");
const showForgotPassword = ref(false);
const forgotEmail = ref("");

const handleRegister = async () => {
  loading.value = true;
  success.value = "";
  error.value = "";

  // Form validasyonu helper ile
  const validation = validateRegisterForm(form.value);
  if (!validation.valid) {
    error.value = validation.message;
    loading.value = false;
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
      }),
    });

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      error.value = data.message || "An error occurred while registration";
    } else {
      success.value = "Account created successfully! You can now sign in.";
      form.value = { name: "", email: "", password: "", passwordConfirm: "" };
      setTimeout(() => router.push("/login"), 1000);
    }
  } catch (err) {
    console.error(err);
    error.value = "Connection error. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

