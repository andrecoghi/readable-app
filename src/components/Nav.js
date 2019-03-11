import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends Component {
  render() {

    const categoriesArray = _toArray(this.props.categories)

    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          {categoriesArray.length > 0 &&
            categoriesArray.map(category => (
              <li key={category.name}>
                <NavLink
                  to={`/${category.path}`}
                  activeClassName="active"
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          <li>
            <NavLink to="/new" activeClassName="active">
              New Post
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

function _toArray(obj) {
    return Object.keys(obj).map(i => obj[i]);
}

export default connect(mapStateToProps)(Nav);
