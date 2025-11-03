"use client"
import { useEffect, useState } from "react";
import Hero from "../shared/components/Hero";
import NavigationTemp from "../shared/components/NavigationTemp";

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
    <div className="styling-profilepage">
      <section className="relative">
        <span className="h-7">
          <Hero
            imageUrl="/images/gameover.png"
            imageAlt="Hero banner that says Game Over"
          />
        </span>
        <span className="">
          <NavigationTemp />
        </span>
        <span className="absolute right-1 bottom-20 bg-white rounded-full w-30 opacity-50">
          <img src="/images/avatartest.png"/>
        </span>
      </section>
      <section className="bg-primary-light grid grid-cols-5 grid-rows-3 gap-2 p-3">
      <article className="row-span-full col-span-1 bg-primary">
        <h2 className="font-press text-glow-orange text-2xl pl-5 pt-5">Search</h2>
      </article>
      <article className="col-span-4">
        <h2 className="text-glow-cyan font-press text-2xl">Playing</h2>
        
          <table className="w-full bg-primary font-press">
            <thead>
              <tr className="">
                <th scope="col" className="text-glow-orange">Title</th>
                <th scope="col" className="text-glow-orange">Start Date</th>
                <th scope="col" className="text-glow-orange">Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white-50">
                {/* Her må det mates på */}
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
              </tr>
            </tbody>
          </table>
        
      </article>
      <article className="col-span-4">
        <h2 className="text-glow-cyan font-press text-2xl">Planning</h2>
          <table className="bg-primary w-full">
            <thead>
              <tr className="flex justify-between">
                <th className="text-glow-orange">Title</th>
                <th className="text-glow-orange">Priority</th>
                <th className="text-glow-orange">Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex justify-between">
                {/* Her må det mates på */}
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
              </tr>
            </tbody>
        </table>
      </article>
      <article className="col-span-4">
        <h2 className="text-glow-cyan font-roboto text-2xl">Played</h2>
          <table className="bg-primary w-full">
            <thead>
              <tr className="flex justify-between">
                <th className="text-glow-orange">Title</th>
                <th className="text-glow-orange">Rating</th>
                <th className="text-glow-orange">Start Date</th>
                <th className="text-glow-orange">Finish date</th>
                <th className="text-glow-orange">Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex justify-between">
                {/* Her må det mates på */}
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
                <td className="text-white">Temp</td>
              </tr>
            </tbody>
          </table>
      </article>
      </section>
    </div>
  )
}