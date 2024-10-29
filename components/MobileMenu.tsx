import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const MobileMenu = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const pathname = usePathname()

  return (
    <nav className="absolute top-16 left-0 w-full bg-[#20C997] text-center md:hidden">
      <Link href="/" className={`block py-2 ${pathname === "/" ? "text-black underline" : "text-white"}`} onClick={toggleMenu}>
        Home
      </Link>
      <Link href="/about" className={`block py-2 ${pathname === "/about" ? "text-black underline" : "text-white"}`} onClick={toggleMenu}>
        About
      </Link>
      <Link href="/contact" className={`block py-2 ${pathname === "/contact" ? "text-black underline" : "text-white"}`} onClick={toggleMenu}>
        Contact
      </Link>
    </nav>
  )
};
