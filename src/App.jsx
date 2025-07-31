import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './home/Home';
import Test from './components/Titlecards/Test';
import './index.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import Tvshow from './components/Tvshows/Tvshow';
import { auth } from './firebase';
import Movies from './components/movies/Movies';
import Latest from './components/NewMovies/Latest';
import { ToastContainer } from 'react-toastify';
import Background3D from './components/Background/Background3D';

import Watchlists from './components/Watchlist/Watchlists';
import Result from './components/Result/Result';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("log in");
        navigate('/');
      } else {
        console.log("logged out");
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      {/* Background 3D render hoga har page pe ✅ */}
      <Background3D></Background3D>

      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/watch' element={<Watchlists></Watchlists>}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<Tvshow />} />
        <Route path="/movies" element={<Movies />} />
        <Route path='/new' element={<Latest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trailer/:videoId" element={<Test />} />
        <Route path='/search' element={<Result></Result>}/>
      </Routes>
    </div>
  );
}

export default App;
