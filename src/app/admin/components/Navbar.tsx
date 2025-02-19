"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavbarAdmin() {
  const pathname = usePathname();
  // const router = useRouter();

  // const handleLogout = () => {
  //   router.push("/login");
  // };

  const navItems: { name: string; path: string; color: string; hover: string }[] = [
    { name: "Daftar Alat", path: "/admin/ed-alat", color: "bg-cyan-300", hover: "hover:bg-cyan-500" },
    { name: "Penyewaan Alat", path: "/admin/sewa", color: "bg-lime-300", hover: "hover:bg-lime-500" },
    { name: "Daftar Pelanggan", path: "/admin/penyewa", color: "bg-rose-300", hover: "hover:bg-rose-500" },
  ];

  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="container bg- mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/user/Alat">
          <motion.div
            className="flex items-center text-2xl bg-gradient-to-l from-yellow-300 to-blue-300 bg-clip-text text-transparent font-bold cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
          Electronic Rental
          </motion.div>
        </Link>

        {/* Menu Navigasi */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <motion.button
                className={`${item.color} text-white font-medium px-4 py-2 rounded-lg transition duration-300 ${item.hover} ${pathname === item.path}`}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </motion.button>
            </Link>
          ))}
        </div>


        {/* Login / Logout Button */}
        <motion.button
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition hidden md:block"
          whileHover={{ scale: 1.05 }}
        ><a href="/login">
            Logout
        </a>
        </motion.button>
      </div>
    </nav>
  );
}
