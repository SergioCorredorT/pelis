const API_KEY = "bd820b27";
const POSTER_API_REQUEST = `https://www.omdbapi.com/?type=movie&apikey=${API_KEY}`;

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    try {
        const response = await fetch(POSTER_API_REQUEST + `&s=${search}`)
        const json = await response.json()

        const movies = json.Search;

        return movies?.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }));
    }
    catch (e) {
        throw new Error("Error en la búsqueda")
    }
}