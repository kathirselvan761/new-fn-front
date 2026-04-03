import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
// import sendWhatsAppMessage from "../utils/sendWhatsApp";

import "./PlaceOrderScreen.css";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(".//OrderScreen.jsx");

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    navigate("/shipping");
  } else if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.totalPrice = Number(cart.itemsPrice).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: CART_CLEAR_ITEMS });
      localStorage.removeItem("cartItems");
      navigate(`/order/${order._id}`);
    }
  }, [dispatch, success, navigate, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
        
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="fade-in-up">
        <Col md={8}>
          <ListGroup
            variant="flush"
            className="custom-listgroup-left fade-in-up"
          >
            <ListGroup.Item className="custom-listgroup-item">
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="custom-listgroup-item">
              <h2>Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="custom-listgroup-item">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush" className="custom-nested-listgroup">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className="custom-nested-item fade-in-up"
                    >
                      <Row className="align-items-center">
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="custom-order-summary-card fade-in-up">
            <ListGroup variant="flush" className="custom-summary-listgroup">
              <ListGroup.Item className="custom-summary-item">
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="custom-summary-item">
                <Row>
                  <Col>Items</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="custom-summary-item">
                <Row>
                  <Col>Total</Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item className="custom-summary-item">
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
              <h4>It is for Demo Purpose only. The Product is not launched</h4>
              <ListGroup.Item className="custom-summary-item">
                <Button
                  type="button"
                  className="custom-place-order-btn"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order & Confirm UPI Payment
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
