import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from 'react-redux-loading-bar'
import PostNew from "./PostNew";
import PostEdit from "./PostEdit";
import TweetPage from "./TweetPage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";

class App extends Component {

  componentDidMount() {
     this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.loading === true ? null : (
              <div>
                <Nav />
                <Route path="/" exact component={Dashboard} />
                <Route path="/category/:category" exact component={Dashboard} />
                <Route path="/post/:id" exact component={TweetPage} />
                <Route path="/post/edit/:id" exact component={PostEdit} />
                <Route path="/new" exact component={PostNew} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: posts === null
  };
}

export default connect(mapStateToProps)(App);
