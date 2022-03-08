import React from 'react';
import styles from '../App.module.css';

 const DisplayDashboardItems = (props) => {
    console.log(props)
    return (
         <div className={styles.itemcontainer}>


          {props.dashboardItemsData.map((items) =>
                   <div className={styles.card}>
                   {items.visualization ? items.visualization.name : "Not a visualization"}
                  </div> 
                  )  }      

         </div>
    )
}
export default DisplayDashboardItems; 