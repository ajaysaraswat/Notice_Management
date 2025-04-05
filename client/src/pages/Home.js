import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/notices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotices(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/notices", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Notice created successfully");
      setShowForm(false);
      setFormData({ title: "", content: "" });
      fetchNotices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create notice");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/api/notices/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //console.log("Delete response:", response.data);
      toast.success("Notice deleted successfully");
      fetchNotices();
    } catch (error) {
      console.error("Delete error details:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        error: error.message,
      });

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        // You might want to redirect to login here
      } else if (error.response?.status === 403) {
        toast.error("You are not authorized to delete this notice");
      } else if (error.response?.status === 404) {
        toast.error("Notice not found");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete notice");
      }
    }
  };

  const canManageNotice = (notice) => {
    return (
      user &&
      (user.role === "admin" ||
        (user.role === "teacher" && notice.author._id === user.id))
    );
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center">Please log in to view notices</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Notice Board</h1>
        {(user.role === "teacher" || user.role === "admin") && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "Post New Notice"}
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Post Notice
          </button>
        </form>
      )}

      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {notice.title}
                </h2>
                <p className="text-gray-600 mb-4">{notice.content}</p>
                <div className="text-sm text-gray-500">
                  Posted by {notice.author.name} on{" "}
                  {new Date(notice.createdAt).toLocaleDateString()}
                </div>
              </div>
              {canManageNotice(notice) && (
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
