import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface GenresProviderProps {
    children: ReactNode;
}

interface GenreContextData {
    genres: GenreResponseProps[];
    selectedGenreId: number;
    handleSelectGenre: (id: number) => void;
    selectedGenre: GenreResponseProps;
}

const GenreContext = createContext<GenreContextData>({} as GenreContextData);

export function GenreProvider({children}: GenresProviderProps) {
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
          setGenres(response.data);
        });
      }, []);
      
    useEffect(() => { 
      api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
      })
    }, [selectedGenreId]);

      function handleSelectGenre(id: number) {
        setSelectedGenreId(id);
      }

    return (
        <GenreContext.Provider value={{genres, selectedGenreId, handleSelectGenre, selectedGenre }}>
            {children}
        </GenreContext.Provider>
    );
}

export function useGenres() {
    const context = useContext(GenreContext);

    return context;
}