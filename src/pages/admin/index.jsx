import { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [formData, setFormData] = useState({ image: null, description: "" });

  // URL API Laravel
  const apiUrl = "http://localhost:3001/content";

  // Ambil data dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(apiUrl); // GET request
      const data = await response.json();
      setContentList(data); // Menyimpan data dari backend
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveContent = async () => {
    if (!formData.image || !formData.description.trim()) {
      alert("Please upload an image and enter a description.");
      return;
    }

    // Membuat FormData untuk mengirim file dan teks
    const formPayload = new FormData();
    formPayload.append("image", formData.image);
    formPayload.append("description", formData.description);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error("Failed to save content");
      }

      const newContent = await response.json();

      // Update tabel dengan data baru tanpa perlu refresh
      setContentList([...contentList, newContent]);
      setShowModal(false);
      setFormData({ image: null, description: "" }); // Reset form
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleDeleteContent = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete content");
      }

      // Filter data untuk menghapus konten dari tabel
      setContentList(contentList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col">
        {/* Header */}
        <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <span className="text-xl font-bold mr-2">+</span> Add Content
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6 w-full ">
          {/* Table Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Content Table</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentList.map((content) => (
                  <tr key={content.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{content.id}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={content.image_url}
                        alt="Uploaded Content"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{content.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteContent(content.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Content</h2>
            <form className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  accept="image/*"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="4"
                  placeholder="Write a description..."
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveContent}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
