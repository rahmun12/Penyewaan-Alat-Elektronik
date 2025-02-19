"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useGetPenyewaan } from "@/dataservices/penyewaan/api";
import { GetPenyewaanResponse } from "@/dataservices/penyewaan/type";
import { Penyewaan } from "@/types/penyewaan";

export default function EditSewaAlatAdmin() {
  const [formData, setFormData] = useState<Penyewaan>({
    id: 0,
    alat_nama: "",
    pelanggan_id: 0,
    penyewaan_tglsewa: new Date(),
    penyewaan_tglkembali: new Date(),
    penyewaan_stspembayaran: "Belum Dibayar",
    penyewaan_sttskembali: "",
    penyewaan_totalharga: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // Ambil data penyewaan berdasarkan ID saat pertama kali load
  const { data, error, isLoading } = useGetPenyewaan<GetPenyewaanResponse>(
    `/v1/penyewaan/${id}`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/penyewaan/${id}`,
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

      alert("Penyewaan berhasil diperbarui");
      router.push("/admin/sewa");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Jika masih loading, tampilkan pesan loading
  if (loading) {
    return <p className="text-center text-lg">🔄 Memuat data...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold text-center text-black mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✏️ Edit Penyewaan
      </motion.h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <Label>Pelanggan ID</Label>
        <TextInput
          name="pelanggan_id"
          value={formData.pelanggan_id}
          onChange={handleChange}
          required
        />

        <Label>Tanggal Sewa</Label>
        <TextInput
          type="date"
          name="penyewaan_tglsewa"
          value={formData.penyewaan_tglsewa.toString()}
          onChange={handleChange}
          required
        />

        <Label>Tanggal Kembali</Label>
        <TextInput
          type="date"
          name="penyewaan_tglkembali"
          value={formData.penyewaan_tglkembali.toString()}
          onChange={handleChange}
          required
        />

        <Label>Status Pembayaran</Label>
        <Select
          name="penyewaan_stspembayaran"
          value={formData.penyewaan_stspembayaran}
          onChange={handleChange}
        >
          <option value="Belum Dibayar">Belum Dibayar</option>
          <option value="Lunas">Lunas</option>
        </Select>

        <Label>Total Harga</Label>
        <TextInput
          type="number"
          name="penyewaan_totalharga"
          value={formData.penyewaan_totalharga}
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
