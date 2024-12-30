import React from 'react'
import './Navbar.css'
const Navbar = ({ isDarkMode, setIsDarkMode }) => {

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <div className={`navbar-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <div className="navbar-title" >SaaS Labs</div>
            <div className="theme-toggle">
                Dark Mode
                <label className="switch">
                    <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                    <span className="slider"></span>
                </label>
            </div>
        </div>
    )
}

export default Navbar