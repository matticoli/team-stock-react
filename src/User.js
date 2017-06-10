import React, {Component} from "react";

class User extends Component {
    render() {
        const signedOutUI = (
            <button id="sign-in"
                    className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                    onClick={this.signIn.bind(this)}>
                <div id="user-pic"><i className="material-icons">account_circle</i></div>
                <label className="">Sign In</label>
            </button>
        );

        const signedInUI = (
            <button id="sign-out"
                    className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                    onClick={this.signOut.bind(this)}>
                <div id="user-pic" style={{backgroundImage: 'url('+ (this.props.user && this.props.user.photoURL) +')'}}>
                </div>
                <label className="">Sign Out</label>
            </button>
        );

        return (
            <div id="user-container" className="container">
                <div className="navbar-header">
                    <div className="nav-obj">
                        {(this.props.user) ? signedInUI : signedOutUI}
                    </div>
                </div>
            </div>
        )

    }

    signIn() {
        this.props.firebase.auth().signInWithRedirect(new this.props.firebase.auth.GoogleAuthProvider());
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }
}

export default User;