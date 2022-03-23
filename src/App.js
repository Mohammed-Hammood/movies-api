import {Route, Routes } from 'react-router-dom';
import About from './components/about';
import Home from './components/home';
import Navbar from './components/navbar';
import NotFound from './components/not-found';
import './styling/main.scss';

function App() {
  return (
    <div className="main-content-container">
     <Navbar />
     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/about' element={<About />} />
       <Route path='*' element={<NotFound />} />
     </Routes>
    </div>
  );
}

export default App;
