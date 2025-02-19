"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Label, TextInput, Select } from "flowbite-react";

export default function TambahPelanggan() {
  const [formData, setFormData] = useState({
    id: 0,
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_notelp: "",
    pelanggan_email: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/v1/pelanggan`,
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
        throw new Error(`Gagal menambah pelanggan: ${response.statusText}`);
      }

      const resData = await response.json();
      console.log("Data berhasil ditambahkan:", resData.data);
      router.push("/admin/penyewa");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-40 mb-20">
      <motion.h1
        className="text-4xl font-extrabold text-center text-black mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ➕ Tambah Pelanggan
      </motion.h1>

      <form
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <Label>Masukan Nama</Label>
          <TextInput name="pelanggan_nama" onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <Label>Pelanggan Alamat</Label>
          <TextInput name="pelanggan_alamat" onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <Label>Pelanggan Email</Label>
          <TextInput name="pelanggan_email" onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <Label>Pelanggan no telp</Label>
          <TextInput
            name="pelanggan_notelp"
            type="number"
            onChange={handleChange}
            required
          />
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
