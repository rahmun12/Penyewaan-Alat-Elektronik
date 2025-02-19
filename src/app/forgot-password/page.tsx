"use client";
import React, { useState } from "react";
import "flowbite";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  new_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be less than 20 characters" }),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", new_password: "" });
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = forgotPasswordSchema.safeParse({ email, new_password });
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0] || "",
        new_password: fieldErrors.new_password?._errors[0] || "",
      });
      return;
    }
    setErrors({ email: "", new_password: "" });

    try {
      const response = await axios.post(
        "https://finalproject.agungkristd.site/api/auth/passnew",
        { email, new_password }
      );
      if (response.data) {
        setShowModal(true);
      }
    } catch (error) {
      console.error("New password gagal:", error);
      setShowErrorModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    router.push("/forgot-password");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-gray-700 items-center justify-center">
      <div className="flex w-[55rem] h-[30rem] bg-white shadow-lg rounded-full overflow-hidden relative items-center justify-center">
        <div className="w-1/2 flex items-center justify-center p-4">
          <img
            src="KEY.png"
            alt="Forgot Password"
            className="w-[30rem] h-60 object-cover rounded-lg"
          />
        </div>
        <div className="w-[35rem] p-8 pr-20">
          <h2 className="text-3xl font-semibold font-serif text-center mb-6 pr-14 text-gray-800">
            🔐 Forgot Password
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center pr-10"
          >
            <div className="w-full">
              <label className="block text-base font-base text-red-800">
                Email
              </label>
              <input
                type="email"
                placeholder="your@example.com"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-base font-base text-red-800">
                Password
              </label>
              <input
                type="password"
                placeholder="enter a new password"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-500"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password}
                </p>
              )}
            </div>
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                className="checkbox checkbox-sm mr-2 border border-gray-400 rounded-md"
                id="humanCheck"
                required
              />
              <label htmlFor="humanCheck" className="text-sm text-gray-700">
                I am not a robot 🤖
              </label>
            </div>
            <button
              type="submit"
              className="bg-red-500 w-full text-base py-2 rounded-lg hover:bg-red-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-100 p-6 rounded-md shadow-lg w-[30rem] h-[13rem] text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              PASSWORD BERHASIL DIBUAT ✔
            </h2>
            <p className="text-gray-600">
              Silakan login menggunakan password baru Anda.
            </p>
            <button
              name="oke"
              onClick={handleCloseModal}
              className="mt-8 bg-green-500 text-white px-20 py-2 rounded-lg hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              PEMBARUAN PASSWORD GAGAL
            </h2>
            <p className="text-gray-600">Periksa kembali email Anda.</p>
            <button
              onClick={handleCloseErrorModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import "flowbite";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { z } from "zod";

// const forgotPasswordSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   new_password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" })
//     .max(20, { message: "Password must be less than 20 characters" }),
// });

// export default function ForgotPassword() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [new_password, setNewPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", new_password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = forgotPasswordSchema.safeParse({ email, new_password });
//     if (!result.success) {
//       const fieldErrors = result.error.format();
//       setErrors({
//         email: fieldErrors.email?._errors[0] || "",
//         new_password: fieldErrors.new_password?._errors[0] || "",
//       });
//       return;
//     }
//     setErrors({ email: "", new_password: "" });

//     try {
//       const response = await axios.post(
//         "https://finalprojectburi.aran8276.site/api/auth/passnew",
//         { email, new_password }
//       );
//       if (response.data) {
//         router.push("/login");
//       }
//     } catch (error) {
//       console.error("New password gagal:", error);
//       alert("New password gagal. Periksa kembali email Anda.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-b from-white to-gray-700 items-center justify-center">
//       <div className="flex w-[55rem] h-[30rem] bg-white shadow-lg rounded-full overflow-hidden relative items-center justify-center">
//         <div className="w-1/2 flex items-center justify-center p-4">
//           <img
//             src="KEY.png"
//             alt="Forgot Password"
//             className="w-[30rem] h-60 object-cover rounded-lg"
//           />
//         </div>
//         <div className="w-[35rem] p-8 pr-20">
//           <h2 className="text-3xl font-semibold font-serif text-center mb-6 pr-14 text-gray-800">
//             🔐 Forgot Password
//           </h2>
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4 flex flex-col items-center pr-10"
//           >
//             <div className="w-full">
//               <label className="block text-base font-medium text-gray-800">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="your@example.com"
//                 className="input input-bordered w-full mt-1 placeholder-gray-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>
//             <div className="w-full">
//               <label className="block text-base font-medium text-gray-800">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="enter a new password"
//                 className="input input-bordered w-full mt-1 placeholder-gray-500"
//                 value={new_password}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//               {errors.new_password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.new_password}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center w-full">
//               <input
//                 type="checkbox"
//                 className="checkbox checkbox-sm mr-2"
//                 id="humanCheck"
//                 required
//               />
//               <label htmlFor="humanCheck" className="text-sm text-gray-700">
//                 I am not a robot 🤖
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="btn bg-red-500 w-full btn text-base py-2 rounded-lg hover:bg-red-600 transition"
//             >
//               Submit
//             </button>
//           </form>
//           <p className="text-sm text-center mt-4 pr-10 text-gray-600">
//             Remember your password?{" "}
//             <a href="/login" className="text-blue-600 hover:underline">
//               Login here
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
