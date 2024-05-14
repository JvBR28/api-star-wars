'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://swapi.dev/api/people');
        const data = await res.json();
        setPeople(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Grupo Star Wars</h1>
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li>
            <Link legacyBehavior href="/about">
              <a className="text-blue-500 hover:text-blue-700 cursor-pointer">Sobre</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/planets">
              <a className="text-blue-500 hover:text-blue-700 cursor-pointer">Planetas</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/ships">
              <a className="text-blue-500 hover:text-blue-700 cursor-pointer">Naves</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/vehicles">
              <a className="text-blue-500 hover:text-blue-700 cursor-pointer">Veículos</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/species">
              <a className="text-blue-500 hover:text-blue-700 cursor-pointer">Espécies</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ul className="grid grid-cols-4 gap-4 item-center">
          {people.map((person, index) => {
            const id = person.url.split('/').filter(Boolean).pop();
            return (
              <li className="w-52 mx-4" key={index}>
                <Link legacyBehavior href={`/characters/${id}`}>
                  <a>
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt={person.name} />
                    <div className="p-2 text-sm text-black bg-gray-400">
                      {person.name}
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
