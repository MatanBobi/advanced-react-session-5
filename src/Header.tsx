import { Spinner } from "./Spinner/Spinner";

export function Header({
  pokemonsLength,
  caughtPokemonsLength,
  onChangeSearch,
  searchTerm,
  isTransitionInProgress,
}: {
  pokemonsLength: number;
  caughtPokemonsLength: number;
  onChangeSearch: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  isTransitionInProgress: boolean;
}) {
  return (
    <div className="header">
      <aside>Uncaught Pokemons: {pokemonsLength - caughtPokemonsLength}</aside>
      <input
        value={searchTerm}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      {isTransitionInProgress ? <Spinner /> : null}
    </div>
  );
}
