// Email doğrulama
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password doğrulama (en az 8 karakter, 1 büyük harf, 1 rakam, 1 özel karakter)
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};

// regexleri uygulayan front validasyonu
export const validateRegisterForm = (form) => {
  if (!form.name || !form.email || !form.password) {
    return { valid: false, message: "All fields are required" };
  }

  if (!validateEmail(form.email)) {
    return { valid: false, message: "Email must be like: email@example.com" };
  }

  if (!validatePassword(form.password)) {
    return {
      valid: false,
      message:
        "Password must have at least 8 characters, 1 uppercase, 1 number, 1 special character",
    };
  }

  if (form.password !== form.passwordConfirm) {
    return { valid: false, message: "Passwords do not match" };
  }

  return { valid: true };
};
