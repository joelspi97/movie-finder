import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../constants';
import CurrentMovieDetails from '../interfaces/movieDetails.interface';

export default function useMovieDetails(currentMovieId: string) {
    const [currentMovieDetails, setCurrentMovieDetails] = useState<CurrentMovieDetails>();
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<boolean>(false);
    const currentUrl = BASE_URL.concat(`/movie/${currentMovieId}`);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setApiError(false);
        let controller = new AbortController();

        axios.get<CurrentMovieDetails>(currentUrl, {
            method: 'GET',
            params: { api_key: API_KEY },
            signal: controller.signal
        })
            .then(res => {
                setCurrentMovieDetails({
                    backdrop_path: res.data.backdrop_path,
                    genres: res.data.genres,
                    homepage: res.data.homepage,
                    overview: res.data.overview,
                    poster_path: res.data.poster_path,
                    release_date: res.data.release_date,
                    runtime: res.data.runtime,
                    tagline: res.data.tagline,
                    title: res.data.title,
                    vote_average: res.data.vote_average,
                    vote_count: res.data.vote_count,
                })
            })
            .catch(err => {
                console.error(err);
                
                if(err.response.status === 404) {
                    navigate('404');
                    return;
                }; 
                
                setApiError(true);
            })
            .finally(() => {
                setLoading(false);
            });
        
        return () => controller.abort();
    }, [currentMovieId]);

    return { currentMovieDetails, 
             loading, 
             apiError };
}
