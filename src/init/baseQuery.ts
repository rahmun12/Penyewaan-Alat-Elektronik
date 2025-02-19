import axios, { AxiosRequestConfig } from "axios";

export const getBaseQuery = async (
  path: string,
  options: AxiosRequestConfig = {}
) => {
  try {
    const accessToken = localStorage.getItem("authToken") || "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios({
      url: `${baseUrl}${path}`,
      method: options.method || "GET",
      headers,
      ...options,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Informasikan kepada pengguna
        alert("Sesi Access token telah kadaluarsa, lakukan login kembali!");
        // (Opsional) Hapus token yang sudah tidak valid
        localStorage.removeItem("authToken");
        // Redirect ke halaman login
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      alert("Sesi Access token telah kadaluarsa, lakukan login kembali!");
      localStorage.removeItem("authToken");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
      throw error;
    }
  }
};

// import axios, { AxiosRequestConfig } from "axios";

// export const getBaseQuery = async (
//   path: string,
//   options: AxiosRequestConfig = {}
// ) => {
//   try {
//     const accessToken = localStorage.getItem("authToken") || "";

//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       ...options.headers,
//     };

//     const baseUrl = "https://finalprojectburi.aran8276.site/api/";

//     const response = await axios.get(`${baseUrl}${path}`, {
//       ...options,
//       headers,
//     });

//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data?.message || "Something went wrong");
//     } else {
//       alert("Access token telah kadaluarsa, lakukan login kembali!"),
//       setTimeout(() => {
//         window.location.href = "/login"; // Redirect ke halaman login
//       }, 1000);
//     }
//   }
// };
