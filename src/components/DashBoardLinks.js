import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from '@material-ui/core';
import styles from '../App.module.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import {useState, useEffect} from 'react'
import {getDashboards} from '../api';

//style function
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  search: {
     marginLeft: 0,
  },
  button: {
   marginLeft: '15px',
   textTransform: 'none',
   borderRadius: 15,

  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 2
    }
  },
  more: {
    padding: 5,
    "&:last-child": {
      paddingBottom: 20,

    }
  },
  moresecond: {
    padding: 5,
    "&:last-child": {
      paddingBottom: 20,
      paddingTop: 15,

    }
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
/**
 * 
 * @param {*} props 
 * @returns A Function that render dashbord links
 */
// setting initial state
export default  function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [dashboards, setDashboards] = useState([]);
  const [fetched, setFetched] =useState(false);
  const [barId, setBarId] = useState();

   //populating state
  /**
   * When the component mounts, fetch the dashboards and set the fetched state to true.
   */
  /**
   * When the component mounts, fetch the dashboards and set the fetched state to true.
   */
  useEffect(() => {
    const fetchDashboards = async () => {
      setDashboards(await getDashboards());
      setFetched(true)
    }
    fetchDashboards();

    if(dashboards.length !=0){
      setBarId(dashboards[0].id)
    }
  }, [fetched])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   * The function takes an event as an argument, and then sets the state of barId to the id of the
   * element that was clicked.
   * @param e - the event object
   */
  const handleClick = (e) => {
     setBarId(e.target.id);
  }
  if(!dashboards){
    return <div>Loading</div>
  }
  /* Slicing the dashboards array into two arrays. */
  /* Slicing the dashboards array into two arrays. */
  const moreBtn = dashboards.slice(3, 13)
  const moresecondBtn = dashboards.slice(14, dashboards.length)
  return (
    
    <Card className={classes.root}>
    <CardContent className = {classes.cardcontent}>
     <TextField className = {classes.search}
      label="Search for a dashboard"
      InputProps={{
      endAdornment: (
      <InputAdornment>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    )
  }}
/>
 {
   //filtering dashboards
  /* Filtering the dashboards array and then mapping over the filtered array. */
  dashboards.filter((item, index) => index<3).map(r=>{
    return(
      <Link to={`/dashboards/${r.id}`} className={styles.link}>
        <button className={styles.btnprimary}
        id = {r.id} style= {barId===r.id ? {backgroundColor:"#387C44", 
        color:"#FFFFFF", fontWeight:"bold"} : {backgroundColor:"#E5E4E2"}} 
        onClick={(e)=>handleClick(e)}>{r.displayName} </button></Link>
      )
 })}       
     <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
   </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent className = {classes.more}>
      {
      /* Mapping over the array and returning a button for each item in the array. */
      /* Mapping over the array and returning a button for each item in the array. */
        // adding more button
      moreBtn.map(r=>{
       return(
        <Link to={`/dashboards/${r.id}`} className={styles.link} 
         ><button className={styles.btnprimary} 
         id = {r.id} style= {barId===r.id ? {backgroundColor:"#387C44", 
         color:"#FFFFFF", fontWeight:"bold"} : {backgroundColor:"#E5E4E2"}} 
         onClick={(e)=>handleClick(e)}>{r.displayName}</button></Link>
       )
 })}         
      </CardContent>
      <CardContent className = {classes.moresecond}>
     
      {
     moresecondBtn.map(r=>{
       return(
        <Link to={`/dashboards/${r.id}`} className={styles.link} > 
         <button className={styles.btnsec} 
         id = {r.id} style= {barId===r.id ? {backgroundColor:"#387C44", 
         color:"#FFFFFF", fontWeight:"bold"} : {backgroundColor:"#E5E4E2"}} 
         onClick={(e)=>handleClick(e)}>{r.displayName}</button></Link>
       )
 })}         
      </CardContent>
      </Collapse>
    </Card>
  );
}