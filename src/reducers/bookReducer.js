import {
  SEARCH_BOOK,
  LOADING,
  ERROR,
  BOOK_SELECT,
  CLEAR_SELECT
} from '../actions/types';

const initialState = {
  booksList: [],
  selectedBook: undefined,
  loading: false,
  error: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
        booksList: [],
        selectedBook: undefined
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SEARCH_BOOK:
      return {
        ...state,
        loading: false,
        booksList: action.payload
      };
    case BOOK_SELECT:
      return {
        ...state,
        loading: false,
        selectedBook: action.payload
      };
    case CLEAR_SELECT:
      return {
        ...state,
        selectedBook: undefined
      };
    default:
      return state;
  }
}
