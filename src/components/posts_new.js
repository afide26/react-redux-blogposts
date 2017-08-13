import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsNew extends Component {
  renderError(field) {
    if (field.meta.error) {
      return (
        <div className="alert alert-danger" role="alert">
          {field.meta.error}
        </div>
      );
    }
  }
  renderField(field) {
    return (
      <div className="form-group">
        <label htmlFor="title">
          {field.label}:
        </label>
        <input type="text" {...field.input} className="form-control" />
        {this.renderError}
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
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
  PostsNew
);
