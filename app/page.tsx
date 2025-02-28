"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPokemonList } from "./services/pokemon.service";
import { PokemonType } from "./types";
import Input from "./components/ui/input";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonType[]>([]);
  const [limit, setLimit] = useState<number>(24);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchPokemon = async (newLimit = 24) => {
    try {
      const data = await getPokemonList(newLimit);
      setPokemonList(data);
      setDisplayedPokemon(data);
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term)
    );
    setDisplayedPokemon(filteredPokemon);
  };

  const loadMore = () => {
    const newLimit = limit + 24;
    setLimit(newLimit);
    fetchPokemon(newLimit);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-violet-600">
      <h1 className="text-3xl font-bold text-center text-white">Pokémon List</h1>

      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full sm:w-80"
      />

      {displayedPokemon.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
  {displayedPokemon.map((pokemon) => (
    <Link
      key={pokemon.name}
      href={`/pokemon/${pokemon.name}`}
      className="p-6 rounded-lg shadow-lg border border-gray-200 hover:bg-violet-500 hover:text-white hover:scale-105 hover:shadow-2xl transition-transform dark:bg-gray-800 w-full"
    >
      <h2 className="text-xl text-white font-semibold text-center capitalize">
        {pokemon.name}
      </h2>
    </Link>
  ))}
</div>

      ) : (
        <p className="text-2xl font-semibold text-white">Pokemon Not Found</p>
      )}

      {displayedPokemon.length >= limit && displayedPokemon.length > 0 && (
        <button
          onClick={loadMore}
          className="bg-violet-600 border border-white text-white px-6 py-2 hover:bg-violet-500 rounded-lg transition"
        >
          Load More
        </button>
      )}
    </div>
  );
}
