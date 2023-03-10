import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function PokemonPage() {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<any>();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonDetails(data);
      });
  }, [pokemonId]);

  return (
    <div className="pokemon-page">
      <div className="pokemon-page-image">
        {pokemonDetails && pokemonDetails.sprites && (
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
          />
        )}
      </div>
      <div>
        <h1>{pokemonDetails?.name}</h1>
        <p>Height: {pokemonDetails?.height}</p>
        <p>Weight: {pokemonDetails?.weight}</p>
      </div>
    </div>
  );
}
