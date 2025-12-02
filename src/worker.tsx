import { defineApp } from "rwsdk/worker";
import { layout, prefix, render, route } from "rwsdk/router";
import { Document } from "@/app/Document";

import { runCustomSeed } from "./db/runCustomSeed";
import HomePage from "./app/pages/HomePage";
import { SafeUser, Session } from "@/db/schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";

import Search from "./app/pages/Search";
import Forum from "./app/pages/Forum";
import Login from "./app/pages/Login";
import Layout from "@/app/shared/components/layout/Layout";
import ProfilePage from "./app/pages/ProfilePage";
import GameDetail from "./app/features/gameDetail/GameDetail";
import SignUp from "./app/pages/SignUp";

import {
  getAllGames,
  getConsoles,
  getGenres,
  getPopularGames,
  getReleaseDates,
  getSearchGames,
  getGames,
} from "@features/api/game/gameService";
import { fetchCollectionsByUser } from "@/app/shared/repository/userCollectionsRepository";
import { userRoutes } from "@/app/shared/controllers/userRoutes";
import { createUserController } from "@/app/shared/controllers/userController";
import { Database, getDatabase } from "@/db";
import { authenticationMiddleware } from "@features/auth/middleware/authenticationMiddleware";
import { RegisterDTOSchema } from "@features/auth/types/authDtos";
import {
  createCookieResponse,
  createErrorResponse,
} from "@/app/shared/lib/response";
import { authService } from "@features/auth/authService";

// ----------- Types -----------
export interface Env {
  DB: D1Database;
}

export type AppContext = {
  database: Database;
  user: SafeUser | undefined | null;
  session: Session | null;
  authUrl: string;
};

// ----------- Main App -----------
export default defineApp([
  setCommonHeaders(),

  async function setup({ ctx }) {
    ctx.database = await getDatabase();
  },
  authenticationMiddleware,
  // --- API Routes ---
  prefix("/api/v1/", [
    userRoutes(createUserController()),
    route("getPopularGames", getPopularGames),
    route("getAllGames", getAllGames),
    route("getSearchGames", ({ request }) => {
      return getSearchGames(request.url);
    }),
    route("getGenres", getGenres),
    route("getReleaseDates", getReleaseDates),
    route("getConsoles", getConsoles),
    route("GET/games/:id", ({ params }) => {
      return getGames(params.id);
    }),
    prefix("auth", [
      route("/register", async (ctx) => {
        const body = await ctx.request.json();
        const parsedData = RegisterDTOSchema.safeParse(body);
        if (!parsedData.success) {
          return createErrorResponse(
            `Validation failed ${parsedData.error.message}`,
            400
          );
        }

        const {
          userName,
          email,
          password,
          biography,
          firstName,
          lastName,
          profilePicture,
          profileBanner,
        } = parsedData.data;

        const result = await authService.register({
          userName,
          email,
          password,
          biography,
          firstName,
          lastName,
          profilePicture,
          profileBanner,
        });

        if (!result.success) {
          return createErrorResponse("Failed to register user", 500);
        }

        return createCookieResponse(result.data.session.sessionId);
      }),
      route("/coolkid", async (ctx) => {
        const result = await authService.register({
          biography: "coolkid dude",
          email: "newCoolKid@cool.no",
          firstName: "cooldude",
          lastName: "dudeiscool",
          password: "Torep8Spore?",
          profileBanner: null,
          profilePicture: null,
          userName: "Coolkid40",
        });
        console.log(result);
      }),
    ]),
  ]),
  route("/users/:id/collections", ({ params }) => {
    return fetchCollectionsByUser(params.id);
  }),
  route("/users/:id/collections/backlog/", ({ params }) => {
    return fetchCollectionsByUser(params.id, true);
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
      route("/login", Login),
      route("/signup", SignUp),
      route("/profilepage/:id", ({ params }) => (
        <ProfilePage userId={params.id} />
      )),
      route("/profile", ProfilePage),
      prefix("/games", [
        route("/", () => <h2>Games</h2>),
        route("/:id", ({ params }) => <GameDetail gameId={params.id} />),
      ]),
    ]),
  ]),
]);
