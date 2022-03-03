import React from 'react';
import GridLayout from "react-grid-layout";

 const DisplayDashboardItems = (props) => {
    console.log(props)
    return (
         <div>
          <GridLayout className='layout' id='render' cols={12} rowHeight={15} width={800}>
                 {props.dashboardItemsData.map((items, x) =>
                   <div key={x}  style={{border: '1px solid #ddd'}} data-grid={{ x: items.x, y: items.y, w: items.w, h: items.h, minW: 2, maxW: 4 }}>
                   {items.visualization ? items.visualization.name : "Not a visualization"}
                  </div> 
                  )  }      
          </GridLayout>
         </div>
    )
}
export default DisplayDashboardItems; 