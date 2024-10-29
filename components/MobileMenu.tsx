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
    </nav>
  )
};
