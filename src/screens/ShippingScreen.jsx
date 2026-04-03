// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Form, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { saveShippingAddress } from '../actions/cartActions'
// import CheckoutSteps from '../components/CheckoutSteps'
// import FormContainer from '../components/FormContainer'
// import './ShippingScreen.css' // Import the CSS file

// const ShippingScreen = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const cart = useSelector((state) => state.cart)
//   const { shippingAddress } = cart

//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin

//   const [address, setAddress] = useState(shippingAddress?.address || '')
//   const [alternatePhone, setAlternatePhone] = useState(userInfo?.alternatePhone || '')
//   const [city, setCity] = useState(shippingAddress?.city || '')
//   const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
//   const [country, setCountry] = useState(shippingAddress?.country || '')

//   useEffect(() => {
//     if (!userInfo) {
//       navigate('/login?redirect=/shipping')
//     }
//     window.scrollTo(0, 0) // Optional: Scroll to top on mount
//   }, [userInfo, navigate])

//   const submitHandler = (e) => {
//     e.preventDefault()
//     dispatch(saveShippingAddress({ address, city, postalCode, country }))
//     navigate('/payment') // Go to payment screen after saving
//   }

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 />

//       <div className="shipping-form-container">
//         <h1>Shipping</h1>
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId='name' className='mb-3'>
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter name'
//               value={userInfo?.name || ''}
//               disabled
//             />
//           </Form.Group>
//           <Form.Group controlId='phone' className='mb-3'>
//             <Form.Label>Phone no</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter phone number'
//               value={userInfo?.phone || ''}
//               disabled
//             />
//           </Form.Group>
//           <Form.Group controlId='alternatePhone' className='mb-3'>
//             <Form.Label>Alternate Phone no</Form.Label>
//           <Form.Control
//               type='text'
//               placeholder='Enter alternate phone number'
//               value={alternatePhone}
//               onChange={(e) => setAlternatePhone(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId='address' className='mb-3'>
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter address'
//               value={address}
//               required
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId='city' className='mb-3'>
//             <Form.Label>City</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter city'
//               value={city}
//               required
//               onChange={(e) => setCity(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId='postalCode' className='mb-3'>
//             <Form.Label>Postal Code</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter postal code'
//               value={postalCode}
//               required
//               onChange={(e) => setPostalCode(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId='country' className='mb-3'>
//             <Form.Label>Country</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter country'
//               value={country}
//               required
//               onChange={(e) => setCountry(e.target.value)}
//             />
//           </Form.Group>

//           <Button type='submit' variant='primary' className='mt-3'>
//             Continue
//           </Button>
//         </Form>
//       </div>

//     </FormContainer>
//   )
// }

// export default ShippingScreen







import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import './ShippingScreen.css'

const ShippingScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Initialize state with existing shipping address or user info
  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')
  const [alternatePhone, setAlternatePhone] = useState(shippingAddress?.alternatePhone || userInfo?.alternatePhone || '')
  const [addressType, setAddressType] = useState(shippingAddress?.addressType || 'home') // New state for address type
  
  // Local state for validation errors
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/shipping')
    }
    window.scrollTo(0, 0)
  }, [userInfo, navigate])

  const validateForm = () => {
    const newErrors = {}
    
    if (!address.trim()) newErrors.address = 'Address is required'
    if (!city.trim()) newErrors.city = 'City is required'
    if (!postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    if (!country.trim()) newErrors.country = 'Country is required'
    
    // Optional: Validate phone number format if needed
    if (alternatePhone && !/^\d{10}$/.test(alternatePhone.replace(/\D/g, ''))) {
      newErrors.alternatePhone = 'Please enter a valid 10-digit phone number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitHandler = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Save all shipping data including address type
      dispatch(saveShippingAddress({ 
        address, 
        city, 
        postalCode, 
        country,
        alternatePhone,
        addressType,
        fullName: userInfo?.name,
        phone: userInfo?.phone
      }))
      navigate('/payment')
    }
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <div className="shipping-form-container">
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={userInfo?.name || ''}
              disabled
              readOnly
            />
          </Form.Group>

          <Form.Group controlId='phone' className='mb-3'>
            <Form.Label>Phone no</Form.Label>
            <Form.Control
              type='tel'
              placeholder='Enter phone number'
              value={userInfo?.phone || ''}
              disabled
            />
          </Form.Group>

          <Form.Group controlId='alternatePhone' className='mb-3'>
            <Form.Label>Alternate Phone no</Form.Label>
            <Form.Control
              type='tel'
              placeholder='Enter alternate phone number (optional)'
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
              isInvalid={!!errors.alternatePhone}
              maxLength="10"
            />
            <Form.Control.Feedback type='invalid'>
              {errors.alternatePhone}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Address Type Selection */}
          <Form.Group className='mb-4'>
            <Form.Label className='mb-3'>Address Type</Form.Label>
            <Row>
              <Col md={6}>
                <div 
                  className={`address-type-card ${addressType === 'home' ? 'selected' : ''}`}
                  onClick={() => setAddressType('home')}
                >
                  <div className="address-type-icon">🏠</div>
                  <div className="address-type-label">Home</div>
                  <Form.Check
                    type='radio'
                    name='addressType'
                    id='home'
                    value='home'
                    checked={addressType === 'home'}
                    onChange={(e) => setAddressType(e.target.value)}
                    className="address-type-radio"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div 
                  className={`address-type-card ${addressType === 'office' ? 'selected' : ''}`}
                  onClick={() => setAddressType('office')}
                >
                  <div className="address-type-icon">🏢</div>
                  <div className="address-type-label">Office</div>
                  <Form.Check
                    type='radio'
                    name='addressType'
                    id='office'
                    value='office'
                    checked={addressType === 'office'}
                    onChange={(e) => setAddressType(e.target.value)}
                    className="address-type-radio"
                  />
                </div>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId='address' className='mb-3'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='city' className='mb-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId='postalCode' className='mb-3'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter postal code'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                  isInvalid={!!errors.postalCode}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.postalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId='country' className='mb-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter country'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button type='submit' variant='primary' className='mt-3 w-100'>
            Continue to Payment
          </Button>
        </Form>
      </div>
    </FormContainer>
  )
}

export default ShippingScreen