

export type Filter = {
    genres: string;
    year: {
        start: number|null;
        end: number|null;
    };
    console: string;
    isSet: boolean;
}