import { useEffect, useState } from "react"

export default function ProfilePage(){
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const GET_URL = "https://api.igdb.com/v4/games";
  
  useEffect(() => {
    async function fetch
    
    setLoading(true)
    fetch(GET_URL, {headers: {
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }})
    .then(res => {
      return (res.ok) ? res.json() : new Error("Mistake!")
    })
    .then(data => {
      setData(data)
      setLoading(false)
    })
    .catch(error => {
      setError(error)
    })
  }, [])
  
  return (
    <h1>Profile page</h1>
  )
}