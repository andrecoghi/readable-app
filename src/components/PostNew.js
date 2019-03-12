import React, { Component, Fragment  } from 'react'
import { handleSavePost } from '../actions/posts'
import { handleAddComment } from '../actions/comments'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class PostNew extends Component {

    state = {
        title: '' ,
		body: '' ,
        category: '' ,
        author: '' ,
        toHome: false,
        submitedFlag: false,
    }

    handleChange = (e) => {
        const stateItem = e.target.id
        const value = e.target.value
        this.setState(() => ({
            [stateItem]: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { title , body , category, author } = this.state
        const { dispatch, id, comment} = this.props
        
        if(comment){
            dispatch(handleAddComment(id , body, author))
        }else{
            dispatch(handleSavePost(title , body , category, author, id))
        }
        this.setState(() => ({
            title: '' , body: '', author: '',
            toHome: id ? false : true, submitedFlag: true,
        }))
    }
    render() {
        const { title, body, toHome, author} = this.state
        const { comment} = this.props

            if (toHome === true) {
                return <Redirect to={"/"}   />
            }

            const postLeft = 280 - body.length

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
                    <form className='new-post' onSubmit={this.handleSubmit}>
                    {!comment && (
                        <Fragment>
                            <input type='text' id='title' placeholder='Enter title here...'
                                    value={title} onChange={this.handleChange} required/>   
                            <input type='text' id='author' placeholder='Enter your name here...'
                                    value={author} onChange={this.handleChange} required/>                                      
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
                        <input type='text' id='author' placeholder='Enter your name here...'
                            value={author} onChange={this.handleChange} required/>                                      

                        <textarea id="body"
                            placeholder="What are you thinking?"
                            value={body}
                            onChange={this.handleChange}
                            className='textarea'
                            maxLength={280}
                        />
                        {postLeft <= 100 && (
                            <div className='post-length'>
                                {postLeft}
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