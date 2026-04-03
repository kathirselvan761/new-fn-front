import React, { useState, useImperativeHandle, forwardRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { logout } from "../actions/userActions";
import "./Header.css";

const Header = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    setExpanded(false); // ✅ auto close navbar after logout
  };

  useImperativeHandle(ref, () => ({
    closeMenu() {
      setExpanded(false);
    },
  }));

  return (
    <header>
      <Navbar
        expand="lg"
        fixed="top"
        collapseOnSelect
        className="navbar-custom"
        expanded={expanded}
      >
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/">
            Sleepyyy™
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded((prev) => !prev)}
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <div className="me-auto d-flex">
              <Nav>
                {/* 🛒 Cart */}
                {userInfo && !userInfo.isAdmin && (
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="fas fa-shopping-cart"></i> Cart{" "}
                    {cartItems.length > 0 && (
                      <Badge pill bg="success" className="ms-1">
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                )}

                {/* My Orders (for users only - as main link) */}
                {userInfo && !userInfo.isAdmin && (
                  <Nav.Link
                    as={Link}
                    to="/orderhistory"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="fas fa-box"></i> My Orders
                  </Nav.Link>
                )}

                {/* 👤 Sign In */}
                {!userInfo && (
                  <Nav.Link
                    as={Link}
                    to="/login"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                )}

                {/* 🔽 User Dropdown */}
                {userInfo && (
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item
                      as={Link}
                      to="/profile"
                      onClick={() => setExpanded(false)} // ✅ auto close
                    >
                      Profile
                    </NavDropdown.Item>

                    {!userInfo.isAdmin && (
                      <NavDropdown.Item
                        as={Link}
                        to="/orderhistory"
                        onClick={() => setExpanded(false)} // ✅ auto close
                      >
                        My Orders
                      </NavDropdown.Item>
                    )}

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {/* 🔽 Admin Dropdown */}
                {userInfo?.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      as={Link}
                      to="/admin/dashboard"
                      onClick={() => setExpanded(false)}
                    >
                      Dashboard
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Link}
                      to="/admin/userlist"
                      onClick={() => setExpanded(false)}
                    >
                      Users
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Link}
                      to="/admin/productlist"
                      onClick={() => setExpanded(false)}
                    >
                      Products
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Link}
                      to="/admin/orderlist"
                      onClick={() => setExpanded(false)}
                    >
                      Orders
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
});

export default Header;
