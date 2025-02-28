
import axios, { AxiosInstance } from 'axios';
import { PokemonDetailsType, PokemonType } from '../types';


const api: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || 'https://pokeapi.co/api/v2/',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getPokemonList = async (limit = 24): Promise<PokemonType[]> => {
    try {
        const response = await api.get(`pokemon?limit=${limit}`);
        return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const getPokemon = async (name: string): Promise<PokemonDetailsType> => {
  try {
    const response = await api.get(`pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon data for ${name}:`, error);
    throw error;
  }
};
