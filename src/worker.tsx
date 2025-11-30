import { defineApp } from "rwsdk/worker";
import { layout, prefix, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";

import { runCustomSeed } from "./db/runCustomSeed";
import HomePage from "./app/pages/HomePage";
import { User, users } from "@/db/schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";

import Search from "./app/pages/Search";
import Browse from "./app/pages/Browse";
import Forum from "./app/pages/Forum";
import Login from "./app/pages/Login";
import Layout from "@/app/shared/components/layout/Layout";
import ProfilePage from "./app/pages/ProfilePage";
import GameDetail from "./app/features/gameDetail/GameDetail";
import SignUp from "./app/pages/SignUp";

import {
    getAllGames, getGames,
    getPopularGames,
    getSearchGames,
} from "@features/api/game/gameService";
import { fetchCollectionsByUser } from "@/app/shared/repository/userCollectionsRepository";
import {userRoutes} from "@/app/shared/controllers/userRoutes";
import {createUserController} from "@/app/shared/controllers/userController";

// ----------- Types -----------
export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

// ----------- Main App -----------
export default defineApp([
  setCommonHeaders(),

  // --- API Routes ---
    prefix("/api/v1/", [
        userRoutes(createUserController()),
        route("getPopularGames", getPopularGames),
        route("getAllGames", getAllGames),
        route("getSearchGames", getSearchGames),
        route("GET/games/:id", ({ params })=>{
            return getGames(params.id)
        }),
    ]),
    route("/users/:id/collections", ({ params }) => {
      return fetchCollectionsByUser(params.id)
    }),
    route("/users/:id/collections/backlog/", ({ params }) => {
        return fetchCollectionsByUser(params.id, true)
    }),

  // --- Rendered Pages ---
  render(Document, [
    // Seeder
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
      } catch (error: any) {
        const msg = error?.message || String(error);
        const cause = (error as any)?.cause?.message;
        console.error("Seed error:", msg, cause);
        return Response.json({ ok: false, error: msg, cause }, { status: 500 });
      }
    }),

    // Page Layout
    layout(Layout, [
      route("/", HomePage),
      route("/search", Search),
      route("/browse", Browse),
      route("/forum", Forum),
      route("/login", Login),
      route("/signup", SignUp),
      route("/profilepage/:id", 
        ({ params }) => <ProfilePage userId={params.id} />),
      prefix("/games", [
        route("/", () => <h2>Games</h2>),
        // route("/:id", () => <h2>Dynamic game</h2>),
        route("/:id", ({ params }) => <GameDetail gameId={params.id} />),
      ]),
    ]),
  ]),
]);
