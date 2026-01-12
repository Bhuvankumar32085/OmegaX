"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-[#020617]/70 border-b border-white/10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="relative h-10 w-10"
          >
            <Image
              src="/logo.png"
              alt="OmegaX Logo"
              fill
              className="object-contain rounded-xl"
              priority
            />
          </motion.div>
          <span className="text-xl font-semibold text-white tracking-wide">
            Omega<span className="text-violet-400">X</span>
          </span>
        </Link>
       
      </div>
    </motion.nav>
  );
};

export default Navbar;
