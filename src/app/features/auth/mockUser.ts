import {User} from "@/db/schema/users-schema"

export const mockUser: User = {
    userId: 123,
    userName: "John Doe",
    email: "johndoe@mock.no",
    profilePicture: "coolpicture.png",
    biography: "I am johndoe, the master of disaster.",
    isActive: true,
    createdAt: "",
    updatedAt: "",
    slug: "slug",
    firstName: "john",
    lastName: "doe",
    profileBanner: "wow.png",
    roleId: 0
}