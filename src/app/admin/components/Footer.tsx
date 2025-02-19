"use client";


const Footer = () => {
  return (
    <footer className="bg-blue-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <h4 className="text-lg font-bold mb-2">Tentang Kami</h4>
            <p className="text-gray-600">
              Penyewaan Alat adalah perusahaan yang menyediakan berbagai jenis
              alat untuk disewakan. Kami berkomitmen untuk memberikan pelayanan
              yang terbaik dan harga yang kompetitif.
            </p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <h4 className="text-lg font-bold mb-2">Hubungi Kami</h4>
            <ul>
              <li>
                <a
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Alamat: Jl. Raya No. 123, Jakarta
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Telepon: 021-12345678
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Email:{" "}
                  <span className="text-gray-900">info@penyewaanalat.com</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <h4 className="text-lg font-bold mb-2">Ikuti Kami</h4>
            <ul>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Facebook</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Instagram</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-900">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-4">
          &copy; 2023 Penyewaan Alat. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
