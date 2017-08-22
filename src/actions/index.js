import axios from 'axios';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=alan1126';
export const FETCH_POSTS = 'fetch_posts';
export const ADD_POST = 'add_post';
export const SHOW_POST = 'show_post';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function addPost(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());

  return {
    type: ADD_POST,
    payload: request
  };
}

export function showPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: SHOW_POST,
    payload: request
  };
}
