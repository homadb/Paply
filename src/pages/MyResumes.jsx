import { useEffect, useState } from "react";

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/resume/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setResumes(data);
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">🗂️ My Resumes</h2>
      {resumes.length === 0 ? (
        <p className="text-gray-600">You haven't created any resumes yet.</p>
      ) : (
        resumes.map((resume) => (
          <div key={resume._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{resume.name}</h3>
            <p><strong>Email:</strong> {resume.email}</p>
            <p><strong>Phone:</strong> {resume.phone}</p>
            <p><strong>Skills:</strong> {resume.skills}</p>
            <p className="text-sm text-gray-500 mt-1">
              Created: {new Date(resume.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyResumes;
