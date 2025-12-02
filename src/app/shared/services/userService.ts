import {User} from "@/app/shared/schemas/usersSchema";
import {UserRepository} from "@/app/shared/repository/userRepository";
import {Result} from "@/app/shared/types/result";
import {Errors} from "@/app/shared/types/errors";

export interface UserService {
    getAllUsers(): Promise<Result<User[]>>;
    getUserById(userId: number): Promise<Result<User>>;
}

export function createUserService(repo: UserRepository): UserService {
    return {
        async getAllUsers(): Promise<Result<User[]>> {
          const users = await repo.findAll();

          if(!users || users.length < 1) {
              return {
                  success: false,
                  errorCode: Errors.NOT_FOUND,
                  error: "User not found"
              };
          }

            return {
                success: true,
                data: users
            }
        },
        async getUserById (id: number): Promise<Result<User>> {
            const user = await repo.findById(id);

            if (!user) {
                return {
                    success: false,
                    errorCode: Errors.NOT_FOUND,
                    error: "User not found"
                };
            }

            return {
                success: true,
                data: user
            }

        }


    }


}