import { Grid, Typography, Button } from '@mui/material';
import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  render() {
    return (
      <div className='dashboard-container'>
          <Grid container spacing={6}>
            <Grid item md={2}></Grid>
            <Grid item xs={10} md={8} sx={{marginTop: 10}}>
              <Typography variant='h2' align='center' sx={{fontWeight: 'bold'}}>Welcome To Maxwell Larimer's Playground</Typography>
              <div className='resume-container'>
              <Button style={{margin: 40}} color='primary' size='large' variant='contained'>Download Resume</Button>
              <object type="application/pdf"
                  data="https://s3.amazonaws.com/maxwelllarimer.com/resume/Maxwell-Larimer-Resume-Mar-2022.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  width="900"
                  height="1000">
              </object>
              </div>
              <Typography sx={{padding: 4}} variant='h4' align='left'> I am currently in the market for the following roles: <ul><li>DevOps Engineer</li><li>Cloud Engineer</li><li>Platform Engineer</li></ul></Typography>
            </Grid>
            <Grid item md={2}></Grid>
          </Grid>
      </div>
    )
  }
}