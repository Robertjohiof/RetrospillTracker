import {prefix, route} from "rwsdk/router";
import {createUserController} from "@/app/shared/controllers/userController";

export function userRoutes(userController: ReturnType<typeof createUserController>) {
    return prefix("users", [
        route("/", () => userController.getAllUsers()),
        route("/:id", ({ params }) => userController.getUserById(params.id))
    ])
}