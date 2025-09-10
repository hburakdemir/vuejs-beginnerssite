<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex flex-col lg:flex-row gap-6">
    
        <div class="w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 h-fit lg:sticky lg:top-6">
          <div class="flex items-center gap-2 mb-6">
            <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <h3 class="text-xl font-bold text-gray-800">Filtreler</h3>
          </div>
          
         
          <div class="mb-6">
  <h4 class="text-base font-semibold text-gray-700 mb-3">Gender</h4>
  <div class="space-y-2">
    <label v-for="gender in genders" :key="gender.value" 
           class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <input 
        type="checkbox" 
        v-model="filters.genders"
        :value="gender.value"
        class="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
      >
      <span class="text-sm text-gray-600">{{ gender.label }}</span>
    </label>
  </div>
</div>

<!-- BaseType Filter -->
<div class="mb-6">
  <h4 class="text-base font-semibold text-gray-700 mb-3">Base Types</h4>
  <div class="space-y-2">
    <label v-for="type in baseTypes" :key="type.value" 
           class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <input 
        type="checkbox" 
        v-model="filters.baseTypes"
        :value="type.value"
        class="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
      >
      <span class="text-sm text-gray-600">{{ type.label }}</span>
    </label>
  </div>
</div>

       
          <div class="mb-6">
            <h4 class="text-base font-semibold text-gray-700 mb-3">Size</h4>
            <div class="flex flex-wrap gap-2">
              <label v-for="size in sizes" :key="size" 
                     class="flex items-center justify-center w-10 h-10 border-2 rounded-lg cursor-pointer transition-all"
                     :class="filters.sizes.includes(size) ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 hover:border-gray-300'">
                <input 
                  type="checkbox" 
                  v-model="filters.sizes"
                  :value="size"
                  class="sr-only"
                >
                <span class="text-xs font-medium">{{ size }}</span>
              </label>
            </div>
          </div>

         
          <div class="mb-6">
            <h4 class="text-base font-semibold text-gray-700 mb-3">Shoe Size</h4>
            <div class="grid grid-cols-3 gap-2">
              <label v-for="shoeSize in shoeSizes" :key="shoeSize" 
                     class="flex items-center justify-center h-10 border-2 rounded-lg cursor-pointer transition-all text-sm"
                     :class="filters.shoeSizes.includes(shoeSize) ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 hover:border-gray-300'">
                <input 
                  type="checkbox" 
                  v-model="filters.shoeSizes"
                  :value="shoeSize"
                  class="sr-only"
                >
                {{ shoeSize }}
              </label>
            </div>
          </div>

          
          <button 
            @click="clearAllFilters"
            class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Clear all filters
          </button>
        </div>

       
        <div class="flex-1">
        
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 class="text-2xl font-bold text-gray-800">Products</h2>
                <p class="text-gray-600 mt-1">{{ filteredProducts.length }} found products</p>
              </div>
              <select 
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="default">Default</option>
                <option value="name-asc">A-Z Arrangement</option>
                <option value="name-desc">Z-A Arrangement</option>
                <option value="price-asc">Price: Lower → High</option>
                <option value="price-desc">Price: High → Lower</option>
              </select>
            </div>
          </div>

      
          <div v-if="loading" class="flex items-center justify-center py-16">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p class="text-gray-600">Products are loading...</p>
            </div>
          </div>

         
          <div v-else-if="filteredProducts.length > 0" 
               class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="product in paginatedProducts" 
              :key="product.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
           
              <div class="relative h-72 bg-gray-200 overflow-hidden">
                <img 
                  :src="product.images[0]" 
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                >
              
                 <span
                class="absolute top-2 right-2 text-3xl cursor-pointer drop-shadow-lg"
                @click.stop="toggleFavorite(product._id)"
              >
                <Icon
                  :icon="
                    isFavorite(product._id) ? 'mdi:heart' : 'mdi:heart-outline'
                  "
                  :class="
                    isFavorite(product._id) ? 'text-red-500' : 'text-white'
                  "
                />
              </span>
              </div>

            
              <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{{ product.name }}</h3>
                <p class="text-sm text-gray-500 mb-3">Quantity:{{ product.quantity }}</p>
                <div class="flex items-center gap-2">
                 
                  <span class="text-xl font-bold text-red-500">Price:{{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>

        
          <div v-else class="text-center py-16">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Product cant found</h3>
            <p class="text-gray-600">No product for this filter</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { fetchProducts } from "../../customHook/fetchProducts";


const {
  productList,
  favoriteIds,
  toggleFavorite,
  isFavorite
} = fetchProducts("")  

const loading = ref(false)
const sortBy = ref("default")

const filters = ref({
  genders: [],
  baseTypes: [],
  sizes: [],
  shoeSizes: []
})



const genders = [
  { value: "man", label: "Man" },
  { value: "woman", label: "Woman" },
  { value: "chield", label: "Chield" },
  { value: "unisex", label: "Unisex" }
]

const baseTypes = [
  { value: "clothes", label: "Clothing" },
  { value: "shoes", label: "Shoes" },
  { value: "accessory", label: "Accessory" }
]

const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]


const shoeSizes = Array.from({ length: 15 }, (_, i) => 36 + i) 


const filteredProducts = computed(() => {
  let filtered = productList.value

 
  if (filters.value.genders.length > 0) {
    filtered = filtered.filter(product =>
      filters.value.genders.includes(product.gender)
    )
  }


  if (filters.value.baseTypes.length > 0) {
    filtered = filtered.filter(product =>
      filters.value.baseTypes.includes(product.baseType)
    )
  }


  if (filters.value.sizes.length > 0) {
    filtered = filtered.filter(product =>
      product.size && filters.value.sizes.includes(product.size)
    )
  }

  // ShoeSize filter
  if (filters.value.shoeSizes.length > 0) {
    filtered = filtered.filter(product =>
      product.shoeSize && filters.value.shoeSizes.includes(product.shoeSize)
    )
  }

  return filtered
})

// Sıralama
const paginatedProducts = computed(() => {
  let sorted = [...filteredProducts.value]

  switch (sortBy.value) {
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name, "tr"))
      break
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name, "tr"))
      break
    case "price-asc":
      sorted.sort((a, b) => a.priceValue - b.priceValue)
      break
    case "price-desc":
      sorted.sort((a, b) => b.priceValue - a.priceValue)
      break
  }
  return sorted
})


const clearAllFilters = () => {
  filters.value = { categories: [], types: [], sizes: [], shoeSizes: [] }
  sortBy.value = "default"
}


watch(filters, () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 300)
}, { deep: true })
</script>


<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>