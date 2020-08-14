import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/header.css"

class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-light bg-light">
                <ul className="nav navbar-nav navbar-left">
                    <li>
                        <a className="navbar-brand" href="#">
                            <img src={require("../img/logo.png")} width="30" height="30" className="d-inline-block align-top" alt="" />
                        </a>
                    </li>
                </ul>
                <div className="title">
                    <h1>
                    U4Ea Web App

                    </h1>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="https://itunes.apple.com/us/app/u4ea/id1276634916?mt=8">
                            <button type="button" className="btn btn-success btn-rounded">Download for iOS</button>
                        </a>
                    </li>
                </ul>
            </div>

        )
    }
}

export default Header;