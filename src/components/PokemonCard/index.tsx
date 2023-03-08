import { StarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Pokemon } from "../../types";
import FavoriteButton from "../FavoriteButton";
import { useSelector } from "react-redux";
import { PokemonsState } from "../../redux/pokemonSlice/models";
import { useAppDispatch } from "../../App/store";
import { MouseEventHandler } from "react";
import { setFavorite } from "../../redux/pokemonSlice";

interface Props {
  pokemon: Pokemon;
  key?: string;
}

const PokemonCard = ({ pokemon }: Props) => {
  const dispatch = useAppDispatch();

  const onClickFavorite = () : (MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>) | undefined =>  {
    dispatch(setFavorite(pokemon.name));
    return;
  };

  const types = pokemon.types.map((type) => type).join(", ");
  return (
    <Card
      title={pokemon.name}
      extra={
        <FavoriteButton
          isFavorite={
            pokemon.favorite !== undefined? pokemon.favorite : false
          }
          onClick = { onClickFavorite }
        />
      }
      cover={<img src={pokemon.img} alt={pokemon.name} />}
    >
      <Meta description={types} />
    </Card>
  );
};

export default PokemonCard;
