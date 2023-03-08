import { Pokemon } from "../../../types";

export interface PokemonsState {
  pokemons: Array<Pokemon>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}
