import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';


export class CheckEmail extends Component {
  render() {
    return (
      <div className='default-container' style={{flex: 1}}>
        <div>
        
        <h3>Check your email for a confirmation link.</h3>
        <p>Need to get a new link? <Link to='/resend-confirmation'>Click here</Link>.</p>
        </div>
      </div>
    )
  }
}