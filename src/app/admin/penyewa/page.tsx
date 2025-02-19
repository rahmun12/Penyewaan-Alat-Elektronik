"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Table, Button, Badge } from "flowbite-react";
import { useGetPenyewaan } from "@/dataservices/penyewaan/api";
import { getBaseQuery } from "@/init/baseQuery";
import { Penyewaan } from "@/types/penyewaan";
import { GetAllPenyewaanResponse } from "@/dataservices/penyewaan/type";
import { Pelanggan } from "@/types/pelanggan";
import { useGetPelanggan } from "@/dataservices/pelanggan/api";
import { GetAllPelangganResponse } from "@/dataservices/pelanggan/type";
import { FaEdit } from "react-icons/fa";

export default function PelangganAlatAdmin() {
  const [pelangganData, setPelangganData] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data, error, isLoading } = useGetPelanggan<GetAllPelangganResponse>(
    "/v1/pelanggan",
    1
  );

  useEffect(() => {
    if (data && data.data) {
      setPelangganData(data.data);
      setLoading(false);
    }

    if (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [data, error]);

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) return;

    try {
      const response = await getBaseQuery(`/api/v1/pelanggan/${id}`, {
        method: "DELETE",
      });

      if (response.success) {
        // Menghapus data dari state lokal setelah penghapusan berhasil
        setPelangganData((prevData) =>
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
    return <p className="text-center text-lg">Memuat data pelanggan...</p>;
  }

  return (
    <div className="container mx-auto p-6 pt-32 mb-20">
      <motion.h1
        className="text-4xl font-extrabold text-center text-black mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📋 Daftar Pelanggan Alat
      </motion.h1>

      <div className="mb-6 flex justify-end">
        <Button
          className="bg-gradient-to-r from-green-400 to-green-400 hover:from-green-600 hover:to-green-600 text-white"
          onClick={() => router.push("/admin/penyewa/tambah")}
        >
          ➕ Tambah Pelanggan
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table
          hoverable
          className="shadow-lg rounded-lg border border-gray-200"
        >
          <Table.Head className="bg-gray-800 text-black">
            <Table.HeadCell>Pelanggan Alamat</Table.HeadCell>
            <Table.HeadCell>Pelanggan Email</Table.HeadCell>
            <Table.HeadCell>Pelanggan Nama</Table.HeadCell>
            <Table.HeadCell>Pelanggan No-telp</Table.HeadCell>
            <Table.HeadCell>Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {pelangganData.map((pelanggan) => (
              <motion.tr
                key={pelanggan.id}
                className="transition duration-300 hover:bg-yellow-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Table.Cell className="text-black font-medium">
                  {pelanggan.pelanggan_alamat}
                </Table.Cell>
                <Table.Cell className="text-gray-700">
                  {pelanggan.pelanggan_email}
                </Table.Cell>
                <Table.Cell className="text-gray-700">
                  {pelanggan.pelanggan_nama}
                </Table.Cell>
                <Table.Cell className="text-gray-700">
                  {pelanggan.pelanggan_notelp}
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button
                    className="bg-gradient-to-r from-yellow-300 to-yellow-300 hover:from-yellow-400 hover:to-yellow-400 text-white"
                    onClick={() =>
                      router.push(`/admin/penyewa/edit/${pelanggan.id}`)
                    }
                  >
                    <FaEdit />
                    Edit
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-red-500 hover:from-red-700 hover:to-red-700 text-whitebg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(pelanggan.id)}
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
