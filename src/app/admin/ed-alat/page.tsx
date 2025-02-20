"use client";

import { useState, useEffect } from "react";
import { Table, Button, TextInput, Card } from "flowbite-react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Alat } from "@/types/alat";
import { useGetAlat } from "@/dataservices/Alat/api";
import { GetAllAlatResponse } from "@/dataservices/Alat/type";
import { getBaseQuery } from "@/init/baseQuery";
import { motion } from "framer-motion";

export default function AlatAdmin() {
  const [alatData, setAlatData] = useState<Alat[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data, error, isLoading } = useGetAlat<GetAllAlatResponse>(
    "/api/v1/alat",
    1
  );
  console.log(data);

  useEffect(() => {
    if (data?.data) {
      setAlatData(data.data);
    }
  }, [data]);

  if (error) {
    console.error("Error fetching data:", error);
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus alat ini?")) return;

    try {
      const response = await getBaseQuery(`/api/v1/alat/${id}`, {
        method: "DELETE",
      });

      if (response.success) {
        setAlatData((prevData) => prevData.filter((alat) => alat.id !== id));
      } else {
        console.error("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredAlat = alatData.filter((alat) =>
    alat.alat_nama?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center pt-16 mb-20">
      <div className="w-full p-6 bg-white rounded-xl mt-14">
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📋 Manajemen Daftar Alat
        </motion.h1>
        <div className="flex justify-center items-center mb-10">
          <TextInput
            placeholder="Cari alat..."
            className="flex w-1/2 border-gray-300 p-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            name="tambah-alat"
            onClick={() => router.push("/admin/ed-alat/tambah")}
            className="border-2 h-10 bg-gradient-to-r from-emerald-400 to-emerald-400 hover:from-emerald-600 hover:to-emerald-600 flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
          >
            <FaPlus /> Tambah
          </Button>
        </div>
        {isLoading ? (
          <p className="text-center text-lg">Memuat data alat...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
            {filteredAlat.map((alat) => (
              <div
                key={alat.id}
                className="bg-white shadow-xl rounded-lg p-4 hover:shadow-xl transition"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${alat.alat_gambar}`}
                  alt={alat.alat_nama || "Gambar tidak tersedia"}
                  className="w-full h-72 object-cover rounded mb-4"
                />

                <h2 className="text-xl font-semibold text-gray-800">
                  {alat.alat_nama || "Nama tidak tersedia"}
                </h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {alat.kategori_id || "Tidak ada kategori"}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Rp {alat.alat_hargaperhari?.toLocaleString() || "0"} /hari
                </p>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {alat.alat_deskripsi || "Tidak ada deskripsi"}
                </p>
                <div className="flex justify-between items-center mt-8">
                  <Button
                    name="edit-alat"
                    onClick={() =>
                      router.push(`/admin/ed-alat/edit/${alat.id}`)
                    }
                    className="bg-gradient-to-r from-yellow-300 to-yellow-300 hover:from-yellow-400 hover:to-yellow-400 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(alat.id)}
                    className="bg-gradient-to-r from-red-500 to-red-500 hover:from-red-700 hover:to-red-700 text-whitebg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                  >
                    <FaTrash /> Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
