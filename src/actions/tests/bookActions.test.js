import { SEARCH_BOOK, LOADING, ERROR, BOOK_SELECT } from '../types';
import * as bookActions from '../bookActions';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);

// mock data for book search when maching books found
const mockDataWithBooks = {
  GoodreadsResponse: {
    search: {
      results: {
        work: ['books-Objects-array']
      }
    }
  }
};

// mock data for book search when maching books not found
const mockDataWithoutBooks = {
  GoodreadsResponse: {
    search: {
      results: {
        work: undefined
      }
    }
  }
};

// mock data for book selected and data fetched successfully
const mockBook = {
  GoodreadsResponse: {
    book: {
      foundBook:
        'this book object will hae several properties of book object here'
    }
  }
};

// mock data for book selected but books data not found
const mockBookError = {
  GoodreadsResponse: {
    book: undefined
  }
};

describe('bookActions test case', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('createSearch - should dispatch LOADING and SEARCH_BOOK action in case of success', () => {
    moxios.stubRequest('https://murmuring-atoll-47071.herokuapp.com/search', {
      status: 200,
      response: mockDataWithBooks
    });
    let expectedActionTypes = [LOADING, SEARCH_BOOK];
    let store = mockStore();
    return store.dispatch(bookActions.createSearch('book1')).then(() => {
      let dispatchedActions = store.getActions();
      let disptachedTypes = dispatchedActions.map(action => action.type);

      expect(disptachedTypes).toEqual(expectedActionTypes);
    });
  });

  it('createSearch - should dispatch LOADING and ERROR action in case of book not found', () => {
    moxios.stubRequest('https://murmuring-atoll-47071.herokuapp.com/search', {
      status: 404,
      response: mockDataWithoutBooks
    });
    let expectedActionTypes = [LOADING, ERROR];
    let store = mockStore();
    return store.dispatch(bookActions.createSearch('book2')).then(() => {
      let dispatchedActions = store.getActions();
      let disptachedTypes = dispatchedActions.map(action => action.type);
      expect(disptachedTypes).toEqual(expectedActionTypes);
    });
  });

  it('getBook - should dispatch LOADING and BOOK_SELECT action in case of sucess while fetching book details', () => {
    moxios.stubRequest('https://murmuring-atoll-47071.herokuapp.com/book', {
      status: 200,
      response: mockBook
    });
    let expectedActionTypes = [LOADING, BOOK_SELECT];

    let store = mockStore();
    return store.dispatch(bookActions.getBook('book1')).then(() => {
      let dispatchedActions = store.getActions();
      let disptachedTypes = dispatchedActions.map(action => action.type);

      expect(disptachedTypes).toEqual(expectedActionTypes);
    });
  });

  it('getBook - should dispatch LOADING and ERROR action in case of error while fetching book details', () => {
    moxios.stubRequest('https://murmuring-atoll-47071.herokuapp.com/book', {
      status: 404,
      response: mockBookError
    });
    let expectedActionTypes = [LOADING, ERROR];

    let store = mockStore();
    return store.dispatch(bookActions.getBook('book2')).then(() => {
      let dispatchedActions = store.getActions();
      let disptachedTypes = dispatchedActions.map(action => action.type);
      expect(disptachedTypes).toEqual(expectedActionTypes);
    });
  });
});
