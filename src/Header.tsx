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
    <div className="flex flex-col gap-2 p-3 relative">
      <aside>Uncaught Pokemons: {pokemonsLength - caughtPokemonsLength}</aside>
      <input
        value={searchTerm}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      <div className="absolute right-0 scale-50 bottom-0">
        {isTransitionInProgress ? <Spinner /> : null}
      </div>
    </div>
  );
}
