import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import classnames from "classnames";
import "../css/style.css"


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    const { history } = this.props;
    if (this.props.auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.auth.isAuthenticated) {
      history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="center">
        <div className="login-message fade-in">
          Login to U4Ea account
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="text-input">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
              <input 
              type="text" 
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              placeholder="email" 
              className={classnames("form-control", {
                invalid: errors.email || errors.emailnotfound,
              })}
              aria-label="email" 
              aria-describedby="basic-addon1" />
            </div>
          </div>
          <div>
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
            <br />
            <input 
              type="text" 
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              placeholder="password" 
              className={classnames("form-control", {
                invalid: errors.password || errors.passwordincorrect,
              })}
              aria-label="password" 
              aria-describedby="basic-addon1" />
          </div>
          <div>
            <button type="submit" className="btn btn-dark login-button">
              Log In
              </button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>

      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
