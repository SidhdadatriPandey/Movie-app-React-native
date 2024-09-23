import axios from "axios";

const apiKey = 'e4e676252826b5c7d75cdff7aa51ef08';
const apiBaseUrl = 'https://api.themoviedb.org/3';

// Corrected URLs - use '&' for subsequent query parameters
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?language=en-US&api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;

// Dynamic endpoints
const movieDetailsEndPoints = (id: any) => `${apiBaseUrl}/movie/${id}?language=en-US&api_key=${apiKey}`;
const movieCreditsEndPoints = (id: any) => `${apiBaseUrl}/movie/${id}/credits?language=en-US&api_key=${apiKey}`;
const similarMoviesEndPoints = (id: any) => `${apiBaseUrl}/movie/${id}/similar?language=en-US&api_key=${apiKey}`;
const personDetailsEndPoints = (id: any) => `${apiBaseUrl}/person/${id}?&api_key=${apiKey}`;
const personMoviesEndPoints = (id: any) => `${apiBaseUrl}/person/${id}/movie_credits?&api_key=${apiKey}`;
const searchMovieEndPoints = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
// 'https://api.themoviedb.org/3/person/person_id/movie_credits?language=en-US'

// Fallback poster URL
export const fallbackMoviePoster = 'https://via.placeholder.com/500x750?text=No+Image+Available';

// API call function
const apiCall = async (endpoint: string, params?: any) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params || {}
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.error('Error fetching data:', err);
        return {};
    }
}

// Fetch trending movies
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint);
}

// Fetch upcoming movies
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndPoint);
}

// Fetch top-rated movies
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint);
}

export const fetchMovieDetails = (id: any) => {
    return apiCall(movieDetailsEndPoints(id));
}

export const fetchMovieCredits = (id: any) => {
    return apiCall(movieCreditsEndPoints(id));
}

export const fetchSimilarMovie = (id: any) => {
    return apiCall(similarMoviesEndPoints(id));
}

export const fetchPersonDetails = (id: any) => {
    return apiCall(personDetailsEndPoints(id));
}

export const fetchPersonMovies = (id: any) => {
    return apiCall(personMoviesEndPoints(id));
}


export const searchMovies = (params: any) => {
    return apiCall(searchMovieEndPoints, params);
}

// Image URLs
export const image500 = (path: any) => `https://image.tmdb.org/t/p/w500${path}`;
export const image342 = (path: any) => `https://image.tmdb.org/t/p/w342${path}`;
export const image185 = (path: any) => `https://image.tmdb.org/t/p/w185${path}`;
