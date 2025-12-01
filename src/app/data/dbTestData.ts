import { Collection, CollectionEntry, Developer, Game, GamesToDeveloper, Genre, Platform, PlayingStatus, Role, User } from "@/db/schema";

export const dbRoles: Role[] = [
    { id: 1, roleName: "USER" },
    { id: 2, roleName: "MODERATOR" },
    { id: 3, roleName: "ADMIN" }
];

export const dbUsers: User[] = [
    {
        userId: 1,
        userName: "Sell_Mango",
        slug: "sell-mango",
        email: "kjellmal@hiof.no",
        passwordHash: "$2b$10$7N2JH8kDpq0Ptw3G1a5eSe9gq1jbm7g1mB7wM1e6H5o4rUTcSfEsa",
        firstName: "Kjell-Magne",
        lastName: "Larsen",
        biography: "Jeg liker pepsi max",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-01-15T10:30:00.000Z"),
        updatedAt: new Date("2024-10-20T14:22:00.000Z"),
        roleId: 1
    },
    {
        userId: 2,
        userName: "PixelHunter",
        slug: "pixelhunter",
        email: "sarah.j@example.com",
        passwordHash: "$2b$10$4Qle5Z3R9mvqF3dXHq9Uae6q1X1VU2Z2JxR8Dp8m5tE9fO5CvJr8O",
        firstName: "Sarah",
        lastName: "Johnson",
        biography: "Retro gaming enthusiast and speedrunner",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-02-10T08:15:00.000Z"),
        updatedAt: new Date("2024-10-19T11:45:00.000Z"),
        roleId: 2
    },
    {
        userId: 3,
        userName: "NordicGamer",
        slug: "nordicgamer",
        email: "erik.hansen@example.no",
        passwordHash: "$2b$10$M8kP0Vj4s3cT1PwTn3xJ9e2v8q9oF5T7cZk1RzC9l3Yv5uL1gS6Pa",
        firstName: "Erik",
        lastName: "Hansen",
        biography: "RPG lover fra Bergen",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-03-05T13:20:00.000Z"),
        updatedAt: new Date("2024-10-21T09:30:00.000Z"),
        roleId: 2
    },
    {
        userId: 4,
        userName: "Luna_Plays",
        slug: "luna-plays",
        email: "luna.martinez@example.com",
        passwordHash: "$2b$10$Cs5Q8Pf2wD7eU0j8Vm2EsOV4fG2tQ3yFf7yKq1bPzxsR7TRyN4A8O",
        firstName: "Luna",
        lastName: "Martinez",
        biography: "Indie games and cozy vibes",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-03-22T16:45:00.000Z"),
        updatedAt: new Date("2024-10-20T18:10:00.000Z"),
        roleId: 2
    },
    {
        userId: 5,
        userName: "TechnoViking88",
        slug: "technoviking88",
        email: "andreas.berg@example.se",
        passwordHash: "$2b$10$b7T5WJm4C1xR5m7sPp6HaeT8D9fG4uK3gVn6Qb0eJf5ZkX8vHc7zS",
        firstName: "Andreas",
        lastName: "Berg",
        biography: "Competitive FPS player",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-04-12T12:00:00.000Z"),
        updatedAt: new Date("2024-10-18T20:15:00.000Z"),
        roleId: 2
    },
    {
        userId: 6,
        userName: "StardustDreamer",
        slug: "stardustdreamer",
        email: "maria.silva@example.com",
        passwordHash: "$2b$10$a3E7Fs9bH4tP7Wk2Dm5NqOeL8bS6vP0cF1xR7dQ9yTtM3bV2cJ6tW",
        firstName: "Maria",
        lastName: "Silva",
        biography: "JRPG fan and trophy hunter",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-05-08T09:30:00.000Z"),
        updatedAt: new Date("2024-10-21T07:20:00.000Z"),
        roleId: 2
    },
    {
        userId: 7,
        userName: "RetroKing",
        slug: "retroking",
        email: "james.wilson@example.co.uk",
        passwordHash: "$2b$10$N5kE8Px2qF1bT3h9Rn4UjKe8fC5vZ1tQ6xVwB9sJp0mL8aG4sR9dG",
        firstName: "James",
        lastName: "Wilson",
        biography: "Collecting games since 1989",
        isActive: false,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-06-14T14:25:00.000Z"),
        updatedAt: new Date("2024-09-30T16:40:00.000Z"),
        roleId: 2
    },
    {
        userId: 8,
        userName: "ValkyrieQuest",
        slug: "valkyriequest",
        email: "ingrid.olsen@example.no",
        passwordHash: "$2b$10$Q3nX6Uv1Hs9yK4bA8Wm2PsFwB7fV1cT9kPzE4jNqXr5Yl0TgM3dIe",
        firstName: "Ingrid",
        lastName: "Olsen",
        biography: "Norse mythology and action adventures",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-07-01T11:10:00.000Z"),
        updatedAt: new Date("2024-10-20T13:55:00.000Z"),
        roleId: 2
    },
    {
        userId: 9,
        userName: "CyberNinja_X",
        slug: "cyberninja-x",
        email: "kenji.tanaka@example.jp",
        passwordHash: "$2b$10$k4Rz1Qv7Fp2D9mC3bJt5XeG7aL4qN8pT6wS1uH0yVxM3fE9cD0qUa",
        firstName: "Kenji",
        lastName: "Tanaka",
        biography: "Fighting games and anime",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-07-19T15:40:00.000Z"),
        updatedAt: new Date("2024-10-21T10:05:00.000Z"),
        roleId: 2
    },
    {
        userId: 10,
        userName: "GreenShell_Racer",
        slug: "greenshell-racer",
        email: "claire.dubois@example.fr",
        passwordHash: "$2b$10$P0xN2Fs6eH7uK3cQv4Yj9OeA1tB5mS8dJwL4nR0fD6vT8hE3iK2mW",
        firstName: "Claire",
        lastName: "Dubois",
        biography: "Mario Kart champion 2023",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-08-03T10:20:00.000Z"),
        updatedAt: new Date("2024-10-19T15:30:00.000Z"),
        roleId: 2
    },
    {
        userId: 11,
        userName: "DragonSlayer_92",
        slug: "dragonslayer-92",
        email: "marcus.lee@example.com",
        passwordHash: "$2b$10$R8sF4Pj1Tn9cQ3vL6bWmKeT2yH8uV1xD4gPzS7nEwK3cL9vF0sZ9G",
        firstName: "Marcus",
        lastName: "Lee",
        biography: "Dark Souls veteran, no summons",
        isActive: true,
        profileBanner: null,
        profilePicture: null,
        createdAt: new Date("2024-08-25T17:50:00.000Z"),
        updatedAt: new Date("2024-10-20T12:25:00.000Z"),
        roleId: 2
    }
];

