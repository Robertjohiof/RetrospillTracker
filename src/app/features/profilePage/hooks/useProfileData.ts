import { dbCollections, dbCollectionsEntries, dbGames, dbUsers } from "@/app/data/dbTestData";
import { useEffect, useState } from "react";

export function useProfileData(userName: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const user = dbUsers.find((u) => u.userName === userName);
    if (!user) return setError("Could not find user!");

    const collections = dbCollections.filter((col) => col.userId === user.userId);

    const entries = dbCollectionsEntries.filter((ent) => collections.some((c) => c.collectionId === ent.collectionId));

    const games = dbGames.filter((ga) => entries.some((ent) => ent.gameId === ga.gameId));

    if (games.length > 0) setSearch(games[0].title)
  }, [userName])

  useEffect(() => {
    if(!search) return;

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5173/api/v1/getSearchGames?search=${search}`);
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
  }, [search]);

  console.log(data)

  return { data, loading, error, search, setSearch };
}
