console.log("Login component loaded!");

import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await loginUser(formData);

    if (result.success) {
      setSuccess("🎉 Login successful!");
      localStorage.setItem("token", result.data.token);
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setError(result.data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>

      {/* Feedback */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
};

export default Login;
