'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../app/components/Navbar';
import Footer from './components/Footer';

const Home = () => {
  const [people, setPeople] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const res = await fetch(url || 'https://swapi.dev/api/people');
        const data = await res.json();
        setPeople(data.results);
        setNextPage(data.next);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchNextPage = async () => {
    if (nextPage) {
      const res = await fetch(nextPage);
      const data = await res.json();
      setPeople([...people, ...data.results]);
      setNextPage(data.next);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 pt-24">Star Wars Database</h1>
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex p-20">
      <ul className="grid grid-cols-4 gap-4 item-center">
          {people.map((person, index) => {
            const id = person.url.split('/').filter(Boolean).pop();
            return (
              <li className="w-52 mx-4" key={index}>
                <Link legacyBehavior href={`/characters/${id}`}>
                  <a>
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt={person.name} />
                    <div className="p-2 text-sm text-black bg-gray-400">
                      {person.name}
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
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

export default Home;