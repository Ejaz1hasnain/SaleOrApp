import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavMenu = () => {
  const pathname = usePathname()

  return (
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
  )
};
