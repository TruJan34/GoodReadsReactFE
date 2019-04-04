import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSearch } from '../../actions/bookActions';
import BookListComponent from '../booklist';
import BookInfoComponent from '../bookInfo';

export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ searchKey: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createSearch(this.state.searchKey);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Search Book</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Enter Book Name: </label>
            <br />
            <input
              type="text"
              name="searchKey"
              onChange={this.onChange}
              value={this.state.searchKey}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />
        <br />
        {!this.props.loading && !this.props.selectedBook && (
          <BookListComponent />
        )}
        {this.props.loading && (
          <div>
            <h2>Loading .... </h2>
            <h6>Fetching data from 3rd party API</h6>
          </div>
        )}
        {!this.props.loading && this.props.selectedBook && (
          <BookInfoComponent />
        )}
        <h5>{this.props.error}</h5>
      </React.Fragment>
    );
  }
}

SearchComponent.propTypes = {
  createSearch: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    booksList: state.books.booksList,
    loading: state.books.loading,
    error: state.books.error,
    selectedBook: state.books.selectedBook
  };
};
export default connect(
  mapStateToProps,
  { createSearch }
)(SearchComponent);
