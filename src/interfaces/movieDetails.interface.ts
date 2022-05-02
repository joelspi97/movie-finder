interface Genre {
    id: number;
    name: string;
}

export default interface CurrentMovieDetails {
    backdrop_path?: string | null;
    genres?: Genre[] | null;
    homepage?: string | null;
    overview?: string | null;
    poster_path?: string | null;
    release_date?: string | null;
    runtime?: number | null;
    tagline?: string | null;
    title?: string | null;
    vote_average?: number | null;
    vote_count?: number | null;
}
