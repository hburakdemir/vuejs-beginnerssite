import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export function useReviews() {
  const reviews = ref([]);
  const newReview = ref("");
  const errorMessage = ref("");
  const successMessage = ref("");
  const route = useRoute();

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/comments/${route.params.id}`
      );
      reviews.value = data.comments;
    } catch (err) {
      console.error(err);
      errorMessage.value = "Yorumlar alınamadı";
    }
  };

  const submitReview = async (productId) => {
  errorMessage.value = "";
  successMessage.value = "";

  const token =
    sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  if (!token) {
    errorMessage.value = "Please log in to write a review!";
    return;
  }

  if (!newReview.value.trim()) {
    errorMessage.value = "Review cannot be empty";
    return;
  }

  try {
    console.log("Submitting review:", { productId, text: newReview.value }); // debug
    const res = await axios.post(
      "http://localhost:3000/api/comments/add",
      { productId, text: newReview.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      successMessage.value = res.data.message;
      newReview.value = "";
      fetchReviews();
    } else {
      errorMessage.value = res.data.message;
    }
  } catch (err) {
    console.error(err);
    errorMessage.value =
      err.response?.data?.message || "Yorum eklenirken hata oluştu";
  }
};

  const deleteReview = async (commentId) => {
    const token =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    if (!token) {
      errorMessage.value = "Lütfen giriş yapın!";
      return;
    }

    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        reviews.value = reviews.value.filter((r) => r._id !== commentId);
        successMessage.value = "Yorum başarıyla silindi";
      } else {
        errorMessage.value = data.message;
      }
    } catch (err) {
      console.error(err);
      errorMessage.value =
        err.response?.data?.message || "Yorum silinirken hata oluştu";
    }
  };

  return { reviews, newReview, errorMessage, successMessage, fetchReviews, submitReview, deleteReview };
}
