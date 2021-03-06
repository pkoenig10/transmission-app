import * as React from "react";
import {Link} from "react-router-dom";

export class TransmissionNavbar extends React.PureComponent<{}, {}> {
    render() {
        return (
            <nav className="navbar navbar-full navbar-fixed-top navbar-light">
                <Link className="navbar-brand" to="/">
                    <img className="navbar-logo" src={require("../images/transmission.png")}/>
                    <span> Transmission</span>
                </Link>
                <div className="nav navbar-nav float-xs-right">
                    <button type="button" className="nav-item nav-button btn btn-sm btn-success" data-toggle="modal" data-target="#add-torrents-modal">
                        <i className="material-icons">add_circle_outline</i>
                        <span> Add</span>
                    </button>
                    <Link className="nav-item nav-link" to="/settings">
                        <i className="material-icons">settings</i>
                        <span> Settings</span>
                    </Link>
                </div>
            </nav>
        );
    }
}
