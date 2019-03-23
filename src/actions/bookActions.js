import { SEARCH_BOOK, LOADING, ERROR, BOOK_SELECT } from './types';
const axios = require('axios');

export const createSearch = searchKey => async dispatch => {
  dispatch({ type: LOADING });
  try {
    const res = await axios.post('http://localhost:4000/search', { searchKey });
    if (res.data.GoodreadsResponse.search.results.work) {
      dispatch({
        type: SEARCH_BOOK,
        payload: res.data.GoodreadsResponse.search.results.work
      });
    } else {
      dispatch({
        type: ERROR,
        payload: 'No Books Found. Please search with other Title.'
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: ERROR, payload: 'Error during book search' });
  }
};

export const getBook = book => async dispatch => {
  dispatch({ type: LOADING });
  try {
    const res = await axios.post('http://localhost:4000/book', { book });
    if (res.data.GoodreadsResponse.book) {
      dispatch({
        type: BOOK_SELECT,
        payload: res.data.GoodreadsResponse.book
      });
    } else {
      dispatch({
        type: ERROR,
        payload: 'Error while fetching book details'
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: ERROR, payload: 'Error while fetching book details' });
  }
};
