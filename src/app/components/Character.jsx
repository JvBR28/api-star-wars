'use client'
import React from 'react';
import Link from 'next/link';

const Character = ({ character }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold my-8">{character.name}</h1>
      <div className="max-w-2xl p-4 border border-gray-300 rounded-lg">
        <p><strong>Altura:</strong> {character.height}</p>
        <p><strong>Peso:</strong> {character.mass}</p>
        <p><strong>Ano de nascimento:</strong> {character.birth_year}</p>
        {character.homeworld && (
          <p><strong>Planeta de nascimento:</strong> {character.homeworld}</p>
        )}
        {character.films.length > 0 && (
          <p><strong>Filmes em que aparece:</strong> {character.films.join(', ')}</p>
        )}
        {character.species && (
          <p><strong>Espécie:</strong> {character.species}</p>
        )}
      </div>
      <Link legacyBehavior href="/">
        <a className="mt-4 text-blue-500 hover:text-blue-700">Voltar para Home</a>
      </Link>
    </div>
  );
};

export default Character;