import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, _toMap, _fromJsonToArray} from '../utils/helpers'
import { handlePostVote, handleDeletePost } from '../actions/posts'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaComment  } from 'react-icons/lib/fa';

class Post extends Component {

     handleVote = (voteType) => {
        const { dispatch, id } = this.props
        dispatch(handlePostVote(id, voteType))
    }

    handleDelete = (e) => {
        e.preventDefault()
        const { dispatch, id } = this.props
        dispatch(handleDeletePost(id))
        this.props.history.push('/');
    }    

    handleEdit = (id) => {
        this.props.history.push(`/post/edit/${id}`);
    }     

    render() {
        const { post, autheduser, id } = this.props
        
        //when we press F5 we lost the post
        if (!post) {
            return <Redirect to='/404' />
        }
       
        return (
                <div className="post-center">
                        <Link to={`/${post.category}/${id}`}>
                            <h3>{post.title}</h3>
                        </Link>

                        <div className='post'>                            
                            <div><p>{post.category}</p></div>
                            <div>{formatDate(post.timestamp)} <FaComment/> {post.commentCount !== 0 ? post.commentCount : 0}</div>
                            <div>By @{autheduser} </div>
                        </div>
                            <div className='actionButtons'>
                                <div className="column" id="edit" onClick={() => this.handleEdit(post.id)}>
                                    <FaEdit/> Edit
                                </div>
                                <div className="column" id="delete" onClick={this.handleDelete}>
                                     <FaTrash/> Delete
                                </div>
                            </div>                                                      
                                <p>{post.body}</p>
                            
                                <div className='actionButtons'>
                                    <div className="column" id="upVote" onClick={() => this.handleVote('upVote')}>
                                        <FaThumbsUp/> UpVote
                                    </div>
                                    <div className="column">
                                        <span className='post-score-inner'>
                                                {post.voteScore}    
                                        </span>
                                    </div>                                
                                    <div className="column" id="downVote" onClick={() => this.handleVote('downVote')}>
                                        DownVote <FaThumbsDown/>
                                    </div>
                                </div>                                 
                                                                             
                </div> 
        )
    }
}

function mapStateToProps ({autheduser, posts}, {id}) {
    let postsArray = [];
    if (Array.isArray(posts)) {
      postsArray = posts;
    }else{
      postsArray = _fromJsonToArray(posts);
    }
    return {
        autheduser,
        post: _toMap(postsArray).get(id),
        id,
    }
}

export default withRouter(connect(mapStateToProps)(Post))