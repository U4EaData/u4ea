import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import classnames from "classnames";
import "../css/style.css"

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="center">
                <div className="login-message fade-in">
                    Sign up for U4Ea
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="text-input">
                        <div className="input-group mb-3">
                            <span className="red-text">{errors.name}</span>
                            <input
                                type="text"
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                placeholder="name"
                                className={classnames("form-control", {
                                    invalid: errors.name,
                                })
                                }
                                aria-label="name"
                                aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="text-input">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <span className="red-text">{errors.email}</span>
                            <input
                                type="text"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                placeholder="email"
                                className={classnames("form-control", {
                                    invalid: errors.email,
                                })
                                }
                                aria-label="email"
                                aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="text-input">
                        <div className="input-group mb-3">
                            <span className="red-text">{errors.password}</span>
                            <input
                                type="text"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                placeholder="password"
                                className={classnames("form-control", {
                                    invalid: errors.password,
                                })
                                }
                                aria-label="password"
                                aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="text-input">
                        <div className="input-group mb-3">
                            <span className="red-text">{errors.password2}</span>
                            <input
                                type="text"
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                placeholder="password2"
                                className={classnames("form-control", {
                                    invalid: errors.password2,
                                })
                                }
                                aria-label="password2"
                                aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-dark login-button">
                            Sign up
              </button>
                    </div>
                </form>
                <p>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
