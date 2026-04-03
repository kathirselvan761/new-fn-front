import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import "./ChangePasswordScreen.css";

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user._id) {
        dispatch(getUserDetails("profile"));
      }
    }
  }, [dispatch, navigate, userInfo, user])
   useEffect(() => {
      if (success) {
        alert("Password updated successfully");
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        navigate("/profile");
      }
    }, [success, dispatch, navigate]);;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("Please fill both password fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setMessage(null);
    dispatch({ type: USER_UPDATE_PROFILE_RESET });

    dispatch(
      updateUserProfile({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password,
      })
    );
  };

  return (
    <Row className="change-password-screen justify-content-center">
      <Col md={8} lg={5}>
        <Card className="change-password-card">
          <h2 className="change-password-title">Change Password</h2>

          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {success && (
            <Message variant="success">Password Updated Successfully</Message>
          )}
          {(loading || loadingUpdate) && <Loader />}

          {user && (
            <div className="change-password-details-box">
              <h5 className="change-password-details-title">Account Details</h5>

              <div className="change-password-detail-item">
                <span className="change-password-detail-label">Name</span>
                <span className="change-password-detail-value">{user.name}</span>
              </div>

              <div className="change-password-detail-item">
                <span className="change-password-detail-label">Email</span>
                <span className="change-password-detail-value">{user.email}</span>
              </div>
            </div>
          )}

          <Form onSubmit={submitHandler} className="change-password-form">
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="change-password-input"
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="change-password-input"
              />
            </Form.Group>

            <div className="change-password-button-group">
              <Button type="submit" className="save-password-btn">
                Update Password
              </Button>

              <Button
                as={Link}
                to="/profile"
                variant="secondary"
                className="back-profile-btn"
              >
                Back to Profile
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ChangePasswordScreen;