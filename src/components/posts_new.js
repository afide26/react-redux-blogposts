import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, addPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error, invalid } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ' '}`;
    return (
      <div className={className}>
        <label htmlFor="title">
          {field.label}:
        </label>
        <input type="text" {...field.input} className="form-control" />
        <div
          className={
            'action' + (invalid && touched ? ' alert alert-danger' : ' ')
          }
          role="alert"
        >
          {touched ? error : ' '}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.addPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title" name="title" component={this.renderField} />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-success btn-sm">
          <i className="fa fa-plus" /> Submit
        </button>
        <Link className="btn btn-primary btn-sm" to="/">
          <i className="fa fa-chevron-left" /> Back
        </Link>
      </form>
    );
  }
}

function validate(values) {
  //declare errors as object
  const errors = {};
  //Validate inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title that is at least 3 characters';
  }

  if (!values.categories) {
    errors.categories = 'Enter a category';
  }

  if (!values.content) {
    errors.content = 'Enter a content';
  }

  return errors;
}

export default reduxForm({ form: 'PostsNewForm', validate: validate })(
  connect(null, { addPost })(PostsNew)
);
