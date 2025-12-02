import { dbCollections, dbCollectionsEntries, dbGames, dbGamesToPlatforms, dbPlatforms, dbStatuses, dbUsers } from "@/app/data/dbTestData";
import { API_ENDPOINT, API_URL, BASE_URL } from "@/app/shared/config/apiPaths";
import { User } from "@/app/shared/schemas/usersSchema";
import { ProfileData, UserGame } from "@/app/features/profilePage/types/user";
import { useEffect, useState } from "react";
import {SafeUser} from "@/db/schema";
import {useAuth} from "@features/auth/context/AuthProvider";

export function useProfileData() {
    const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<ProfileData | null>(null)

  useEffect(() => {
      setLoading(true);
      setError(null);

    console.log(user)

    if(!user) {
        setLoading(false);
        setError("Didn't find the user!");
        return;
    }

    
    const collections = dbCollections.filter((col) => col.userId === user.userId);

    const entries = dbCollectionsEntries.filter((ent) => collections.some((c) => c.collectionId === ent.collectionId));

    const userGames = entries.map((entry) => {
      const game = dbGames.find((g) => g.gameId === entry.gameId);
      if (!game) return null;

      const platformId = dbGamesToPlatforms.find((p) => p.gameId === game.gameId)?.platformId;
      const platform = dbPlatforms.find((pl) => pl.platformId === platformId)?.name || null;


      const status = dbStatuses.find((s) => s.statusId === entry.statusId)?.status;

      return {
        gameId: game.gameId,
        title: game.title,
        status,
        score: entry.score,
        playTime: entry.playTime,
        finishedAt: entry.finishedAt,
        priority: entry.priority,
        platform
      };
    }).filter((game): game is UserGame => game !== null);

    setData({ user, collections, userGames})

    if (userGames.length > 0) setSearch(userGames[0].title)

      setLoading(false);
  }, [user])

  return { data, loading, error, search, setSearch };
}
