import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../types";
import { fetchPokemonsAsync } from "./thunks";
import { PokemonsState } from "./models";
import { IFetchResponse } from "../../models/IFetch";
import { IPokemonsResponse} from "../../api/models";

const initialState : PokemonsState = {
  pokemons: [],
  status: "loading",
  error: "",
}

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.status = "idle";
      state.pokemons = action.payload;
    },
    setFavorite: ( state, action: PayloadAction< Pokemon["name"]>) => {
      state.status = "idle";
      const newPokemons = state.pokemons.map( pokemon => {
        if ( pokemon.name === action.payload){
          pokemon.favorite = !pokemon.favorite;
          return pokemon;
        }
        return pokemon;
      })
      state.pokemons = newPokemons;
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonsAsync.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch pokemons";
      })
      .addCase(
        fetchPokemonsAsync.fulfilled,
        (state, action : PayloadAction<IPokemonsResponse>) => {
          state.status = "succeeded";
          state.pokemons = action.payload.data;
          state.error = ""
        }
      );
  },
});

export default pokemonSlice.reducer;
export const { setPokemons, setFavorite } = pokemonSlice.actions;
