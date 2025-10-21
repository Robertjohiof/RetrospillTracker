import { defineApp } from "rwsdk/worker";
import {layout, render, route} from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import HomePage from "./app/pages/HomePage";
import { User, users } from "./db/schema/user-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import Layout from "@/app/shared/components/layout/Layout";

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
          route("/frontpage", HomePage),
      ]),
    route("/", async () => {
      const userResult = await drizzle(env.DB).select().from(users);
      return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          <h1 className="text-primary">Start</h1>
          <p>Velkommen til eksempel</p>
          <p>Databasen har {userResult.length} brukere</p>
          <div style={{ margin: "1.5rem 0" }}>
            <a
              href="/home"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                background: "#0070f3",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                fontWeight: "500",
              }}
            >
              Go to Home Page
            </a>
          </div>
          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            Note: The home page is protected and requires authentication. You
            will be redirected to login if you're not signed in.
          </p>
        </div>
      );
    }),



    route("/home", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/" },
          });
        }
      },
      Home,
    ]),
  ]),
]);
