import * as uuid from "uuid";

const apiadress = "http://localhost:3001";

let token = localStorage.token;

if (!token) {
  token = uuid.v4();
  localStorage.setItem("token", token);
}

const headers = {
  Accept: "application/json",
  Authorization: token
};

export function getInitialData() {
  return Promise.all([getCategories(), getPosts()]).then(
    ([categories, posts]) => ({
      categories,
      posts
    })
  );
}
export function getAllCategories() {
  return Promise.all([getCategories()]).then(([categories]) => ({
    categories
  }));
}

export function fetchCommentsByPostId(postId) {
  return fetch(`${apiadress}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(comments => comments);
}

export const getCategories = () =>
  fetch(`${apiadress}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = () =>
  fetch(`${apiadress}/posts`, { headers })
  .then(res => res.json())
  .then(posts => posts);;

export function savePost(post) {
  return fetch(`${apiadress}/posts`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(post)
  }).then(response => response.json());
}

export function addComment(commentData) {
  return fetch(`${apiadress}/comments`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(commentData)
  })
    .then(res => res.json())
    .then(comment => comment)
    .catch(error => console.warn(error));
}

export function fetchPostVote(id, option) {
  return fetch(`${apiadress}/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(post => post)
    .catch(error => console.warn(error));
}

export function fetchCommentVote(id, option) {
  return fetch(`${apiadress}/comments/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(comment => comment)
    .catch(error => console.warn(error));
}

export function fetchDeleteComment(id) {
  return fetch(`${apiadress}/comments/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function fetchPost(postId) {
  return fetch(`${apiadress}/posts/${postId}`, { headers }).then(res => res.json());
}

export function fetchDeletePost(id) {
  return fetch(`${apiadress}/posts/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(error => console.warn(error));
}

export function fetchEditComment(comment) {
  return fetch(`${apiadress}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
  .then(data => data)
  .catch(error => console.warn(error))
}
