import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product = ({ product }) => {
  const getImageUrl = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0].startsWith('/')
        ? product.images[0]
        : `/${product.images[0]}`;
    }
    return product.image && product.image.startsWith('/')
      ? product.image
      : `/${product.image}`;
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image-wrapper">
          <img
            src={getImageUrl()}
            alt={product.name}
            className="product-image"
            onError={(e) => (e.target.src = '/images/sample.jpg')}
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
