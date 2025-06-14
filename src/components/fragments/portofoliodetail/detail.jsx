// src/pages/PortofolioDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

const PortofolioDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/portofoliosindex/${id}`);
        // console.log(response.data);
        setData(response.data.data);
        // setData(response.data.data); // Pastikan backend mengembalikan { data: { ... } }
      } catch (err) {
        console.error("Gagal ambil data:", err);
        setError("Gagal mengambil data portofolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p className="text-center">Memuat data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data) return <p className="text-center text-gray-500">Data tidak ditemukan.</p>;

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-1">{data.client_name} • {data.date}</p>
      <p className="text-sm italic text-gray-500 mb-4">{data.caption}</p>

      <img
        src={`${axiosInstance.defaults.baseURL}/storage/${data.photo_path}`}
        alt={data.title}
        className="w-full h-[400px] object-cover rounded-md mb-6"
      />

      <p className="text-lg leading-relaxed">{data.description}</p>
    </div>
  );
};

export default PortofolioDetail;
