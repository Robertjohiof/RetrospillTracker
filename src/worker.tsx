import { defineApp } from "rwsdk/worker";
import {layout, prefix, render, route} from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";

import { runCustomSeed } from "./db/runCustomSeed";
import HomePage from "./app/pages/HomePage";
import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import Search from "./app/pages/Search";
import Browse from "./app/pages/Browse";
import Forum from "./app/pages/Forum";
import Login from "./app/pages/Login";
import Layout from "@/app/shared/components/layout/Layout";
import ProfilePage from "./app/pages/ProfilePage";
import SignUp from "./app/pages/SignUp";
import {getAllGames, getPopularGames} from "@/app/shared/services/gameService";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
  route("/api/v1/getPopularGames", getPopularGames),
  route("/api/v1/getAllGames", getAllGames),
  render(Document, [
    route("/seed", async () => {
      try {
        const seedResponse = await runCustomSeed(env.DB);
       return new Response(JSON.stringify(seedResponse, null, 2), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store", // ikke cache svar i dev
      },
    });
      } catch(error: any) {
            const msg = error?.message || String(error);
    const cause = (error as any)?.cause?.message;
    console.error("Seed error:", msg, cause);
    return Response.json({ ok: false, error: msg, cause }, { status: 500 });
      }
    }),
      layout(Layout, [
          route("/", HomePage),
          route("/search", Search),
          route("/browse", Browse),
          route("/forum", Forum),
          route("/login", Login),
          route("/signup", SignUp),
          route("/profilepage", ProfilePage),
          prefix("/games", [
              route("/", ()=>{return <h2>Games</h2>}),
              route("/:id", ()=>{return <h2>Dynamic game</h2>})
          ])
      ]),
  ]),
]);
