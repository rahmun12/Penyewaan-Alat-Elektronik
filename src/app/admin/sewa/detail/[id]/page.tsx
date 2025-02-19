"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "flowbite-react";
import { GetPenyewaanResponse } from "@/dataservices/penyewaan/type";
import { useGetPenyewaan } from "@/dataservices/penyewaan/api";
import { Penyewaan } from "@/types/penyewaan";

export default function PenyewaanDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState<Penyewaan | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("ID dari URL:", id);

  const { data, error, isLoading } = useGetPenyewaan<GetPenyewaanResponse>(
    `/api/v1/penyewaan/${id}`,
    1
  );

  useEffect(() => {
    if (data && data.data) {
      setDetail(data.data);
      setLoading(false);
    }

    if (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [data, error]);

  if (loading) {
    return <p className="text-center text-lg">🔄 Memuat detail penyewaan...</p>;
  }

  if (!detail) {
    return <p className="text-center text-lg">❌ Data tidak ditemukan!</p>;
  }

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-gray-100 relative"
        style={{
          backgroundImage: "url(/ELEKTRONIK.png)",
          backgroundSize: "62%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-15"></div>
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full relative z-10">
          <motion.h1
            className="mb-4 text-2xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            📄 Detail Penyewaan ID: {detail.id}
          </motion.h1>
          <p className="mb-3 text-lg font-semibold text-gray-700">
            ID Pelanggan: {detail.pelanggan_id}
          </p>
          <p className="mb-3 text-lg text-gray-600">
            Subtotal: Rp {detail.penyewaan_totalharga}
          </p>
          <p className="mb-3 text-lg text-gray-500">
            Tanggal Dibuat: {detail.penyewaan_tglsewa.toString()}
          </p>
          <Button color="gray" onClick={() => router.back()}>
            ⬅ Kembali
          </Button>
        </div>
      </div>
    </>
    // <div className="container mx-auto p-6">
    //   {/* Judul Halaman */}
    //   <motion.h1
    //     className="text-4xl font-extrabold text-center text-black mb-10"
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.6 }}
    //   >
    //     📄 Detail Penyewaan ID: {detail.id}
    //   </motion.h1>

    //   {/* Kartu Detail Penyewaan */}
    //   <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
    //     <p className="text-lg font-bold">ID Pelanggan: {detail.pelanggan_id}</p>
    //     <p className="text-lg">Subtotal: Rp {detail.penyewaan_totalharga}</p>
    //     <p className="text-lg text-gray-600">
    //       Tanggal Dibuat: {detail.penyewaan_tglsewa.toString()}
    //     </p>

    //     <Button color="gray" className="mt-4" onClick={() => router.back()}>
    //       ⬅ Kembali
    //     </Button>
    //   </div>
    // </div>
  );
}
