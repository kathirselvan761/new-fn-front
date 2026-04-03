import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import API from "../utils/api.ts";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./StockListScreen.css";

const StockListScreen = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const { data } = await API.get("/stock");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load stock");
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  return (
    <>
      <h1 className="stock-title">Stock List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="stock-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock Left</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.countInStock}</td>

                <td>
                  <span
                    className={`stock-status ${
                      p.countInStock === 0 ? "out-stock" : "in-stock"
                    }`}
                  >
                    {p.countInStock === 0 ? "Out of Stock" : "Available"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default StockListScreen;
