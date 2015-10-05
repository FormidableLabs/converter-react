import { combineReducers } from 'redux';

import types from "../utils/types";

import {
  CONVERSION_ERROR,
  FETCH_CONVERSIONS,
  SET_CONVERSION_TYPES,
  SET_CONVERSION_VALUE,
  UPDATE_CONVERSIONS
} from '../actions';

function conversions(state = {
  conversionError: null,
  conversions: [],
  types: types.DEFAULT_TYPE,
  value: ""
}, action) {
  switch (action.type) {
  case CONVERSION_ERROR:
    return Object.assign({}, state, {
      conversionError: action.err.message || action.err.toString()
    });
  case FETCH_CONVERSIONS:
    return Object.assign({}, state, {
      conversionError: null
    });
  case SET_CONVERSION_TYPES:
    return Object.assign({}, state, {
      types: action.types
    });
  case SET_CONVERSION_VALUE:
    return Object.assign({}, state, {
      value: action.value
    });
  case UPDATE_CONVERSIONS:
    return Object.assign({}, state, {
      conversions: action.data
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  conversions
});

export default rootReducer;