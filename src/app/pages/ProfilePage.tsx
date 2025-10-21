import { useEffect, useState } from "react"

export default function ProfilePage(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const GET_URL = "https://api.igdb.com/v4/games";
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_URL, {
          method: "POST",
          headers: {
            "Client-ID": "",
            "Authorization": "",
            "Accept": "application/json"
          }
        });
        if (!response.ok) throw new Error("Error")
        const result = await response.json()
        setData(result)
      }
    }
  }, [])
  
  return (
    <h1>Profile page</h1>
  )
}