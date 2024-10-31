import axios from "axios";
import { GetStaticProps } from "next";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface Props {
  pokemon: Pokemon;
}

const RandomPokemon: React.FC<Props> = ({ pokemon }) => {
  console.log(
    "Data do último revalidate:",
    new Date().toLocaleString("pt-BR", { timeZone: "UTC" }),
    "ID: ",
    pokemon.id
  );

  return (
    <div>
      {pokemon ? (
        <div>
          <h1>{pokemon.name}</h1>
          <p>ID: {pokemon.id}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const randomId = Math.floor(Math.random() * 151) + 1; // Pokémon de 1 a 151 (Kanto)
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${randomId}`
  );
  const pokemon = response.data;

  return {
    props: {
      pokemon,
    },
    revalidate: 10, // ISR para revalidar a cada 10 segundos
  };
};

export default RandomPokemon;
