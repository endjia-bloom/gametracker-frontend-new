// src/components/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Mantendremos el Navbar superior por ahora

function Layout({ children }) {
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-container"> {/* Contenedor principal para toda la app */}
      
      {/* Sidebar (Barra Lateral) */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">Game Tracker</h2> {/* Logo / Título */}
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/" className={`sidebar-link ${isActive('/') ? 'active' : ''}`}>
                <i className="fas fa-th-large"></i> Collection {/* Icono de cuadrícula */}
              </Link>
            </li>
            {/* Aquí irían más enlaces como "Review", "Statistics", etc. */}
            <li>
              <Link to="/juegos/crear" className={`sidebar-link ${isActive('/juegos/crear') ? 'active' : ''}`}>
                <i className="fas fa-plus-circle"></i> Add Game {/* Icono de añadir */}
              </Link>
            </li>
          </ul>
        </nav>
        {/* Podrías añadir un perfil de usuario o ajustes aquí */}
        <div className="sidebar-profile">
            <span className="profile-name">Spatblecr</span>
        </div>
      </aside>

      {/* Main Content Area (Área de Contenido Principal) */}
      <main className="main-content">
        {/* Aquí es donde se renderizarán las páginas (HomePage, AddGamePage, etc.) */}
        {children} 
      </main>
    </div>
  );
}

export default Layout;