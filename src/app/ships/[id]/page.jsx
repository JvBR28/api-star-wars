'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Navbar from '@/app/components/Navbar';

const ShipPage = () => {
  const [id, setId] = useState(null);
  const [ship, setShip] = useState(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const shipId = pathParts[pathParts.length - 1];
    setId(shipId);
  }, []);

  useEffect(() => {
    const fetchShip = async () => {
      try {
        if (!id) {
          console.log("Nenhum id pego");
          return;
        }
        const shipRes = await fetch(`https://swapi.dev/api/starships/${id}/`);
        if (!shipRes.ok) {
          console.error("Error ao obter nave:", shipRes.status);
          return;
        }
        const shipData = await shipRes.json();
        const filmsData = await Promise.all(
          shipData.films.map(async (filmUrl) => {
            const filmRes = await fetch(filmUrl);
            const filmData = await filmRes.json();
            return { title: filmData.title, episode_id: filmData.episode_id };
          })
        );
        const shipDetails = {
          name: shipData.name,
          model: shipData.model,
          cost_in_credits: shipData.cost_in_credits,
          length: shipData.length,
          crew: shipData.crew,
          passengers: shipData.passengers,
          films: filmsData
        };
        setShip(shipDetails);
      } catch (error) {
        console.error('Erro ao pegar nave:', error);
      }
    };
    fetchShip();
  }, [id]);

  const episodeToId = {
    1: 4,
    2: 5,
    3: 6,
    4: 1,
    5: 2,
    6: 3
  };

  if (!ship) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className='p-20'>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{ship.name}</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Detalhes da Nave</h2>
            <p><span className="font-semibold">Nome:</span> {ship.name}</p>
            <p><span className="font-semibold">Modelo:</span> {ship.model}</p>
            <p><span className="font-semibold">Custo em Créditos:</span> {ship.cost_in_credits}</p>
            <p><span className="font-semibold">Tamanho:</span> {ship.length}</p>
            <p><span className="font-semibold">Tripulação:</span> {ship.crew}</p>
            <p><span className="font-semibold">Passageiros:</span> {ship.passengers}</p>
          </div>
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Filmes</h2>
            <ul>
              {ship.films.map((film, index) => (
                <li key={index}>
                  <Link legacyBehavior href={`/films/${episodeToId[film.episode_id]}`}>
                    <a className="text-blue-500 hover:text-blue-700">{film.title}</a>
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

export default ShipPage;
