import Searcher from "../components/Searcher";
import PokemonList from "../components/PokemonList";
import { Col, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pokemon } from "../types";
import "./styles/index.css";
import "antd/dist/reset.css";
import { fetchPokemonsAsync } from "../redux/pokemonSlice/thunks";
import { PokemonsState } from "../redux/pokemonSlice/models";
import { useAppDispatch, useAppSelector } from "./../hooks";
import { setPokemons } from "../redux/pokemonSlice";

export interface Pokemons {
  pokemons: Array<Pokemon>;
}

export type AppType = {
  pokemons: Array<Pokemon>;
  setPokemons: (pokemons: Array<Pokemon>) => void;
};

const App = () => {
  const dispatch = useAppDispatch();
  const globalPokemons = useAppSelector((state: PokemonsState) => state.pokemons);
  const [pokemons, setPokemons] = useState<Pokemon[]>(globalPokemons);
  const error = useAppSelector((state: PokemonsState) => state.error);
  const status = useAppSelector((state: PokemonsState) => state.status);

  useEffect(() => {
    dispatch(fetchPokemonsAsync());
    setPokemons(globalPokemons);
  }, [dispatch]);

  const onSearch = (value: string) => {
    const searchPokemons = globalPokemons.filter( (pokemon) => pokemon.name.includes(value));
    setPokemons(searchPokemons);
  };

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src="https://raw.githubusercontent.com/musartedev/curso-redux/27298f5dd3e37caf2a90a7a82580cd2905fcab31/src/statics/logo.svg"></img>
      </Col>
      <Col span={8} offset={8}>
        <Searcher onSearch={onSearch} />
      </Col>
      {status === "loading" ? (
        <Col offset={12} className="loader">
          <Spin spinning size="large" />
        </Col>
      ) : pokemons.length ? (
        <PokemonList pokemons={pokemons} />
      ) : (
        "no hay pokemons"
      )}
    </div>
  );
};

export default App;
