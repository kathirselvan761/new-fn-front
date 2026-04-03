import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaRupeeSign,
} from "react-icons/fa";
import { listUsers } from "../actions/userActions";
import { listProducts } from "../actions/productActions";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./AdminDashboardScreen.css";

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users = [], loading: loadingUsers, error: errorUsers } = userList;

  const productList = useSelector((state) => state.productList);
  const {
    products = [],
    loading: loadingProducts,
    error: errorProducts,
  } = productList;

  const orderList = useSelector((state) => state.orderList);
  const { orders = [], loading: loadingOrders, error: errorOrders } = orderList;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listProducts());
    dispatch(listOrders());
  }, [dispatch]);

  // Calculate total sales
  const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  // Calculate pending and delivered orders
  const pendingOrders = orders.filter((order) => !order.isDelivered).length;
  const deliveredOrders = orders.filter((order) => order.isDelivered).length;

  return (
    <>
      <h1>Dashboard</h1>
      {loadingUsers || loadingProducts || loadingOrders ? (
        <Loader />
      ) : errorUsers || errorProducts || errorOrders ? (
        <Message variant="danger">
          {errorUsers || errorProducts || errorOrders}
        </Message>
      ) : (
        <Row>
          <Col md={3}>
            <Card className="text-center p-3 shadow-sm">
              <FaUsers size={40} className="mb-2 text-primary" />
              <h4>{users.length}</h4>
              <p>Total Users</p>
              <Link to="/admin/userlist">
                <Button variant="light">View Users</Button>
              </Link>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-3 shadow-sm">
              <FaBoxOpen size={40} className="mb-2 text-success" />
              <h4>{products.length}</h4>
              <p>Total Products</p>
              <Link to="/admin/productlist">
                <Button variant="light">View Products</Button>
              </Link>
              <Link to="/admin/stocklist">
                <Button variant="light">Stock Report</Button>
              </Link>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
                <div className="mb-3">
                  <FaShoppingCart size={40} className="mb-2 text-warning" />
                  <h4>{orders.length}</h4>
                  <p>Total Orders</p>
                </div>
                <hr />
                <div className="mb-3">
                  <Card.Title className="mb-0">Pending Orders</Card.Title>
                  <h5 className="text-warning">{pendingOrders}</h5>
                </div>
                <hr />
                <div>
                  <Card.Title className="mb-0">Delivered Orders</Card.Title>
                  <h5 className="text-success">{deliveredOrders}</h5>
                </div>
                <Link to="/admin/orderlist">
                  <Button variant="light">View Orders</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center p-3 shadow-sm">
              <FaRupeeSign size={40} className="mb-2 text-danger" />
              <p>Total Sales</p>
              <h4>₹{totalSales.toFixed(2)}</h4>
              <Link to="/admin/reports">
                <Button variant="light">Reports</Button>
              </Link>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdminDashboardScreen;
