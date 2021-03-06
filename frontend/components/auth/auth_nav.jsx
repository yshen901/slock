import React from 'react';
import { Link } from 'react-router-dom';
import { toggleElements } from '../../util/modal_api_util';

class AuthNav extends React.Component {
  right() {
    if (getState().session.user_id)
      return (
        <div className="right">
          <Link className="auth-nav-link" to="/tbd">Product</Link>
          <Link className="auth-nav-link" to="/tbd">Pricing</Link>
          <Link className="auth-nav-link" to="/tbd">Support</Link>
          <div id="auth-signin" onClick={(e) => {e.stopPropagation(); toggleElements("dropdown")}}>Your Workspaces</div>
        </div>
      )
    else
      return (
        <div className="right">
          <Link className="auth-nav-link" to="/tbd">Product</Link>
          <Link className="auth-nav-link" to="/tbd">Pricing</Link>
          <Link className="auth-nav-link" to="/tbd">Support</Link>
          <Link className="auth-nav-link" to="/tbd">Create a new workspace</Link>
          <Link className="auth-nav-link" to="/tbd">Find your workspace</Link>
          <Link id="auth-signin" to='/signin'>Sign In</Link>
        </div> 
      )
  }
  render() {
    return (
      <div className="nav">
        <div className="left">
          <Link className="logo" to='/'>
            <img src="/images/logo.jpg" />
          </Link>
        </div>
        {this.right()}
      </div>
    )
  }
}

export default AuthNav;