import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={4} className="footer-brand">
            <h4 className="footer-title">Sleepyyy™</h4>
            <p className="footer-sub">
              Premium Beds & Pillows for Your Perfect Sleep
            </p>
          </Col>

          <Col md={4} className="footer-contact">
            <p>
              <strong>Contact:</strong> +91 95976 99157
            </p>
            <p>
              <strong>Email:</strong> help.Sleepyyy@gmail.com
            </p>
          </Col>

          <Col md={4} className="footer-social text-center text-md-end">
            <p className="mb-2">Follow Us</p>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/share/1A3MeG3dU7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/Sleepyyyshop?igsh=c2d1bDRocTBjdzJi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/SleepyyyShop?t=z26me6fyybO8sKzGycMe0Q&s=09"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com/@Sleepyyyshop?si=rwcoVsuRjqqVPiuL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Sleepyyy™. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
