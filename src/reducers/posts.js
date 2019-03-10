import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  RECEIVE_POST,
  SORT_POST,
} from "../actions/posts";

import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comments';

export default function posts(state = {}, action) {
  const { posts, comment, post } = action;
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: posts.reduce((accu, curr) => {
          accu[curr.id] = curr;
          return accu;
        }, {})
      };
    case RECEIVE_POST:
      return {
        ...state,
        posts: {
          [action.post.id]: action.post
        }
      };
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };
    case EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };
    case DELETE_POST:
      return {
        ...state,
        posts: Object.keys(state.posts).reduce((result, key) => {
          if (key !== action.id) result[key] = state.posts[key];
          return result;
        }, {})
      };
      case ADD_COMMENT:
      return {
        ...state,
          posts: {
            ...state.posts,
            [comment.parentId]: {
              ...state.posts[comment.parentId],
              commentCount: state.posts[comment.parentId].commentCount + 1,
            }
        }
      };       
      case DELETE_COMMENT:
      return {
        ...state,
          posts: {
            ...state.posts,
            [comment.parentId]: {
              ...state.posts[comment.parentId],
              commentCount: state.posts[comment.parentId].commentCount - 1,
            }
        }
      }; 
    case SORT_POST:
      return {
        ...state,
        sortBy: action.sort
      };
    default:
      return state;
  }
}
