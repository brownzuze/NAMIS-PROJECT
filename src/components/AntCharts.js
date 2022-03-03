import React from 'react';
import styles from '../App.module.css';
import {getDashboards} from '../api';
import {ADDRESS_URL} from '../api';
import { Box, Card, Grid, Typography } from "@material-ui/core";
import {DashboardItem} from './DashboardItem';
import DisplayDashboardItems  from './DisplayDashboardItems';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import GridLayout from "react-grid-layout";
import DashBoardLinks from './DashBoardLinks';

class AntCharts extends React.Component {
    state = {
      showItems: false,
      dashboards: "",
      dashboardId:""
    }
  
  async  componentDidMount() {
    const antdashboards = await getDashboards()
    this.setState({dashboards: antdashboards})
    
    }
    getAndRenderDashboardItems = () => {
      const dashboardId = this.state.dashboardId
    console.log(dashboardId)

      const {  dashboards } = this.state
        

       if (!dashboards && dashboardId==null) {
         return <div>
             Loading
            </div>
            }

            const dashIds = dashboards.map(ids => ids.id)
    
            var dataValues = $.ajax({
             url: ADDRESS_URL + `/37/dashboards/${dashboardId}.json?fields=id,displayName,displayDescription,favorite~rename(starred),access,restrictFilters,allowedFilters,layout,itemConfig,dashboardItems%5Bid%2Ctype%2Cshape%2Cx%2Cy%2Cwidth~rename(w)%2Cheight~rename(h)%2Cmessages%2Ctext%2CappKey%2Creports%5Btype%2Cid%2CdisplayName~rename(name)%5D%2Cresources%5Bid%2CdisplayName~rename(name)%5D%2Cusers%5Bid%2CdisplayName~rename(name)%5D%2Cvisualization%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2Cmap%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2CeventReport%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2CeventChart%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%5D`,
              dataType: "json",
              headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
              success: function (data) { },
              async: false,
              error: function (err) {
                console.log(err);
              }
              }).responseJSON;
              
               const dashboardItemsData = dataValues.dashboardItems
               console.log(dashboardItemsData)

               return <div>
                 <DisplayDashboardItems dashboardItemsData={dashboardItemsData} />
               </div>
                   
}

handleClick = (id) => {
  console.log(id)
  this.setState({dashboardId: id})
  this.setState({showItems: true})
 
}


  
    render(){
      var { showItems} = this.state
      const dashboards = this.state.dashboards
      if(!dashboards){
        return <div>Loading</div>
      }
      return (
      <div className={styles.graphbox}>
        {dashboards.map(r=>{
         return(
         <Button variant="contained"  id={r.id} onClick={(e)=>this.handleClick(r.id)}>{r.displayName}</Button>
         )
      })} 
      {/*<DashBoardLinks handleClick={this.handleClick}/>*/}
      { showItems && this.getAndRenderDashboardItems()}
     </div>
     );
     }
    }
  
  
  export default AntCharts;
  