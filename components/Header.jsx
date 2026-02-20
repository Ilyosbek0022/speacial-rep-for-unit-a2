import React, { useState } from "react";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">

          {/* LOGO */}
          <a href="/" className="logo">
            <div className="logo-icon">Mr</div>
            <div className="logo-text">Akhmadjon IELTS</div>
          </a>

          {/* DESKTOP NAV */}
          <div className="desktop-nav">
            <nav>
              <ul>
                <li><a href="https://akhmadmentor0022.vercel.app/">Home</a></li>
               
              </ul>
            </nav>

            
          </div>

          {/* MOBILE RIGHT SIDE */}
          <div className="mobile-right">
            

            <div
              id="nav-icon3"
              className={menuOpen ? "open" : ""}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/price">Price</a></li>
              <li><a href="/test">Tests</a></li>
              <li><a href="/locate">Location</a></li>
              <li><a href="/contact">Log-in</a></li>
              <li><a href="/signup">Sign-up</a></li>
              <li><a href="/learn/glavniy">Learn</a></li>
            </ul>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
