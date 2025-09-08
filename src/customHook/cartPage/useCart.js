import { ref } from "vue";
import axios from "axios";

export function useCart() {
  const cart = ref({ products: [] });
  const loading = ref(true);
  const error = ref(null);
  const message = ref("");        
  const messageType = ref("");    
  const updatingItems = ref(new Set());

  const getAuthToken = () => localStorage.getItem("authToken") || "";

  const fetchCart = async () => {
    try {
      loading.value = true;
      error.value = null;
      message.value = "";
      const { data } = await axios.get("http://localhost:3000/api/carts", {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (data.success) cart.value = data.cart;
      else error.value = data.message || "Sepet yüklenirken hata oluştu";
    } catch (err) {
      error.value = "Sunucu ile bağlantı kurulamadı";
      console.error("Cart fetch error:", err);
    } finally {
      loading.value = false;
    }
  };

  const updateCartItem = async (productId, action) => {
    const token = getAuthToken();
    if (!token) {
      message.value = "Please log in to add a product";
      messageType.value = "error";
      return;
    }

    try {
      updatingItems.value.add(productId);
      error.value = null;
      message.value = "";

      if (action === "add") {
        const { data } = await axios.post(
          "http://localhost:3000/api/carts/add",
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) {
          cart.value = data.cart;
          message.value = "Product added successfully";
          messageType.value = "success";
        } else {
          message.value = data.message || "Failed to add product";
          messageType.value = "error";
        }
      } else {
        const { data } = await axios.delete(
          "http://localhost:3000/api/carts/remove",
          {
            headers: { Authorization: `Bearer ${token}` },
            data: { productId },
          }
        );
        if (data.success) cart.value = data.cart;
        else {
          message.value = data.message || "Failed to remove product";
          messageType.value = "error";
        }
      }
    } catch (err) {
      message.value = "Server error";
      messageType.value = "error";
      console.error("Cart update error:", err);
    } finally {
      updatingItems.value.delete(productId);
    }
  };

  const addToCart = (productId) => updateCartItem(productId, "add");
  const removeFromCart = (productId) => updateCartItem(productId, "remove");

  return {
    cart,
    loading,
    error,
    message,
    messageType,
    updatingItems,
    fetchCart,
    addToCart,
    removeFromCart,
  };
}
