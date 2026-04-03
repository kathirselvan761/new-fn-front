import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./MonthlyReportScreen.css";

const MonthlyReportScreen = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter orders by selected day
  const getDailyOrders = (date) => {
    if (!orders) return [];
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      return orderDate === date;
    });
  };

  // Filter orders by selected month
  const getMonthlyOrders = (month, year) => {
    if (!orders) return [];
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === month && orderDate.getFullYear() === year;
    });
  };

  // Get day-wise breakdown for a month
  const getDaysInMonth = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dailyData = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayOrders = getDailyOrders(date);

      dailyData.push({
        date,
        day,
        totalOrders: dayOrders.length,
        paidOrders: dayOrders.filter((o) => o.isPaid).length,
        deliveredOrders: dayOrders.filter((o) => o.isDelivered).length,
        totalAmount: dayOrders.reduce((sum, o) => sum + o.totalPrice, 0),
        paidAmount: dayOrders
          .filter((o) => o.isPaid)
          .reduce((sum, o) => sum + o.totalPrice, 0),
      });
    }
    return dailyData;
  };

  // Download as Excel (CSV)
  const downloadExcel = () => {
    const monthData = getDaysInMonth(selectedMonth, selectedYear);
    const data = monthData.map(
      (d) =>
        `${d.date},Day ${d.day},${d.totalOrders},${d.paidOrders},${d.deliveredOrders},₹${d.totalAmount.toFixed(2)},₹${d.paidAmount.toFixed(2)}`,
    );
    data.unshift(
      "Date,Day,Total Orders,Paid Orders,Delivered Orders,Total Amount,Paid Amount",
    );

    const blob = new Blob(["\uFEFF" + data.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Monthly_Report_${monthNames[selectedMonth]}_${selectedYear}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Download as PDF
  const downloadPDF = () => {
    const content = document.getElementById("monthly-report-content");
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Monthly Report - ${monthNames[selectedMonth]} ${selectedYear}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2 { color: #1f2937; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 12px; }
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

  const currentOrders = getMonthlyOrders(selectedMonth, selectedYear);
  const totalAmount = currentOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const paidAmount = currentOrders
    .filter((o) => o.isPaid)
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const paidOrders = currentOrders.filter((o) => o.isPaid).length;
  const deliveredOrders = currentOrders.filter((o) => o.isDelivered).length;

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="monthly-report">
      {/* HEADER */}
      <div className="mr-header">
        <h1>📆 MONTHLY ORDER REPORT</h1>

        <div className="mr-header-actions">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i}>
                {m} {selectedYear}
              </option>
            ))}
          </select>

          <Link to="/admin/reports/daily" className="btn outline">
            📅 Daily Report
          </Link>

          <button className="btn success" onClick={downloadExcel}>
            Excel
          </button>
          <button className="btn danger" onClick={downloadPDF}>
            PDF
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="mr-stats">
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

      {/* TABLE */}
      <div className="mr-report">
        <h2>
          MONTHLY REPORT – {monthNames[selectedMonth]} {selectedYear}
        </h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Total ₹</th>
              <th>Paid ₹</th>
            </tr>
          </thead>
          <tbody>
            {getDaysInMonth(selectedMonth, selectedYear).map((day) => (
              <tr key={day.date}>
                <td>{day.date}</td>
                <td>{day.day}</td>
                <td>{day.totalOrders}</td>
                <td>{day.paidOrders}</td>
                <td>{day.deliveredOrders}</td>
                <td>₹{day.totalAmount}</td>
                <td>₹{day.paidAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyReportScreen;
