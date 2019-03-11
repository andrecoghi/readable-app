import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <div className='wrap-content'>
          <div className='content-container'>
            <h3>Page Not Found</h3>
            <p>Even the things we love breaks sometimes...</p>
            <br />
            <p><Link to={`/`}>Go to Home</Link></p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default PageNotFound