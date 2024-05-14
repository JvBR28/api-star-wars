'use client'
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="mb-8">
      <ul className="flex space-x-4">
        <NavItem href="/about">Sobre</NavItem>
        <NavItem href="/planets">Planetas</NavItem>
        <NavItem href="/ships">Naves</NavItem>
        <NavItem href="/vehicles">Veículos</NavItem>
        <NavItem href="/species">Espécies</NavItem>
      </ul>
    </nav>
  );
};

const NavItem = ({ href, children }) => {
  return (
    <li>
      <Link legacyBehavior href={href}>
        <a className="text-blue-500 hover:text-blue-700 cursor-pointer">{children}</a>
      </Link>
    </li>
  );
};

export default Navbar;
