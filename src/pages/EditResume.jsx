import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    summary: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing resume
  const fetchResume = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setFormData(data);
      } else {
        alert("❌ Error: " + data.message);
        navigate("/resumes");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Server error");
      navigate("/resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/resume/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Resume updated!");
        navigate("/resumes");
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Server error");
    }
  };

  if (loading) return <p>Loading resume...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Resume Form */}
      <div className="w-full md:w-1/2 space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">Edit Resume</h2>
        {["name", "email", "phone", "education", "skills", "summary"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
        ))}
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Resume
        </button>
      </div>

      {/* Live Preview */}
      <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Education:</strong> {formData.education}</p>
          <p><strong>Skills:</strong> {formData.skills}</p>
          <p><strong>Summary:</strong> {formData.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default EditResume;
