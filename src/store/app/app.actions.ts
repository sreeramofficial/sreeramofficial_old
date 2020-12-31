import actionTypes from './app.const';

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  }
}

export function loadData(payload) {
  return { type: actionTypes.LOAD_DATA, payload }
}

export function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data,
  }
}
