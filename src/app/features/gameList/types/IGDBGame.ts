interface IGDBData {
    id: number;
    name: string;
    cover?: {
        url: string;
    };
    summary?: string;
    developers?: {
        name: string;
    }[];
    platforms?: {
        abbreviation: string;
    }[];
}

interface IGDBGame {
    data: [IGDBData];
}