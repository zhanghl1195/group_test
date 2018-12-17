import React, { Component } from 'react';
//import CommentInput from './CommentInput';
//import CommentList from './CommentList';
import CommentInput from '@/components/CommentInput';
import CommentList from '@/components/CommentList';

export default class CommentApp extends Component {
  handleDeleteComment = index => {
    console.log(index);
  };

  render() {
    return (
      <div>
        {/* <CommentInput />
         <CommentList /> */}
        <CommentInput onSubmit={this.handleSubmitComment} />
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment} />
      </div>
    );
  }
}
