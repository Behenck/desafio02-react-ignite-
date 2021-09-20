import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useGenres } from "./UseGenres";

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }

interface MovieProviderProps {
    children: ReactNode;
}

interface MovieContextData {
    movies: MovieProps[];
}

const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export function MovieProvider({children}: MovieProviderProps) {
    const {selectedGenreId} = useGenres();
    const [movies, setMovies] = useState<MovieProps[]>([]);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
          setMovies(response.data);
        });
      }, [selectedGenreId]);

    return (
        <MovieContext.Provider value={{movies}}>
            {children}
        </MovieContext.Provider>
    );
}

export function useMovies() {
    const context = useContext(MovieContext);

    return context;
}