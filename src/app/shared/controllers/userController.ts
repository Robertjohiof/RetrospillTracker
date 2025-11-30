import {createUserRepository} from "@/app/shared/repository/userRepository";
import {createUserService} from "@/app/shared/services/userService";
import {z} from "zod";
import {createErrorResponse, createSuccessResponse, Errors} from "@/app/shared/lib/response";

export function createUserController() {
    const repo = createUserRepository();
    const service = createUserService(repo);
    return {

        getAllUsers: async () => {
            const results = await service.getAllUsers();

            if(!results.success) {
                if (results.error === Errors.NOT_FOUND) {
                    return createErrorResponse(Errors.NOT_FOUND, 404);
                }
                return createErrorResponse(Errors.INTERNAL_SERVER_ERROR, 500);
            }
            return createSuccessResponse(results.data);
        },

        getUserById: async (idParam: number) => {
            console.log("test")
            const params = z.object({
                id: z.coerce.number().positive(),
            });

            const { id } = params.parse({ id: idParam })

            const results = await service.getUserById(id);

            if(!results.success) {
                if (results.error === Errors.NOT_FOUND) {
                    return createErrorResponse(Errors.NOT_FOUND, 404);
                }
                return createErrorResponse(Errors.INTERNAL_SERVER_ERROR, 500);
            }
            return createSuccessResponse(results.data);
        }
    }
}