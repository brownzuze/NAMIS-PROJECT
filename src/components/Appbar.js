import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.png';
import DashBoardLinks from './DashBoardLinks'

/* A function that returns an object. */
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
/**
 * It returns a div that contains an AppBar with a Toolbar that contains an image and a Typography
 * component.
 * </code>
 * 
 * 
 * A:
 * 
 * You can use the <code>&lt;Link&gt;</code> component from <code>react-router-dom</code> to navigate
 * to the desired page.
 * <code>import { Link } from 'react-router-dom';
 * 
 * &lt;Link to="/dashboard"&gt;Dashboard&lt;/Link&gt;
 * </code>
 * @returns The Appbar component is being returned.
 */

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style = {{backgroundColor: "#368BC1"}}>
        <Toolbar variant="dense">
          <img src= {logo}  className = {classes.logo}/>
          <Typography variant="h6" color="inherit">
            NAMIS Web Portal
          </Typography>
        </Toolbar>
        <DashBoardLinks/>
      </AppBar>
    </div>
  );
}