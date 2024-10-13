"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';

// Mapping Pokémon types to specific Tailwind background classes
const typeColors: { [key: string]: string } = {
  normal: "bg-normal",
  fire: "bg-fire",
  water: "bg-water",
  electric: "bg-electric",
  grass: "bg-grass",
  ice: "bg-ice",
  fighting: "bg-fighting",
  poison: "bg-poison",
  ground: "bg-ground",
  flying: "bg-flying",
  psychic: "bg-psychic",
  bug: "bg-bug",
  rock: "bg-rock",
  ghost: "bg-ghost",
  dragon: "bg-dragon",
  dark: "bg-dark",
  steel: "bg-steel",
  fairy: "bg-fairy",
};

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
}

const Pokedex: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [selectedType, setSelectedType] = useState(''); // Selected type state

  useEffect(() => {
    const cachedPokemonData = localStorage.getItem('pokemonData');

    if (cachedPokemonData) {
      // Parse and set cached data if available
      setPokemonList(JSON.parse(cachedPokemonData));
    } else {
      const fetchPokemons = async () => {
        try {
          const requests = [];
          for (let i = 1; i <= 151; i++) {
            requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
          }
          const responses = await Promise.all(requests);

          // Extract only essential data (ID, name, types)
          const essentialData = responses.map((res) => ({
            id: res.data.id,
            name: res.data.name,
            types: res.data.types,
          }));

          setPokemonList(essentialData);
          
          // Cache the essential data in localStorage
          localStorage.setItem('pokemonData', JSON.stringify(essentialData));
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
        }
      };

      fetchPokemons();
    }
  }, []);

  // Handle the search and type filtering logic
  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || pokemon.types.some((t) => t.type.name === selectedType);

    return matchesName && matchesType;
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon by name"
          className="border border-gray-700 bg-gray-800 text-white p-2 w-full rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType('')}
          className={`p-2 rounded-md ${selectedType === '' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          All
        </button>
        {Object.keys(typeColors).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`p-2 rounded-md ${selectedType === type ? `${typeColors[type]} text-white` : 'bg-gray-700 text-gray-300'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Pokémon grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} // Image from URL, not cached
            type={pokemon.types.map((t) => t.type.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
