import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/gamify.css"

class Dashboard extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="#">U4Ea</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Settings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">U4Ea Premium</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <div>Avatar Here</div>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log out</button>
                        
                    </form>
                </div>
            </nav>


        )
    }
}

export default Dashboard;