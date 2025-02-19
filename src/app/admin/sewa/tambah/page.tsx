"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Label, TextInput, Select } from "flowbite-react";

export default function TambahPenyewaan() {
  const [formData, setFormData] = useState<any>({
    pelanggan_id: "",
    penyewaan_tglsewa: "",
    penyewaan_tglkembali: "",
    penyewaan_stspembayaran: "Belum Dibayar",
    penyewaan_sttskembali: "Belum Kembali",
    penyewaan_totalharga: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/penyewaan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Tambahkan log respons status dan pesan error
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(`Gagal menambah penyewaan: ${response.statusText}`);
      }

      const resData = await response.json();
      console.log("Data berhasil ditambahkan:", resData.data);
      router.push("/admin/sewa");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-32 pb-20">
      <motion.h1
        className="text-4xl font-extrabold text-center text-black mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ➕ Tambah Penyewaan
      </motion.h1>

      <form
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <Label>Pilih ID Pelanggan</Label>
          <TextInput name="pelanggan_id" onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <Label>Tanggal Sewa</Label>
          <TextInput
            name="penyewaan_tglsewa"
            type="date"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label>Tanggal Kembali</Label>
          <TextInput
            name="penyewaan_tglkembali"
            type="date"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label>Total Harga</Label>
          <TextInput
            name="penyewaan_totalharga"
            type="number"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Label>Status Pembayaran</Label>
          <Select name="penyewaan_stspembayaran" onChange={handleChange}>
            <option value="Belum Dibayar">Belum Dibayar</option>
            <option value="Lunas">Lunas</option>
          </Select>
        </div>

        <div className="mb-4">
          <Label>Status Kembali</Label>
          <Select name="penyewaan_ststkembali" onChange={handleChange}>
            <option value="Belum Kembali">Belum Kembali</option>
            <option value="Sudah Kembali">Sudah Kembali</option>
          </Select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "🔄 Menambahkan..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
