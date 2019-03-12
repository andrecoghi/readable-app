import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  RECEIVE_POSTS,
  RECEIVE_POST,
  SORT_POST
} from "../actions/posts";

import { ADD_COMMENT, DELETE_COMMENT } from "../actions/comments";

export default function posts(state = {}, action) {
  const { posts, comment, post } = action;
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: posts
      };
    case RECEIVE_POST:
      return {
        ...state,
        posts: {
          [post.id]: post
        }
      };
    case ADD_POST:
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          {
            id: post.id,
            timestamp: post.timestamp,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,
            voteScore: post.voteScore,
            deleted: post.deleted,
            commentCount: post.commentCount
          }
        ]
      });
    case EDIT_POST:
    return Object.assign({}, state, {
      posts: state.posts.map((post, index) => {
        if (index === state.posts.findIndex(post => post.id === action.post.id)) {
          return Object.assign({}, post, {
            timestamp: action.post.timestamp,
            title: action.post.title,
            author: action.post.author,
            body: action.post.body,
            category: action.post.category,
            voteScore: action.post.voteScore,
          })
        }
        return post
      })
    })
    case DELETE_POST:
      const idxPost = state.posts.findIndex(post => post.id === action.id);
      const postDelete = Object.assign({}, state.posts[idxPost], { deleted: true });
      let postResult = [...state.posts.slice(0, idxPost), postDelete, ...state.posts.slice(idxPost + 1)];
    return {
      ...state,
      posts: postResult
    };
    case ADD_COMMENT:
      const idxToIncrement = state.posts.findIndex(post => post.id === comment.parentId);
      const newPostAdd = Object.assign({}, state.posts[idxToIncrement], { commentCount: (state.posts[idxToIncrement].commentCount + 1) });
      let incrementResult = [...state.posts.slice(0, idxToIncrement), newPostAdd, ...state.posts.slice(idxToIncrement + 1)
    ];
    return {
      ...state,
      posts: incrementResult
    };
    case DELETE_COMMENT:
      const idxToDecrement = state.posts.findIndex(post => post.id === comment.parentId);
      const newPostDelete = Object.assign({}, state.posts[idxToDecrement], { commentCount: (state.posts[idxToDecrement].commentCount  -1) });
      let decrementResult = [...state.posts.slice(0, idxToDecrement), newPostDelete, ...state.posts.slice(idxToDecrement + 1)];
    return {
      ...state,
      posts: decrementResult
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
