const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (err) {
    return { success: false, data: { message: err.message } };
  }
};
