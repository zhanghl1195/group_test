import React, { Component } from 'react';
import styles from './index.less';
import propTypes from 'prop-types';

export default class CommentInput extends Component {
  static propTypes = {
    onSubmit: propTypes.func,
  };

  constructor() {
    super();
    this.state = {
      username: '',
      content: '',
    };
  }

  componentWillMount() {
    this._loadUsername();
  }

  componentDidMount() {
    this.textarea.focus();
  }

  //私有方法以_开头 该方法用来持久化用户名
  _saveUsername(username) {
    localStorage.setItem('username', username);
  }

  _loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username: username });
    }
  }

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value,
    });
  };

  handleUsernameBlur = e => {
    this._saveUsername(e.target.value);
  };

  handleContentChange = e => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = () => {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({
        username: username,
        content: content,
        createdTime: +new Date(),
      });
    }
    this.setState({
      content: '',
      //username:''
    });
  };

  render() {
    return (
      <div className={styles.commentInput}>
        <div className={styles.commentField}>
          <span className={styles.commentFieldName}>用户名：</span>
          <div className={styles.commentFieldInput}>
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleUsernameBlur}
            />
          </div>
        </div>
        <div className={styles.commentField}>
          <span className={styles.commentFieldName}>评论内容：</span>
          <div className={styles.commentFieldInput}>
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange}
              ref={textarea => (this.textarea = textarea)}
            />
          </div>
        </div>
        <div className={styles.commentFieldButton}>
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    );
  }
}
