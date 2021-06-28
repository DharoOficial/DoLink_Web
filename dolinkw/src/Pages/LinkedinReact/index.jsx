import React, { Component } from 'react';
import {  LinkedIn  } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

class LinkedInPage extends Component {
    state = {
      code: '',
      errorMessage: '',
    };
  
  
    handleSuccess = (data) => {
      this.setState({
        code: data.code,
        errorMessage: '',
      });
    }
  
    handleFailure = (error) => {
      this.setState({
        code: '',
        errorMessage: error.errorMessage,
      });
    }
    
    render() {
      const { code, errorMessage } = this.state;
      return (
        <div>
          <LinkedIn
            clientId="78uhsx2xachf35"
            onFailure={this.handleFailure}
            onSuccess={this.handleSuccess}
            scope="r_liteprofile"
            redirectUri="http://localhost:3000/"
          >
            <img src={linkedin} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
          </LinkedIn>
          {code && <div>Code: {code}</div>}
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      );
    }
  }
  
  export default LinkedInPage;