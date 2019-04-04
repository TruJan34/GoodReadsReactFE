import {BookListComponent} from '../';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let props, wrapper;

Enzyme.configure({adapter: new Adapter()});

describe('BookListComponent when books are found as per search key', () => {
  beforeEach(()=> {
    props = {
        getBook: jest.fn(),
        loading: false,
        booksList: [
            {
                best_book:{
                    title:'book1'
                }
            },
            {
              best_book:{
                  title:'book2'
              }
          }
        ],
        error: undefined,
        selectedBook: undefined
    }

    wrapper = shallow(
        <BookListComponent {...props}/>
    )
  })

  it('should render h1 tag', () => {
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Searched Books :- ');
  });

  it('should render ol tag to display list of books', () => {
    expect(wrapper.find('ol').length).toBe(1);
  });

  it('should render li tag to display each book in list', () => {
    expect(wrapper.find('li').length).toBe(2);
  });

});



describe('BookListComponent when books are NOT found as per search key', () => {
  beforeEach(()=> {
    props = {
        getBook: jest.fn(),
        loading: false,
        booksList: [],
        error: undefined,
        selectedBook: undefined
    }

    wrapper = shallow(
        <BookListComponent {...props}/>
    )
  })

  it('should not render h1 tag', () => {
    expect(wrapper.find('h1').length).toBe(0);
  });

  it('should not render li tag to display each book in list as there are no books', () => {
    expect(wrapper.find('li').length).toBe(0);
  });

});
