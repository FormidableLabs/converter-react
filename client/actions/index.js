/**
 * Actions: Convert
 */
import { fetchConversions as fetchConversionsApi } from "../utils/api";

export const CONVERSION_ERROR = 'CONVERSION_ERROR';
export const FETCH_CONVERSIONS = 'FETCH_CONVERSIONS';
export const SET_CONVERSION_TYPES = 'SET_CONVERSION_TYPES';
export const SET_CONVERSION_VALUE = 'SET_CONVERSION_VALUE';
export const UPDATE_CONVERSIONS = 'UPDATE_CONVERSIONS';

export function conversionError(err) {
  return {
    type: CONVERSION_ERROR,
    err: err
  }
}

export function fetchConversions(types,value) {
  return dispatch => {
    dispatch(() => {type: FETCH_CONVERSIONS});
    fetchConversionsApi(types, value)
      .then((datas) => {
        dispatch(updateConversions(datas));
      })
      .catch((err) => {
        dispatch(conversionError(err));
      });
  }
}

export function setConversionTypes(types) {
  return {
    type: SET_CONVERSION_TYPES,
    types: types
  }
}

export function setConversionValue(value) {
  return {
    type: SET_CONVERSION_VALUE,
    value: value
  }
}

export function updateConversions(data) {
  return {
    type: UPDATE_CONVERSIONS,
    data: data
  }
}
