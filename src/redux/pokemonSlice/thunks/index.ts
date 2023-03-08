import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemons } from "../../../api";
import { IPokemonsResponse } from "../../../api/models";
import { AsyncThunkAction } from "@reduxjs/toolkit";

interface FetchPokemonPayload {}

const AsyncThunkconfig = {};

export const fetchPokemonsAsync = createAsyncThunk<any>(
  "pokemons/fetchPokemons",
  async ( _, { rejectWithValue }) => {
    try {
      const res = await fetchPokemons();
      if (res.status !== 200 || res.error) {
        throw new Error("No fue posible obtener pokemones");
      }
      return res;
    } catch (error ) {
      return rejectWithValue((error as Error).message);
    }
  }
);
