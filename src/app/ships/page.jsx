'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Ships = () => {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        setLoading(true);
        const res = await fetch(url || 'https://swapi.dev/api/starships');
        const data = await res.json();
        setShips(data.results);
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
      setShips([...ships, ...data.results]);
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
        <h1 className="text-3xl font-bold mb-4 text-center">Naves</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ships.map((ship, index) => {
            const id = ship.url.split('/').filter(Boolean).pop();
            return (
              <div key={index} className="border p-4 rounded-md">
                <Link legacyBehavior href={`/ships/${id}`}>
                  <a className="text-lg font-bold text-blue-500 hover:text-blue-700">{ship.name}</a>
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

export default Ships;
