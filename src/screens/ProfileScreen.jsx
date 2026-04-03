import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import "./ProfileScreen.css";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);

    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        phone,
      }),
    );
  };

  return (
    <Row className="profile-screen justify-content-center">
      <Col md={8} lg={6}>
        <Card className="profile-card p-4 shadow">
          <h2 className="profile-title text-center mb-4">My Profile</h2>

          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {success && (
            <Message variant="success">Profile Updated Successfully</Message>
          )}
          {(loading || loadingUpdate) && <Loader />}

          {user && (
            <div className="mb-4 p-3 border rounded bg-light">
              <h5 className="mb-3">Current Details</h5>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "Not Available"}
              </p>
              <p>
                <strong>Admin ID:</strong> {user._id}
              </p>
            </div>
          )}

          <Form onSubmit={submitHandler} className="profile-form">
            {!userInfo?.isAdmin && (
              <div className="profile-button-group">
                <Button
                  as={Link}
                  to="/changepassword"
                  variant="warning"
                  className="change-password-btn"
                >
                  Change Password
                </Button>
              </div>
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
