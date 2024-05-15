'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 fixed w-full top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link legacyBehavior href="/">
              <a>
                <img src="/images/star-wars-world-background.png" alt="Star Wars World" className="h-16" />
              </a>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center">
            <ul className="flex space-x-4">
              <NavItem href="/about">Sobre</NavItem>
              <NavItem href="/characters">Personagens</NavItem>
              <NavItem href="/planets">Planetas</NavItem>
              <NavItem href="/ships">Naves</NavItem>
              <NavItem href="/vehicles">Veículos</NavItem>
              <NavItem href="/species">Espécies</NavItem>
            </ul>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none focus:text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-2">
              <NavItemMobile href="/about">Sobre</NavItemMobile>
              <NavItemMobile href="/characters">Personagens</NavItemMobile>
              <NavItemMobile href="/planets">Planetas</NavItemMobile>
              <NavItemMobile href="/ships">Naves</NavItemMobile>
              <NavItemMobile href="/vehicles">Veículos</NavItemMobile>
              <NavItemMobile href="/species">Espécies</NavItemMobile>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavItem = ({ href, children }) => {
  return (
    <li>
      <Link legacyBehavior href={href}>
        <a className="text-white hover:text-blue-500 cursor-pointer">{children}</a>
      </Link>
    </li>
  );
};

const NavItemMobile = ({ href, children }) => {
  return (
    <li>
      <Link legacyBehavior href={href}>
        <a className="text-white hover:text-blue-500 cursor-pointer block py-2 px-4">{children}</a>
      </Link>
    </li>
  );
};

export default Navbar;
