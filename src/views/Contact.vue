<template>
  <div class="flex flex-col md:flex-row min-h-screen p-8 ">
    <!-- Sol div: Form -->
    <div class="flex-1 flex flex-col items-center justify-start p-4">
      <h3 class="text-2xl font-bold mb-6 text-center text-black dark:text-white">Contact Us</h3>
      
      <form @submit.prevent="handleSubmit" class="w-full max-w-md">
        <!-- Name -->
        <div class="mb-4 flex flex-col">
          <label for="name" class="mb-1 text-sm font-medium bg-transparent text-gray-800 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            v-model="name"
            maxlength="30"
            placeholder="Please enter your name"
            class="border-b bg-transparent focus:outline-none text-black dark:text-white focus:border-white py-2"
          />
        </div>

        <!-- Surname -->
        <div class="mb-4 flex flex-col">
          <label for="surname" class="mb-1 text-sm font-medium text-gray-800 dark:text-white">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            maxlength="30"
            v-model="surname"
            placeholder="Please enter your surname"
            class="border-b border-gray-400 bg-transparent text-black dark:text-white focus:outline-none focus:border-blue-500 py-2"
          />
        </div>

       
        <div class="mb-4 flex flex-col">
          <label for="email" class="mb-1 text-sm font-medium text-gray-800 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            maxlength="30"
            v-model="email"
            placeholder="Please enter your email"
            class="border-b border-gray-400 bg-transparent text-black dark:text-white focus:outline-none focus:border-white py-2"
          />
        </div>

        
        <div class="mb-4 flex flex-col">
          <label for="phone" class="mb-1 text-sm font-medium text-gray-800 dark:text-white">
            Phone
          </label>
          <input
            
            id="phone"
             maxlength="15"
            v-model="phone"
            placeholder="Please enter your phone number"
            class="border-b border-gray-400 bg-transparent text-black dark:text-white focus:outline-none focus:border-white py-2"
          />
        </div>

        <!-- Message -->
        <div class="mb-4 flex flex-col">
          <label for="message" class="mb-1 text-sm font-medium text-gray-800 dark:text-white">
            Message
          </label>
          <textarea
            id="message"
            v-model="message"
            placeholder="Please enter your message"
            class="border-b border-gray-400 bg-transparent text-black dark:text-white focus:outline-none focus:border-white py-2 h-28 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          class="mt-4 px-6 py-2 bg-black bg-opacity-20 dark:bg-white text-black dark:text-black rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>

    <!-- Sağ div: İletişim bilgileri -->
    <div class="flex-1 flex flex-col justify-start text-center p-4 text-gray-800 dark:text-white">
      <h4 class="text-xl font-bold mb-4">Our Contact Info</h4>
      <p class="mb-2 mt-24">John Doe</p>
      <p class="mb-2">1234 Lorem Street</p>
      <p class="mb-2">Ipsum City, 56789</p>
      <p class="mb-2">Email: john.doe@example.com</p>
      <p class="mb-2">Phone: +1 234 567 890</p>
      <p class="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut
        eros non libero pretium tristique.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const surname = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");

const handleSubmit = () => {
  console.log({ name: name.value, surname: surname.value, email: email.value, phone: phone.value, message: message.value });
  alert("Form submitted!");
};
</script>
