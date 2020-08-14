import React, { Component } from "react";

import "../css/style.css";


class SelectPage extends Component {

    render() {
        return (
            <div>
                <img src={require("../img/logo.png")}className="logo" alt="" />
                <div className="welcomeMessage fade-in">
                    Welcome to U4Ea, a Binaural Beats Generator. 
                    Try our simple beats player with the button on the left, 
                    or experience the mental health tracker by logging in. 
                </div>
                <div className="center">
                    <button className="btn btn-light">
                        <a href="/webapp" className="links">
                        Take me to the simple version
                        </a>

                    </button>
                    <button className="btn btn-light">
                    <a href="/login" className="links">
                        Login/Sign Up
                        </a>

                    </button>
                </div>
            </div>
        )
    }
}

export default SelectPage;