import axios from "axios";

// CART
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

// ORDER CONSTANTS
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_APPROVE_REQUEST,
  ORDER_APPROVE_SUCCESS,
  ORDER_APPROVE_FAIL,
  ORDER_UPDATE_TRACKING_REQUEST,
  ORDER_UPDATE_TRACKING_SUCCESS,
  ORDER_UPDATE_TRACKING_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from "../constants/orderConstants";

// USER
import { logout } from "./userActions";

// BASE API
const API = process.env.REACT_APP_API_URL || "/api";

// ------------------------------------
// COMMON ERROR HANDLER
// ------------------------------------
const handleError = (error, dispatch, failureType) => {
  const message = error.response?.data?.message || error.message;

  if (message === "Not authorized, token failed") {
    dispatch(logout());
  }

  dispatch({
    type: failureType,
    payload: message,
  });
};

// ------------------------------------
// CREATE ORDER
// ------------------------------------
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${API}/orders`, order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS });

    localStorage.removeItem("cartItems");
  } catch (error) {
    handleError(error, dispatch, ORDER_CREATE_FAIL);
  }
};

// ------------------------------------
// GET ORDER DETAILS
// ------------------------------------
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, ORDER_DETAILS_FAIL);
  }
};

// ------------------------------------
// PAY ORDER
// ------------------------------------
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API}/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      handleError(error, dispatch, ORDER_PAY_FAIL);
    }
  };

// ------------------------------------
// DELIVER ORDER (ADMIN)
// ------------------------------------
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`${API}/orders/${orderId}/deliver`, {}, config);

    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    handleError(error, dispatch, ORDER_DELIVER_FAIL);
  }
};

// ------------------------------------
// LIST MY ORDERS
// ------------------------------------
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/orders/myorders`, config);

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, ORDER_LIST_MY_FAIL);
  }
};

// ------------------------------------
// LIST ALL ORDERS (ADMIN)
// ------------------------------------
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/orders`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, ORDER_LIST_FAIL);
  }
};

// // ------------------------------------//
// // DELETE ORDER (ADMIN)
// // ------------------------------------//
export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ------------------------------------
// APPROVE PAYMENT (ADMIN)
// ------------------------------------
export const approvePayment = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_APPROVE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API}/orders/${orderId}/pay/approve`,
      {},
      config
    );

    dispatch({ type: ORDER_APPROVE_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, ORDER_APPROVE_FAIL);
  }
};

// ------------------------------------
// UPDATE TRACKING ID (ADMIN)
// ------------------------------------
export const updateTrackingId =
  (orderId, trackingId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_UPDATE_TRACKING_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API}/orders/${orderId}/tracking`,
        { trackingId },
        config
      );

      dispatch({
        type: ORDER_UPDATE_TRACKING_SUCCESS,
        payload: data,
      });

      dispatch(listOrders());
    } catch (error) {
      handleError(error, dispatch, ORDER_UPDATE_TRACKING_FAIL);
    }
  };
