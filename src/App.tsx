import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { GenreProvider } from './hooks/UseGenres';
import { MovieProvider } from './hooks/useMovies';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GenreProvider>
        <MovieProvider>
          <SideBar />
          <Content />
        </MovieProvider>
      </GenreProvider>
    </div>  
  )
}