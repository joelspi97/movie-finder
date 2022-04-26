interface Result {
    poster_path: string;
    id: number;
    title: string;
    vote_average: number;
}

export default interface SearchedMovies {
    page: number;
    results: Result[];
    total_pages: number;
}
