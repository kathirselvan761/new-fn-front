import { useEffect } from "react";
import { Table, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";

const OrderHistoryScreen = () => {
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login?redirect=/orderhistory";
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <h2>My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>TRACKING ID</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                <td>{order.createdAt.substring(0, 10)}</td>

                <td>₹{order.totalPrice.toFixed(2)}</td>

                <td>
                  {order.isPaid ? (
                    <Badge bg="success">{order.paidAt.substring(0, 10)}</Badge>
                  ) : (
                    <Badge bg="danger">Not Paid</Badge>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    <Badge bg="success">
                      {order.deliveredAt.substring(0, 10)}
                    </Badge>
                  ) : (
                    <Badge bg="warning">Not Delivered</Badge>
                  )}
                </td>
                <td>
                  {order.trackingId ? (
                    <Badge bg="primary">{order.trackingId}</Badge>
                  ) : (
                    <Badge bg="secondary">Not Assigned</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderHistoryScreen;
