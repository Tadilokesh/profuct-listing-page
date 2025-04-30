// src/components/Navbar.js
import React, { useState } from 'react';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';

const Navbar = ({ onLoginClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  return (
    <header>
      {/* Main Navbar */}
      <nav className="navbar navbar-light bg-white py-3 shadow-sm">
        <Container className="d-flex align-items-center">
          {/* Mobile menu toggle */}
          <button 
            className="btn border-0 d-md-none p-0"
            onClick={handleShow}
            aria-label="Menu"
          >
            <i className="bi bi-list fs-1"></i>
          </button>
          
          {/* Logo */}
          <div className="navbar-brand mx-auto mx-md-0 d-flex align-items-center">
            <div className="border border-dark d-flex align-items-center justify-content-center me-2" style={{width: '36px', height: '36px'}}>
              <span className="visually-hidden">Logo</span>
            </div>
            <span className="fw-bold fs-4">LOGO</span>
          </div>
          
          {/* Desktop Navigation - hidden on mobile */}
          <div className="d-none d-md-flex mx-auto">
            <ul className="navbar-nav flex-row">
              <li className="nav-item px-3">
                <a className="nav-link text-uppercase fw-medium" href="#">Shop</a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link text-uppercase fw-medium" href="#">Skills</a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link text-uppercase fw-medium" href="#">Stories</a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link text-uppercase fw-medium" href="#">About</a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link text-uppercase fw-medium" href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          
          {/* Icons */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn p-0 border-0" aria-label="Search">
              <i className="bi bi-search fs-5"></i>
            </button>
            <button className="btn p-0 border-0" aria-label="Favorites">
              <i className="bi bi-heart fs-5"></i>
            </button>
            <button className="btn p-0 border-0" aria-label="Cart">
              <i className="bi bi-bag fs-5"></i>
            </button>
            <div className="d-none d-md-block">
              <button className="btn p-0 border-0" onClick={onLoginClick} aria-label="Account">
                <i className="bi bi-person fs-5"></i>
              </button>
            </div>
            <div className="d-none d-md-flex align-items-center">
              <span className="me-1">ENG</span>
              <i className="bi bi-chevron-down small"></i>
            </div>
          </div>
        </Container>
      </nav>
      
      {/* Secondary Navigation - like in your screenshot */}
      <div className="border-bottom py-2">
        <Container>
          <div className="d-flex align-items-center">
            <a href="#" className="text-muted me-3 small">HOME</a>
            <span className="text-muted mx-1">|</span>
            <a href="#" className="small fw-medium ms-2">SHOP</a>
          </div>
        </Container>
      </div>
      
      {/* Mobile Menu Offcanvas */}
      <Offcanvas show={showMenu} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex align-items-center">
            <div className="border border-dark d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
              <span className="visually-hidden">Logo</span>
            </div>
            <span className="fw-bold">LOGO</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column">
            <li className="nav-item border-bottom py-2">
              <a className="nav-link text-dark" href="#">SHOP</a>
            </li>
            <li className="nav-item border-bottom py-2">
              <a className="nav-link text-dark" href="#">SKILLS</a>
            </li>
            <li className="nav-item border-bottom py-2">
              <a className="nav-link text-dark" href="#">STORIES</a>
            </li>
            <li className="nav-item border-bottom py-2">
              <a className="nav-link text-dark" href="#">ABOUT</a>
            </li>
            <li className="nav-item border-bottom py-2">
              <a className="nav-link text-dark" href="#">CONTACT US</a>
            </li>
          </ul>
          
          <div className="mt-4">
            <div className="d-flex justify-content-between border-bottom py-2">
              <span>CURRENCY</span>
              <div className="d-flex align-items-center">
                <span className="me-2">USD</span>
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
            
            <button 
              className="btn btn-dark w-100 mt-4"
              onClick={() => {
                handleClose();
                onLoginClick();
              }}
            >
              SIGN IN
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Navbar;