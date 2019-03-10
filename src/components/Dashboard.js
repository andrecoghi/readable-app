import React, { Component } from "react";
import { connect } from "react-redux";
import {
  _fromJsonToArray,
  compareValues,
  getSortedFields
} from "../utils/helpers";
import Post from "./Post";

const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      columnToSort: '',
      sortDirection: 'desc'
    };
  }

  handleOrderPosts = e => {
    const { postsArray } = this.props;

    //toggle
    this.setState({
      sortDirection:
        this.state.columnToSort === e.target.id
          ? invertDirection[this.state.sortDirection]
          : invertDirection[this.state.sortDirection],
      columnToSort: e.target.id,
    });
    
    postsArray.sort(
      compareValues(this.state.columnToSort  !== "" ? this.state.columnToSort : e.target.id, this.state.sortDirection)
    );
  };

  render() {
    const { postsArray } = this.props;
    let result = [];

    const { category } = this.props.match.params;

    if (category) {
      result = postsArray.filter(data => data.category === category);
    } else {
      result = postsArray;
    }

    
    return (
      <div>
        <h3 className="center">Post List</h3>
        <div className="posts-order">
        Sort by:
       
          {Array.from(getSortedFields(), ([key, value]) => (
            <button id={key} key={key} onClick={e => this.handleOrderPosts(e)} className='button-action'>
              {value}
            </button>
          ))}
          
        </div>

        <ul className="dashboard-list">
          {result &&
            result.length > 0 &&
            result.map(post => (
              <li key={post.id} className="post-list-item">
                <Post id={post.id} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  let postsArray = [];
  if (posts) {
    postsArray = _fromJsonToArray(posts);
  }
  return {
    postsArray,
    
  };
}

export default connect(mapStateToProps)(Dashboard);
