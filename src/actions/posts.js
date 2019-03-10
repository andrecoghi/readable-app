import {
  savePost,
  fetchPost,
  fetchDeletePost,
  fetchPostVote,
} from "../utils/api";
import { generateUID } from "../utils/helpers";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const DELETE_POST = "DELETE_POST";
export const INCREASE_POST_VOTES = "INCREASE_POST_VOTES";
export const DECREASE_POST_VOTES = "DECREASE_POST_VOTES";
export const INCREASE_POST_COMMENT_COUNT = "INCREASE_POST_COMMENT_COUNT";
export const DECREASE_POST_COMMENT_COUNT = "DECREASE_POST_COMMENT_COUNT";
export const SORT_POST = "SORT_POST";


export function receive_posts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function receive_post(post) {
  return {
    type: RECEIVE_POST,
    post
  };
}

export const edit_post = post => {
  return {
    type: EDIT_POST,
    post
  };
};

function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  };
}

export function increasePostCommentCount (id) {
  return {
    type: INCREASE_POST_COMMENT_COUNT,
    id,
  }
}

export function decreasePostCommentCount (id) {
  return {
    type: DECREASE_POST_COMMENT_COUNT,
    id,
  }
}

export function handlePostVote(postId, option) {
  return dispatch => {
    return fetchPostVote(postId, option)
      .then(post => {
        dispatch(edit_post(post));
      })
      .catch(error => {
        console.warn(error);
      });
  };
}


export function handlePost(postId) {
  return dispatch => {
    return fetchPost(postId).then(post => {
      dispatch(receive_post(post));
    });
  };
}

export function handleDeletePost(postId) {
  return dispatch => {
    return fetchDeletePost(postId).then(() => {
      dispatch(deletePost(postId));
    });
  };
}

export function handleSavePost(title, body, category, id = null, idxPost = null) {
  return (dispatch, getState) => {
    const { autheduser } = getState();

    const post = {
      id: id ? id : generateUID(),
      title,
      body,
      author: autheduser,
      category,
      timestamp: Date.now(),
    };

    return savePost(post).then(post => {
      dispatch(showLoading());
      if(id){
        dispatch(edit_post(post));
      }else{
        dispatch(addPost(post));
      }
      dispatch(hideLoading());
    });
  };
}