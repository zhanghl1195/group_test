import React, { Component } from 'react';
import styles from './index.less';
import propTypes from 'prop-types';

export default class Comment extends Component {
  static propTypes = {
    comment: propTypes.object.isRequired,
    onDeleteComment: propTypes.func,
    index: propTypes.number,
  };

  constructor() {
    super();
    this.state = {
      timeString: '',
    };
  }

  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(this._updateTimeString.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _updateTimeString() {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeString:
        duration > 60
          ? `${Math.round(duration / 60)} 分钟前`
          : `${Math.round(Math.max(duration, 1))} 秒前`,
    });
  }

  _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  handleDeleteComment = () => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  };

  render() {
    //console.log('test1:',this.props.comment)
    return (
      <div className={styles.comment}>
        <div className={styles.commentUser}>
          <span>{this.props.comment.username}</span>:
          
        </div>
        {/* <p>{this.props.comment.content}</p> */}
        <p dangerouslySetInnerHTML={{
            __html: this._getProcessedContent(this.props.comment.content)}} 
         />
        <span className={styles.commentCreatedtime}>{this.state.timeString}</span>
        <span className={styles.commentDelete} onClick={this.handleDeleteComment}>
          删除
        </span>
      </div>
    );
  }
}
