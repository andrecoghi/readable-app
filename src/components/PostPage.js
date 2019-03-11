import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import PostNew from './PostNew'
import { _toArray, _toMap, _fromJsonToArray} from '../utils/helpers'
import { handleComments} from '../actions/comments'
import { Redirect } from 'react-router-dom'

class PostPage extends Component {

     componentDidMount() {
        this.props.dispatch(handleComments(this.props.match.params.id))
     }
   
    render() {
        const { id, comments, post} = this.props
        const comment = "COMMENT"

        if (post === null || post === undefined) {
            return <Redirect to='/404' />
        }
        return (
            <div>
                <Post id={id}  />
                <div className='separator'></div>
                <div className='comment-list'>
                    {comments && comments.length !== 0 && <h3 className='center'>Comments</h3>}
                        <ul>
                            {
                            comments.map((comment) => (
                                <li key={comment.id} className='comment-list-item'>
                                    <Comment id={comment.id} />
                                </li>
                                ))}
                        </ul>
                </div>
                <PostNew id={id} comment={comment} />
            </div>
        )
    }
}

function mapStateToProps ({comments, posts}, props) {
    let postsArray = [];
    if (Array.isArray(posts)) {
      postsArray = posts;
    }else{
      postsArray = _fromJsonToArray(posts);
    }

    const { id } = props.match.params

    let commentsArray = [];
    if(comments.comments){
        commentsArray = _toArray(comments.comments)
    }
    return {
        id,
        comments: commentsArray,
        post: _toMap(postsArray).get(id),
    }
}

export default connect(mapStateToProps)(PostPage)