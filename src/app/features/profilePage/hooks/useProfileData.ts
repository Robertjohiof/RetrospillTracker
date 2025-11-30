import { dbCollections, dbCollectionsEntries, dbGames, dbGamesToPlatforms, dbPlatforms, dbStatuses, dbUsers } from "@/app/data/dbTestData";
import { BASE_URL } from "@/app/shared/config/apiPaths";
import { User, ProfileData, UserGame } from "@/app/features/profilePage/types/user";
import { useEffect, useState } from "react";

export function useProfileData(userName: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<ProfileData | null>(null)

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}users`);
      if(!response.ok) {
        return
      }
      
      const json:any = await response.json();
      
      if(json?.data?.length) {
        setUsers(json.data)
      } else {
        console.warn("ingen data fra API, bruker fallback-data")
        setUsers(dbUsers)
      }
      


    } catch (error) {
      setError(null);
      console.error(error);
      setError("Feil ved henting av brukere")
      setUsers(dbUsers)
    } finally {
      setTimeout(() => {setLoading(false)}, 1000)
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    const user = users.find(
      (u) =>
        u.userName.toLowerCase() === userName.toLowerCase() ||
        u.slug?.toLowerCase() === userName.toLowerCase()
    );

    console.log(user)

    if(!user) return;
    
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
  }, [userName, users])

  return { data, loading, error, search, setSearch };
}
