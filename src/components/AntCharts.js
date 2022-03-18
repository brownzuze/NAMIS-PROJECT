import React from 'react';
import styles from '../App.module.css';
import { OuRowCharts, LineChartWithpeLabel, ChartWithPeRow, StackedChartWithPeRow, ChartWithPeOuRow, LineChart, BarChartsWithOuRow, PieChart} from './RenderGraph';
import {getDashboards, getIndicators, getorganisationUnitGroups, getOrganisationUnits} from '../api';
import {ADDRESS_URL} from '../api';
import { Box, Card, Grid, Typography } from "@material-ui/core";
import $ from 'jquery';

class AntCharts extends React.Component {
    state = {
      dashboards: "",
      indicators: "",
      organisationUnits: "",
      organisationUnitGroups: "",
    }
  
  async  componentDidMount() {
    const antdashboards = await getDashboards()
    this.setState({dashboards: antdashboards})
    const indicatorData = await getIndicators()
    this.setState({indicators: indicatorData})
    const orgUnitGroups= await getorganisationUnitGroups();
    this.setState({organisationUnitGroups: orgUnitGroups});
    const orgUnitsData= await  getOrganisationUnits();
    this.setState({organisationUnits: orgUnitsData});
    
    }
    getAndRenderDashboardItems = () => {
  
    const {dashboards, organisationUnits, indicators,  organisationUnitGroups} = this.state

      if (!dashboards || !organisationUnits || !indicators || !organisationUnitGroups) {
        return <div>Loading....</div>
      }

        const dashIds = dashboards.map(ids => ids.id)
    
        var dataValues = $.ajax({
        url: ADDRESS_URL + `/37/dashboards/${dashIds[0]}.json?fields=id,displayName,displayDescription,favorite~rename(starred),access,restrictFilters,allowedFilters,layout,itemConfig,dashboardItems%5Bid%2Ctype%2Cshape%2Cx%2Cy%2Cwidth~rename(w)%2Cheight~rename(h)%2Cmessages%2Ctext%2CappKey%2Creports%5Btype%2Cid%2CdisplayName~rename(name)%5D%2Cresources%5Bid%2CdisplayName~rename(name)%5D%2Cusers%5Bid%2CdisplayName~rename(name)%5D%2Cvisualization%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2Cmap%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2CeventReport%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%2CeventChart%5Bid%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%5D%5D`,
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
               
        //looping dashboardItems
         let dashboardItemArray = []
         for (let i=0; i < dashboardItemsData.length; i++ ) {
         if (dashboardItemsData[i].visualization) {
         var visualizationId = dashboardItemsData[i].visualization.id

         var actualVitualization = $.ajax({
         url: ADDRESS_URL + `/37/visualizations/${visualizationId}.json?fields=id%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren`,
         dataType: "json",
         headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
         success: function (data) { },
         async: false,
         error: function (err) {
          console.log(err);
          }
         }).responseJSON;
                  
         console.log(actualVitualization)
                   
      if (actualVitualization.type==="COLUMN" && actualVitualization.rows[0].dimension ==="ou" && actualVitualization.filters[0].dimension ==="pe" ){

        const OuItems = actualVitualization.rows[0].items
        console.log()
        const orgUnits =  OuItems.map(ids => ids.id)
        console.log( orgUnits)
        const peItem= actualVitualization.filters[0].items
        const period = peItem[0].name
        console.log( period)
        const dimensionItems = actualVitualization.columns[0].items
        console.log(dimensionItems)
        const dataDimension = dimensionItems.map(ids => ids.id)
        console.log(dataDimension)
        const visualisationName = actualVitualization.name
        console.log(visualisationName)

      //appending the organisation unit dimension with ; 
 
        const dxArray = []
         for(var k = 0; k < dataDimension.length; k++){
         dxArray.push(dataDimension[k]+";")
        }
        const dataDimensionString = dxArray.join('')
        console.log(dataDimensionString)


       //appending the organisation unit dimension with ; 
       const array = []
       for(var r = 0; r < orgUnits.length; r++){
       array.push(orgUnits[r]+";")
       }
       const orgUnitsString = array.join('')
       console.log(orgUnitsString)

       var dataValues = $.ajax({
       url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${period}`,
       dataType: "json",
       headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
       success: function (data) { },
       async: false,
       error: function (err) {
       console.log(err);
     }
    }).responseJSON;

    console.log(dataValues.rows)

    dashboardItemArray.push( <div className={styles.card}>{OuRowCharts(organisationUnits,indicators, dataValues, visualisationName)}</div>)

}

if (actualVitualization.type==="STACKED_COLUMN" && actualVitualization.filters.length == 2  && actualVitualization.rows[0].dimension ==="pe" ){

  const chartIndicator = actualVitualization.columns[0].dimension
  console.log( chartIndicator)
  const orgUnitGroups = actualVitualization.columns[0].items.map(ids => ids.id)
  console.log(orgUnitGroups)
  const dataDimension = actualVitualization.filters[1].items.map(ids => ids.id)
  console.log(dataDimension)
  const orgUnits = actualVitualization.filters[0].items.map(ids => ids.id)
  console.log(orgUnits)
  const period = actualVitualization.rows[0].items[0].name
  console.log( period)
  const visualisationName = actualVitualization.name
  console.log(visualisationName)
  
  //adding pending indicator with ;
const ChartIndicatorString = chartIndicator + ":"
console.log(ChartIndicatorString)

//appending the organisation unit dimension with ; 
var array = []
for(var j = 0; j < orgUnitGroups.length; j++){
  array.push(orgUnitGroups[j]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)
//concatinating the actual dataDimension
const orgUnitGroupDx = ChartIndicatorString + orgUnitsString
console.log(orgUnitGroupDx) 

//appending the data Dimension with ;
const dxArray = []
for(var j = 0; j < dataDimension.length; j++){
  dxArray.push(dataDimension[j]+";")
}
const dataDimensionString = dxArray.join('')
console.log(dataDimensionString)

console.log(orgUnitGroups)


 //appending the organisation unit dimension with ; 
 const orgarray = []
 for(var j = 0; j < orgUnits.length; j++){
   orgarray.push(orgUnits[j]+";")
 }
 const actualOrgUnitsString = orgarray.join('')
 console.log(orgUnitsString)

var dataValues = $.ajax({
  url: ADDRESS_URL + `/analytics.json?dimension=${orgUnitGroupDx}&dimension=dx:${dataDimensionString}&dimension=pe:${period}&filter=ou:${actualOrgUnitsString}`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
  success: function (data) { },
  async: false,
  error: function (err) {
    console.log(err);
  }
}).responseJSON;

console.log()

console.log(dataValues.rows)

dashboardItemArray.push(<div className={styles.card}>{StackedChartWithPeRow(organisationUnitGroups, dataValues, visualisationName)}</div>)
 
 
}

if (actualVitualization.type==="COLUMN"  && actualVitualization.rows.length == 2 && actualVitualization.rows[0].dimension ==="pe" && actualVitualization.rows[1].dimension ==="ou"){

  const OuItems = actualVitualization.rows[1].items
   console.log()
  const orgUnits =  OuItems.map(ids => ids.id)
  console.log( orgUnits)
  const peItem=  actualVitualization.rows[0].items
  const period = peItem[0].name
  console.log( period)
  const dimensionItems = actualVitualization.columns[0].items
  console.log(dimensionItems)
  const dataDimension = dimensionItems.map(ids => ids.id)
  console.log(dataDimension)
  const visualisationName = actualVitualization.name
  console.log(visualisationName)
 
 
 
 
 
 const dxArray = []
   for(var k = 0; k < dataDimension.length; k++){
     dxArray.push(dataDimension[k]+";")
   }
   const dataDimensionString = dxArray.join('')
   console.log(dataDimensionString)
 
 
 //appending the organisation unit dimension with ; 
   const array = []
   for(var r = 0; r < orgUnits.length; r++){
     array.push(orgUnits[r]+";")
   }
   const orgUnitsString = array.join('')
   console.log(orgUnitsString)
 
  var dataValues = $.ajax({
   url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${period}`,
   dataType: "json",
   headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
   success: function (data) { },
   async: false,
   error: function (err) {
     console.log(err);
   }
 }).responseJSON;
 
 console.log(dataValues.rows)
 
 dashboardItemArray.push( <div className={styles.card}>{ChartWithPeOuRow(organisationUnits,indicators, dataValues, visualisationName)}</div>)
 
 }

 if (actualVitualization.type==="COLUMN"  && actualVitualization.rows.length == 1 && actualVitualization.rows[0].dimension ==="pe" && actualVitualization.columns[0].dimension ==="ou"){

  const dataDimension = actualVitualization.filters[0].items.map(ids => ids.id)
  const peItem=  actualVitualization.rows[0].items
  const period = peItem[0].name
  console.log( period)
  const OuItems = actualVitualization.columns[0].items
  const orgUnits =  OuItems.map(ids => ids.id)
  console.log(dataDimension)
  const visualisationName = actualVitualization.name
  console.log(visualisationName)
 
 
 
 
 
 const dxArray = []
   for(var k = 0; k < dataDimension.length; k++){
     dxArray.push(dataDimension[k]+";")
   }
   const dataDimensionString = dxArray.join('')
   console.log(dataDimensionString)
 
 
 //appending the organisation unit dimension with ; 
   const array = []
   for(var r = 0; r < orgUnits.length; r++){
     array.push(orgUnits[r]+";")
   }
   const orgUnitsString = array.join('')
   console.log(orgUnitsString)
 
  var dataValues = $.ajax({
   url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${period}`,
   dataType: "json",
   headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
   success: function (data) { },
   async: false,
   error: function (err) {
     console.log(err);
   }
 }).responseJSON;
 
 console.log(dataValues.rows)
 
 dashboardItemArray.push( <div className={styles.card}>{ChartWithPeRow(organisationUnits, dataValues, visualisationName)}</div>)
 
 }

 if (actualVitualization.type==="PIE" && actualVitualization.filters[0].dimension==="pe" && actualVitualization.filters.length==3){

  const chartIndicator = actualVitualization.columns.map(ids =>ids.dimension)
  const dataDimension = actualVitualization.filters[1].items.map(ids => ids.id)
  const orgUnitGroups =actualVitualization.columns[0].items.map(ids => ids.id)

  const peItem=  actualVitualization.filters[0].items
  const period = peItem[0].id
  console.log( period)
  const OuItems = actualVitualization.filters[2].items
  const orgUnits =  OuItems.map(ids => ids.id)
  console.log(dataDimension)
  const visualisationName = actualVitualization.name
  console.log(visualisationName)
 
//appending the data Dimension with ;
const dxArray = []
for(var j = 0; j < dataDimension.length; j++){
  dxArray.push(dataDimension[j]+";")
}
const dataDimensionString = dxArray.join('')
console.log(dataDimensionString)

console.log(orgUnitGroups)

//adding pending indicator with ;
const InArray = []
for(var j = 0; j < chartIndicator.length; j++){
  InArray.push(chartIndicator[j]+":")
}
const ChartIndicatorString = InArray.join('')
console.log(ChartIndicatorString)

//appending the organisation unit dimension with ; 
var array = []
for(var j = 0; j < orgUnitGroups.length; j++){
  array.push(orgUnitGroups[j]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)
//concatinating the actual dataDimension
const orgUnitGroupDx = ChartIndicatorString + orgUnitsString
console.log(orgUnitGroupDx) 

var dataValues = $.ajax({
  url: ADDRESS_URL + `/analytics.json?dimension=${orgUnitGroupDx}&filter=pe:${period}&filter=dx:${dataDimensionString}&filter=ou:${orgUnits}&includeNumDen=false&skipMeta=true&skipData=false`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
  success: function (data) { },
  async: false,
  error: function (err) {
    console.log(err);
  }
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push(<div className={styles.card}>{PieChart(organisationUnitGroups, dataValues, visualisationName)}</div>)
}
 
if (actualVitualization.type==="LINE" && actualVitualization.rows[0].dimension==="pe" && actualVitualization.columns[0].dimension==="ou"){
  console.log("line")
  const visualisationName = actualVitualization.name
  const period =actualVitualization.rows[0].items[0].id
  const dataDimension = actualVitualization.filters[0].items.map(ids => ids.id)
  const orgUnits = actualVitualization.columns[0].items.map(ids => ids.id)
  console.log(orgUnits)
  console.log(dataDimension)
  console.log(period)



  //appending the data Dimension with ;
  const dxArray = []
  for(var j = 0; j < dataDimension.length; j++){
  dxArray.push(dataDimension[j]+";")
}
const dataDimensionString = dxArray.join('')
console.log(dataDimensionString)


//appending the organisation unit dimension with ; 
const array = []
for(var j = 0; j < orgUnits.length; j++){
array.push(orgUnits[j]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)

var dataValues = $.ajax({
url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${period}`,
dataType: "json",
headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
success: function (data) { },
async: false,
error: function (err) {
console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push(<div className={styles.card}>{LineChart(organisationUnits, dataValues, visualisationName)}</div>)

}

if (actualVitualization.type==="YEAR_OVER_YEAR_LINE" ){
  const visualisationName = actualVitualization.name
  const period = actualVitualization.rows[0].items.map(ids => ids.id)
  const dataDimension = actualVitualization.filters[1].items.map(ids => ids.id)
  const orgUnits = actualVitualization.filters[0].items.map(ids => ids.id)
  console.log(orgUnits)
  console.log(dataDimension)
  console.log(period)

//appending the data Dimension with ;
const dxArray = []
for(var j = 0; j < dataDimension.length; j++){
dxArray.push(dataDimension[j]+";")
}
const dataDimensionString = dxArray.join('')
console.log(dataDimensionString)


//appending the organisation unit dimension with ; 
const array = []
for(var j = 0; j < orgUnits.length; j++){
array.push(orgUnits[j]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)

var dataValues = $.ajax({
url: ADDRESS_URL + `/analytics.json?dimension=pe:${period}&dimension=ou:${orgUnitsString}&dimension=dx:${dataDimensionString}`,
dataType: "json",
headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
success: function (data) { },
async: false,
error: function (err) {
console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push(<div className={styles.card}>{LineChartWithpeLabel(dataValues, visualisationName)}</div>)

}

else {
    console.log("no data")

  } 
                  
 }
 if(dashboardItemsData[i].map){
  dashboardItemArray.push(<div className={styles.card}>{dashboardItemsData[i].map.name}<div className={styles.content}>No data</div></div>) 
 }
}

    return <div className={styles.itemcontainer}>
             {dashboardItemArray}
            </div>
                   
} 
    render(){
      var { showItems} = this.state
      const dashboards = this.state.dashboards
      if(!dashboards){
        return <div>Loading</div>
      }
      return (
      <div className={styles.graphbox}>
      <div>
      {this.getAndRenderDashboardItems()}
      </div>
     </div>
     );
     }
    }
  
  
  export default AntCharts;
  