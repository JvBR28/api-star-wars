'use client'
// pages/species/[id].js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const SpeciesPage = () => {
  const [id, setId] = useState(null);
  const [species, setSpecies] = useState(null);
  const [episodeToId, setEpisodeToId] = useState(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const pathParts = window.location.pathname.split('/');
        const speciesId = pathParts[pathParts.length - 1];
        setId(speciesId);

        const speciesRes = await fetch(`https://swapi.dev/api/species/${speciesId}/`);
        if (!speciesRes.ok) {
          console.error("Error ao obter espécie:", speciesRes.status);
          return;
        }
        const speciesData = await speciesRes.json();
        const homeworldRes = await fetch(speciesData.homeworld);
        const homeworldData = await homeworldRes.json();
        const filmsData = await Promise.all(
          speciesData.films.map(async (filmUrl) => {
            const filmRes = await fetch(filmUrl);
            const filmData = await filmRes.json();
            return { title: filmData.title, episode_id: filmData.episode_id };
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

        const peopleData = await Promise.all(
          speciesData.people.map(async (peopleUrl) => {
            const peopleRes = await fetch(peopleUrl);
            const peopleData = await peopleRes.json();
            return peopleData.name;
          })
        );
        const speciesDetails = {
          name: speciesData.name,
          average_height: speciesData.average_height,
          average_lifespan: speciesData.average_lifespan,
          homeworld: homeworldData.name,
          language: speciesData.language,
          people: peopleData,
          films: filmsData
        };
        setSpecies(speciesDetails);
      } catch (error) {
        console.error('Erro ao pegar espécie:', error);
      }
    };
    fetchSpecies();
  }, []);

  if (!species || !episodeToId) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className='p-20'>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{species.name}</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Detalhes da Espécie</h2>
            <p><span className="font-semibold">Nome:</span> {species.name}</p>
            <p><span className="font-semibold">Tamanho Médio:</span> {species.average_height}</p>
            <p><span className="font-semibold">Vida Média:</span> {species.average_lifespan}</p>
            <p><span className="font-semibold">Planeta de Origem:</span> {species.homeworld}</p>
            <p><span className="font-semibold">Língua:</span> {species.language}</p>
          </div>
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Filmes</h2>
            <ul>
              {species.films.map((film) => (
                <li key={film.episode_id}>
                  <Link legacyBehavior href={`/films/${episodeToId[film.episode_id]}`}>
                    <a className="text-blue-500 hover:text-blue-700">{film.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Pessoas</h2>
            <ul>
              {species.people.map((person, index) => (
                <li key={index}>{person}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Link legacyBehavior href="/">
        <a className="mb-8 text-blue-500 hover:text-blue-700">Voltar para Home</a>
      </Link>
      <Footer />
    </main>
  );
};

export default SpeciesPage;
