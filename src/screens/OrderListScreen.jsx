import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { QRCodeCanvas } from "qrcode.react";
import {
  listOrders,
  approvePayment,
  updateTrackingId,
  deliverOrder,
  deleteOrder,
} from "../actions/orderActions";
import {
  ORDER_UPDATE_TRACKING_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const handleDownload = (order) => {
  if (!order) return;
  const canvas = document.getElementById(`qr-${order._id}`);
  if (!canvas) return;

  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  const link = document.createElement("a");
  link.href = pngUrl;
  link.download = `order-${order._id}-qr.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const OrderQRCode = ({ order, size = 150 }) => {
  if (!order) return null;

  const qrValue = `📦 Order Details
--------------------
👤 Name: ${order.user?.name}
📞 Phone: ${order.user?.phone || "N/A"}
🏠 Address: ${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${
    order.shippingAddress?.postalCode
  }, ${order.shippingAddress?.country}
--------------------
🛒 Products:
${order.orderItems
  ?.map(
    (item) =>
      `${item.name} x ${item.qty} = ₹${(item.price * item.qty).toFixed(2)}`
  )
  .join("\n")}
--------------------
💰 Total: ₹${order.totalPrice?.toFixed(2)}
💳 Payment: ${order.paymentMethod}
🧾 Transaction ID: ${order.transactionId || "Not Submitted"}
🚚 Tracking ID: ${order.trackingId || "Not Assigned"}
🆔 Order ID: ${order._id}`;

  return (
    <div style={{ textAlign: "center" }}>
      <QRCodeCanvas
        id={`qr-${order._id}`}
        value={qrValue}
        size={size}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        marginSize={4}
      />
      <p className="small text-muted mt-1">Scan to view order #{order._id}</p>
    </div>
  );
};

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [trackingIds, setTrackingIds] = useState({});
  const [qrOrder, setQrOrder] = useState(null);

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderUpdateTracking = useSelector((state) => state.orderUpdateTracking);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = orderUpdateTracking;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: deliverSuccess, error: deliverError } = orderDeliver;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: deleteSuccess, error: deleteError } = orderDelete;

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }

    if (updateSuccess) {
      dispatch({ type: ORDER_UPDATE_TRACKING_RESET });
    }

    if (deliverSuccess) {
      dispatch({ type: ORDER_DELIVER_RESET });
    }

    if (deleteSuccess) {
      dispatch(listOrders());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    updateSuccess,
    deliverSuccess,
    deleteSuccess,
  ]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const initialTrackingIds = {};
      orders.forEach((order) => {
        initialTrackingIds[order._id] = order.trackingId || "";
      });
      setTrackingIds(initialTrackingIds);
    }
  }, [orders]);

  const approvePaymentHandler = (orderId) => {
    if (window.confirm("Mark this order as paid?")) {
      dispatch(approvePayment(orderId));
    }
  };

  const markAsDeliveredHandler = (orderId) => {
    if (window.confirm("Mark this order as delivered?")) {
      dispatch(deliverOrder(orderId));
    }
  };

  const handleTrackingIdChange = (orderId, value) => {
    setTrackingIds((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const handleTrackingIdSubmit = (orderId) => {
    const trackingId = trackingIds[orderId] || "";
    if (trackingId.trim()) {
      dispatch(updateTrackingId(orderId, trackingId.trim()));
    }
  };

  return (
    <>
      <h1>All Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {updateError && <Message variant="danger">{updateError}</Message>}
          {deliverError && <Message variant="danger">{deliverError}</Message>}
          {deleteError && <Message variant="danger">{deleteError}</Message>}

          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>TRACKING ID</th>
                <th>ACTION</th>
                <th>DETAIL</th>
                <th>QR CODE</th>
                <th>DELETE</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>₹{order.totalPrice?.toFixed(2)}</td>

                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>

                  {/* TRACKING ID */}
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter tracking ID"
                        value={trackingIds[order._id] || ""}
                        onChange={(e) =>
                          handleTrackingIdChange(order._id, e.target.value)
                        }
                        size="sm"
                        style={{ minWidth: "120px" }}
                      />
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleTrackingIdSubmit(order._id)}
                        disabled={updateLoading}
                      >
                        {updateLoading ? "..." : "Update"}
                      </Button>
                    </div>

                    {order.trackingId && (
                      <small className="text-success d-block mt-1">
                        Current: {order.trackingId}
                      </small>
                    )}
                  </td>

                  
                  {/* ACTION */}
                  <td>
                    {!order.isPaid ? (
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={() => approvePaymentHandler(order._id)}
                      >
                        Approve Payment
                      </Button>
                    ) : !order.isDelivered ? (
                      <Button
                        variant="warning"
                        className="btn-sm"
                        onClick={() => markAsDeliveredHandler(order._id)}
                      >
                        Mark as Delivered
                      </Button>
                    ) : (
                      <span className="text-success">Delivered</span>
                    )}
                  </td>

                  {/* DETAILS */}
                  <td>
                    <Button
                      as={Link}
                      to={`/order/${order._id}`}
                      variant="light"
                      className="btn-sm"
                    >
                      Details
                    </Button>
                  </td>

                  {/* QR */}
                  <td>
                    <Button
                      variant="info"
                      className="btn-sm"
                      onClick={() => setQrOrder(order)}
                    >
                      View QR
                    </Button>
                  </td>

                  {/* ✅ DELETE (fixed nested td bug) */}
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteOrderHandler(order._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* QR Code Modal */}
          {qrOrder && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
              onClick={() => setQrOrder(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  maxWidth: "90vw",
                }}
              >
                <OrderQRCode order={qrOrder} size={250} />

                <Button
                  variant="secondary"
                  onClick={() => setQrOrder(null)}
                  className="mt-2"
                >
                  Close
                </Button>

                <Button
                  variant="light"
                  onClick={() => handleDownload(qrOrder)}
                  className="mt-2 ms-2"
                >
                  Download QR
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderListScreen;