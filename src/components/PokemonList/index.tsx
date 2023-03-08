import PokemonCard from "../PokemonCard";
import React from "react";
import {Pokemon} from "../../types";
import  './styles/index.css';

interface Props {
    pokemons: Array<Pokemon>;
}

const PokemonList = ({ pokemons } : Props ) => {
    return(
        <div className='PokemonList'>
            {pokemons.map((pokemon)=>{
                return <PokemonCard pokemon={pokemon} key={pokemon.name}/>
            })}
        </div>
    )
}

PokemonList.defaultProps = {
    pokemons: [
        {
            name: 'Ditto',
            types: ['normal'],
            img: ''
        },
        {
            name: 'Charmander',
            types: ['fire'],
            img: ''
        },
        {
            name:'bulbasur',
            types: ['grass'],
            img: ''
        }
    ]
}

export default PokemonList;