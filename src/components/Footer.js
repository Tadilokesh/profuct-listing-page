// src/components/Footer.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

const Footer = ({ onLoginClick }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle newsletter subscription here
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="gy-4 mb-4">
          {/* Newsletter Section */}
          <Col lg={4} md={6}>
            <h5 className="footer-heading">BE THE FIRST TO KNOW</h5>
            <p className="text-muted mb-3">Sign up for updates from mettā muse.</p>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  placeholder="Enter your e-mail..."
                  aria-label="Email for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button variant="outline-light" type="submit">
                  SUBSCRIBE
                </Button>
              </InputGroup>
            </Form>
          </Col>

          {/* Quick Links Section */}
          <Col lg={4} md={6}>
            <h5 className="footer-heading">QUICK LINKS</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="footer-link">Orders & Shipping</a></li>
              <li className="mb-2"><a href="#" className="footer-link" onClick={onLoginClick}>Join/Login as a Seller</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Payment & Pricing</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Return & Refunds</a></li>
              <li className="mb-2"><a href="#" className="footer-link">FAQs</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Terms & Conditions</a></li>
            </ul>
          </Col>

          {/* Contact & Social Section */}
          <Col lg={4} md={12}>
            <h5 className="footer-heading">CONTACT US</h5>
            <p className="text-muted mb-1">+44 221 133 5360</p>
            <p className="text-muted mb-4">customercare@mettamuse.com</p>
            
            <h5 className="footer-heading mt-4">CURRENCY</h5>
            <div className="d-flex align-items-center mb-2">
              <span className="me-2">🇺🇸</span>
              <span className="fw-medium">USD</span>
            </div>
            <p className="text-muted small mb-4">Transactions will be completed in Euros and a currency reference is available on hover.</p>
            
            <h5 className="footer-heading mt-4">FOLLOW US</h5>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="text-white" aria-label="Instagram">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </Col>
        </Row>
        
        <div className="mb-4">
          <h5 className="footer-heading">mettā muse ACCEPTS</h5>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <div className="payment-option">
              <i className="bi bi-google-pay"></i>
            </div>
            <div className="payment-option">
              <i className="bi bi-credit-card"></i>
            </div>
            <div className="payment-option">
              <i className="bi bi-paypal"></i>
            </div>
            <div className="payment-option">
              <i className="bi bi-wallet2"></i>
            </div>
            <div className="payment-option">
              <i className="bi bi-apple"></i>
            </div>
            <div className="payment-option">
              <i className="bi bi-shop"></i>
            </div>
          </div>
        </div>
        
        <div className="text-center py-3 border-top border-secondary">
          <p className="text-muted small mb-0">Copyright © 2023 mettamuse. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;