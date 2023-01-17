import { Pokemon } from "./types";
import { memo } from "react";
import { Link } from "react-router-dom";

export const PokemonItem = memo(function ({
  pokemon,
  onChange,
  isCaught,
  searchTerm,
}: {
  pokemon: Pokemon;
  onChange: (pokemon: Pokemon, caught: boolean) => void;
  isCaught: boolean;
  searchTerm: string;
}) {
  const matchesFilterAtIndex = pokemon.name
    .toLowerCase()
    .indexOf(searchTerm.toLowerCase());
  return (
    <div className="pokemon-row">
      <Link to={`/pokemon/${pokemon.name}`}>
        {matchesFilterAtIndex >= 0 && searchTerm !== "" ? (
          <>
            {pokemon.name.substring(0, matchesFilterAtIndex)}
            <span className="highlight">
              {pokemon.name.substring(
                matchesFilterAtIndex,
                matchesFilterAtIndex + searchTerm.length
              )}
            </span>
            {pokemon.name.substring(matchesFilterAtIndex + searchTerm.length)}
          </>
        ) : (
          pokemon.name
        )}
      </Link>
      <input
        type="checkbox"
        checked={isCaught}
        onChange={() => {
          onChange(pokemon, !isCaught);
        }}
      />
    </div>
  );
});
