// 'https://api.themoviedb.org/3/trending/movie/day?language=en-US' //trending
// 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1' //upcoming
// 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1' //top rated

import axios from "axios";

const apiKey = 'e4e676252826b5c7d75cdff7aa51ef08';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?language=en-US?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?language=en-US&page=1?api_key=${apiKey}`;
const topoRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?language=en-US&page=1?api_key=${apiKey}`;

const apiCell = async (endpoint: any, params: any){
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log('error', err);
        return {};
    }
}

