"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
}

const PokemonPage: React.FC = () => {
  const { id } = useParams(); // Get the Pokémon ID from the dynamic route
  const router = useRouter(); // Use the Next.js router
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch Pokémon data based on the ID from the URL
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => setPokemon(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <button
        onClick={() => router.back()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
      >
        Go Back
      </button>

      <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <p className="text-gray-400 mb-4">ID: {pokemon.id}</p>
        <p className="text-gray-400 mb-4">Height: {pokemon.height / 10} meters</p>
        <p className="text-gray-400 mb-4">Weight: {pokemon.weight / 10} kg</p>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Types</h2>
          {pokemon.types.map((type) => (
            <span key={type.type.name} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mt-2">
              {type.type.name}
            </span>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold">Abilities</h2>
          {pokemon.abilities.map((ability) => (
            <span key={ability.ability.name} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mt-2">
              {ability.ability.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
