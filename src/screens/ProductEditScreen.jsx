import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../utils/api.ts";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import "./ProductEditScreen.css";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [uploading, setUploading] = useState(false);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [addStock, setAddStock] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage1(product.images ? product.images[0] : "");
        setImage2(product.images ? product.images[1] : "");
        setImage3(product.images ? product.images[2] : "");
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setHighlights(product.Highlights ? product.Highlights.join("\n") : "");
      }
    }
  }, [dispatch, productId, product, successUpdate, navigate]);

  // ✅ Handle Image Upload
  const uploadFileHandler = async (e, setImage) => {
    const file = e.target.files[0];

    if (!file) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await API.post("/uploads", formData, {
        headers: {
          Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
        },
      });

      // ✅ only image path
      setImage(data.image);

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete Image
  const deleteImageHandler = (setImage) => {
    setImage("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // ✅ Show confirmation alert before updating
    const confirmUpdate = window.confirm(
      `Are you sure you want to update "${name}"? This will save all changes to the product.`,
    );

    if (!confirmUpdate) {
      return; // Exit if user cancels
    }

    // Convert highlights string to array by splitting on newlines and filtering empty lines
    const highlightsArray = highlights
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    // ✅ FINAL STOCK CALCULATION
    const finalStock = Number(countInStock) + Number(addStock);

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        images: [image1, image2, image3].filter((img) => img),
        category,
        countInStock: finalStock, // 🔥 UPDATED HERE
        description,
        Highlights: highlightsArray,
      }),
    );
  };

  return (
    <div className="product-edit-container">
      <h1 className="page-title">Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler} className="product-edit-form">
          {/* Name */}
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </Form.Group>

          {/* Price */}
          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field"
            />
          </Form.Group>

          {/* Image Upload Section */}
          <Row className="image-section mb-4">
            {[
              { img: image1, setImg: setImage1 },
              { img: image2, setImg: setImage2 },
              { img: image3, setImg: setImage3 },
            ].map((imageObj, index) => (
              <Col md={4} key={index} className="mb-3">
                <Form.Group>
                  <Form.Label>Image {index + 1}</Form.Label>
                  {imageObj.img && (
                    <Image src={imageObj.img} alt="Preview" fluid />
                  )}
                  <Form.Control
                    type="file"
                    onChange={(e) => uploadFileHandler(e, imageObj.setImg)}
                  />
                  {uploading && <Loader />}
                  {imageObj.img && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => deleteImageHandler(imageObj.setImg)}
                    >
                      Delete
                    </Button>
                  )}
                </Form.Group>
              </Col>
            ))}
          </Row>

          {/* Brand */}
          <Form.Group controlId="brand" className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="input-field"
            />
          </Form.Group>

          {/* Stock */}
          {/* OLD STOCK (READ ONLY) */}
          <Form.Group controlId="oldStock" className="mb-3">
            <Form.Label>Current Stock</Form.Label>
            <Form.Control
              type="number"
              value={countInStock}
              readOnly
              className="input-field"
            />
          </Form.Group>

          {/* ADD NEW STOCK */}
          <Form.Group controlId="addStock" className="mb-3">
            <Form.Label>Add Stock</Form.Label>
            <Form.Control
              placeholder="Enter quantity to add"
              value={addStock}
              onChange={(e) => setAddStock(e.target.value)}
              className="input-field"
            />
          </Form.Group>

          {/* Category */}
          <Form.Group controlId="category" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            />
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="description" className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
            />
          </Form.Group>

          {/* ✅ Highlights Section */}
          <Form.Group controlId="highlights" className="mb-4">
            <Form.Label>Product Highlights</Form.Label>
            <Form.Text className="text-muted d-block mb-2">
              Enter each highlight on a new line
            </Form.Text>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter product highlights (one per line)&#10;Example:&#10;High quality materials&#10;Fast shipping&#10;1 year warranty"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              className="input-field"
            />
          </Form.Group>

          {/* Submit Button */}
          <Button type="submit" variant="primary" className="update-btn">
            Update Product
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProductEditScreen;
