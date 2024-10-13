import React from 'react';
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  type: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, type }) => {
  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-center border border-gray-700 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
        <img src={image} alt={name} className="w-24 h-24 mx-auto" />
        <h3 className="text-xl font-bold text-white">{`${id}. ${name.charAt(0).toUpperCase() + name.slice(1)}`}</h3>
        <p className="text-gray-400">Type: {type.join(', ')}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
