import React, { Component } from 'react'
//import MenuButton from '../MenuButton/MenuButton'
//this is for what will be rendered on the book card to be pushed to a reading collection-WHERE?
class BookForm extends Component {
  
  state = {
    formData: {
      api_id: this.props.book.id,
      title:  this.props.book.title,
      coverImage: this.props.book.imageLinks?.thumbnail,//will need to be sized consistently
      authors: this.props.book.authors,
      publish: this.props.book.publishedDate,
      categories: this.props.book.categories,
    }
  }


  handleAddBook = e => {
    e.preventDefault()
    this.props.handleAddBook(this.state.formData)
  }

  handleRemoveBook = e => {
    e.preventDefault()
    this.props.handleRemoveBook(this.state.formData.api_id)
  }

  render() { 
    return (
      <>
      {/* this is where they need to be able to add to collection, and from there they add to different reading lists?? */}
        { this.props.userProfile?.book.some(book => book.api._id === this.state.formData.id) &&
          <button onClick={this.handleRemoveBook}>REMOVE BOOK</button>
          // <MenuButton onClick={this.handleRemoveBook} />
        }
        { !this.props.userProfile?.Book.some(book => book.api_id === this.state.formData.id) &&
          <button onClick={this.handleAddBook}>ADD BOOK</button>
          //<MenuButton onClick={this.handleAddBook} />
        }
      </>
    );
  }
}
 
export default BookForm;