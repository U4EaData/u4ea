import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/gamify.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            feelings: [],
            boosts: [],
            activities:
                [],
            feeling: "",
            boost: "",
            activity: "",
            playing: false,
            paused: false,
            frequency: "",
            id: "",
            frequencies: [],
            isfeelingOpen: false,
            isBoostOpen: false,
            isActivityOpen: false,
        }
    }



    render() {

        /* isPlalyable */
        const playable = ((this.state.feeling !== "") &&
            (this.state.boost !== "") &&
            (this.state.activity !== ""))

        /* Disable/enable play button based on isPlayable */
        let player;
        if (playable) {
            if (this.state.playing) {
                player = <button className="btn btn-default btn-circle glyphicon glyphicon-pause" onClick={this.handlePause}></button>
            } else {
                player = <button className="btn btn-default btn-circle glyphicon glyphicon-play-circle" onClick={this.handlePlay}></button>
            }
        } else {
            player = <button className="btn btn-default btn-circle glyphicon glyphicon-play-circle" disabled></button>
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <div className="nav-title-text">
                            U4Ea
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                    <span>
                        {/* Coins */}
                    </span>
                    <span>
                        Avatar
                    </span>
                    <span>
                        <a className="nav-link" href="#">Premium</a>
                    </span>
                    <span>
                        <a className="nav-link" href="#">Get iOS App</a>
                    </span>
                </nav>
                <div className="main-body">
                    <div className="welcome-message fade-in">
                        Welcome, User
                    </div>
                    <div className="left-side">
                        <div className="section">
                            <div className="section-text">
                                Recommended for you

                            </div>
                        </div>
                        <div className="section">
                            <div className="section-text">
                                What others are listening to

                            </div>                    </div>
                        <div className="section">
                            <div className="section-text">
                                Achievements
                            </div>
                        </div>
                    </div>
                    <div className="right-side">

                    </div>
                </div>
                <div className="bg-light play-bar">
                    {player}
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    auth: state.auth,
  });
  export default connect(mapStateToProps, { logoutUser })(Dashboard);