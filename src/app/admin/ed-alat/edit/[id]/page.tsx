"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, TextInput, Textarea, FileInput, Card } from "flowbite-react";
import { FaArrowLeft } from "react-icons/fa";
import { Alat } from "@/types/alat";
import { useGetAlat } from "@/dataservices/Alat/api";
import { getBaseQuery } from "@/init/baseQuery";
import { useGetKategori } from "@/dataservices/kategori/api";
import { GetKategoriResponse } from "@/dataservices/kategori/type";

export default function EditAlat() {
  const router = useRouter();

  const [alat, setAlat] = useState<Alat | null>(null);
  const [alatGambar, setAlatGambar] = useState<File | null>(null);
  const params = useParams();

  const [formData, setFormData] = useState({
    alat_nama: "",
    alat_hargaperhari: "",
    alat_stok: "",
    alat_deskripsi: "",
    alat_gambar: "",
    kategori_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = params?.id;

  // Fetch data for the selected alat using the id from the URL
  useEffect(() => {
    if (id) {
      const fetchAlatData = async () => {
        try {
          const response = await getBaseQuery(`/v1/alat/${id}`);
          if (response.success) {
            setAlat(response.data);
            setFormData({
              alat_nama: response.data.alat_nama || "",
              alat_hargaperhari: response.data.alat_hargaperhari || "",
              alat_stok: response.data.alat_stok || "",
              alat_deskripsi: response.data.alat_deskripsi || "",
              alat_gambar: response.data.alat_foto || "",
              kategori_id: response.data.kategori_id || "",
            });
          } else {
            setError("Data alat tidak ditemukan.");
          }
        } catch (error) {
          setError("Gagal memuat data alat.");
        }
      };
      fetchAlatData();
    }
  }, [id]);
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

  useEffect(() => {
    if (kategoriData) {
      const options = kategoriData.data.map((kategori) => ({
        value: kategori.id,
        label: kategori.kategori_nama,
      }));
      setKategoriOptions(options);
      console.log(options);
    }
  }, [kategoriData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (
      !formData.alat_nama ||
      !formData.alat_hargaperhari ||
      !formData.alat_stok ||
      !formData.kategori_id
    ) {
      setError("Semua field wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("alat_nama", formData.alat_nama);
      formDataToSend.append("alat_hargaperhari", formData.alat_hargaperhari);
      formDataToSend.append("alat_stok", formData.alat_stok);
      formDataToSend.append("alat_deskripsi", formData.alat_deskripsi);
      formDataToSend.append("kategori_id", formData.kategori_id);
      if (alatGambar) {
        formDataToSend.append("alat_foto", alatGambar);
      }

      // Debugging FormData
      formDataToSend.forEach((value, key) => {
        console.log(key + ": " + value);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/alat/${id}`,
        {
          method: "PUT",
          headers: {
            // z
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            Accept: "application/json",
          },
          // body: formDataToSend,
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message || "Gagal mengedit alat");
      } else {
        router.push("/admin/ed-alat");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat mengedit alat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center mb-20">
      <Card className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-xl mt-24">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          ✏️ Edit Alat
        </h1>

        {error && <p className="text-center text-red-500">{error}</p>}

        {alat ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="form/data"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nama Alat
              </label>
              <TextInput
                name="alat_nama"
                placeholder="Masukkan nama alat"
                value={formData.alat_nama}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Harga Per Hari
              </label>
              <TextInput
                name="alat_hargaperhari"
                type="number"
                placeholder="Masukkan harga"
                value={formData.alat_hargaperhari}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Kategori
              </label>
              <select
                name="kategori_id"
                onChange={handleChange}
                value={formData.kategori_id}
              >
                <option>Pilih kategori</option>
                {kategoriOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Deskripsi
              </label>
              <Textarea
                name="alat_deskripsi"
                placeholder="Masukkan deskripsi alat"
                value={formData.alat_deskripsi}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Stok
              </label>
              <Textarea
                name="alat_stok"
                placeholder="Masukkan deskripsi alat"
                value={formData.alat_stok}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Gambar
              </label>
              <FileInput
                name="alat_foto"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setAlatGambar(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                color="gray"
                onClick={() => router.push("/admin/ed-alat")}
              >
                <FaArrowLeft /> Kembali
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                💾 Simpan Perubahan
              </Button>
            </div>
          </form>
        ) : (
          <p>Memuat data alat...</p>
        )}
      </Card>
    </div>
  );
}
