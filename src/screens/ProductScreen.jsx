import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Carousel,
  Modal,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listProductDetails } from "../actions/productActions";

import "./ProductScreen.css";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id));
    }
  }, [dispatch, id, product._id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  // ✅ Open modal with clicked image index
  const openImageModal = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  // ✅ Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedIndex(0);
  };

  // ✅ Navigate to next image
  const handleNext = () => {
    if (product.images && selectedIndex < product.images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  // ✅ Navigate to previous image
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3 custom-back-btn" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            {/* Product Images */}
            <Col md={6}>
              {product.images && product.images.length > 0 ? (
                product.images.length > 1 ? (
                  <Carousel pause="hover" className="custom-carousel">
                    {product.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <Image
                          src={image}
                          alt={`Product image ${index + 1}`}
                          fluid
                          className="carousel-img-cover custom-product-image"
                          onClick={() => openImageModal(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <Image
                    src={product.images[0]}
                    alt='image not found'
                    fluid
                    className="carousel-img-cover custom-product-image"
                    onClick={() => openImageModal(0)}
                    style={{ cursor: "pointer" }}
                  />
                )
              ) : (
                <Image
                  src={product.images}
                  alt='image not found'
                  fluid
                  className="carousel-img-cover custom-product-image"
                  onClick={() => openImageModal(0)}
                  style={{ cursor: "pointer" }}
                />
              )}

              {/* Product Description */}
              <Card className="custom-description">
                <Card.Body>
                  <h5 className="description-title">
                    <i className="fas fa-info-circle me-2"></i>
                    Description:
                  </h5>
                  <p className="description-text">{product.description}</p>
                </Card.Body>
              </Card>
            </Col>

            {/* Product Details & Highlights */}
            <Col md={3}>
              <ListGroup variant="flush" className="custom-product-details">
                <ListGroup.Item className="custom-product-details-item">
                  <h3 className="product-name">{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className="custom-product-details-item">
                  <div className="price-section">
                    <span className="price-label">Price:</span>
                    <span className="price-value">₹{product.price}</span>
                  </div>
                </ListGroup.Item>
                {product.brand && (
                  <ListGroup.Item className="custom-product-details-item">
                    <div className="detail-row">
                      <span className="detail-label">Brand:</span>
                      <span className="detail-value">{product.brand}</span>
                    </div>
                  </ListGroup.Item>
                )}
                {product.category && (
                  <ListGroup.Item className="custom-product-details-item">
                    <div className="detail-row">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{product.category}</span>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>

              {/* ✅ Highlights Section - Moved to right side */}
              {product.Highlights && product.Highlights.length > 0 && (
                <Card className="custom-highlights mt-3">
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
              )}
            </Col>

            {/* Add to Cart Section */}
            <Col md={3}>
              <Card className="custom-product-card">
                <ListGroup
                  variant="flush"
                  className="custom-product-card-listgroup"
                >
                  <ListGroup.Item className="custom-product-card-item">
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="custom-product-card-item">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <span
                          className={`status-badge ${
                            product.countInStock > 0
                              ? "in-stock"
                              : "out-of-stock"
                          }`}
                        >
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="custom-product-card-item">
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="custom-qty-select"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="custom-product-card-item">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block custom-add-to-cart-btn"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* ✅ Full Screen Image Modal */}
          <Modal
            show={showModal}
            onHide={closeModal}
            centered
            size="xl"
            className="fullscreen-image-modal"
            style={{
              background: "rgba(0,0,0,0.4)",
            }}
          >
            <Modal.Body
              className="p-0"
              style={{
                background: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: "100vh",
              }}
            >
              {/* Close Button */}
              <Button
                variant="light"
                onClick={closeModal}
                className="close-modal-btn"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  zIndex: "9999",
                  fontSize: "1.5rem",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                }}
              >
                ✕
              </Button>

              {/* Prev Arrow */}
              {selectedIndex > 0 && (
                <Button
                  variant="light"
                  onClick={handlePrev}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    zIndex: "9999",
                    fontSize: "2rem",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  ‹
                </Button>
              )}

              {/* Next Arrow */}
              {product.images && selectedIndex < product.images.length - 1 && (
                <Button
                  variant="light"
                  onClick={handleNext}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    zIndex: "9999",
                    fontSize: "2rem",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  ›
                </Button>
              )}

              {/* Image */}
              <Image
                src={
                  product.images ? product.images[selectedIndex] : product.image
                }
                alt="Full Screen"
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                  boxShadow: "0 0 30px rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                }}
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductScreen;