import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { _toArray} from '../utils/helpers'

class Nav extends PureComponent {
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

export default connect(mapStateToProps)(Nav);
