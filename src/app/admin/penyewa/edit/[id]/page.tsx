"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { Pelanggan } from "@/types/pelanggan";
import { useGetPelanggan } from "@/dataservices/pelanggan/api";
import { GetPelangganResponse } from "@/dataservices/pelanggan/type";

export default function EditPelangganAlatAdmin() {
  const [formData, setFormData] = useState<Pelanggan>({
    id: 0,
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_notelp: "",
    pelanggan_email: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // Ambil data penyewaan berdasarkan ID saat pertama kali load
  const { data, error, isLoading } = useGetPelanggan<GetPelangganResponse>(
    `/api/v1/pelanggan/${id}`,
    1
  );

  useEffect(() => {
    if (data && data.data) {
      setFormData(data.data);
      setLoading(false);
    }

    if (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [data, error]);

  // Handle perubahan input field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return alert("ID tidak valid!");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pelanggan/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Gagal mengupdate penyewaan");

      alert("Pelanggan berhasil diperbarui");
      router.push("/admin/penyewa");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Jika masih loading, tampilkan pesan loading
  if (loading) {
    return <p className="text-center text-lg">🔄 Memuat data...</p>;
  }

  return (
    <div className="container mx-auto p-6 pt-32 mb-20">
      <motion.h1
        className="text-3xl font-bold text-center text-black mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✏️ Edit Pelanggan
      </motion.h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <Label>Pelanggan Nama</Label>
        <TextInput
          name="pelanggan_nama"
          value={formData.pelanggan_nama}
          onChange={handleChange}
          required
        />
        <div className="mt-1"></div>
        <Label>Pelanggan Alamat</Label>
        <TextInput
          name="pelanggan_alamat"
          value={formData.pelanggan_alamat}
          onChange={handleChange}
          required
        />
        <div className="mt-1"></div>
        <Label>Pelanggan Email</Label>
        <TextInput
          name="pelanggan_email"
          value={formData.pelanggan_email}
          onChange={handleChange}
          required
        />
        
        <div className="mt-1"></div>
        <Label>Pelanggan No TELP</Label>
        <TextInput
          name="pelanggan_notelp"
          value={formData.pelanggan_notelp}
          onChange={handleChange}
          required
        />

        <div className="flex justify-between mt-4">
          <Button
            className="bg-gray-500 hover:bg-gray-600 text-white"
            onClick={() => router.push("/admin/sewa")}
          >
            ❌ Batal
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            💾 Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
