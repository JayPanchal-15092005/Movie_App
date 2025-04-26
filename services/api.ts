export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async({query}: {query: string}) => {
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch the movies ${response.statusText}`)
    }

    const data = await response.json();

    return data.results;
}

export const fetchMoviesDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                method: "GET",
                headers: TMDB_CONFIG.headers
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch MovieDetails: ${response.statusText}`)
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error in the api FILE (fetchMoviesDetails METHOD)", error);
        throw error;

    }
}


// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=true&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJmYzE2ZTM0ZDMxM2YxMjNiYzc3OThiNmQ2MTkwYiIsIm5iZiI6MTc0NTU1NDE4NC43MzMsInN1YiI6IjY4MGIwYjA4YmZiZGYxZjhjNTg5Yzg4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PAmPF5gqKpKoboDotjVatGsBOiQvAzwOG3hXCugWbX8'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));