import {SearchComponent} from '../';
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let props, wrapper;

Enzyme.configure({adapter: new Adapter()});

function wrapperCreater(loading, booksList, error, selectedBook) {
  props = {
    createSearch: jest.fn(),
    loading,
    booksList,
    error,
    selectedBook
  }
  return shallow(<SearchComponent {...props}/>)
}

describe('SearchComponent Test without error', () => {
  wrapper = wrapperCreater(false,[''],undefined,undefined);
  it('should render the h1 tag', () => {
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Search Book');
  });
  
  it('should render the form tag', () => {
    const formElement = wrapper.find('form');
    expect(formElement.length).toBe(1);
    expect(formElement.find('label').length).toBe(1);
    expect(formElement.find('label').text()).toBe('Enter Book Name: ');
    expect(formElement.find('input').length).toBe(1);
  });
  
  it('should call createSearch on form function', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
      }
     });
    expect(props.createSearch).toHaveBeenCalledTimes(1);
  });

  it('should not have Error message', () => {
    expect(wrapper.find('h5').text()).toBe('');
  });

});

