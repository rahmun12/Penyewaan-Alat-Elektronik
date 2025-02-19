"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGetKategori } from "@/dataservices/kategori/api";
import { GetKategoriResponse } from "@/dataservices/kategori/type";
import { GetAllAlatResponse } from "@/dataservices/Alat/type";

import {
  Button,
  TextInput,
  Textarea,
  FileInput,
  Card,
  Label,
} from "flowbite-react";
import { useGetAlat } from "@/dataservices/Alat/api";

export default function TambahAlat() {
  const [formData, setFormData] = useState<
    {
      alat_nama: string;
      alat_hargaperhari: string;
      alat_stok: string;
      alat_deskripsi: string;
      kategori_id: string;
      alat_gambar: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [alatGambar, setAlatGambar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [kategoriOptions, setKategoriOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const {
    data: kategoriData,
    isLoading,
    isError,
  } = useGetKategori<GetKategoriResponse>("/v1/kategori", 1);

  const {
    data: alatData,
    isLoading: isLoadingAlat,
    isError: isErrorAlat,
  } = useGetAlat<GetAllAlatResponse>("/v1/alat", 1);

  useEffect(() => {
    if (kategoriData) {
      const options = kategoriData.data.map((kategori) => ({
        value: kategori.id.toString(),
        label: kategori.kategori_nama,
      }));
      setKategoriOptions(options);
    }
  }, [kategoriData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/alat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(`Gagal menambah pelanggan: ${response.statusText}`);
    }

    const resData = await response.json();
    console.log("Data berhasil ditambahkan:", resData.data);

    const newAlat = resData.data;

    if (alatData && alatData.data) {
      const updatedAlatData = [...alatData.data, newAlat];
      setFormData(updatedAlatData);
      router.push("/admin/ed-alat");
    } else {
      setFormData([newAlat]);
      router.push("/user/Alat");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-xl my-20">
        <motion.h1
          className="text-3xl font-semibold text-center text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ➕ Tambah Alat Baru
        </motion.h1>

        {error && <p className="text-center text-red-500">{error}</p>}

        <form
          className="max-w-lg mx-auto bg-white p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Label>Masukan Nama</Label>
            <TextInput name="alat_nama" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <Label>Masukan Harga</Label>
            <TextInput
              name="alat_hargaperhari"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <Label>Masukan Deskripsi</Label>
            <TextInput name="alat_deskripsi" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <Label>Masukan Stok</Label>
            <TextInput
              name="alat_stok"
              type="number"
              onChange={handleChange}
              required
            />
          </div>
          <FileInput
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setAlatGambar(e.target.files[0]);
              }
            }}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
            disabled={loading}
          >
            {loading ? "🔄 Menambahkan..." : "Submit"}
          </button>
        </form>
      </Card>
    </div>
  );
}
