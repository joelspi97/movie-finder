interface Genre {
    id: number;
    name: string;
}

export default interface CurrentMovieDetails {
    backdrop_path: string;
    genres: Genre[];
    homepage: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
}
