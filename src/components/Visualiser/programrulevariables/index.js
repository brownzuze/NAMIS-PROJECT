/*Program rule variable component storage for all program rule variables with their associated programs */
import React , {Fragment,  Component} from 'react'
// mui imports
import {Grid, Paper, Typography, List, IconButton} from '@material-ui/core';
import Form from './form';
import Analytics from './Analytics';

// description => source type

// custom styles for the two panes
const styles = {
    Paper1 : {padding: 20,
             marginTop: 5,  
             marginRight: 10, 
             marginLeft: 10, 
             height: 600,
             overflowY: 'auto'
            },
    Paper2 : {padding: 20,
                marginTop: 5,  
                marginRight: 10, 
                marginLeft: 10, 
                height: 600,
                overflowX: 'auto'
               },

    content : {
                marginTop: 60,  
                marginRight: 10, 
                marginLeft: 10, 
            }

}


export default class index extends Component{

  state = {
    orgId: '',
    period: '',
    Indicator: '',
    isLoaded: ''
  }

  onFormSubmit = (orgId, period, Indicator, isLoaded) => {
    this.setState({orgId: orgId , period: period, Indicator: Indicator, isLoaded: isLoaded});
  }
    
  render(){
    const {Indicator, period, orgId} = this.state
    let actualIndicator =''
    let dataDimensionString =''
    if(Indicator){
      actualIndicator=Indicator.indicatorId
      const dxArray = []
      for(var k = 0; k < actualIndicator.length; k++){
      dxArray.push(actualIndicator[k]+";")
   }
      dataDimensionString = dxArray.join('')
    }
    console.log(dataDimensionString)
    return(
    <div style={styles.content}>
    <Grid container>
        <Grid item xs={10} sm={6}>
            <Paper style= {styles.Paper1}>
                
                
                <Fragment>
              {this.state.isLoaded 
                ?
                  <Analytics 
                    Indicator={dataDimensionString}
                    orgUnits={orgId}
                    period={period}
                  />
                  :
                  (
                  <div  style={{textAlign: 'center',
                    padding: '10px',
                    width: '300px',
                    height: '180px',
                    padding: 'lem',
                     }}>
                   <h3>Getting started</h3>
                   <ul>
                     <li>All dimensions that you can use to build Visualizations are shown on the right</li>
                     <li>Click a dimension to add or remove items</li>
                   </ul>
                   </div>
          )
  }

                 </Fragment>
    
            </Paper>
        </Grid>
        <Grid item xs={10} sm={6}>
            <Paper style= {styles.Paper2}>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                  Data Visualization
                </Typography>                
                 <Form 
                 onFormSubmit={this.onFormSubmit}
                 />
            </Paper>
        </Grid>
    </Grid>
    {console.log(this.state.period)}
    {console.log(this.state.orgId)}
    {console.log(this.state.Indicator)}


    </div>
    )
 }
}