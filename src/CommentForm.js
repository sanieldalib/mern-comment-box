//CommentForm.js
import React, { Component } from 'react'
import style from './style'

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = { author: '', text: ''};
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  updateComment(e){
    e.preventDefault();
    this.setState({toBeUpdated: !this.state.toBeUpdated});
  }
  handleCommentUpdate(e){
    e.preventDefault();
    let id = this.props.uniqueID;
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let comment = { author: author, text: text};
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: "",
      text: ""
 })
  }
  deleteComment(e) {
 e.preventDefault();
 let id = this.props.uniqueID;
 this.props.onCommentDelete(id);
 }
  handleAuthorChange(e){
    this.setState({ author: e.target.value });
  }
  handleTextChange(e){
    this.setState({ text: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    let newauthor = this.state.author.trim();
    let newtext = this.state.text.trim();

    if(!newauthor || !newtext) return;
    this.props.onCommentSubmit({author: newauthor, text: newtext});
    this.setState({author: '', text:''});
  }
  render() {
    return (
      <form style = { style.commentForm} onSubmit={ this.handleSubmit}>
        <input type = 'text' placeholder = 'Your Name' style = { style.commentFormAuthor} value = { this.state.author} onChange = {this.handleAuthorChange} />
        <input type = 'text' placeholder = 'Say Something' style = { style.commentFormText } value = { this.state.text } onChange = {this.handleTextChange}/>
        <input type = 'submit' style = {style.commentFormPost} value = 'post'/>
      </form>
    )
  }
}

export default CommentForm;
