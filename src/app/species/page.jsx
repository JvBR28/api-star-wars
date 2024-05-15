'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const Species = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (url, search = '') => {
    try {
      setLoading(true);
      const res = await fetch(url || `https://swapi.dev/api/species/?search=${search}`);
      const data = await res.json();
      setSpecies(data.results);
      setNextPage(data.next);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchNextPage = async () => {
    if (nextPage) {
      setLoading(true);
      const res = await fetch(nextPage);
      const data = await res.json();
      setSpecies([...species, ...data.results]);
      setNextPage(data.next);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    fetchData(null, searchTerm);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-4 text-center">Espécies</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar espécies..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full text-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {loading && species.length === 0 && (
          <div className="flex items-center justify-center min-h-screen">
            <img src="/spinner.svg" alt="Loading spinner" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {species.map((specie, index) => {
            const id = specie.url.split('/').filter(Boolean).pop();
            return (
              <div key={index} className="border p-4 rounded-md">
                <Link legacyBehavior href={`/species/${id}`}>
                  <a className="text-lg font-bold text-blue-500 hover:text-blue-700">{specie.name}</a>
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

export default Species;