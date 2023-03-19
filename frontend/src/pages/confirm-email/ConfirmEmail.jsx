import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { api } from '../../components/api';
import './style.css';


export class ConfirmEmail extends Component {
  state = {
    success: false,
    failure: false,
  }
  
  componentDidMount() {
    const values = this.props.match.params;
    console.log(values);
    api.post('/users/confirm-email', values).then(result => {
      const { token, success } = result.data;
      if (success) {
        localStorage.setItem('token', token);
        this.props.onChange(token);
      }
      this.setState({ success });
    }).catch(result => {
      console.log(result);
      // get errors and optional redirect path from server
      const { redirect, message, ...errors } = result.response.data;
      
      // if redirect exists, grab the first error and set it to the redirect link.
      // BUG: if there's multiple errors, this will only set the link to the first one, which may not match. will need to standardize.
      if (redirect) {
        errors[Object.keys(errors)[0]] = <div>{errors[Object.keys(errors)[0]]} <Link to={'/' + redirect}>{message}</Link></div>;
      }
      
      this.setState({ errors });
    });
  }
  
  render() {
    const { success, errors } = this.state;
    
    if (success) {
      return <Redirect to='/dashboard' />
    }
    
    // if we've got errors, then iterate through them and display them.
    if (errors !== undefined) {
      var errors_array = [];
      for (const [key, val] of Object.entries(errors)) {
          errors_array.push(val);
      }
      return (
        <div>
          {errors_array.map(val => {
            return val;
          })}
        </div>
      )
    }
    
    return (
      <div className='default-container'>
        <h3>Confirming email. Please wait...</h3>
      </div>
    )
  }
}