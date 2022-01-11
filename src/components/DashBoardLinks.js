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
   borderRadius:'50% !important',
   marginLeft: '10px',
   textTransform: 'none'
   
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 2
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

export default  function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
     <Button variant="contained" className={classes.button}>dashboardName</Button>
     <Button variant="contained"  className={classes.button}>dashboardName</Button>
     <Button variant="contained" className={classes.button}>dashboardName</Button>
     <Button variant="contained" className={classes.button}>dashboardName</Button>
     <Button variant="contained" className={classes.button}>dashboardName</Button>
     <Button variant="contained" className={classes.button}>dashboardName</Button>
     
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
        <CardContent>
        <Button variant="contained" className={classes.button}>dashboardName</Button>
        <Button variant="contained" className={classes.button}>dashboardName</Button>
        <Button variant="contained" className={classes.button}>dashboardName</Button>
        <Button variant="contained" className={classes.button}>dashboardName</Button>
      </CardContent>
      </Collapse>
    </Card>
  );
}