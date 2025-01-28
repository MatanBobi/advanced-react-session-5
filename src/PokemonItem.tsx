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
    <Link
      to={`/pokemons/${pokemon.name}`}
      className="px-4 py-5 border-t border-t-slate-300 hover:bg-slate-200 font-medium dark:border-t-gray-600 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-800 flex items-center justify-between"
    >
      {matchesFilterAtIndex >= 0 && searchTerm !== "" ? (
        <div>
          {pokemon.name.substring(0, matchesFilterAtIndex)}
          <span className="bg-pink-500">
            {pokemon.name.substring(
              matchesFilterAtIndex,
              matchesFilterAtIndex + searchTerm.length
            )}
          </span>
          {pokemon.name.substring(matchesFilterAtIndex + searchTerm.length)}
        </div>
      ) : (
        pokemon.name
      )}
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={isCaught}
          onChange={() => {
            onChange(pokemon, !isCaught);
          }}
        />
      </div>
    </Link>
  );
});
