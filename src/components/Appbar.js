import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style = {{backgroundColor: "#368BC1"}}>
        <Toolbar variant="dense">
          <img src= {logo}  className = {classes.logo}/>
          <Typography variant="h6" color="inherit">
            NAMIS DASHBOARDS
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}