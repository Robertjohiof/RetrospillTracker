import { db} from "@/db";
import { users } from '@/db/schema';
import { UserSchema, User } from "@/app/shared/schemas/usersSchema";
import { eq } from 'drizzle-orm';

export interface UserRepository {
    findAll(): Promise<User[] | null>;
    findById(id: number): Promise<User | null>;
}

export function createUserRepository(): UserRepository {
    return {
        async findAll():Promise<User[]> {
            const results = await db.query.users.findMany();

            return UserSchema.array().parse(results);
        },


        async findById(id: number):Promise<User | null> {
            const results = await db.query.users.findFirst({
                where: eq(users.userId, id),
            });

            if (!results) {
                return null;
            }

            return UserSchema.parse(results)
        }
    }
}
