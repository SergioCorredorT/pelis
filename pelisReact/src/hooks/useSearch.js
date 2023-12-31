import { useEffect, useRef, useState } from "react";

export function useSearch() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);
  
    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search === "";
        return;
      }
      if (search === "") {
        setError("El campo está vacío");
        return;
      }
      if (search.length < 2) {
        setError("El campo debe contener más caracteres");
        return;
      }
      setError(null);
    }, [search]);
  
    return { search, setSearch, error };
  }