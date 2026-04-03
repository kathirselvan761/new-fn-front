// frontend/src/screens/OrderScreen.js
import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, deliverOrder } from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import "./OrderScreen.css";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    userInfo,
    order,
    orderId,
    successPay,
    successDeliver,
    navigate,
  ]);

  if (!loading && order) {
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const markCODPaidHandler = async () => {
    try {
      const phone = order?.shippingAddress?.phoneNumber
        ? `91${order.shippingAddress.phoneNumber}`
        : "9597699157";

      const message = `Order Placed!\n\n🛒 ${order.orderItems

        .map((item) => `${item.name} x ${item.qty} = ₹${item.price * item.qty}`)
        .join("\n")}\n----------------\n Total: ₹${
        order.itemsPrice
      }\n Payment: ${order.paymentMethod}\n Address: ${
        order.shippingAddress.address
      }, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${
        order.shippingAddress.country
      }`;

      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(
        message,
      )}`;
      window.open(whatsappURL, "_blank");
      alert("Order message sent via WhatsApp.");

      await axios.put(
        `/api/orders/${order._id}/pay/cod`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );
      alert("Cash on confirmed.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const approveCODHandler = async () => {
    try {
      await axios.put(
        `/api/orders/${order._id}/pay/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );
      alert("Order approved as paid.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to approve payment.");
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="order-screen-container">
      <h1 className="fade-in order-id-title">Order : {order._id}</h1>
      <Row>
        <Col lg={8} className="left-section">
          <ListGroup variant="flush" className="rounded-box fade-in">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>User ID:</strong> {order.user._id}
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}> {order.user.email} </a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="order-items-row">
                        <Col xs={9} sm={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={12} sm={4} className="text-sm-end">
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

        <Col lg={4} className="right-section">
          <Card className="rounded-box fade-in">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDeliver && <Loader />}

              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <ListGroup.Item>
                  <Button
                    variant="success"
                    onClick={approveCODHandler}
                    className="btn-block"
                  >
                    Approve COD Payment
                  </Button>
                </ListGroup.Item>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                <>
                  
                    <Button
                      variant="warning"
                      className="btn-block mt-2"
                      onClick={markCODPaidHandler}
                    >
                      Confirm Send WhatsApp
                    </Button>
                  
                </>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
