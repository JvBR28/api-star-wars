'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Navbar from '@/app/components/Navbar';

const VehiclePage = () => {
  const [id, setId] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const vehicleId = pathParts[pathParts.length - 1];
    setId(vehicleId);
  }, []);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        if (!id) {
          console.log("Nenhum id pego");
          return;
        }
        const vehicleRes = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
        if (!vehicleRes.ok) {
          console.error("Error ao obter veículo:", vehicleRes.status);
          return;
        }
        const vehicleData = await vehicleRes.json();
        const filmsData = await Promise.all(
          vehicleData.films.map(async (filmUrl) => {
            const filmRes = await fetch(filmUrl);
            const filmData = await filmRes.json();
            return { title: filmData.title, episode_id: filmData.episode_id };
          })
        );
        const vehicleDetails = {
          name: vehicleData.name,
          model: vehicleData.model,
          cost_in_credits: vehicleData.cost_in_credits,
          length: vehicleData.length,
          crew: vehicleData.crew,
          passengers: vehicleData.passengers,
          films: filmsData
        };
        setVehicle(vehicleDetails);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao pegar veículo:', error);
      }
    };
    fetchVehicle();
  }, [id]);

  const episodeToId = {
    1: 4,
    2: 5,
    3: 6,
    4: 1,
    5: 2,
    6: 3
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src="/spinner.svg" alt="Loading spinner" />
      </div>
    );
  }

  if (!vehicle) {
    return <div>Error ao carregar veículo.</div>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4 text-center">{vehicle.name}</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Detalhes do Veículo</h2>
            <p><span className="font-semibold">Nome:</span> {vehicle.name}</p>
            <p><span className="font-semibold">Modelo:</span> {vehicle.model}</p>
            <p><span className="font-semibold">Custo em Créditos:</span> {vehicle.cost_in_credits}</p>
            <p><span className="font-semibold">Tamanho:</span> {vehicle.length}</p>
            <p><span className="font-semibold">Tripulação:</span> {vehicle.crew}</p>
            <p><span className="font-semibold">Passageiros:</span> {vehicle.passengers}</p>
          </div>
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Filmes</h2>
            <ul>
              {vehicle.films.map((film, index) => (
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

export default VehiclePage;

