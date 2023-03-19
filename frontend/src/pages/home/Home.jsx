import { Grid, Typography } from '@mui/material';
import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  render() {
    return (
      <div className='dashboard-container'>
          <Grid container spacing={6}>
            <Grid item md={2}></Grid>
            <Grid item xs={10} md={8} sx={{marginTop: 10}}>
              <Typography variant='h2' align='center' sx={{fontWeight: 'bold'}}>Welcome to RapidFire</Typography>
              <Typography sx={{padding: 4}} variant='h4' align='center'>Complete Counter-Threat Finance investigation Toolkit for Counter-Threat Finance, KYC, and AML Investigative Professionals.</Typography>
            </Grid>
            <Grid item md={2}></Grid>
          </Grid>
      </div>
    )
  }
}