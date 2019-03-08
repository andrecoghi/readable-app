import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _fromJsonToArray, compareValues } from '../utils/helpers'
import Tweet from './Tweet'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
          order: "asc",
        };
      }

      handleOrderPosts = (e) => {
        const { postsArray } = this.props;
        postsArray.sort(compareValues('voteScore', this.state.order));
        this.state.order === "asc" ? this.setState({ order: "desc" }) : (this.state.order === "desc" ? this.setState({ order: "asc" }) : this.setState({ order: "desc" }))
    }
    
    render() {
        const { postsArray } = this.props;
        let result = [];
        
        const { category } = this.props.match.params;

        if(category){
            result = postsArray.filter(data => data.category === category);
        }else{
            result = postsArray;
        }

        return (
            
            <div>
                <h3 className='center'>Post List</h3>
                <button id="orderPosts" onClick={(e) => this.handleOrderPosts(e)} >Order by date</button>
                <ul className='dashboard-list'>
                    {result && result.length > 0 &&
                        result.map(post => (
                        <li key={post.id} className='post-list-item'>
                            <Tweet id={post.id}></Tweet>
                        </li>
                        ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({posts}) {

    let postsArray = [];
    if(posts){
        postsArray = _fromJsonToArray(posts)
    }
    return {
        postsArray
    }
}

export default connect(mapStateToProps)(Dashboard)
