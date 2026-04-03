import React from 'react';
import './Highlights.css';

const Highlights = ({ product, Card }) => (
  product.Highlights && product.Highlights.length > 0 && (
    <Card className="custom-highlights">
      <Card.Body>
        <h5 className="highlights-title">
          <i className="fas fa-star me-2"></i>
          Highlights:
        </h5>
        <ul className="highlights-list">
          {product.Highlights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
);

export default Highlights;
