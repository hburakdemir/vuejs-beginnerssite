<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-800 to-indigo-200 dark:from-primary dark:to-primary flex items-center justify-center p-4 transition-colors duration-300"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-4">
        <h1 class="text-4xl font-bold text-secondary mb-2">Quick Shop</h1>
        <p class="text-secondary">Create your account</p>
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
            :disabled="
              loading ||
              (form.password &&
                form.passwordConfirm &&
                form.password !== form.passwordConfirm)
            "
            class="btn-hover w-full disabled:bg-secondary disabled:text-primary bg-blue-950 hover:bg-blue-900 hover:rounded-3xl disabled-white text-secondary font-medium py-3 px-4 rounded-lg transition-all duration-200 transform disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="inline-flex items-center">
              <ArrowPathIcon
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary"
              />
              Creating account...
            </span>
            <span v-else >Create Account</span>
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

