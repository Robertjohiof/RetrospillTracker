import {createSelectSchema} from "drizzle-zod";
import { z } from "zod";
import {users} from "@/db/schema";

export const UserSchema = createSelectSchema(users);

export type User = z.infer<typeof UserSchema>;