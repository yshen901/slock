import React from "react";
import { Link } from 'react-router-dom';
import AuthNav from './auth_nav';
import AuthFooter from './auth_footer';

class UserSigninForm extends React.Component {
  constructor(props) {
    super(props);

    // this.props.workspace_address is from the url params and is taken in using withRouter.
    //     to dry up code, I have moved this prop into the container
    this.state = {
      workspace_address: this.props.workspace_address,
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.createGreeting = this.createGreeting.bind(this);
  }

  // TODO2: How to do this without double action
  componentDidMount() {
    this.props.getWorkspace(this.props.workspace_address)
      .then(
        null,
        () => this.props.history.push('/signin')
      )
  }

  /* NOTE: ALTERNATIVE WAY TO REDIRECT
      CHANGING PROPS WILL TRIGGER A RE-RENDER OF THE FIRST THING IN HISTORY
      THIS WAY AVOIDS HAVING TO PASS AROUND STUFF, AND RENDER/HANDLESUBMIT CAN BE SEPARATE
  */
  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state)
      .then(
        // () => this.props.history.push('/'),
        () => this.props.history.push(`/workspace/${this.state.workspace_address}`),
        () => this.setState({state: this.state})
      )
  }

  updateForm(type) {
    return (e) => this.setState({ [type]: e.currentTarget.value })
  }

  createGreeting() {
    let address = this.state.workspace_address.split('-');
    return `${this.props.formType} to ${address.join(' ')}`;
  }

  render() {
    let greeting = this.createGreeting();
    let error_class = "auth-errors hidden"
    if (getState().errors.session.length > 0)
      error_class = "auth-errors"
    return (
      <div className="auth-page" id='user-signin'>
        <AuthNav />
        <div className={error_class}>
          <h6>!!!</h6>
          <h6> Sorry, you entered an incorrect email address or password.</h6>
        </div>
        <div className='auth-box'>
          <div className="auth-greeting">
            <h1>{greeting}</h1>
            <br/>
            <h4>Enter your <strong>email address</strong> and <strong>password.</strong></h4>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" 
              onChange={this.updateForm('email')}
              placeholder="you@example.com"/>
            <input type="password"
              onChange={this.updateForm('password')}
              placeholder="password" />
            <input type="submit" value="Sign In"/>
          </form>
          <h4 className="auth-box-footer">
            <Link to='/tbd' className='auth-form-link'>Forgot your password?</Link>
            &bull;
            <Link to='/tbd' className='auth-form-link'>Forgot which email you used?</Link>
          </h4>
        </div>
        <AuthFooter />
      </div>
    )
  }
}

export default UserSigninForm;