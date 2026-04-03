import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import './Productcarousel.css';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const getImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].startsWith('/')
        ? product.images[0]
        : `/${product.images[0]}`;
    }
    return product.image.startsWith('/') ? product.image : `/${product.image}`;
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="product-carousel">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className="carousel-link">
            <div className="full-screen-carousel-wrapper">
              <Image
                src={getImageUrl(product)}
                alt={product.name}
                className="full-screen-image"
                fluid
                onError={(e) => (e.target.src = '//frontend/public/images/sample.jpg')} // ✅ fallback
              />
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
