import { useState } from "react"
import { defineLinks } from "rwsdk/router"
import Hamburger from "./ui/Hamburger";

export default function NavigationTemp() {
  const link = defineLinks([
    "/games-list",
    "/favourites",
    "/stats",
    "/reviews",
    "/recommended"
  ])
  
  return (
    <>
      <ul className="hidden md:flex flex-row justify-between text-[6px] md:text-base px-6 lg:px-30 py-5">
        <li>
          <a href={link("/games-list")} className="text-glow-orange font-press">Games List</a>
        </li>
        <li>
          <a href={link("/favourites")} className="text-glow-orange font-press">Favourites</a>
        </li>
        <li>
          <a href={link("/stats")} className="text-glow-orange font-press">Stats</a>
        </li>
        <li>
          <a href={link("/reviews")} className="text-glow-orange font-press">Reviews</a>
        </li>
        <li>
          <a href={link("/recommended")} className="text-glow-orange font-press">Recommended</a>
        </li>
      </ul>
      <Hamburger />
    </>
  )
}