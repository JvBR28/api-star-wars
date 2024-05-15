'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Characters = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        setLoading(true);
        const res = await fetch(url || 'https://swapi.dev/api/people');
        const data = await res.json();
        setPeople(data.results);
        setNextPage(data.next);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchNextPage = async () => {
    if (nextPage) {
      setLoading(true);
      const res = await fetch(nextPage);
      const data = await res.json();
      setPeople([...people, ...data.results]);
      setNextPage(data.next);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src="/spinner.svg" alt="Loading spinner" />
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 pt-24">Mundo Star Wars</h1>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Personagens</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {people.map((person, index) => {
            const id = person.url.split('/').filter(Boolean).pop();
            return (
              <div key={index} className="border p-4 rounded-md text-center">
                <Link legacyBehavior href={`/characters/${id}`}>
                  <a className="hover:text-blue-700">
                    <img
                      src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                      alt={person.name}
                      className="mx-auto rounded-full mb-4 hover:opacity-80 transition duration-300"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <div className="text-lg font-bold text-blue-500 hover:text-blue-700">{person.name}</div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {nextPage && (
        <div className="flex justify-center mb-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition" onClick={fetchNextPage}>
            Carregar mais
          </button>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Characters;