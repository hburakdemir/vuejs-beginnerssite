import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export function useProduct() {
  const product = ref(null);
  const isFavorite = ref(false);
  const route = useRoute();

  const fetchProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${route.params.id}`
    );
    product.value = data;

    const token =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    if (token) {
      try {
        const res = await axios.get("http://localhost:3000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        isFavorite.value = res.data.favorites.some(
          (f) => f.product._id === product.value._id
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleFavorite = async () => {
    const token =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in to favorite products!");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/api/favorites/${product.value._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.added || res.data.favorite) isFavorite.value = true;
      if (res.data.removed) isFavorite.value = false;
    } catch (err) {
      console.error(err);
    }
  };

  return { product, isFavorite, fetchProduct, toggleFavorite };
}
