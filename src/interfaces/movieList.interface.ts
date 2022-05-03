export interface SearchResult {
    poster_path: string;
    id: number;
    title: string;
    vote_average: number;
}

export interface SearchedMovies {
    page: number;
    results: SearchResult[];
    total_pages: number;
}

export interface MovieList {
    movies: SearchResult[] | [],
    movieNotFound: boolean,
    hasMore: boolean,
    query: string,
    pageNumber: number;
}