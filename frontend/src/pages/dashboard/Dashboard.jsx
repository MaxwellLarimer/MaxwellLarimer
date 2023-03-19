import { Divider, Paper, Typography } from '@mui/material';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.css';


const EmptyDashboard = (props) => (
  <div className='dashboard-jumbotron'>
    <Paper sx={{padding: 3, margin: 3}}>
    <Typography variant='h3'>Welcome to RapidFire.</Typography>
    
    <Typography sx={{padding: 4}}>
      Content coming soon!
    </Typography>

    </Paper>
  </div>
)

export class Dashboard extends Component {
  state = {
  }
  
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ token });
    }
  }

  render() {
    const { token } = this.state;
    if (token === undefined) {
      return <Redirect to='/login' />;
    }
    
    
    return (
      <div className='dashboard-container'>
          <EmptyDashboard />
      </div>
    )
  }
}