import { dbCollections, dbCollectionsEntries, dbGames, dbUsers } from "@/app/data/dbTestData";
import { BASE_URL } from "@/app/shared/config/apiPaths";
import { User, ProfileData } from "@/app/features/profilePage/types/user";
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
      setUsers(json.data)

    } catch (error) {
      setError(null);
      console.error(error);
      setError("Feil ved henting av brukere")
    } finally {
      setTimeout(() => {setLoading(false)}, 1000)
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    const user = users.find((u) => u.userName === userName);

    if(!user) return;
    
    const collections = dbCollections.filter((col) => col.userId === user.userId);

    const entries = dbCollectionsEntries.filter((ent) => collections.some((c) => c.collectionId === ent.collectionId));

    const userGames = dbGames.filter((ga) => entries.some((ent) => ent.gameId === ga.gameId));

    setData({ user, collections, userGames})

    if (userGames.length > 0) setSearch(userGames[0].title)
  }, [userName, users])

  return { data, loading, error, search, setSearch };
}
