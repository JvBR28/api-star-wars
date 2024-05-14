import React from 'react';
import Link from 'next/link';

export default async function Home() {
  const getPeople = async () => {
    const res = await fetch('https://swapi.dev/api/people');
    return res.json();
  }
  const data = await getPeople();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Grupo Star Wars</h1>
      <nav className="mb-8">
        <ul className="flex space-x-4">
          <li>
            <Link href="/about">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Sobre</span>
            </Link>
          </li>
          <li>
            <Link href="/planets">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Planetas</span>
            </Link>
          </li>
          <li>
            <Link href="/ships">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Naves</span>
            </Link>
          </li>
          <li>
            <Link href="/vehicles">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Veículos</span>
            </Link>
          </li>
          <li>
            <Link href="/species">
              <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Espécies</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Star Wars</h1>
        <ul className="grid grid-cols-4 gap-4 item-center">
          {data.results.map((person, index) => (
            <li className="w-52 mx-4" key={index}>
              <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} alt={person.name} />
              <div className="p-2 text-sm text-black bg-gray-400">
                {person.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}