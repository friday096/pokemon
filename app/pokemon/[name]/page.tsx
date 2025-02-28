"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getPokemon } from "@/app/services/pokemon.service";
import { PokemonDetailsType } from "@/app/types";
import Link from 'next/link';

const PokemonDetailsPage = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPokemonDetails = async (name: string) => {
        try {
            const data = await getPokemon(name);
            setPokemon(data);
        } catch (error) {
            console.error("Failed to fetch Pokémon details:", error);
            setPokemon(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonDetails(name as string);
    }, [name]);

    if (loading) {
        return <p className="text-center text-2xl font-semibold mt-10 text-violet-600">Loading...</p>;
    }

    if (!pokemon) {
        return <p className="text-center text-2xl font-semibold mt-10 text-red-600">Pokémon not found!</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-violet-600 p-4 md:p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-4xl">
                {/* Back Button */}
                <Link href="/" className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg mb-4 md:mb-6 hover:bg-violet-700 transition duration-300">
                    ← Back to Home
                </Link>

                {/* Pokemon Image and Name */}
                <div className="flex flex-col items-center text-center">
                    <Image
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name}
                        width={250}
                        height={250}
                        className="rounded-full border-4 border-violet-500 shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold text-violet-600 capitalize mt-4 md:mt-6">{pokemon.name}</h1>
                </div>

                {/* Abilities */}
                <div className="mt-6 md:mt-8">
                    <h2 className="text-2xl font-semibold text-violet-600 mb-3 md:mb-4">Abilities</h2>
                    <ul className="flex flex-wrap gap-2 md:gap-4">
                        {pokemon.abilities.map(({ ability }) => (
                            <li key={ability.name} className="bg-violet-500 text-white px-3 py-1 rounded-lg hover:bg-violet-700 transition duration-300">
                                {ability.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Types */}
                <div className="mt-6 md:mt-8">
                    <h2 className="text-2xl font-semibold text-violet-600 mb-3 md:mb-4">Type</h2>
                    <ul className="flex flex-wrap gap-2 md:gap-4">
                        {pokemon.types.map(({ type }) => (
                            <li key={type.name} className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition duration-300">
                                {type.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Stats */}
                <div className="mt-6 md:mt-8">
                    <h2 className="text-2xl font-semibold text-violet-600 mb-3 md:mb-4">Stats</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pokemon.stats.map(({ stat, base_stat }) => (
                            <li key={stat.name} className="bg-gray-100 p-3 cursor-pointer rounded-lg hover:shadow-md transition duration-300 transform hover:-translate-y-1">
                                <p className="font-medium text-violet-600 capitalize">{stat.name}</p>
                                <p className="text-xl font-bold">{base_stat}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Moves */}
                <div className="mt-6 md:mt-8">
                    <h2 className="text-2xl font-semibold text-violet-600 mb-3 md:mb-4">Moves</h2>
                    <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto border p-4 rounded-lg">
                        {pokemon.moves.slice(0, 20).map(({ move }) => (
                            <span key={move.name} className="bg-violet-500 text-white px-3 py-1 rounded-lg hover:bg-violet-700 transition-transform duration-300 hover:-translate-y-1">
                                {move.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailsPage;
