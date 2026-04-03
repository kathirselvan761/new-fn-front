import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import "./Cartscreen.css";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = new URLSearchParams(location.search).get("qty") || 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, Number(qty)));
    }
  }, [dispatch, productId, qty]);

  // ✅ Remove item with confirmation
  const removeFromCartHandler = (id, itemName) => {
    if (window.confirm(`Remove "${itemName}" from your cart?`)) {
      dispatch(removeFromCart(id));
    }
  };

  // ✅ Image resolver
  const getImageUrl = (item) => {
    if (item.image) {
      return item.image;
    }
    return "/images/no-image.png";
  };

  return (
    <div className="cart-screen">
      <Row>
        {/* Products List and Items */}
        <Col md={8}>
          <div className="cart-items-section">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message className="empty-cart-message">
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush" className="cart-items-list">
                {cartItems.map((item) => (
                  <ListGroup.Item
                    key={item.product}
                    className="cart-item"
                  >
                    <Row>
                      <Col md={2}>
                        <div className="cart-item-image-container">
                          <Image
                            src={getImageUrl(item)}
                            alt={item.name}
                            fluid
                            rounded
                            className="cart-item-image"
                            onError={(e) => {
                              e.target.src = "/images/no-image.png";
                            }}
                            style={{
                              width: "100%",
                              height: "80px",
                              objectFit: "cover",
                              border: "1px solid #0080ff",
                            }}
                          />
                        </div>
                      </Col>

                      <Col md={3}>
                        <Link
                          to={`/product/${item.product}`}
                          className="cart-item-name"
                        >
                          {item.name}
                        </Link>
                        {item.brand && (
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "#6c757d",
                              marginTop: "4px",
                            }}
                          >
                            Brand: {item.brand}
                          </div>
                        )}
                      </Col>

                      <Col md={2} className="cart-item-price">
                        ₹{item.price}
                      </Col>

                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(
                                item.product,
                                Number(e.target.value)
                              )
                            )
                          }
                          className="cart-qty-select"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() =>
                            removeFromCartHandler(item.product, item.name)
                          }
                          className="cart-remove-btn"
                          title={`Remove ${item.name} from cart`}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Col>

        {/* Subtotal and Checkout */}
        <Col md={4}>
          <div className="cart-summary-section">
            <Card className="cart-summary-card">
              <ListGroup variant="flush" className="cart-summary-list">
                <ListGroup.Item className="cart-subtotal cart-summary-item">
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    items)
                  </h2>
                  <div className="cart-subtotal-amount">
                    ₹{" "}
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                      .toFixed(2)}
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="cart-summary-item">
                  <Button
                    type="button"
                    className="btn-block cart-checkout-btn"
                    disabled={cartItems.length === 0}
                    onClick={() => navigate("/shipping")}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
