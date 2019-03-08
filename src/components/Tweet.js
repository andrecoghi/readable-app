import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate, _toArray, _toMap, _fromJsonToArray} from '../utils/helpers'
import { handlePostVote, handleDeletePost, handleSavePost } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {

     handleVote = (e) => {
        const { dispatch, id } = this.props
        const voteType = e.target.id
        dispatch(handlePostVote(id, voteType))
    }

    handleDelete = (e) => {
        e.preventDefault()
        const { dispatch, id } = this.props
        dispatch(handleDeletePost(id))
    }    

    handleEdit = (e) => {
        e.preventDefault()
        const { dispatch, id } = this.props
        dispatch(handleSavePost(id))
    }     

    render() {
        const { post, autheduser, id } = this.props

        if (post === null || post === undefined) {
            return <p>We are having some trouble to load...</p>
        }

        return (
                <div className='tweet-info'>
                            <Link to={`/post/${id}`} className='tweet' className="no-border">
                                <h3>{post.title}</h3>
                            </Link>
                            <div><p>{post.category}</p></div>
                            <div>{formatDate(post.timestamp)} Comments: {post.commentCount !== 0 && post.commentCount}</div>
                            <div>By @{autheduser} </div>
                            <div className='post-actions'>
                                <Link to={`/post/edit/${id}`} className='tweet' className="no-border">
                                    <button className='button-action'>Edit Post</button>
                                </Link>
                                <button onClick={this.handleDelete} className='button-action'>Delete Post</button>
                            </div>                            
                                <p>{post.body}</p>
                            <div>
                                <div className='post-votescore'>
                                    <button id="upVote" onClick={this.handleVote} 
                                        className='post-vote post-vote-up'>Vote Up</button>
                                        <span className='post-score'>
                                            <span className='post-score-inner'>
                                            {post.voteScore}
                                            </span>
                                        </span>
                                    <button id="downVote" onClick={this.handleVote} 
                                        className='post-vote post-vote-down'>Vote Down</button>
                                </div> 
                            </div>                                                     
                </div> 
        )
    }
}

function mapStateToProps ({autheduser, posts}, { id}) {
    return {
        autheduser,
        post: _toMap(_fromJsonToArray(posts)).get(id),
        id
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))