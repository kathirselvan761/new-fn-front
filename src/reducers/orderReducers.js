import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,

  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,

  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,

  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,

  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,

  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,

  ORDER_APPROVE_REQUEST,
  ORDER_APPROVE_SUCCESS,
  ORDER_APPROVE_FAIL,
  ORDER_APPROVE_RESET,

  ORDER_UPDATE_TRACKING_REQUEST,
  ORDER_UPDATE_TRACKING_SUCCESS,
  ORDER_UPDATE_TRACKING_FAIL,
  ORDER_UPDATE_TRACKING_RESET,

  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  
} from '../constants/orderConstants'

//------------------//
// Create Order Reducer
//------------------//
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

//------------------//
// Order Details Reducer
//------------------//
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//------------------//
// Order Pay Reducer
//------------------//
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

//------------------//
// Order Deliver Reducer
//------------------//
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true }
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

//------------------//
// Order Approve Reducer
//------------------//
export const orderApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_APPROVE_REQUEST:
      return { loading: true }
    case ORDER_APPROVE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_APPROVE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_APPROVE_RESET:
      return {}
    default:
      return state
  }
}

//------------------//
// Order Update Tracking Reducer - NEW REDUCER
//------------------//
export const orderUpdateTrackingReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_TRACKING_REQUEST:
      return { loading: true }
    case ORDER_UPDATE_TRACKING_SUCCESS:
      return { loading: false, success: true }
    case ORDER_UPDATE_TRACKING_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_UPDATE_TRACKING_RESET:
      return {}
    default:
      return state
  }
}

//------------------//
// My Orders Reducer
//-----------------//
export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true }
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

//-------------------//
// All Orders Reducer
//-------------------//
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//-------------------//
// ORDER DELETE REDUCER
//-------------------//
export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };

    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
