"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Table, Button, Badge } from "flowbite-react";
import { useGetPenyewaan } from "@/dataservices/penyewaan/api";
import { getBaseQuery } from "@/init/baseQuery";
import { Penyewaan } from "@/types/penyewaan";
import { GetAllPenyewaanResponse } from "@/dataservices/penyewaan/type";

export default function SewaAlatAdmin() {
  const [penyewaanData, setPenyewaanData] = useState<Penyewaan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data, error, isLoading } = useGetPenyewaan<GetAllPenyewaanResponse>(
    "/v1/penyewaan",
    1
  );

  useEffect(() => {
    if (data && data.data) {
      setPenyewaanData(data.data);
      setLoading(false);
    }

    if (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [data, error]);

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus penyewaan ini?")) return;

    try {
      const response = await getBaseQuery(`/api/v1/penyewaan/${id}`, {
        method: "DELETE",
      });

      if (response.success) {
        setPenyewaanData((prevData) =>
          prevData.filter((alat) => alat.id !== id)
        );
      } else {
        console.error("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-700">
        Memuat data penyewaan...
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 rounded-lg mb-20 pt-32">
      <motion.h1
        className="text-4xl font-extrabold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📋 Daftar Sewa Alat Pelanggan
      </motion.h1>

      <div className="mb-6 flex justify-end">
        <Button
          className="bg-gradient-to-r from-green-400 to-green-400 hover:from-green-600 hover:to-green-600 text-white"
          onClick={() => router.push("/admin/sewa/tambah")}
        >
          ➕ Tambah Penyewa
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table
          hoverable
          className="shadow-lg rounded-lg border border-gray-300"
        >
          <Table.Head className="text-black">
            <Table.HeadCell>ID Pelanggan</Table.HeadCell>
            <Table.HeadCell>Tanggal Sewa</Table.HeadCell>
            <Table.HeadCell>Total Harga</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y bg-white">
            {penyewaanData.map((penyewaan) => (
              <motion.tr
                key={penyewaan.id}
                className="transition duration-300 hover:bg-yellow-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Table.Cell className="text-gray-800 font-medium">
                  {penyewaan.pelanggan_id}
                </Table.Cell>
                <Table.Cell className="text-gray-700">
                  {penyewaan.penyewaan_tglsewa.toString()}
                </Table.Cell>
                <Table.Cell className="text-gray-700">
                  Rp{" "}
                  {parseInt(
                    penyewaan.penyewaan_totalharga.toString()
                  ).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    className="text-md"
                    color={
                      penyewaan.penyewaan_stspembayaran === "Belum Dibayar"
                        ? "failure"
                        : "success"
                    }
                  >
                    {penyewaan.penyewaan_stspembayaran}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white"
                    onClick={() =>
                      router.push(`/admin/sewa/detail/${penyewaan.id}`)
                    }
                  >
                    🔍 Lihat Detail
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-yellow-300 to-yellow-300 hover:from-yellow-400 hover:to-yellow-400 text-white"
                    onClick={() =>
                      router.push(`/admin/sewa/edit/${penyewaan.id}`)
                    }
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-red-500 hover:from-red-700 hover:to-red-700 text-white"
                    onClick={() => handleDelete(penyewaan.id)}
                  >
                    🗑 Hapus
                  </Button>
                </Table.Cell>
              </motion.tr>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
