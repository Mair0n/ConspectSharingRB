import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import config from '../../config.json';

class FacebookButton extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    onFailure = (error) => {
      alert(error);
    };

    facebookResponse = (response) => {
        console.log(response);
    };

    render() {

        return (
            <div>
                <FacebookLogin
                    appId={config.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.facebookResponse} />
            </div>
        );
    }
}

export default FacebookButton;