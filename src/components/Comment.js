import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatDate, _toMap } from '../utils/helpers'
import { handleCommentVote, handleDeleteComment } from '../actions/comments'
import { withRouter } from 'react-router-dom'
import CommentForm from './CommentForm'


class Comment extends Component {
    state = {
        editMode: null,
      }
    
      handleVote = (e) => {
        const { dispatch, id } = this.props
        const voteType = e.target.id
        dispatch(handleCommentVote(id, voteType))
    }

    handleDelete = (e, comment) => {
        e.preventDefault()
        const { dispatch} = this.props
        dispatch(handleDeleteComment(comment))
    }

    handleEdit = (e, commentId) => {
        e.preventDefault()
        this.setState(() => ({
            editMode: this.state.editMode === commentId ? null : commentId
        }))
      }

    render() {
        const { comment } = this.props

        if (comment === null) {
            return <p>This Comment doesn't exist</p>
        }

        const {voteScore, body, timestamp, author} = comment

        return (
                   <Fragment>
                        <div className='comment-list-votescore'> 
                            <div>
                                <div>{formatDate(timestamp)}</div>
                                <div>By @{author} </div>
                                <p>{body}</p>
                            </div>

                            <button id="upVote" onClick={this.handleVote} 
                                className='button-action comment-list-vote comment-list-vote-up'>Vote Up</button>
                                    <span className='comment-list-score'>{voteScore}</span>
                            <button id="downVote" onClick={this.handleVote} 
                                className='button-action comment-list-vote comment-list-vote-down'>Vote Down</button>

                            <div className='comment-actions'>
                            <button onClick={(e) => this.handleDelete(e, comment)} className='button-action'>Delete Comment</button>
                            <button onClick={(e) => this.handleEdit(e, comment.id)} className={'button-action'}>Edit Comment</button>
                            </div>   
                        </div> 
                        {this.state.editMode === comment.id &&
                                <CommentForm comment={comment} />
                        }
                   </Fragment>        
        )
    }
}

function mapStateToProps ({comments}, { id}) {
    let comment = {}
    if(comments){
        comment = _toMap(comments.comments).get(id);
    }

    return {
        category: comment ? comment.category : 'default_category',
        comment
    }
}

export default withRouter(connect(mapStateToProps)(Comment))