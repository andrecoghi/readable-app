import {
  fetchCommentsByPostId,
  addComment,
  fetchCommentVote,
  fetchDeleteComment,
  fetchEditComment
} from "../utils/api";
import { generateUID } from "../utils/helpers";

export const INCREASE_COMMENT_VOTES = "INCREASE_COMMENT_VOTES";
export const DECREASE_COMMENT_VOTES = "DECREASE_COMMENT_VOTES";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";


export const edit_comment = comment => {
  return {
    type: EDIT_COMMENT,
    comment
  };
};

export function receiveCommentsForPost(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

function addCommentAction(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId
  };
}

function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  };
}

function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export function handleEditComment(comment) {
  return dispatch => {
    comment.timestamp = Date.now();
    return fetchEditComment(comment)
      .then(() => {
        dispatch(editComment(comment));
      })
      .catch(error => console.warn(error));
  };
}
export function handleDeleteComment(comment) {
  return dispatch => {
    return fetchDeleteComment(comment.id)
      .then(() => {
        dispatch(deleteComment(comment));
      })
      .catch(error => {
        console.warn(error);
      });
  };
}

export function handleCommentVote(commentId, option) {
  return dispatch => {
    return fetchCommentVote(commentId, option)
      .then(comment => {
        dispatch(edit_comment(comment));
      })
      .catch(error => {
        console.warn(error);
      });
  };
}

export function handleComments(postId) {
  return dispatch => {
    return fetchCommentsByPostId(postId).then(comments => {
      dispatch(receiveCommentsForPost(comments));
    });
  };
}

export function handleAddComment(postId, body) {
  return (dispatch, getState) => {
    const { autheduser } = getState();

    const commentData = {
      id: generateUID(),
      timestamp: Date.now(),
      body,
      author: autheduser,
      parentId: postId,
      voteScore: 0,
      deleted: false,
      parentDeleted: false
    };

    return addComment(commentData)
      .then(comment => {
        dispatch(addCommentAction(comment, postId));
      })
      .catch(error => console.warn(error));
  };
}
