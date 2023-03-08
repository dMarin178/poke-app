import axios from "axios";
import { Pokemon } from "../types";
import { IFetchResponse } from "../models/IFetch"
import { AxiosResponse, AxiosHeaders } from "axios";

const url = "https://pokeapi.co/api/v2/";

interface PokemonRes {
  name: string;
  url: string;
}

interface PokemonDetails {
  //abilities: Array<object>;
  //forms: Array<object>;
  //game_indices: Array<object>;
  //moves: Array<object>;
  //species: Array<object>;
  sprites: pokemonSprites;
  //stats: Array<object>;
  types: pokemonTypes;
  //weight: number;
}

interface ApiResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: Array<PokemonRes>;
}

const headers = new AxiosHeaders();
const serializedHeaders = headers.toJSON();

type pokemonTypes = Array<{ type: { name: string } }>;
type pokemonSprites = { front_default: string };

export const fetchPokemons = async (): Promise<IFetchResponse<Pokemon[]>> => {
  const pokemons: Array<Pokemon> = [];
  const apiResponse: AxiosResponse = await axios
    .get(url + "pokemon?limit=151&offset=0",{ headers: serializedHeaders})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      error.response.error = error.message;
      return error.response;
    })
  if( apiResponse.status !== 200) {
    apiResponse.data = []
    return apiResponse;
  }
  const pokemonsRes = apiResponse.data.results;
    for (let i = 0; i < pokemonsRes.length; i++) {
      const name: string = pokemonsRes[i].name;
      const pokemonDetails: PokemonDetails = await getPokemonByName(
        url + "pokemon/" + name
      );
      const types: Array<string> = pokemonDetails.types.map((index) => {
        return index.type.name;
      });
      const img = pokemonDetails.sprites.front_default;
      const pokemon: Pokemon = {
        name,
        types,
        img,
      };
      pokemons.push(pokemon);
    }
    apiResponse.data = pokemons;
    return apiResponse;
}

const getPokemonByName = async (url: string) => {
  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
