import React, { useEffect, useState } from "react";
import { matchSorter } from "match-sorter";
import { Header } from "./Header";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useNetworkStatus } from "./useNetworkStatus";

export function PokemonsContainer() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    async function getPokemons() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await res.json();
      setPokemons(data.results);
    }

    getPokemons();
  }, []);

  const visiblePokemons = React.useMemo(() => {
    return pokemons.length
      ? pokemons.sort((pokemonA, pokemonB) =>
          pokemonA.name > pokemonB.name ? 1 : -1
        )
      : [];
  }, [pokemons, searchTerm]);

  const handlePokemonCaught = React.useCallback(
    (pokemon: Pokemon, caught: boolean) => {
      setCaughtPokemons((prev) => {
        if (caught) {
          if (prev.includes(pokemon)) {
            return prev;
          }

          return [...prev, pokemon];
        } else {
          return prev.filter((item) => item !== pokemon);
        }
      });
    },
    [pokemons]
  );

  return (
    <div>
      <Header
        caughtPokemonsLength={caughtPokemons.length}
        pokemonsLength={pokemons.length}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
      />
      <>
        {visiblePokemons.map((pokemon) => {
          return (
            <PokemonItem
              searchTerm={searchTerm}
              key={pokemon.name}
              pokemon={pokemon}
              onChange={handlePokemonCaught}
              isCaught={caughtPokemons.includes(pokemon)}
            />
          );
        })}
      </>
      {!isOnline ? (
        <div
          className="network-status-message"
          role="status"
          aria-live="polite"
        >
          You're offline
        </div>
      ) : null}
    </div>
  );
}
