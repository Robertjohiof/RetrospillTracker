import GameLayout from "@/app/features/gameDetail/layout/GameLayout";
import { useGameData } from "@/app/features/gameDetail/hooks/useGameData";

export default function GameDetail({ gameId }: { gameId: string }) {
  const { data, loading, error } = useGameData(gameId);

  if (loading) return <p>Laster spel...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Fant ikkje spelet</p>;

  return <GameLayout data={data} />;

}

