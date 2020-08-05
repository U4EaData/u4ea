import React, { Component } from "react";

import Header from "./Header.js"
import "../css/style.css";


class SelectPage extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="center">
                    <button className="btn btn-light">
                        <a href="/webapp">
                        Take me to the simple version
                        </a>

                    </button>
                    <button className="btn btn-light">
                    <a href="/login">
                        Login/Sign Up
                        </a>

                    </button>
                </div>
            </div>
        )
    }
}

export default SelectPage;