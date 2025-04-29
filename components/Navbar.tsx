import React from "react";
import "./Navbar.css";

export default function Navbar() {
  function handleLogout() {}

  return (
    <div className="navbar-section">
      <div className="navbar-container">
        <div className="nav-logo">
          <h1 className="logo header-text">Angoway</h1>
          <sup>admin</sup>
        </div>
        <div className="actions-container">
          <div className="profile-section">
            <div className="profile-avatar">
              <p className="admin-initial">S</p>
            </div>
          </div>
          <div className="exit-button-container">
            <button className="navbar-button" onClick={() => handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
