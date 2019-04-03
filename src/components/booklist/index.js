import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBook } from '../../actions/bookActions';

class BookListComponent extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(book) {
    this.props.getBook(book.best_book.title);
  }

  render() {
    const bookList =
      this.props.booksList.length > 0 &&
      this.props.booksList.map((book, index) => (
        <li key={index} onClick={() => this.onClick(book)}>
          {book.best_book.title}
        </li>
      ));

    return (
      <React.Fragment>
        {bookList && <h1>Searched Books :- </h1>}
        {!this.props.loading && <ol>{bookList}</ol>}
      </React.Fragment>
    );
  }
}

BookListComponent.propTypes = {
  getBook: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  debugger;
  return {
    booksList: state.books.booksList,
    loading: state.books.loading,
    error: state.books.error,
    selectedBook: state.books.selectedBook
  };
};
export default connect(
  mapStateToProps,
  { getBook }
)(BookListComponent);
