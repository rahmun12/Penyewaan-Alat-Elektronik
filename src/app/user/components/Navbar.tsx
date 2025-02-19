"use client";
import React, { useState } from "react";
import Portal from "./Portal";
import SearchAlat from "./SearchAlat";

const Navbar: React.FC = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <nav
      className={`bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-lg transition-all duration-300 ${
        isPortalOpen ? "ml-64 pr-72 w-[calc(100%-16rem)]" : "ml-0 w-full"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a
          className="flex items-center text-3xl bg-gradient-to-l from-yellow-300 to-blue-300 bg-clip-text text-transparent"
          href="/user/Alat"
        >
          <span className="self-center text-2xl font-bold whitespace-nowrap">
            Electronic Rental
          </span>
        </a>
          <div className="items-right justify-right">
          <Portal onToggle={setIsPortalOpen} isOpen={isPortalOpen} />
        </div>
          {/* <form className="flex items-center w-[45rem] mx-auto">
            <label className="sr-only" htmlFor="search">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                <i className="fas fa-search text-gray-500 dark:text-gray-400"></i>
              </div>
              <input
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="search"
                placeholder="Search..."
                type="text"
              />
            </div>
          </form> */}
        
      </div>
    </nav>
  );
};

export default Navbar;

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Portal from "./Portal";

// export default function NavbarUser() {
//   const pathname = usePathname();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navItems = [
//     { name: "Home", path: "/user/Alat" },
//   ];

//   return (
//     <nav className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/">
//           <motion.div
//             className="text-xl font-extrabold text-black cursor-pointer"
//             whileHover={{ scale: 1.1 }}
//           >
//             🛠️ SewaAlat
//           </motion.div>
//         </Link>

//         {/* Menu Navigasi */}
//         <ul className="hidden md:flex space-x-6">
//           {navItems.map((item) => (
//             <li key={item.path}>
//               <Link href={item.path}>
//                 <motion.span
//                   className={`text-black font-medium px-4 py-2 rounded-lg ${
//                     pathname === item.path
//                       ? "bg-blue-200 text-black"
//                       : "hover:bg-blue-100"
//                   } transition duration-300 cursor-pointer`}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   {item.name}
//                 </motion.span>
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <Portal />

//         {/* Mobile Menu (Bisa ditambahkan later jika butuh) */}
//       </div>

//     </nav>
//   );
// }
