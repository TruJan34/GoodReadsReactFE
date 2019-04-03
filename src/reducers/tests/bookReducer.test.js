import bookReducer from '../bookReducer';
import { SEARCH_BOOK, LOADING, ERROR, BOOK_SELECT } from '../../actions/types';

const initialState = {
  booksList: [],
  selectedBook: undefined,
  loading: false,
  error: undefined
};

describe('bookReducer test case', () => {
  it('should return initial state', () => {
    expect(bookReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the SEARCH_BOOK acion type', () => {
    expect(
      bookReducer(initialState, {
        type: SEARCH_BOOK,
        payload: [{ book1: 'booksArrayOfObjects' }, { book2: 'book2' }]
      })
    ).toEqual({
      loading: false,
      error: undefined,
      booksList: [{ book1: 'booksArrayOfObjects' }, { book2: 'book2' }],
      selectedBook: undefined
    });
  });

  it('should handle the BOOK_SELECT acion type', () => {
    expect(
      bookReducer(initialState, {
        type: BOOK_SELECT,
        payload: { selectedBook: 'book Object' }
      })
    ).toEqual({
      loading: false,
      error: undefined,
      booksList: [],
      selectedBook: { selectedBook: 'book Object' }
    });
  });

  it('should handle the LOADING acion type', () => {
    expect(
      bookReducer(initialState, {
        type: LOADING
      })
    ).toEqual({
      loading: true,
      error: undefined,
      booksList: [],
      selectedBook: undefined
    });
  });

  it('should handle the ERROR acion type', () => {
    expect(
      bookReducer(initialState, {
        type: ERROR,
        payload: 'Error Message here'
      })
    ).toEqual({
      loading: false,
      error: 'Error Message here',
      booksList: [],
      selectedBook: undefined
    });
  });
});
