// src/components/ProductCard.js
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product, onLoginClick }) => {
  const { name, price, image, isOutOfStock } = product;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="product-card h-100 border">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={image} 
          alt={name} 
          className="product-image" 
        />
        {isOutOfStock && (
          <div className="out-of-stock-overlay">
            <span className="out-of-stock-text">OUT OF STOCK</span>
          </div>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{name}</Card.Title>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <small 
            className="text-muted cursor-pointer" 
            onClick={onLoginClick}
            style={{ cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Sign in or Create an account to see pricing
          </small>
          <button 
            className={`product-favorite p-0 ${isFavorite ? 'is-favorite' : ''}`}
            onClick={toggleFavorite}
            aria-label="Add to favorites"
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;