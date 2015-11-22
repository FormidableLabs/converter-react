/**
 * Actions: Convert
 */
import { fetchConversions as fetchConversionsApi } from "../utils/api";

export const CONVERSION_ERROR = "CONVERSION_ERROR";
export const FETCH_CONVERSIONS = "FETCH_CONVERSIONS";
export const SET_CONVERSION_TYPES = "SET_CONVERSION_TYPES";
export const SET_CONVERSION_VALUE = "SET_CONVERSION_VALUE";
export const UPDATE_CONVERSIONS = "UPDATE_CONVERSIONS";

export const updateConversions = (data) => {
  return {
    type: UPDATE_CONVERSIONS,
    data
  };
};

export const conversionError = (err) => {
  return {
    type: CONVERSION_ERROR,
    err
  };
};

export const fetchConversions = (types, value) => {
  return (dispatch) => {
    dispatch(() => ({type: FETCH_CONVERSIONS}));

    return fetchConversionsApi(types, value)
      .then((datas) => {
        dispatch(updateConversions(datas));
      })
      .catch((err) => {
        dispatch(conversionError(err));
      });
  };
};

export const setConversionTypes = (types) => {
  return {
    type: SET_CONVERSION_TYPES,
    types
  };
};

export const setConversionValue = (value) => {
  return {
    type: SET_CONVERSION_VALUE,
    value
  };
};
