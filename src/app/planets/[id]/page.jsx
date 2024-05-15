'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Navbar from '@/app/components/Navbar';

const PlanetPage = () => {
  const [id, setId] = useState(null);
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const planetId = pathParts[pathParts.length - 1];
    setId(planetId);
  }, []);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        if (!id) {
          console.log("Nenhum id pego");
          return;
        }
        const planetRes = await fetch(`https://swapi.dev/api/planets/${id}/`);
        if (!planetRes.ok) {
          console.error("Error ao obter planeta:", planetRes.status);
          return;
        }
        const planetData = await planetRes.json();
        const filmsData = await Promise.all(
          planetData.films.map(async (filmUrl) => {
            const filmRes = await fetch(filmUrl);
            const filmData = await filmRes.json();
            return filmData.title;
          })
        );
        const planetDetails = {
          name: planetData.name,
          rotation_period: planetData.rotation_period,
          orbital_period: planetData.orbital_period,
          diameter: planetData.diameter,
          population: planetData.population,
          films: filmsData
        };
        setPlanet(planetDetails);
      } catch (error) {
        console.error('Erro ao pegar planeta:', error);
      }
    };
    fetchPlanet();
  }, [id]);

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className='p-20'>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{planet.name}</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Detalhes do Planeta</h2>
            <p><span className="font-semibold">Nome:</span> {planet.name}</p>
            <p><span className="font-semibold">Período de Rotação:</span> {planet.rotation_period}</p>
            <p><span className="font-semibold">Período de Órbita:</span> {planet.orbital_period}</p>
            <p><span className="font-semibold">Diâmetro:</span> {planet.diameter}</p>
            <p><span className="font-semibold">População:</span> {planet.population}</p>
          </div>
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Filmes</h2>
            <ul>
              {planet.films.map((film, index) => (
                <li key={index}>
                  <Link legacyBehavior href={`/films/${index + 1}`}>
                    <a className="text-blue-500 hover:text-blue-700">{film}</a>
                  </Link>
                </li>
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

export default PlanetPage;