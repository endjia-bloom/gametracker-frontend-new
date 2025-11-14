// gametracker-frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🎮 GameTracker
      </Link>
      <div className="navbar-links">
        <Link to="/juegos/crear" className="navbar-link">
          + Añadir Juego
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;