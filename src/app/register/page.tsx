"use client";
import React, { useCallback } from "react";
import "flowbite";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPayload } from "./Register.type";
import { registerValidation } from "./Register.validation";

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerValidation),
  });

  const handleRegister = useCallback(
    async (data: RegisterPayload) => {
      try {
        const response = await axios.post(
          "https://finalproject.agungkristd.site/api/auth/register",
          data
        );

        if (response.data && response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          router.push("/admin/ed-alat");
        }
      } catch (error) {
        console.error("Registrasi gagal:", error);
        alert("Registrasi gagal. Periksa kembali data Anda.");
      }
    },
    [router]
  );

  return (
    <div className="flex min-h-screen bg-white items-center justify-center gap-10">
      <div className="flex justify-end items-center w-[55%]">
        <div className="w-[50rem] h-[593px] bg-white px-32 flex flex-col justify-center">
          <h2 className="text-5xl font-semibold font-serif text-center mb-10">
            Register
          </h2>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <label className="block text-base text-yellow-400">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-500"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-base text-yellow-400">Email</label>
              <input
                type="email"
                placeholder="your@example.com"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-base text-yellow-400">
                Password
              </label>
              <input
                type="password"
                placeholder="your password"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-500"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-yellow-300 hover:bg-yellow-400 w-full text-base py-2 rounded-lg transition"
              disabled={isSubmitting}
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>

      <div className="flex w-[70rem] h-[593px] bg-gradient-to-l from-yellow-50 to-white rounded-l-full justify-center items-center ml-auto">
        <img
          src="ELEKTRONIK.png"
          alt="Welcome"
          className="w-[30rem] h-80 object-cover"
        />
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import "flowbite";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const router = useRouter();
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://finalprojectburi.aran8276.site/api/auth/register",
//         {
//           name: name,
//           email: email,
//           password: password,
//         }
//       );

//       // Simpan token ke localStorage
//       if (response.data && response.data.token) {
//         localStorage.setItem("authToken", response.data.token);
//         router.push("/admin/sewa");
//       }
//     } catch (error) {
//       console.error("Login gagal:", error);
//       alert("Login gagal. Periksa kembali email dan password Anda.");
//     }
//   };

//   return (
//     <>
//       <div className="flex min-h-screen bg-white items-center justify-center gap-10">
//         <div className="flex justify-end items-center w-[55%]">
//           <div className="w-[50rem] h-[593px] bg-white px-32 flex flex-col justify-center">
//             <h2 className="text-5xl font-semibold font-serif text-center mb-10">
//               Register
//             </h2>

//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <label className="block text-sm text-yellow-400 font-medium">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your name"
//                   className="input input-bordered w-full mt-1"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm text-yellow-400 font-medium">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="your@example.com"
//                   className="input input-bordered w-full mt-1"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-yellow-400 font-medium">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="input input-bordered w-full mt-1"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               {/* Register Button */}
//               <button
//                 type="submit"
//                 className="btn bg-yellow-300 hover:bg-yellow-400 w-full text-base py-2 rounded-lg transition"
//               >
//                 Register
//               </button>
//             </form>

//             <p className="text-sm text-center mt-4">
//               Already have an account?{" "}
//               <a href="/login" className="text-blue-600 hover:underline">
//                 Login here
//               </a>
//             </p>
//           </div>
//         </div>

//         <div className="flex w-[70rem] h-[593px] bg-gradient-to-l from-yellow-50 to-white rounded-l-full justify-center items-center ml-auto">
//           <img
//             src="ELEKTRONIK.png"
//             alt="Welcome"
//             className="w-[30rem] h-80 object-cover"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
