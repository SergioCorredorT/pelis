import { useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = async () => {
    if (previousSearch.current === search) return
    previousSearch.current = search;
    try {
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    }
    catch (e) {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }
  };

  const getSortedMovies = (movies) => {
    const sortedMovies = sort
    //localCompare es para que las vocales con tilde las ponga junto a las sin tilde
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies

    return sortedMovies
  }

  return { movies: getSortedMovies(movies), getMovies, loading, error };
}
