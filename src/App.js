import React, { Component } from 'react';
import './App.css';
import SearchComponent from './components/search';

import { Provider } from 'react-redux';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
          <SearchComponent/>
      </div>
      </Provider>
    );
  }
}

export default App;
