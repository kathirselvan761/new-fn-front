// frontend/src/screens/HomeScreen.js
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import './HomeScreen.css'
import AdminDashboardScreen from './AdminDashboardScreen'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { keyword = '', pageNumber = '1' } = useParams()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div className='love-bg'>
      <Meta />

      {/* ✅ Admin user only sees Admin Dashboard */}
      {userInfo && userInfo.isAdmin ? (
        <AdminDashboardScreen />
      ) : (
        <>
          {/* 👤 Normal user / not logged in */}
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to='/' className='btn btn-light'>
              Go Back
            </Link>
          )}
<u><h1>latest product</h1></u>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={6} xl={6}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate pages={pages} page={page} keyword={keyword} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default HomeScreen
