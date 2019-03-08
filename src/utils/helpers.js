export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function _toArray(obj) {
  return Object.keys(obj).map(i => obj[i]);
}

export function _toMap(obj) {
  let map = new Map();
      for (let val of Object.values(obj)) {
        map.set(val.id,val)
      }
  return map;
}

export function _fromJsonToArray(obj) {
      if(obj.posts)
        return Object.keys(obj.posts).map((postId => obj.posts[postId]));
      return []
}

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatTweet (post, authedUser, parentPost) {
  
  const { id, author, category, voteScore, commentCount, body, timestamp, title } = post
  return {
    id,
    timestamp,
    body,
    author,
    title,
    authedUser,
    category,
    commentCount: commentCount,
    voteScore,
    parent: !parentPost ? null : {
      author: parentPost.author,
      id: parentPost.id,
    }
  }
}

// function for dynamic sorting
export function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}
