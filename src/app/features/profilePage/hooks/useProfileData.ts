import { dbCollections, dbCollectionsEntries, dbGames, dbUsers } from "@/app/data/dbTestData";
import { API_URL } from "@/app/shared/config/apiPaths";
import { User } from "@/db/schema";
import { useEffect, useState } from "react";

export function useProfileData(userName: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");


  const fetchUser = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API_URL}/users`);
      if(!response.ok) {
        return
      }
      const 
      
    }
  }



  useEffect(() => {
    const user = dbUsers.find((u) => u.userName === userName);
    

    const collections = dbCollections.filter((col) => col.userId === user.userId);

    const entries = dbCollectionsEntries.filter((ent) => collections.some((c) => c.collectionId === ent.collectionId));

    const games = dbGames.filter((ga) => entries.some((ent) => ent.gameId === ga.gameId));

    if (games.length > 0) setSearch(games[0].title)
  }, [userName])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5173/users`);
        if (!response.ok) throw new Error("Error");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Kunne ikke hente data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  console.log(data)

  return { data, loading, error, search, setSearch };
}
