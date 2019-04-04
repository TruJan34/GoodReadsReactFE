import { BookInfoComponent } from '..';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let props, wrapper;

Enzyme.configure({ adapter: new Adapter() });

describe('BookInfoComponent when selected book info is found', () => {
  beforeEach(() => {
    props = {
      loading: false,
      booksList: [
        {
          best_book: {
            title: 'book1'
          }
        },
        {
          best_book: {
            title: 'book2'
          }
        }
      ],
      error: undefined,
      selectedBook: {
        title: 'book2',
        authors: { author: [{ name: 'author1' }, { name: 'author2' }] },
        average_rating: '5',
        ratings_count: '120',
        text_reviews_count: '200',
        description: 'book description here',
        image_url: 'imageURL'
      }
    };

    wrapper = shallow(<BookInfoComponent {...props} />);
  });

  it('should render h1 tag with header as BookInfo', () => {
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('BookInfo');
  });

  it('renders an image', () => {
    expect(wrapper.find('img').prop('src')).toEqual('imageURL');
    expect(wrapper.find('img').prop('width')).toEqual('400');
    expect(wrapper.find('img').prop('alt')).toEqual('Book Image');
  });

  it('should render h2 tag with selected book name', () => {
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h2').text()).toBe('book2');
  });

  it('should render h6 tag with authors list', () => {
    expect(wrapper.find('h6').length).toBe(1);
    expect(wrapper.find('h6').text()).toBe('By author1,author2');
  });

  it('should render span tag with book description', () => {
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('span').text()).toBe('book description here');
  });
});
