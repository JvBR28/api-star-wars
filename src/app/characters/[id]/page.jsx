'use client'
import React, { useEffect, useState } from 'react';
import Character from '../../components/Character';

const CharacterPage = () => {
  const [id, setId] = useState(null);
  const [character, setCharacter] = useState(null);

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
            return filmData.title;
          })
        );
        const speciesData = await Promise.all(
          characterData.species.map(async (speciesUrl) => {
            const speciesRes = await fetch(speciesUrl);
            const speciesData = await speciesRes.json();
            return speciesData.name;
          })
        );
        const characterDetails = {
          name: characterData.name,
          height: characterData.height,
          mass: characterData.mass,
          birth_year: characterData.birth_year,
          homeworld: homeworldData.name,
          films: filmsData,
          species: speciesData.join(', ')
        };
        setCharacter(characterDetails);
      } catch (error) {
        console.error('Erro ao pegar personagem:', error);
      }
    };
    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return <Character character={character} />;
};

export default CharacterPage;