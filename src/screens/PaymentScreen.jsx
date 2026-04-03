// frontend/src/screens/PaymentScreen.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

import './PaymentScreen.css'; // Optional custom CSS

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod] = useState('Cash on Delivery');

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <div className="payment-form-container">
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='UPI on WhatsApp'
                id='upi'
                name='paymentMethod'
                value='Cash on Delivery'
                checked
                readOnly
                className="form-check"
              />
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-3'>
            Continue
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;
