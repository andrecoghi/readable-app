import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  RECEIVE_COMMENTS,
} from "../actions/comments";

export default function comments(state = {}, action) {
  const { comment, comments } = action;
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: comments.reduce((accu, curr) => {
          accu[curr.id] = curr;
          return accu;
        }, {})
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment
        }
      };
      case EDIT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment
        }
      };   
      case DELETE_COMMENT:
      return {
        ...state,
        comments:  Object.keys(state.comments).reduce((result, key) => {
          if (key !== action.comment.id) result[key] = state.comments[key];
          return result;
      }, {})
      };
    default:
      return state;
  }
}
