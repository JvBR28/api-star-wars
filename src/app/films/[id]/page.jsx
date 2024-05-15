'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const FilmPage = () => {
  const [id, setId] = useState(null);
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const filmId = pathParts[pathParts.length - 1];
    setId(filmId);
  }, []);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        if (!id) {
          console.log("Nenhum id pego");
          return;
        }
        setLoading(true);
        const filmRes = await fetch(`https://swapi.dev/api/films/${id}/`);
        if (!filmRes.ok) {
          console.error("Error ao obter filme:", filmRes.status);
          return;
        }
        const filmData = await filmRes.json();
        const charactersData = await Promise.all(
          filmData.characters.map(async (characterUrl) => {
            const characterRes = await fetch(characterUrl);
            const characterData = await characterRes.json();
            return characterData.name;
          })
        );
        const filmDetails = {
          title: filmData.title,
          episode_id: filmData.episode_id,
          director: filmData.director,
          producer: filmData.producer,
          release_date: filmData.release_date,
          characters: charactersData
        };
        setFilm(filmDetails);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao pegar filme:', error);
      }
    };
    fetchFilm();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src="/spinner.svg" alt="Loading spinner" />
      </div>
    );
  }

  if (!film) {
    return <div>Error ao carregar filme.</div>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className='p-20'>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{film.title}</h1>
        <div className="border p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Detalhes do Filme</h2>
          <p><span className="font-semibold">Título:</span> {film.title}</p>
          <p><span className="font-semibold">Episódio:</span> {film.episode_id}</p>
          <p><span className="font-semibold">Diretor:</span> {film.director}</p>
          <p><span className="font-semibold">Produtor:</span> {film.producer}</p>
          <p><span className="font-semibold">Data de Lançamento:</span> {film.release_date}</p>
        </div>
        <div className="border p-4 rounded-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Personagens</h2>
          <ul>
            {film.characters.map((character, index) => (
              <li key={index}>{character}</li>
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

export default FilmPage;
