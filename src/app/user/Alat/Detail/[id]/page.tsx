"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import { GetAlatResponse } from "@/dataservices/Alat/type";
import { useGetAlat } from "@/dataservices/Alat/api";
import { Alat } from "@/types/alat";
import { useCallback } from "react";

export default function AlatDetail() {
  const { id } = useParams();
  const [alatDetailData, setAlatDetailData] = useState<Alat>();
  const { data, isLoading, isError } = useGetAlat<GetAlatResponse>(
    `/v1/alat/${id}`,
    1
  );
  const router = useRouter();

  const getAlatDetail = useCallback(() => {
    if (data?.data) {
      setAlatDetailData(data.data);
    }
  }, [data]);

  useEffect(() => {
    getAlatDetail();
  }, [getAlatDetail]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !alatDetailData) return <div>Error loading data</div>;

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6 pt-40 pb-52">
      {alatDetailData && (
        <motion.div
          key={alatDetailData.id}
          className="card lg:card-side w-full h-full bg-base-100 flex flex-wrap md:flex-nowrap overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <figure>
            <motion.img
              src={`https://finalprojectburi.aran8276.site/storage/${alatDetailData.alat_gambar}`}
              className="w-full h-full md:w-[40rem] object-cover pl-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              alt={alatDetailData.alat_nama}
            />
          </figure>
          <div className="card space-y-3 pl-8 pt-3">
            <motion.h2
              className="card-title text-blue-900 text-4xl font-extrabold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {alatDetailData.alat_nama}
            </motion.h2>
            <p className="text-gray-600 text-lg mt-4 mb-4 max-w-xl overflow-auto">
              {alatDetailData.alat_deskripsi}
            </p>
            <div className="stats bg-blue-100 text-primary-content w-full p-4 rounded-lg shadow-md">
              <div className="stat">
                <div className="stat-title text-gray-700">Harga Per Hari</div>
                <div className="stat-value text-blue-900 text-3xl">
                  Rp{" "}
                  {parseInt(
                    alatDetailData.alat_hargaperhari || "0"
                  ).toLocaleString()}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title text-gray-700">Stok Tersedia</div>
                <div
                  className={`stat-value text-3xl ${
                    alatDetailData.alat_stok > 0
                      ? "text-blue-900"
                      : "text-red-600"
                  }`}
                >
                  {alatDetailData.alat_stok > 0
                    ? `${alatDetailData.alat_stok} unit`
                    : "Habis"}
                </div>
              </div>
            </div>

            <div className="card-actions justify-between pt-44">
              <button
                name="kembali"
                className="btn btn-warning px-10 text-white text-base"
                onClick={() => window.history.back()}
              >
                Kembali
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
