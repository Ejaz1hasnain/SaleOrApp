'use client'
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MobileMenu } from "./MobileMenu";
import { NavMenu } from "./NavMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="flex fixed tracking-widest top-0 left-0 right-0 items-center justify-between px-6 py-4 bg-[#20C997] text-white">

      {/* left Section: Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          <GiHamburgerMenu className="h-6 w-6" />
        </button>
      </div>

      {/* Left Section: Logo */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold tracking-widest">SALEORAPP</h1>
      </div>

      {/* Navigation Menu */}
      {isMenuOpen ? <MobileMenu toggleMenu={toggleMenu} /> : <NavMenu />}

      {/* Right Section: Cart Icon */}
      <div className="relative">
        <BsCart3 className="h-8 w-8" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          0
        </span>
      </div>
      <span className="text-white hidden lg:block font-medium text-base pl-4">Cart</span>
    </header>
  );
};