export const dbGames: Game[] = [
    { gameId: 1, slug: "the-legend-of-zelda-ocarina-of-time", title: "The Legend of Zelda: Ocarina of Time", apiKey: "zelda-oot-n64", description: "Ocarina of Time is set in the fictional kingdom of Hyrule, the setting of most Legend of Zelda games. Hyrule Field serves as the central hub, and is connected to several outlying areas with diverse topography which are home to the races of Hyrule.", story: null, coverImageUrl: null },
    { gameId: 2, slug: "super-mario-64", title: "Super Mario 64", apiKey: "mario-64-n64", description: "Mario must rescue Princess Peach from Bowser by collecting Power Stars hidden throughout the princess's castle. The game features open-world playability, degrees of freedom through all three axes in space, and relatively large areas which are composed primarily of true 3D polygons.", story: null, coverImageUrl: null },
    { gameId: 3, slug: "the-last-of-us", title: "The Last of Us", apiKey: "tlou-ps3", description: "The Last of Us is an action-adventure game set twenty years after a pandemic caused by a mutated fungus. Players control Joel, a smuggler tasked with escorting a teenage girl, Ellie, across a post-apocalyptic United States.", story: null, coverImageUrl: null },
    { gameId: 4, slug: "halo-combat-evolved", title: "Halo: Combat Evolved", apiKey: "halo-ce-xbox", description: "Halo: Combat Evolved is a first-person shooter game where players assume the role of Master Chief, a cybernetically enhanced supersoldier, and his AI companion Cortana. Players battle various aliens on the mysterious ringworld known as Halo.", story: null, coverImageUrl: null },
    { gameId: 5, slug: "sonic-the-hedgehog-2", title: "Sonic the Hedgehog 2", apiKey: "sonic-2-genesis", description: "Sonic the Hedgehog 2 is a platform game where Sonic and his new friend Tails must stop the evil Dr. Robotnik from stealing the Chaos Emeralds to power his Death Egg space station.", story: null, coverImageUrl: null },
    { gameId: 6, slug: "half-life-2", title: "Half-Life 2", apiKey: "hl2-pc", description: "Half-Life 2 is a first-person shooter that combines action, puzzle-solving, and storytelling. Players step into the shoes of Gordon Freeman, a scientist fighting against an alien occupation of Earth.", story: null, coverImageUrl: null },
    { gameId: 7, slug: "metroid-prime", title: "Metroid Prime", apiKey: "metroid-prime-gcn", description: "Metroid Prime brings the Metroid series into 3D with a first-person perspective. Players control Samus Aran as she explores the planet Tallon IV, battling Space Pirates and uncovering ancient mysteries.", story: null, coverImageUrl: null },
    { gameId: 8, slug: "god-of-war-2018", title: "God of War", apiKey: "gow-2018-ps4", description: "God of War follows Kratos and his son Atreus on a journey through Norse mythology. The game features brutal combat, puzzle-solving, and an emotional story about fatherhood.", story: null, coverImageUrl: null },
    { gameId: 9, slug: "gears-of-war", title: "Gears of War", apiKey: "gow-x360", description: "Gears of War is a third-person shooter featuring Marcus Fenix and his squad as they battle against the Locust Horde, a race of creatures emerging from underground to destroy humanity.", story: null, coverImageUrl: null },
    { gameId: 10, slug: "streets-of-rage-2", title: "Streets of Rage 2", apiKey: "sor2-genesis", description: "Streets of Rage 2 is a beat 'em up game where players fight through city streets to take down the crime syndicate. Features iconic soundtrack and cooperative gameplay.", story: null, coverImageUrl: null },
    { gameId: 11, slug: "the-witcher-3-wild-hunt", title: "The Witcher 3: Wild Hunt", apiKey: "witcher3-pc", description: "The Witcher 3: Wild Hunt is an open-world RPG where players control Geralt of Rivia, a monster hunter searching for his adopted daughter while navigating political intrigue and moral choices.", story: null, coverImageUrl: null },
    { gameId: 12, slug: "mario-kart-8-deluxe", title: "Mario Kart 8 Deluxe", apiKey: "mk8d-switch", description: "Mario Kart 8 Deluxe is a kart racing game featuring characters from the Mario universe. Race on gravity-defying tracks with a variety of items and power-ups.", story: null, coverImageUrl: null },
    { gameId: 13, slug: "uncharted-4-a-thiefs-end", title: "Uncharted 4: A Thief's End", apiKey: "uncharted4-ps4", description: "Uncharted 4 follows Nathan Drake as he comes out of retirement for one last adventure to find a legendary pirate treasure while facing his past and testing his relationships.", story: null, coverImageUrl: null },
    { gameId: 14, slug: "forza-horizon-5", title: "Forza Horizon 5", apiKey: "fh5-xbox", description: "Forza Horizon 5 is an open-world racing game set in a fictional representation of Mexico. Drive hundreds of cars across diverse environments from jungles to beaches to ancient ruins.", story: null, coverImageUrl: null },
    { gameId: 15, slug: "phantasy-star-iv", title: "Phantasy Star IV", apiKey: "ps4-genesis", description: "Phantasy Star IV is a role-playing game set in the Algo solar system. Players control Chaz Ashley and his companions as they battle an ancient evil threatening their world.", story: null, coverImageUrl: null },
    { gameId: 16, slug: "portal-2", title: "Portal 2", apiKey: "portal2-pc", description: "Portal 2 is a first-person puzzle-platform game. Players use a portal gun to create portals and solve increasingly complex puzzles while uncovering the history of the Aperture Science facility.", story: null, coverImageUrl: null },
    { gameId: 17, slug: "super-smash-bros-ultimate", title: "Super Smash Bros. Ultimate", apiKey: "ssbu-switch", description: "Super Smash Bros. Ultimate is a crossover fighting game featuring characters from various Nintendo franchises and guest characters. Battle on diverse stages with unique items and mechanics.", story: null, coverImageUrl: null },
    { gameId: 18, slug: "bloodborne", title: "Bloodborne", apiKey: "bloodborne-ps4", description: "Bloodborne is an action RPG set in the gothic city of Yharnam. Players must navigate a world filled with horrific creatures and uncover the mysteries of the Hunt.", story: null, coverImageUrl: null },
    { gameId: 19, slug: "halo-3", title: "Halo 3", apiKey: "halo3-x360", description: "Halo 3 concludes the original trilogy's story as Master Chief and the Arbiter fight to stop the Covenant and prevent the activation of the Halo Array.", story: null, coverImageUrl: null },
    { gameId: 20, slug: "shenmue", title: "Shenmue", apiKey: "shenmue-dc", description: "Shenmue is an action-adventure game following Ryo Hazuki as he investigates his father's murder in 1980s Japan. Features detailed world-building and life simulation elements.", story: null, coverImageUrl: null },
    { gameId: 21, slug: "doom-eternal", title: "DOOM Eternal", apiKey: "doom-eternal-pc", description: "DOOM Eternal is a fast-paced first-person shooter where players control the Doom Slayer battling demonic forces across dimensions to save humanity from extinction.", story: null, coverImageUrl: null }
]

