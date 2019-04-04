import React, { Component } from 'react';
import { connect } from 'react-redux';

export class BookInfoComponent extends Component {
  render() {
    const rate =
      'rating-static rating-' +
      5 * Math.round((this.props.selectedBook.average_rating * 10) / 5);
    return (
      <React.Fragment>
        <h1>BookInfo</h1>
        <div class="container">
          <div class="div1">
            <img
              src={this.props.selectedBook.image_url}
              alt="Book Image"
              width="400"
            />
          </div>
          <div class="div2">
            <h2>{this.props.selectedBook.title}</h2>
            <h6>
              By{' '}
              {this.props.selectedBook.authors.author.length > 0
                ? this.props.selectedBook.authors.author
                    .map(i => i.name)
                    .toString()
                : this.props.selectedBook.authors.author.name}
            </h6>
            <div>
              <b>Avg Rating :</b>({this.props.selectedBook.average_rating})
              <div className={rate} />
            </div>{' '}
            <b>Rating Count :</b> {this.props.selectedBook.ratings_count}
            <b> Reviews :</b>
            {this.props.selectedBook.text_reviews_count}
            <br />
            <span>{this.props.selectedBook.description}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

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
  null
)(BookInfoComponent);
