import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import InvoiceList from '../components/InvoiceList';

import GroupLogo from '../assets/Group 20399.svg';
import CompanyLogo from '../assets/logo.svg';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '2vw',
    paddingRight: '2vw',
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.2rem',
    color: '#FFFFFF'
  },
  listArea: {
    background: '#273D49CC',
    padding: '1vw',
  }
}));

const CollectorDashboard = (props) => {
  
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid
        container
        style={{ height: '15vh' }}
        alignItems="center"
        direction="row"
      >
        <Grid item sm={5}>
          <img src={GroupLogo} alt="GroupLogo"/>
        </Grid>
        <Grid item sm={7}>
          <img src={CompanyLogo} alt="CompanyLogo"/>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title}>Invoice List</Typography>
      </Grid>
      <Grid container direction="column">
        <Paper className={classes.listArea}>
          <InvoiceList />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CollectorDashboard;
