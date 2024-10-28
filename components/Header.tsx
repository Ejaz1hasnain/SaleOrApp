'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsCart3 } from "react-icons/bs";

export const Header = () => {
  const pathname = usePathname()
  return (
    <header className="flex fixed tracking-widest top-0 left-0 right-0 items-center justify-between px-6 py-4 bg-[#20C997] text-white">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold tracking-widest">SALEORAPP</h1>
      </div>

      {/* Center Section: Navigation */}
      <nav className="flex-grow w-full pr-12 hidden md:flex justify-center space-x-8">
        <Link href="/" className={`hover:text-black ${pathname === "/" ? "text-black underline" : "text-white"}`}>
          Home
        </Link>
        <Link href="/about" className={`hover:text-black ${pathname === "/about" ? "text-black underline" : "text-white"}`}>
          About
        </Link>
        <Link href="/contact" className={`hover:text-black ${pathname === "/contact" ? "text-black underline" : "text-white"}`}>
          Contact
        </Link>
      </nav>

      {/* Right Section: Cart Icon */}
      <div className="relative">
        <BsCart3 className="h-8 w-8" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          0
        </span>
      </div>
      <span className="text-white font-medium text-base pl-4">Cart</span>

    </header>
  );
};
