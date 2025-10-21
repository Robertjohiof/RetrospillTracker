import { defineApp } from "rwsdk/worker";
import {layout, prefix, render, route} from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
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

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
  render(Document, [
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
