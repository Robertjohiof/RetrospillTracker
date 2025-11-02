"use client"
import { useEffect, useState } from "react";

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
          console.log(result)
        //setData(result)
      }
      catch (err){
          console.log(err)
      }
    }
  }, [])
  
  return (
    <div className="">
      <section>
        <span>
          <img src="../assets/gameover.png" alt="Hero banner that says Game Over" />
        </span>
      </section>
      <section className="bg-primary grid grid-cols-5 grid-rows-3 gap-2">
      <article className="row-span-full col-span-1 bg-blue-400">
        <h2 className="text-glow-orange">Search</h2>
        <img src="../assets/gameover.png"/>
      </article>
      <article className="bg-blue-400 col-span-4">
        <h2 className="font-press text-2xl">Playing</h2>
      </article>
      <article className="bg-blue-400 col-span-4">
        <h2 className="font-vt323 text-2xl">Planning</h2>
      </article>
      <article className="bg-blue-400 col-span-4">
        <h2 className="font-roboto text-4xl">Played</h2>
      </article>
      </section>
    </div>
  )
}