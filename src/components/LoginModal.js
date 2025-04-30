// src/components/LoginModal.js
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password || (!isLogin && !name)) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    
    // In a real application, you would handle authentication here
    // For demo purposes, we'll just close the modal
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Sign In' : 'Create Account'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 mb-3">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </Form>

        <div className="text-center">
          {isLogin ? (
            <p className="mb-0">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="p-0"
                onClick={toggleForm}
              >
                Create Account
              </Button>
            </p>
          ) : (
            <p className="mb-0">
              Already have an account?{' '}
              <Button
                variant="link"
                className="p-0"
                onClick={toggleForm}
              >
                Sign In
              </Button>
            </p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;