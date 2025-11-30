

export type Filter = {
    genres: string;
    year: {
        start: number|null;
        end: number|null;
    };
    platform: string;
    isSet: boolean;
}