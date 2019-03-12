import React, { Component, Fragment  } from 'react'
import { handleSavePost } from '../actions/posts'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { _toMap, _fromJsonToArray } from '../utils/helpers'

class PostEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.post,
            toHome: false,
            submitedFlag: false,
        }     
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

        const { title , body , category, id, author } = this.state

        // Update Post on Store
        this.props.dispatch(handleSavePost(title , body , category, author, id))
   
        this.setState(() => ({
            toHome: id ? false : true, submitedFlag: true,
        }))
    }
    render() {

        if (this.state.id === null || this.state.id === undefined) {
            return <Redirect to='/404' />
        }

        const { title, body, toHome, author} = this.state

        if (toHome === true) {
            return <Redirect to={"/"}   />
        }

        const postLeft = 280 - body.length

        return (
            <Fragment>
            <div>
                <div>
                    <h3 className='center'>Edit Post</h3>
                </div>

            <form className='new-post' onSubmit={this.handleSubmit}>
            
                <Fragment>
                    <input type='text' id='title' placeholder='Enter Post title...'
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
              
                <textarea id="body"
                    placeholder="What's happening?"
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
                    { this.state.submitedFlag &&
                        <p>Your post was updated.</p>
                    }
                </form>
            </div>
             </Fragment>
        )
    }
}
function mapStateToProps ({posts, categories}, props) {
    let postsArray = [];
    if (Array.isArray(posts)) {
      postsArray = posts;
    }else{
      postsArray = _fromJsonToArray(posts);
    }
    return {
      categories,
      post: _toMap(postsArray).get(props.match.params.id),
    }
  }

export default connect(mapStateToProps)(PostEdit)