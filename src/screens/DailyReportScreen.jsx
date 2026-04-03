import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./DailyReportScreen.css";

const DailyReportScreen = () => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split("T")[0],
  );

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  // Filter orders by selected day
  const getDailyOrders = (date) => {
    if (!orders) return [];
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      return orderDate === date;
    });
  };

  // Download as Excel (CSV)
  const downloadExcel = () => {
    const dayOrders = getDailyOrders(selectedDay);
    const data = dayOrders.map(
      (o) =>
        `${o._id},${new Date(o.createdAt).toLocaleDateString()},${o.user?.name || "N/A"},${o.user?.phone || "N/A"},"${o.orderItems.map((item) => `${item.name} x ${item.qty}`).join("; ")}",₹${o.totalPrice.toFixed(2)},${o.isPaid ? "Yes" : "No"},${o.isDelivered ? "Yes" : "No"},${o.trackingId || "N/A"}`,
    );
    data.unshift(
      "Order ID,Date,Customer Name,Phone,Products,Total Amount,Paid,Delivered,Tracking ID",
    );

    const blob = new Blob(["\uFEFF" + data.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Daily_Report_${selectedDay}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Download as PDF
  const downloadPDF = () => {
    const content = document.getElementById("daily-report-content");
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Daily Report - ${selectedDay}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2 { color: #1f2937; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 11px; }
            th { background-color: #3b82f6; color: white; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .stats { text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const currentOrders = getDailyOrders(selectedDay);
  const totalAmount = currentOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const paidAmount = currentOrders
    .filter((o) => o.isPaid)
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const paidOrders = currentOrders.filter((o) => o.isPaid).length;
  const deliveredOrders = currentOrders.filter((o) => o.isDelivered).length;

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

return (
  <div className="daily-report">

    {/* HEADER */}
    <div className="dr-header">
      <h1>🗓️ DAILY ORDER REPORT</h1>

      <div className="dr-header-actions">
        <input
          type="date"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        />

        <Link to="/admin/reports/monthly" className="btn outline">
          📆 Monthly Report
        </Link>

        <button className="btn success" onClick={downloadExcel}>Excel</button>
        <button className="btn danger" onClick={downloadPDF}>PDF</button>
      </div>
    </div>

    {/* STATS */}
    <div className="dr-stats">
      <div className="stat">
        <p>Total Orders</p>
        <h3>{currentOrders.length}</h3>
        <span>📦</span>
      </div>

      <div className="stat">
        <p>Paid Orders</p>
        <h3 className="green">{paidOrders}</h3>
        <span>✅</span>
      </div>

      <div className="stat">
        <p>Delivered</p>
        <h3 className="blue">{deliveredOrders}</h3>
        <span>🚚</span>
      </div>

      <div className="stat">
        <p>Total Revenue</p>
        <h3>₹{totalAmount}</h3>
        <small>Paid: ₹{paidAmount}</small>
        <span>💰</span>
      </div>
    </div>

    {/* REPORT */}
    <div className="dr-report" id="daily-report-content">
      <h2>
        DAILY REPORT –{" "}
        {new Date(selectedDay).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h2>

      {currentOrders.length === 0 ? (
        <div className="empty">No orders found for this day</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(o => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.user?.name}</td>
                <td>₹{o.totalPrice}</td>
                <td>{o.isPaid ? "Yes" : "No"}</td>
                <td>{o.isDelivered ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  </div>
);

};

export default DailyReportScreen;
