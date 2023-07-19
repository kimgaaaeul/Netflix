import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';
import Navigation from './Components/Navigation';

function App() {
  return (
    <div className="wrapper">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetail/>} />
      </Routes>

    </div>
  );
}

export default App;
