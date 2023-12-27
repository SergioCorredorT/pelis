import './App.css';
import React, { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { Movies } from "../components/movies";
import { useSearch } from '../hooks/useSearch';

export function App(): JSX.Element {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies , loading } = useMovies({search, sort});

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleSort = () => {
    setSort(!sort)

  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="page">
      <header>
        <h1>Introduce película</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="searcher">Put movie name</label>
          <input
            value={search}
            onChange={handleChange}
            name="query"
            id="searcher"
            type="text"
            placeholder="sinister, blade runner 2049,..."
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando ...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  );
}
