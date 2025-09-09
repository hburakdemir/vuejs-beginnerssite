import { ref, onMounted } from "vue";
import jwtDecode from "jwt-decode";

const user = ref(null);

const checkToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    user.value = null; 
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // saniye cinsinden

    if (decoded.exp < now) {
      
      localStorage.removeItem("authToken");
      user.value = null;
      alert("Oturumunuz süresi doldu. Lütfen tekrar giriş yapın.");
      return false;
    }

    user.value = {
      id: decoded.userId,
      name: decoded.username,
      email: decoded.email,
    };
    return true;
  } catch (err) {
    console.error("Token decode hatası checktokenjs:", err);
    localStorage.removeItem("authToken") && sessionStorage.removeItem("authToken");
    user.value = null;
    return false;
  }
};

onMounted(() => {
  checkToken();
});
