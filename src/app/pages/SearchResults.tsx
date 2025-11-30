import { React } from "rwsdk/client";
import GameCard from "../features/gameCard/components/GameCard";
import { GameCardProps } from "../features/gameCard/types/gameCardProps";

/**
 * Props for SearchResults komponenten.
 * @property {GameCardProps[]} results
 * @property {boolean} isLoading
 */
interface SearchResultsProps {
  results: GameCardProps[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
}) => {
  if (isLoading) {
    return null; // kan byttes med loading spinner
  }

  if (results.length === 0) {
    return <p>No games found. Try another search!</p>;
  }

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-cyan-400">
        Results ({results.length})
      </h2>

      {/* Samme layout som GameList på forsiden */}
      <section className="flex flex-wrap justify-evenly gap-9 p-4">
        {results.map((game) => (
          <GameCard key={game.title} {...game} />
        ))}
      </section>
    </>
  );
};

export default SearchResults;
