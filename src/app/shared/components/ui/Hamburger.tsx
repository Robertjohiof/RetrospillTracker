import { useState } from "react";
import { defineLinks } from "rwsdk/router";

export default function Hamburger() {
  const [open, setOpen] = useState(false);

  const link = defineLinks([
    "/games-list",
    "/favourites",
    "/stats",
    "/reviews",
    "/recommended"
  ])

  return (
    <>
      <div className="grid place-content-center">
        {!open &&
        <div className={`HAM-ICON space-y-2 md:hidden`} onClick={() => setOpen((prev) => !prev)}>
          <span className="block h-1 w-8 rounded-full bg-secondary"></span>
          <span className="block h-1 w-8 rounded-full bg-secondary"></span>
          <span className="block h-1 w-8 rounded-full bg-secondary"></span>
        </div>
        }
        <div  className={`${open ? "flex" : "hidden"} flex-col items-center`}>
          <div onClick={() => setOpen(false)}>
            <svg
                className="h-10 w-10 text-secondary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
          </div>
          <ul className="">
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
        </div>
      </div>
    </>
  )
}