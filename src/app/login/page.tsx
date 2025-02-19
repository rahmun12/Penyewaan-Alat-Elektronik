"use client";
import React, { useCallback, useState } from "react";
import "flowbite";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "./Login.validation";
import { LoginPayload } from "./Login.type";

export default function Login() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginValidation),
  });

  const handleLogin = useCallback(
    async (data: LoginPayload) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            email: data.email,
            password: data.password,
          }
        );

        if (response.data && response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          router.push("/admin/ed-alat");
        }
      } catch (error) {
        console.error("Login gagal:", error);
        setShowError(true);
        // alert("Login gagal. Periksa kembali email dan password Anda.");
      }
    },
    [router]
  );

  const handleCloseError = () => {
    setShowError(false);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-white items-center justify-center gap-10">
      {/* Image Section */}
      <div className="flex w-[70rem] h-[593px] bg-gradient-to-b from-blue-300 to-blue-100 rounded-r-full shadow-xl justify-center items-center">
        <img
          src="WELCOME.png"
          alt="Welcome"
          className="w-96 h-60 object-cover rounded-xl"
        />
      </div>

      {/* Login Form Section with Card */}
      <div className="flex justify-end items-center w-[55%] ml-auto">
        <div className="w-[50rem] h-[593px] bg-white rounded-l-full px-32 flex flex-col justify-center">
          <h2 className="text-5xl font-semibold font-serif text-gray-800 text-center mb-14">
            Login
          </h2>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-base font-medium text-blue-500">
                Email
              </label>
              <input
                type="email"
                placeholder="your@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                {...register("email")}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-base font-medium text-blue-500">
                Password
              </label>
              <input
                type="password"
                placeholder="your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                {...register("password")}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-800">
                <input
                  name="login"
                  type="checkbox"
                  className="mr-2 border border-gray-400 rounded-sm"
                  required
                />{" "}
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-red-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full btn bg-blue-600 text-white text-base py-2 rounded-lg hover:bg-blue-800 transition"
              disabled={isSubmitting}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              LOGIN GAGAL
            </h2>
            <p className="text-gray-600">
              Periksa kembali email dan password Anda.
            </p>
            <button
              onClick={handleCloseError}
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
// import React, { useCallback, useState } from "react";
// import "flowbite";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginValidation } from "./Login.validation";
// import { LoginPayload } from "./Login.type";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginPayload>({
//     resolver: zodResolver(loginValidation),
//   });

//   const onLogin = useCallback((data: LoginPayload) => {
//     console.log(data);
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://finalprojectburi.aran8276.site/api/auth/login",
//         {
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
//     <div className="flex min-h-screen bg-white items-center justify-center gap-10">
//       {/* Image Section */}
//       <div className="flex w-[70rem] h-[593px] bg-gradient-to-b from-blue-300 to-blue-100 rounded-r-full justify-center items-center">
//         <img
//           src="WELCOME.png"
//           alt="Welcome"
//           className="w-96 h-60 object-cover rounded-xl"
//         />
//       </div>

//       {/* Login Form Section with Card */}
//       <div className="flex justify-end items-center w-[55%] ml-auto">
//         <div className="w-[50rem] h-[593px] bg-white rounded-l-full px-32 flex flex-col justify-center">
//           <h2 className="text-5xl font-semibold font-serif text-gray-800 text-center mb-14">
//             Login
//           </h2>
//           <form onSubmit={handleLogin(onLogin)} className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="your@example.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               {errors.email && (
//                 <p className="text-red-600">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {errors.password && (
//                 <p className="text-red-600">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center text-gray-600">
//                 <input type="checkbox" className="mr-2" /> Remember me
//               </label>
//               <a
//                 href="/forgot-password"
//                 className="text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full btn bg-blue-600 text-white text-base py-2 rounded-lg hover:bg-blue-800 transition"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import "flowbite";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { z } from "zod";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   new_password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" })
//     .max(20, { message: "Password must be less than 20 characters" }),
// });

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "" });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const result = loginSchema.safeParse({ email, password });
//     if (!result.success) {
//       const fieldErrors = result.error.format();
//       setErrors({
//         email: fieldErrors.email?._errors[0] || "",
//         password: fieldErrors.new_password?._errors[0] || "",
//       });
//       return;
//     }
//     setErrors({ email: "", password: "" });

//     try {
//       const response = await axios.post(
//         "https://finalprojectburi.aran8276.site/api/auth/login",
//         {
//           email: email,
//           password: password,
//         }
//       );

//       // Simpan token ke localStorage
//       if (response.data && response.data.token) {
//         localStorage.setItem("authToken", response.data.token);
//         router.push("/sewa");
//       }
//     } catch (error) {
//       console.error("Login gagal:", error);
//       alert("Login gagal. Periksa kembali email dan password Anda.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-white items-center justify-center gap-10">
//       {/* Image Section */}
//       <div className="flex w-[70rem] h-[593px] bg-gradient-to-b from-blue-300 to-blue-100 rounded-r-full justify-center items-center">
//         <img
//           src="WELCOME.png"
//           alt="Welcome"
//           className="w-96 h-60 object-cover rounded-xl"
//         />
//       </div>

//       {/* Login Form Section with Card */}
//       <div className="flex justify-end items-center w-[55%] ml-auto">
//         <div className="w-[50rem] h-[593px] bg-white rounded-l-full px-32 flex flex-col justify-center">
//           <h2 className="text-5xl font-semibold font-serif text-gray-800 text-center mb-14">
//             Login
//           </h2>
//           <form onSubmit={handleLogin} className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="your@example.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>
//             {/* Password Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center text-gray-600">
//                 <input type="checkbox" className="mr-2" /> Remember me
//               </label>
//               <a
//                 href="/forgot-password"
//                 className="text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full btn bg-blue-600 text-white text-base py-2 rounded-lg hover:bg-blue-800 transition"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
