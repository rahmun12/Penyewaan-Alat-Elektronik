"use client";

import { useGetKategori } from "@/dataservices/kategori/api";
import { GetKategoriResponse } from "@/dataservices/kategori/type";
import { Kategori } from "@/types/kategori";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
}

export default function Portal({ onToggle, isOpen }: PortalProps) {
  const [showPortal, setShowPortal] = useState(false);
  const [kategoriData, setKategoriData] = useState<Kategori[]>([]);

  // Menggunakan hook untuk mendapatkan data kategori
  const { data, isLoading, isError } = useGetKategori<GetKategoriResponse>(
    "/api/v1/kategori",
    1
  );

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setKategoriData(data.data);
    }
  }, [data]);

  // Efek samping untuk mengubah status halaman saat portal dibuka
  useEffect(() => {
    onToggle(showPortal);
  }, [showPortal, onToggle]);

  return (
    <>
      <div className="text-center">
        <button
          className="btn btn-warning text-white text-base px-10"
          type="button"
          onClick={() => setShowPortal(true)}
        >
          Kategori
        </button>
      </div>

      {showPortal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="drawer-navigation"
            className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-64 shadow-lg transition-transform ${
              showPortal ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-labelledby="drawer-navigation-label"
          >
            <h5
              id="drawer-navigation-label"
              className="text-lg font-semibold text-yellow-200 uppercase dark:text-gray-400"
            >
              Kategori
            </h5>
            <button
              onClick={() => setShowPortal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>

            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error fetching categories.</p>
            ) : (
              <ul>
                {kategoriData.map((kategori, index) => (
                  <li
                    key={kategori.kategori_id || `kategori-${index}`}
                    className="py-2 border-b border-gray-200"
                  >
                    <div className="flex items-center">
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <span className="text-lg mr-2">
                          {["📁", "⚙️", "📡", "🔌", "💾"][index % 5]}
                        </span>
                        <span className="ms-3">{kategori?.kategori_nama}</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>,
          document.body
        )}
    </>
  );
}

{
  /* Button untuk menampilkan portal */
}
{
  /* <button
        onClick={() => setShowPortal(true)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        📂 Buka Kategori
      </button> */
}
{
  /* Portal untuk menampilkan kategori */
}
{
  /* {showPortal &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/2 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Kategori Alat</h2>
              
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p>Error fetching categories.</p>
              ) : (
                <ul>
                  {kategoriData.map((kategori) => (
                    <li
                      key={kategori.kategori_id}
                      className="py-2 border-b border-gray-200"
                    >
                      <div className="flex items-center">
                        <span className="text-lg">
                          {kategori?.kategori_nama}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => setShowPortal(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                ❌ Tutup
              </button>
            </div>
          </div>,
          document.body
        )} */
}
