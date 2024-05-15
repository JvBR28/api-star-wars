'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const CharacterPage = () => {
  const [id, setId] = useState(null);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [episodeToId, setEpisodeToId] = useState(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const characterId = pathParts[pathParts.length - 1];
    setId(characterId);
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if (!id) {
          console.log("Nenhum id pego");
          return;
        }
        setLoading(true);
        const characterRes = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!characterRes.ok) {
          console.error("Error ao obter personagem:", characterRes.status);
          return;
        }
        const characterData = await characterRes.json();
        const homeworldRes = await fetch(characterData.homeworld);
        const homeworldData = await homeworldRes.json();
        const filmsData = await Promise.all(
          characterData.films.map(async (filmUrl) => {
            const filmRes = await fetch(filmUrl);
            const filmData = await filmRes.json();
            return { title: filmData.title, episode_id: filmData.episode_id };
          })
        );
        const speciesData = await Promise.all(
          characterData.species.map(async (speciesUrl) => {
            const speciesRes = await fetch(speciesUrl);
            const speciesData = await speciesRes.json();
            return speciesData.name;
          })
        );
        
        const episodeToIdMapping = {
          1: 4, 
          2: 5, 
          3: 6, 
          4: 1, 
          5: 2, 
          6: 3
        };

        setEpisodeToId(episodeToIdMapping);

        const characterDetails = {
          name: characterData.name,
          height: characterData.height,
          mass: characterData.mass,
          birth_year: characterData.birth_year,
          homeworld: homeworldData.name,
          films: filmsData,
          species: speciesData.join(', '),
          image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
        };
        setCharacter(characterDetails);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao pegar personagem:', error);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src="/spinner.svg" alt="Loading spinner" />
      </div>
    );
  }

  if (!character) {
    return <div>Error ao carregar personagem.</div>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navbar />
      <div className="w-full py-4 mt-24 mb-8 text-center">
        <h1 className="text-3xl font-bold">{character.name}</h1>
      </div>
      <div className="w-full flex items-center justify-center mb-8">
        <img src={character.image} alt={character.name} className="w-72 h-72 rounded-lg" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="border p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Detalhes do Personagem</h2>
          <p><span className="font-semibold">Altura:</span> {character.height}</p>
          <p><span className="font-semibold">Peso:</span> {character.mass}</p>
          <p><span className="font-semibold">Ano de Nascimento:</span> {character.birth_year}</p>
          <p><span className="font-semibold">Planeta Natal:</span> {character.homeworld}</p>
        </div>
        <div className="border p-4 rounded-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Filmes</h2>
          <ul>
            {character.films.map((film) => (
              <li key={film.episode_id}>
                <Link legacyBehavior href={`/films/${episodeToId[film.episode_id]}`}>
                  <a className="text-blue-500 hover:text-blue-700">{film.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link legacyBehavior href="/">
        <a className="mb-8 text-blue-500 hover:text-blue-700">Voltar para Home</a>
      </Link>
      <Footer />
    </main>
  );
};

export default CharacterPage;
