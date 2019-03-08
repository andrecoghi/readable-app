import React, { Component, Fragment  } from 'react'
import { handleSavePost } from '../actions/tweets'
import { handleAddComment } from '../actions/comments'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class PostNew extends Component {


    state = {
        title: '' ,
		body: '' ,
		category: '' ,
        toHome: false,
        submitedFlag: false,
    }
    //generic handleChange
    handleChange = (e) => {
        const stateItem = e.target.id
        const value = e.target.value
        this.setState(() => ({
            [stateItem]: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { title , body , category  } = this.state
        const { dispatch, id, comment} = this.props
        
        if(comment){
            // Add Comment to Store
            dispatch(handleAddComment(id , body))
        }else{
            // Add Post to Store
            dispatch(handleSavePost(title , body , category, id))
        }
        this.setState(() => ({
            title: '' , body: '',
            toHome: id ? false : true, submitedFlag: true,
        }))
    }
    render() {
     
        const { title, body, toHome} = this.state
        const { comment} = this.props

        if (toHome === true) {
            return <Redirect to={"/"}   />
        }

        const tweetLeft = 280 - body.length

        return (
            <Fragment>
            <div>
                {!comment && (
                    <div>
                        <h3 className='center'>Compose new Post</h3>
                    </div>
                )}  
                {comment && (
                    <div>
                        <h3 className='center'>Send a comment</h3>
                    </div>
                )}  
            <form className='new-tweet' onSubmit={this.handleSubmit}>
            {!comment && (
                <Fragment>
                    <input type='text' id='title' placeholder='Enter Post title...'
                            value={title} onChange={this.handleChange} required/>   
                    <select onChange={this.handleChange} value={this.state.category} id='category' required>
                        <option value="">Choose a category</option>
                            {Object.keys(this.props.categories).map(category =>
                            <option value={this.props.categories[category].path} 
                                key={this.props.categories[category].path}>
                                {this.props.categories[category].path}
                            </option>
                        )}
                    </select>  
                </Fragment>
                )}  
                <textarea id="body"
                    placeholder="What's happening?"
                    value={body}
                    onChange={this.handleChange}
                    className='textarea'
                    maxLength={280}
                />
                {tweetLeft <= 100 && (
                    <div className='tweet-length'>
                        {tweetLeft}
                    </div>
                )}
                <button
                    className='btn'
                    type='submit'
                    disabled={body === ''}>
                    Submit
                </button>
                </form>
            </div>
             </Fragment>
        )
    }
}
function mapStateToProps ({categories, comments}, { id, comment }) {

    return {
      categories,
      comments: comments,
      id,
      comment
    }
  }
  

export default connect(mapStateToProps)(PostNew)