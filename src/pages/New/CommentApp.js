import React, { PureComponent } from 'react';
import CommentInput from '@/components/CommentInput';
import CommentList from '@/components/CommentList';
import styles from './CommentApp.less';

class CommentApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      comments: [],
    };
  }

  componentWillMount() {
    this._loadComments();
  }

  _loadComments() {
    let comments = localStorage.getItem('comments');
    if (comments) {
      comments = JSON.parse(comments);
      this.setState({ comments: comments });
    }
  }

  _saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  handleSubmitComment = comment => {
    const { comments } = this.state;

    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');

    let temp = [...comments, comment];
    this.setState({ comments: temp });
    this._saveComments(temp);
  };

  handleDeleteComment = index => {
    //console.log("delete");
    const tmp = this.state.comments;
    tmp.splice(index, 1);
    console.log('comments:', tmp);
    this.setState({
      comments: [...tmp],
      //comments:tmp
    });
    this._saveComments(tmp);
  };

  render() {
    const { comments } = this.state;
    console.log('test:', comments);

    return (
      <div className={styles.wrapper}>
        <CommentInput onSubmit={this.handleSubmitComment} />
        <CommentList comments={comments} onDeleteComment={this.handleDeleteComment} />
      </div>
    );
  }
}

export default CommentApp;
