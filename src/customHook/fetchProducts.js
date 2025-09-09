// composables/useProducts.js
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

export function fetchProducts(section) {
  const productList = ref([]);
  const activeImageIndexes = ref([]);
  const favorites = ref([]);
  const currentIndex = ref(0);
  const visibleItems = ref(4);

  const getAuthToken = () => {
    return (
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken")
    );
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/products?section=${section}`
      );
      productList.value = res.data.map((p) => ({
        ...p,
        images: Array.isArray(p.images) ? p.images : [p.images],
      }));
      activeImageIndexes.value = productList.value.map(() => 0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const res = await axios.get("http://localhost:3000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      favorites.value = res.data.favorites.map((f) => f.product._id);
    } catch (err) {
      console.error(err);
    }
  };

  const isFavorite = (productId) => favorites.value.includes(productId);

  const toggleFavorite = async (productId) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      await axios.post(
        `http://localhost:3000/api/favorites/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (favorites.value.includes(productId)) {
        favorites.value = favorites.value.filter((id) => id !== productId);
      } else {
        favorites.value.push(productId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Slider helpers
  function updateVisibleItems() {
    if (window.innerWidth < 768) visibleItems.value = 1;
    else if (window.innerWidth < 1024) visibleItems.value = 2;
    else visibleItems.value = 4;
  }

  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % productList.value.length;
  };

  const prevSlide = () => {
    currentIndex.value =(currentIndex.value - 1 + productList.value.length) % productList.value.length;
  };

  const nextImage = (i) => {
  activeImageIndexes.value[i] =(activeImageIndexes.value[i] + 1) % productList.value[i].images.length;
};

const prevImage = (i) => {
  activeImageIndexes.value[i] =(activeImageIndexes.value[i] - 1 + productList.value[i].images.length) % productList.value[i].images.length;
};


  onMounted(() => {
    fetchProducts();
    fetchFavorites();
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
  });
  onUnmounted(() => window.removeEventListener("resize", updateVisibleItems));

  return {
    productList,
    activeImageIndexes,
    favorites,
    currentIndex,
    visibleItems,
    isFavorite,
    toggleFavorite,
    nextSlide,
    prevSlide,
    nextImage,
    prevImage,
  };
}
