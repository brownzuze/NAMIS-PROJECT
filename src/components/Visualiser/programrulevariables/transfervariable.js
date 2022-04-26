import React, { useState } from 'react'
// mui imports
import {Button, Paper, Checkbox, List, ListItem, Grid} from '@material-ui/core';
import ArrowRight from '@material-ui/icons/ArrowForward';
import ArrowLeft from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import $ from 'jquery';


// Paper Stylings
const styles = {
    Paper : {padding: 20,
             marginTop: 10, 
             marginBottom: 10, 
             marginRight: 10, 
             marginLeft: 10, 
             height: 300, 
             overflowY: 'auto'}
}

// Loading Indicators from the api 
function generatePRVs() {
    const PRVs = [];
    const indicators = $.ajax({
        url: 'https://covmw.com/namis1/api' + `/indicators.json`,
        dataType: "json",
        headers: { "Authorization": "Basic " + btoa('portal' + ":" + 'Namis71PortaL@*') },
        success: function (data) { },
        async: false,
        error: function (err) {
         console.log(err);
         }
        }).responseJSON;
        const IndData = indicators.indicators
    for (let i = 1; i< IndData.length; i++) {
        PRVs.push ({ name : IndData[i].displayName, id: IndData[i].id, box: 0, selected: false});

    }
    return PRVs;
}

export default function ViewLayout(props) {
    const [PRVs, setPRVs] = useState(generatePRVs());
    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
        indicatorId: []
    });

    function generateMarkup(PRVs) {
        return (
            <Paper style= {styles.Paper}> 
                <List>
                    {PRVs.map(PRV =>
                     <ListItem>
                         <Checkbox
                            variant="contained" 
                            color="primary"
                            id= {PRV.id}
                            value= {PRV.name}
                            onChange={(e) => handleCheckboxChange(e, PRV)} checked={PRV.selected}/><span>{PRV.name}</span>
                     </ListItem>   
                        )}
                </List>
            </Paper>
        )
    }

    const [leftside, rightside] = PRVs.reduce((acc, cur) => {
        cur.box === 0 ? acc[0].push(cur) : acc[1].push(cur);
        return acc;
    }, 
    [[], []]
    );

    function handleCheckboxChange(e, PRV) {
        const newPRVs = [...PRVs];
        const index = PRVs.findIndex(i => i === PRV);
        newPRVs[index].selected = !newPRVs[index].selected;
        setPRVs(newPRVs);

        const { value, id, checked } = e.target;
    const { languages } = userinfo;
      
    console.log(`${value} and ${id} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, id],
        response: [...languages, id],
        indicatorId: [...languages, id],

      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== id),
        response: languages.filter((e) => e !== id),
        indicatorId: languages.filter((e) => e !== id),

      });
    }
    //console.log(userinfo);
    }

    function moveRight(){
        const newPRVs = PRVs.map(PRV => ({...PRV, box: PRV.selected ? 1: PRV.box}));
        setPRVs(newPRVs);
        
        const Indicator = userinfo;
        props.onTransferSubmit(Indicator);

    }
    // moving variables
    function moveLeft(){
        const newPRVs = PRVs.map(PRV => ({...PRV, box: PRV.selected ? 0: PRV.box}));
        setPRVs(newPRVs);
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={5}>
                    <CardHeader
                        style= {styles.cardHeader}
                    /> 
                    <h3 align="center">Indicators</h3>           
                    <Divider/>
                    {generateMarkup(leftside)}
                </Grid>
                <Grid item xs={2} container direction = "column" justify="center">
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={moveRight}><ArrowRight/>
                </Button> 
                <br/>
                <Button
                 variant="contained" 
                 color="primary"
                 onClick={moveLeft}><ArrowLeft/></Button>  
                </Grid>
                <Grid item xs={5}>
                    <CardHeader
                        style= {styles.cardHeader}
                    /> 
                    <h3 align="center">Selected Items</h3>           
                    <Divider/>
                    {generateMarkup(rightside)} 
                </Grid>
            </Grid>
            {console.log(userinfo)}
        </div>
    );
}