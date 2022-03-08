import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import {ADDRESS_URL} from '../api';
import DisplayDashboardItems  from './DisplayDashboardItems';
import styles from '../App.module.css';

const Dashboards = () => {
    const [data, setId] = useState([]);
    const { id } = useParams();
    console.log(id)

const fetchDashboard = () => {

    var dataValues = $.ajax({
        url: ADDRESS_URL + `/37/dashboards/${id}.json?fields=id,displayName,displayDescription,favorite~rename(starred),access,restrictFilters,allowedFilters,layout,itemConfig,dashboardItems%5Bid%2Ctype%2Cshape%2Cx%2Cy%2Cwidth~rename(w)%2Cheight~rename(h)%2Cmessages%2Ctext%2CappKey%2Creports%5Btype%2Cid%2CdisplayName~rename(name)%5D%2Cresources%5Bid%2CdisplayName~rename(name)%5D%2Cusers%5Bid%2CdisplayName~rename(name)%5D%2Cvisualization%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2Cmap%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2CeventReport%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2CeventChart%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%5D`,
         dataType: "json",
         headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
         success: function (data) { },
         async: false,
         error: function (err) {
           console.log(err);
         }
         }).responseJSON;

         console.log(dataValues)
         const dashboardItemsData = dataValues.dashboardItems
               console.log(dashboardItemsData)

               return <div>
                 <DisplayDashboardItems dashboardItemsData={dashboardItemsData} />
               </div>
         
}
    return (
        <div className={styles.graphbox}> 
         {fetchDashboard()}
        </div>
    );
}
export default Dashboards