// gametracker-frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import HomePage from './pages/HomePage';       
import AddGamePage from './pages/AddGamePage'; 
import EditGamePage from './pages/EditGamePage'; 

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/juegos/crear" element={<AddGamePage />} />
          <Route path="/juegos/editar/:id" element={<EditGamePage />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;