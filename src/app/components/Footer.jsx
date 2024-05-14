'use client'
import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-start justify-evenly">
          <MapaDoSite />
          <PerfilDoCriador />
        </div>
        <div className="text-center text-sm mt-4">
          <p>&copy; 2024 Star Wars API</p>
          <p>Criado por: João Victor Braga Rodrigues</p>
        </div>
      </div>
    </footer>
  );
};

const MapaDoSite = () => {
  return (
    <div className="text-center mx-4">
      <h3 className="text-xl font-semibold mb-4">Mapa do Site &rsaquo;</h3>
      <ul>
        <li className='hover:text-blue-500'><Link legacyBehavior href="/">Home</Link></li>
        <li className='hover:text-blue-500'><Link legacyBehavior href="/about">Sobre</Link></li>
        <li className='hover:text-blue-500'><Link legacyBehavior href="/planets">Planetas</Link></li>
        <li className='hover:text-blue-500'><Link legacyBehavior href="/ships">Naves</Link></li>
        <li className='hover:text-blue-500'><Link legacyBehavior href="/vehicles">Veículos</Link></li>
        <li className='hover:text-blue-500'><Link legacyBehavior href="/species">Espécies</Link></li>
      </ul>
    </div>
  );
};

const PerfilDoCriador = () => {
  return (
    <div className="text-center mx-4">
      <h3 className="text-xl font-semibold mb-4">Perfil do Criador</h3>
      <div className="flex justify-center space-x-4">
        <a href="https://github.com/JvBR28" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-white text-xl hover:text-gray-400" />
        </a>
        <a href="https://www.linkedin.com/in/jo%C3%A3o-rodrigues-a94417255/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white text-xl hover:text-gray-400" />
        </a>
      </div>
    </div>
  );
};

export default Footer;