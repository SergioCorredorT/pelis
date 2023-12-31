import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  //Las dos siguientes alternativas funcionan de modo similar, pero 
  // useCallback ahorra el enviar una función anónima como en useMemo

  /*   const getMovies = useMemo(() => {
      return async ({search}) => {
        if (previousSearch.current === search) return
        try {
          setLoading(true)
          setError(null)
          previousSearch.current = search;
          const newMovies = await searchMovies({ search })
          setMovies(newMovies)
        }
        catch (e) {
          setError(e.message)
        }
        finally {
          setLoading(false)
        }
      }
    }, []); */

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search;
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    }
    catch (e) {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }
  }, []);

  //Las dos siguientes alternativas funcionan de modo similar, pero 
  //useMemo evita el nuevo renderizado si no cambian sus dependencias

  /*     const getSortedMovies = (movies) => {
        console.log("Ordenando")
        const sortedMovies = sort
        //localCompare es para que las vocales con tilde las ponga junto a las sin tilde
          ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
          : movies
    
        return sortedMovies
      }
      return { movies: getSortedMovies(movies), getMovies, loading, error };
  */

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])
  return { movies: sortedMovies, getMovies, loading, error };
}
