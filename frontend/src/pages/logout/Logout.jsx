import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Logout extends Component {
  state = {
    success: false,
    failure: false,
  }
  
  componentDidMount() {
    setTimeout(() => {
      
      localStorage.removeItem('token');
      this.props.onChange(undefined);
      this.setState({ success: true });
    } ,2000);
  }
  
  render() {
    const { success } = this.state;
    
    if (success) {
      return <Redirect to='/' />
    }
        
    return (
      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h3>Securely logging you out...</h3>
      </div>
    )
  }
}