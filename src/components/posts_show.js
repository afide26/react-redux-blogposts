import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.showPost(id);
    }
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading....</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-success btn-xs pull-right">
          <i className="fa fa-chevron-left" /> Index
        </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          <i className="fa fa-trash post-delete" />
        </button>
        <h3>
          Title: {post.title}
        </h3>
        <h6>
          Categories: {post.categories}
        </h6>
        <p>
          {post.content}
        </p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { showPost, deletePost })(PostShow);
