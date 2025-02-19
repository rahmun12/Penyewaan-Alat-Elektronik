"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetAlat } from "@/dataservices/Alat/api";
import { GetAllAlatResponse } from "@/dataservices/Alat/type";
import { Alat } from "@/types/alat";

export default function AlatList() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [alatData, setAlatData] = useState<Alat[]>([]);
  const [search, setSearch] = useState("");

  const colors = [
    "bg-purple-200",
    "bg-yellow-200",
    "bg-blue-200",
    "bg-red-200",
    "bg-green-200",
    "bg-pink-200",
  ];
  const { data, isLoading, isError } = useGetAlat<GetAllAlatResponse>(
    "/v1/alat",
    1
  );

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      // Filter data berdasarkan input pencarian
      const filteredData = data.data.filter((alat) =>
        alat.alat_nama.toLowerCase().includes(search.toLowerCase())
      );
      setAlatData(filteredData);
    }
  }, [data, search]);

  return (
    <div
      className="container mx-auto p-6 min-h-screen pb-52 transition-transform duration-300 pt-0"
      style={{
        transform: isPortalOpen ? "translateX(16rem)" : "translateX(0)",
        width: isPortalOpen ? "calc(100% - 16rem)" : "100%",
      }}
    >
      <div className="flex bg-blue-50 items-center justify-center rounded-b-full pt-10 mb-20">
        <img
          src="/ELEKTRONIK.png"
          alt="Gambar Elektronik"
          className="w-[30rem] h-[30rem] object-contain"
        />
        <motion.h1
          className="text-6xl font-extrabold text-center text-blue-500 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          WELCOME TO ELECTRONIC RENTAL
        </motion.h1>
      </div>
      <div className="flex justify-center items-center w-full my-6">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Cari alat..."
            className="w-full p-3 pl-10 border-2 border-transparent rounded-lg text-black text-lg shadow-md 
                 bg-gradient-to-r from-purple-100 to-blue-100 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 text-lg">Memuat data...</p>
      ) : isError ? (
        <p className="text-center text-red-500 text-lg">
          Gagal memuat data. Silakan coba lagi.
        </p>
      ) : alatData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Alat tidak ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {alatData.map((alat, index) => (
            <motion.div
              key={alat.id}
              className="card bg-base-100 w-96 shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <figure className="px-10 pt-10">
                <img
                  src={`https://finalprojectburi.aran8276.site/storage/${alat.alat_gambar}`}
                  alt={alat.alat_nama}
                  className="rounded-xl w-full h-60 object-cover"
                />
              </figure>

              <div
                className={`card-body text-left rounded-xl mx-10 my-2 ${
                  colors[index % colors.length]
                }`}
              >
                <h2 className="card-title">{alat.alat_nama}</h2>
                <p className="text-gray-700 text-sm">{alat.alat_deskripsi}</p>
                <p className="text-lg font-semibold text-black">
                  Harga: {alat.alat_hargaperhari}
                </p>

                <motion.p
                  className={`text-sm font-medium ${
                    alat.alat_stok > 0 ? "text-green-600" : "text-red-600"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {alat.alat_stok > 0 ? "Tersedia ✅" : "Tidak Tersedia ❌"}
                </motion.p>

                <motion.p
                  className={`text-md font-semibold ${
                    alat.alat_stok > 0 ? "text-black" : "text-red-600"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {alat.alat_stok > 0
                    ? `Stok: ${alat.alat_stok} unit`
                    : "Habis ❌"}
                </motion.p>
              </div>
              <div className="card-actions flex justify-center mb-4 pb-4 px-10 w-full ">
                <Link href={`/user/Alat/Detail/${alat.id}`} className="w-full">
                  <motion.button
                    name="detail"
                    className="btn btn-primary w-full text-base text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    Lihat Detail
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
