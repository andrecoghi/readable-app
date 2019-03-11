import React from 'react';
import { Link } from 'react-router-dom'

const PageNotFound = () => (
  <div className="error-container">
    <p>Page Not Found</p>
    <p>Even the things we love breaks sometimes...</p>
    <p><Link to={`/`}>Go to Home</Link></p>
</div>)

export default PageNotFound;