export const dbDevelopers: Developer[] = [
    { name: "Nintendo EAD", slug: "nintendo-ead", createdAt: "2024-01-10T08:00:00.000Z", developerId: 1, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Naughty Dog", slug: "naughty-dog", createdAt: "2024-01-10T08:15:00.000Z", developerId: 2, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Bungie", slug: "bungie", createdAt: "2024-01-10T08:30:00.000Z", developerId: 3, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Sonic Team", slug: "sonic-team", createdAt: "2024-01-10T08:45:00.000Z", developerId: 4, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Valve Corporation", slug: "valve-corporation", createdAt: "2024-01-10T09:00:00.000Z", developerId: 5, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Retro Studios", slug: "retro-studios", createdAt: "2024-01-10T09:15:00.000Z", developerId: 6, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Santa Monica Studio", slug: "santa-monica-studio", createdAt: "2024-01-10T09:30:00.000Z", developerId: 7, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Epic Games", slug: "epic-games", createdAt: "2024-01-10T09:45:00.000Z", developerId: 8, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "CD Projekt Red", slug: "cd-projekt-red", createdAt: "2024-01-10T10:00:00.000Z", developerId: 9, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "Playground Games", slug: "playground-games", createdAt: "2024-01-10T10:15:00.000Z", developerId: 10, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "FromSoftware", slug: "fromsoftware", createdAt: "2024-01-10T10:30:00.000Z", developerId: 11, updatedAt: "2024-10-15T12:30:00.000Z"},
    { name: "id Software", slug: "id-software", createdAt: "2024-01-10T10:45:00.000Z", developerId: 12, updatedAt: "2024-10-15T12:30:00.000Z"}
]

export const dbGenres: Genre[] = [
    { name: "Action", slug: "action", apiKey: "action-genre", genreId: 1, updatedAt: "2024-10-15T14:20:00.000Z"},
    { name: "Adventure", slug: "adventure", apiKey: "adventure-genre", genreId: 2, updatedAt: "2024-10-15T14:20:00.000Z"},
    { name: "RPG", slug: "rpg", apiKey: "rpg-genre", genreId: 3, updatedAt: "2024-10-15T14:20:00.000Z"},
    { name: "Shooter", slug: "shooter", apiKey: "shooter-genre", genreId: 4, updatedAt: "2024-10-15T14:20:00.000Z"},
    { name: "Platform", slug: "platform", apiKey: "platform-genre", genreId: 5, updatedAt: "2024-10-15T14:20:00.000Z"},
    { name: "Racing", slug: "racing", apiKey: "racing-genre", genreId: 6, updatedAt: "2024-10-15T14:20:00.000Z"},
    { name: "Puzzle", slug: "puzzle", apiKey: "puzzle-genre", genreId: 7, updatedAt: "2024-10-15T14:20:00.000Z"},
    { name: "Fighting", slug: "fighting", apiKey: "fighting-genre", genreId: 8, updatedAt: "2024-10-15T14:20:00.000Z"}
]

export const dbPlatforms: Platform[] = [
    { name: "Nintendo Switch", slug: "nintendo-switch", platformId: 1, manufacturer: "Nintendo", releaseYear: "2017", apiKey: "switch-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "PlayStation 4", slug: "playstation-4", platformId: 2, manufacturer: "Sony", releaseYear: "2013", apiKey: "ps4-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "Xbox One", slug: "xbox-one", platformId: 3, manufacturer: "Microsoft", releaseYear: "2013", apiKey: "xbone-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "PC", slug: "pc", platformId: 4, manufacturer: "Various", releaseYear: "1970s", apiKey: "pc-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "Sega Genesis", slug: "sega-genesis", platformId: 5, manufacturer: "Sega", releaseYear: "1988", apiKey: "genesis-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "Nintendo 64", slug: "nintendo-64", platformId: 6, manufacturer: "Nintendo", releaseYear: "1996", apiKey: "n64-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "PlayStation 3", slug: "playstation-3", platformId: 7, manufacturer: "Sony", releaseYear: "2006", apiKey: "ps3-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "Xbox 360", slug: "xbox-360", platformId: 8, manufacturer: "Microsoft", releaseYear: "2005", apiKey: "x360-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "GameCube", slug: "gamecube", platformId: 9, manufacturer: "Nintendo", releaseYear: "2001", apiKey: "gcn-platform", updatedAt: "2024-10-15T16:00:00.000Z" },
    { name: "Dreamcast", slug: "dreamcast", platformId: 10, manufacturer: "Sega", releaseYear: "1998", apiKey: "dc-platform", updatedAt: "2024-10-15T16:00:00.000Z" }
]

export const dbCollections: Collection[] = [
    { collectionId: 1, userId: 1, name: null, createdAt: "2024-01-15T10:30:00.000Z", isBacklog: true, isPublic: true, likes: 0, description: null },
    { collectionId: 2, userId: 2, name: "My Favorites", createdAt: "2024-02-10T08:15:00.000Z", isBacklog: false, isPublic: true, likes: 15, description: "Games that changed my life" },
    { collectionId: 3, userId: 3, name: null, createdAt: "2024-03-05T13:20:00.000Z", isBacklog: true, isPublic: false, likes: 0, description: null },
    { collectionId: 4, userId: 4, name: "Cozy Collection", createdAt: "2024-03-22T16:45:00.000Z", isBacklog: false, isPublic: true, likes: 8, description: "Games for relaxing evenings" }
]

export const dbCollectionsEntries: CollectionEntry[] = [
    { gameId: 1, collectionId: 1, entryId: 123, statusId: 2, score: 8, priority: null, playTime: 50, finishedAt: "2024-08-15T18:30:00.000Z" },
    { gameId: 3, collectionId: 2, entryId: 124, statusId: 3, score: 10, priority: null, playTime: 35, finishedAt: "2024-07-22T20:15:00.000Z" },
    { gameId: 6, collectionId: 3, entryId: 125, statusId: 1, score: null, priority: 1, playTime: 0, finishedAt: null },
    { gameId: 12, collectionId: 4, entryId: 126, statusId: 2, score: 9, priority: null, playTime: 120, finishedAt: null },
    { gameId: 4, collectionId: 1, entryId: 127, statusId: 3, score: 9, priority: null, playTime: 28, finishedAt: "2024-09-10T16:45:00.000Z" },
    { gameId: 11, collectionId: 2, entryId: 128, statusId: 5, score: 8, priority: 2, playTime: 65, finishedAt: null },
    // Collection 1 - 3 more entries
    { gameId: 7, collectionId: 1, entryId: 129, statusId: 3, score: 10, priority: null, playTime: 42, finishedAt: "2024-06-18T21:30:00.000Z" },
    { gameId: 14, collectionId: 1, entryId: 130, statusId: 1, score: null, priority: 3, playTime: 0, finishedAt: null },
    { gameId: 19, collectionId: 1, entryId: 131, statusId: 4, score: 6, priority: null, playTime: 12, finishedAt: null },
    // Collection 2 - 3 more entries
    { gameId: 8, collectionId: 2, entryId: 132, statusId: 3, score: 10, priority: null, playTime: 48, finishedAt: "2024-05-30T19:20:00.000Z" },
    { gameId: 13, collectionId: 2, entryId: 133, statusId: 3, score: 9, priority: null, playTime: 25, finishedAt: "2024-08-05T14:10:00.000Z" },
    { gameId: 18, collectionId: 2, entryId: 134, statusId: 2, score: null, priority: null, playTime: 38, finishedAt: null },
    // Collection 3 - 3 more entries
    { gameId: 2, collectionId: 3, entryId: 135, statusId: 1, score: null, priority: 2, playTime: 0, finishedAt: null },
    { gameId: 9, collectionId: 3, entryId: 136, statusId: 1, score: null, priority: 4, playTime: 0, finishedAt: null },
    { gameId: 16, collectionId: 3, entryId: 137, statusId: 5, score: 8, priority: null, playTime: 15, finishedAt: null },
    // Collection 4 - 3 more entries
    { gameId: 5, collectionId: 4, entryId: 138, statusId: 3, score: 8, priority: null, playTime: 8, finishedAt: "2024-09-25T12:40:00.000Z" },
    { gameId: 10, collectionId: 4, entryId: 139, statusId: 3, score: 9, priority: null, playTime: 6, finishedAt: "2024-07-14T17:55:00.000Z" },
    { gameId: 17, collectionId: 4, entryId: 140, statusId: 2, score: null, priority: null, playTime: 95, finishedAt: null }
]

export const dbStatuses: PlayingStatus[] = [
    { statusId: 1, status: "BACKLOG" },
    { statusId: 2, status: "PLAYING" },
    { statusId: 3, status: "COMPLETED" },
    { statusId: 4, status: "DROPPED" },
    { statusId: 5, status: "PAUSED" }
]


export const dbGamesToDevelopers: GamesToDeveloper[] = [
    { gameId: 1, developerId: 1 },  
    { gameId: 2, developerId: 1 },
    { gameId: 3, developerId: 2 },  
    { gameId: 4, developerId: 3 }, 
    { gameId: 5, developerId: 4 }, 
    { gameId: 6, developerId: 5 }, 
    { gameId: 7, developerId: 6 }, 
    { gameId: 8, developerId: 7 },  
    { gameId: 9, developerId: 8 },  
    { gameId: 10, developerId: 4 }, 
    { gameId: 11, developerId: 9 }, 
    { gameId: 12, developerId: 1 }, 
    { gameId: 13, developerId: 2 }, 
    { gameId: 14, developerId: 10 },
    { gameId: 15, developerId: 4 }, 
    { gameId: 16, developerId: 5 },
    { gameId: 17, developerId: 1 }, 
    { gameId: 18, developerId: 11 },
    { gameId: 19, developerId: 3 }, 
    { gameId: 20, developerId: 4 },
    { gameId: 21, developerId: 12 } 
]

export const dbGamesToGenres = [
    { gameId: 1, genreId: 1 },  
    { gameId: 1, genreId: 2 },  
    { gameId: 2, genreId: 5 },
    { gameId: 3, genreId: 1 },  
    { gameId: 3, genreId: 2 },
    { gameId: 4, genreId: 4 },  
    { gameId: 5, genreId: 5 },  
    { gameId: 6, genreId: 4 },  
    { gameId: 7, genreId: 1 },  
    { gameId: 7, genreId: 2 },
    { gameId: 8, genreId: 1 },  
    { gameId: 8, genreId: 2 },  
    { gameId: 9, genreId: 4 },  
    { gameId: 10, genreId: 1 },
    { gameId: 11, genreId: 3 }, 
    { gameId: 11, genreId: 2 },
    { gameId: 12, genreId: 6 }, 
    { gameId: 13, genreId: 1 }, 
    { gameId: 13, genreId: 2 }, 
    { gameId: 14, genreId: 6 }, 
    { gameId: 15, genreId: 3 }, 
    { gameId: 16, genreId: 7 }, 
    { gameId: 17, genreId: 8 }, 
    { gameId: 18, genreId: 1 }, 
    { gameId: 18, genreId: 3 }, 
    { gameId: 19, genreId: 4 }, 
    { gameId: 20, genreId: 2 }, 
    { gameId: 21, genreId: 4 }  
]

export const dbGamesToPlatforms = [
    { gameId: 1, platformId: 6 },  
    { gameId: 2, platformId: 6 },  
    { gameId: 3, platformId: 7 },  
    { gameId: 3, platformId: 2 },  
    { gameId: 4, platformId: 3 },
    { gameId: 4, platformId: 4 },  
    { gameId: 5, platformId: 5 },  
    { gameId: 6, platformId: 4 },  
    { gameId: 7, platformId: 9 },  
    { gameId: 8, platformId: 2 },  
    { gameId: 9, platformId: 8 },  
    { gameId: 10, platformId: 5 }, 
    { gameId: 11, platformId: 4 }, 
    { gameId: 11, platformId: 2 }, 
    { gameId: 11, platformId: 3 }, 
    { gameId: 12, platformId: 1 }, 
    { gameId: 13, platformId: 2 }, 
    { gameId: 14, platformId: 3 }, 
    { gameId: 14, platformId: 4 }, 
    { gameId: 15, platformId: 5 }, 
    { gameId: 16, platformId: 4 }, 
    { gameId: 16, platformId: 7 }, 
    { gameId: 16, platformId: 8 }, 
    { gameId: 17, platformId: 1 }, 
    { gameId: 18, platformId: 2 }, 
    { gameId: 19, platformId: 8 }, 
    { gameId: 20, platformId: 10 },
    { gameId: 21, platformId: 4 }, 
    { gameId: 21, platformId: 2 }, 
    { gameId: 21, platformId: 3 }  
]