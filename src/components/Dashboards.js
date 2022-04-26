import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import {ADDRESS_URL, username, password} from '../api';
import { Box, Card, Grid, Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Dropdown from 'react-bootstrap/Dropdown'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Loading from "./Loading";
import Gauge from 'react-svg-gauge'
import {getDashboards, getIndicators, getorganisationUnitGroups, getOrganisationUnits} from '../api';
import {YearlyPivotTable, PivotTable, OuRowCharts, reportTable, BarChartsWithdxRow, YearlyreportTable, LineChartWithpeLabel, BarChartsWithpeRow, ChartWithPeRow, dxColumnreportTable, StackedChartWithPeRow, ChartWithPeOuRow, LineChart, BarChartsWithOuRow, PieChart, secondBarChartsWithpeRow} from './RenderGraph';
import styles from '../App.module.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * 
 * @returns A function that renders dashboards with items dynamically
 */
const Dashboards = () => {
  const [dashboards, setDashboards] = useState("");
  const [indicators, setIndicators] = useState("");
  const [organisationUnitGroups, setOrgUnitGroup] = useState("");
  const [organisationUnits, setOrgUnits] = useState("");
  const { id } = useParams();
  const [fetched, setFetched] =useState(false)

  /* Checking if the id is set, if it is, it is clearing the state of the other variables. */
  
  useEffect(() => {
     if(id){
       setDashboards("");
       setIndicators("");
       setOrgUnitGroup("");
       setOrgUnits("")
     }
  }, [id])

// useEffect to populate state
  /* Fetching data from the API and setting the state of the component. */
  /* Fetching data from the API and setting the state of the component. */
  useEffect(() => {
    const fetchDashboards = async () => {
    setDashboards(await getDashboards());
    setIndicators(await getIndicators());
    setOrgUnitGroup(await getorganisationUnitGroups())
    setOrgUnits(await getOrganisationUnits());
    setFetched(true)

    }
          fetchDashboards();
    }, [id])
    


//function for lendering graphs
const fetchAndRenderDashboardItems = () => {

  if (!dashboards || !organisationUnits || !indicators || !organisationUnitGroups) {
    return <div>
          <Loading/>
         </div>
}
      /* Getting the dashboard items from the dashboard. */
      var dataValues = $.ajax({
      url: ADDRESS_URL + `/dashboards/${id}`,
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
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
       if (dashboardItemsData[i].chart) {
       var visualizationId = dashboardItemsData[i].chart.id
      
       // geting the the charts visualisations 
      /* The above code is fetching the data from the server and storing it in the variable
      actualVitualization. */
       var actualVitualization = $.ajax({
       url: ADDRESS_URL + `/charts/${visualizationId}.json?fields=id%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren`,
       dataType: "json",
       headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
       success: function (data) { },
       async: false,
       error: function (err) {
        console.log(err);
        }
       }).responseJSON;
                
       console.log(actualVitualization)
                 
    /* The above code is creating a chart with the data from the API. */
    if (actualVitualization.type==="COLUMN" && actualVitualization.rows[0].dimension ==="ou" && actualVitualization.filters[0].dimension ==="pe" ){

      const OuItems = actualVitualization.rows[0].items
      console.log(OuItems)
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
      var unique = []
      dataDimension.forEach(element => {
        if(!unique.includes(element)){
          unique.push(element);
        }
      })
      console.log(unique)
      const dxArray = []
       for(var k = 0; k < unique.length; k++){
       dxArray.push(unique[k]+";")
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
     headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
     success: function (data) { },
     async: false,
     error: function (err) {
     console.log(err);
   }
  }).responseJSON;

  console.log(dataValues.rows)

  dashboardItemArray.push(
       <Grid item xs={10} sm={6}>
          <Card className= {styles.cards}>
            <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
              <Dropdown>
               <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                 <MoreHorizIcon/>
               </Dropdown.Toggle>
               <Dropdown.Menu>
                <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
               </Dropdown.Menu>
              </Dropdown>
           </CardContent>
           <CardContent className = {actualVitualization.id}>
            {OuRowCharts(OuItems,dimensionItems, dataValues, visualisationName)}
           </CardContent>
       </Card>
      </Grid>
 )

}

/* The above code is creating a chart with two rows, one for period and one for organisation unit. */
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
headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
success: function (data) { },
async: false,
error: function (err) {
  console.log(err);
}
}).responseJSON;

console.log()

console.log(dataValues.rows)

dashboardItemArray.push(
  <Grid item xs={10} sm={6}>
  <Card className= {styles.cards}>
    <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
      <Dropdown>
       <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
         <MoreHorizIcon/>
       </Dropdown.Toggle>
       <Dropdown.Menu>
        <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
        <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
       </Dropdown.Menu>
      </Dropdown>
   </CardContent>
   <CardContent className = {actualVitualization.id}>
   {StackedChartWithPeRow(organisationUnitGroups, dataValues, visualisationName)}
   </CardContent>
</Card>
</Grid>
 )

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
 headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
 success: function (data) { },
 async: false,
 error: function (err) {
   console.log(err);
 }
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push( 
  <Grid item xs={10} sm={6}>
  <Card className= {styles.cards}>
     <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
       <Dropdown>
        <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
          <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
         <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
         <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
       </Dropdown>
     </CardContent>
      <CardContent className = {actualVitualization.id}>
      {ChartWithPeOuRow(organisationUnits,indicators, dataValues, visualisationName)}
     </CardContent>
   </Card>
  </Grid>
 )

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
 headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
 success: function (data) { },
 async: false,
 error: function (err) {
   console.log(err);
 }
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push( 
  <Grid item xs={10} sm={6}>
     <Card className= {styles.cards}>
        <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
          <Dropdown>
           <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
             <MoreHorizIcon/>
           </Dropdown.Toggle>
           <Dropdown.Menu>
            <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
            <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
           </Dropdown.Menu>
          </Dropdown>
        </CardContent>
         <CardContent className = {actualVitualization.id}>
          {ChartWithPeRow(organisationUnits, dataValues, visualisationName)}
        </CardContent>
      </Card>
    </Grid>
)

}

/* The above code is creating a pie chart. */
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
headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
success: function (data) { },
async: false,
error: function (err) {
  console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push(
  <Grid item xs={10} sm={6}>
  <Card className= {styles.minCard}>
     <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
       <Dropdown>
        <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
          <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
         <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
         <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
       </Dropdown>
     </CardContent>
      <CardContent className = {actualVitualization.id}>
      {PieChart(organisationUnitGroups, dataValues, visualisationName)}
     </CardContent>
   </Card>
 </Grid> 

   )
}

/* The above code is creating a line chart. */
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
headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
success: function (data) { },
async: false,
error: function (err) {
console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push(

  <Grid item xs={10} sm={6}>
  <Card className= {styles.cards}>
     <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
       <Dropdown>
        <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
          <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
         <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
         <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
       </Dropdown>
     </CardContent>
      <CardContent className = {actualVitualization.id}>
         {LineChart(organisationUnits, dataValues, visualisationName)}
     </CardContent>
   </Card>
 </Grid> 
 )
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
headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
success: function (data) { },
async: false,
error: function (err) {
console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push(
  <Grid item xs={10} sm={6}>
  <Card className= {styles.cards}>
     <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
       <Dropdown>
        <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
          <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
         <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
         <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
       </Dropdown>
     </CardContent>
      <CardContent className = {actualVitualization.id}>
        {LineChartWithpeLabel(dataValues, visualisationName)}
     </CardContent>
   </Card>
 </Grid> 
 )

}
/* The above code is a javascript function that is used to render a pivot table. */
if (actualVitualization.type==="PIVOT_TABLE" && actualVitualization.rows[0].dimension==="ou" && actualVitualization.columns.length==2 && actualVitualization.columns[1].dimension=== "pe"){

  const dataDimension = actualVitualization.columns[0].items.map(ids => ids.id)
  const peItem=  actualVitualization.columns[1].items
  const period = peItem[0].name
  console.log( period)
  const OuItems = actualVitualization.rows[0].items
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
   url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=pe:${period}&dimension=ou:${orgUnitsString}`,
   dataType: "json",
   headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
   success: function (data) { },
   async: false,
   error: function (err) {
     console.log(err);
   }
  }).responseJSON;
  
  console.log(dataValues)

  dashboardItemArray.push(
    <Grid item xs={10} sm={6}>
    <Card className= {styles.minCard}>
       <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
         <Dropdown>
          <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
            <MoreHorizIcon/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
           <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
           <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
           <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
          </Dropdown.Menu>
         </Dropdown>
       </CardContent>
        <CardContent className = {actualVitualization.id} style = {{ height: "400px", overflow: "scroll"}}>
           {visualisationName}
           {PivotTable(organisationUnits, dataValues)}
       </CardContent>
     </Card>
   </Grid> 
  )
  
  
  }

  if (actualVitualization.type==="PIVOT_TABLE" && actualVitualization.columns[0].dimension==="pe"){

    const peItem=  actualVitualization.columns[0].items
    const period = peItem[0].name
    console.log( period)
    
    //
const dataElementDimension = actualVitualization.columns[1].dimension
console.log( dataElementDimension)
const dataElementGroup = actualVitualization.columns[1].items.map(ids => ids.id)
console.log(dataElementGroup)
const dataElementDx = actualVitualization.rows[0].dimension
const dataElement = actualVitualization.rows[0].items.map(ids => ids.id)
console.log( dataElement)
const visualisationName = actualVitualization.name
console.log(visualisationName)
const items = actualVitualization.rows[0].items
console.log(items)

//adding pending dataelement group set with ;
const dataElementDimensionString = dataElementDimension + ":"
console.log(dataElementDimensionString)

//appending the dataElement Group dimension with ; 
var array = []
for(var j = 0; j < dataElementGroup.length; j++){
array.push(dataElementGroup[j]+";")
}
const dataEGroupString = array.join('')
console.log(dataEGroupString)
//concatinating the actual dataDimension
const dataEGroupDx = dataElementDimensionString + dataEGroupString
console.log( dataEGroupDx) 

//apending dataelement sub group with :
const dataElementSubGroup = dataElementDx + ":"
console.log(dataElementSubGroup)

//appending the data element Dimension with ;
const dxArray = []
for(var j = 0; j < dataElement.length; j++){
dxArray.push(dataElement[j]+";")
}
const dataelementsDimensionString = dxArray.join('')
console.log(dataelementsDimensionString)

//concatinating the group dimensions

const DataElementSubGroupString = dataElementSubGroup + dataelementsDimensionString
console.log(DataElementSubGroupString)

var dataValues = $.ajax({
url: ADDRESS_URL + `/analytics.json?dimension=pe:${period}&dimension=${dataEGroupDx}&dimension=${DataElementSubGroupString}`,
dataType: "json",
headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
success: function (data) { },
async: false,
error: function (err) {
  console.log(err);
}
}).responseJSON;

console.log()

console.log(dataValues.rows)

dashboardItemArray.push(
  <Grid item xs={10} sm={6}>
  <Card className= {styles.minCard}>
     <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
       <Dropdown>
        <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
          <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
         <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
         <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
       </Dropdown>
     </CardContent>
      <CardContent className = {actualVitualization.id} style = {{ height: "400px", overflow: "scroll"}}>
         {visualisationName}
         {YearlyPivotTable(dataValues, items)}
     </CardContent>
   </Card>
 </Grid> 
)
}

if (actualVitualization.type==="PIVOT_TABLE" && actualVitualization.columns[0].dimension==="pe"){

  const peItem=  actualVitualization.columns[0].items
  const period = peItem[0].name
  console.log( period)
  
  //
const dataElementDimension = actualVitualization.columns[1].dimension
console.log( dataElementDimension)
const dataElementGroup = actualVitualization.columns[1].items.map(ids => ids.id)
console.log(dataElementGroup)
const dataElementDx = actualVitualization.rows[0].dimension
const dataElement = actualVitualization.rows[0].items.map(ids => ids.id)
console.log( dataElement)
const visualisationName = actualVitualization.name
console.log(visualisationName)
const items = actualVitualization.rows[0].items
console.log(items)

//adding pending dataelement group set with ;
const dataElementDimensionString = dataElementDimension + ":"
console.log(dataElementDimensionString)

//appending the dataElement Group dimension with ; 
var array = []
for(var j = 0; j < dataElementGroup.length; j++){
array.push(dataElementGroup[j]+";")
}
const dataEGroupString = array.join('')
console.log(dataEGroupString)
//concatinating the actual dataDimension
const dataEGroupDx = dataElementDimensionString + dataEGroupString
console.log( dataEGroupDx) 

//apending dataelement sub group with :
const dataElementSubGroup = dataElementDx + ":"
console.log(dataElementSubGroup)

//appending the data element Dimension with ;
const dxArray = []
for(var j = 0; j < dataElement.length; j++){
dxArray.push(dataElement[j]+";")
}
const dataelementsDimensionString = dxArray.join('')
console.log(dataelementsDimensionString)

//concatinating the group dimensions

const DataElementSubGroupString = dataElementSubGroup + dataelementsDimensionString
console.log(DataElementSubGroupString)

var dataValues = $.ajax({
url: ADDRESS_URL + `/analytics.json?dimension=pe:${period}&dimension=${dataEGroupDx}&dimension=${DataElementSubGroupString}`,
dataType: "json",
headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
success: function (data) { },
async: false,
error: function (err) {
console.log(err);
}
}).responseJSON;

console.log()

console.log(dataValues.rows)

dashboardItemArray.push(
<Grid item xs={10} sm={6}>
<Card className= {styles.minCard}>
   <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
     <Dropdown>
      <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
        <MoreHorizIcon/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
       <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
       <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
       <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
      </Dropdown.Menu>
     </Dropdown>
   </CardContent>
    <CardContent className = {actualVitualization.id} style = {{ height: "400px", overflow: "scroll"}}>
       {visualisationName}
       {YearlyPivotTable(dataValues, items)}
   </CardContent>
 </Card>
</Grid> 
)
}
/* The above code is creating a Gauge chart. */
if (actualVitualization.type==="GAUGE" && actualVitualization.filters[0].dimension==="pe"){

  const peItem= actualVitualization.filters[0].items
  const period = peItem[0].name
  console.log(peItem)
  
  
const items = actualVitualization.columns[0].items
const dataIndicators = items.map(ids => ids.id)
console.log(dataIndicators)
const visualisationName = actualVitualization.name

//appending the dataElement Group dimension with ; 
var array = []
for(var j = 0; j < dataIndicators.length; j++){
array.push(dataIndicators[j]+";")
}
const dataIndicatorString = array.join('')
console.log(dataIndicatorString)

var dataValues = $.ajax({
url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataIndicators}&filter=pe:${period}`,
dataType: "json",
headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
success: function (data) { },
async: false,
error: function (err) {
console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

const Value = dataValues.rows[0][1]
console.log(Value)

dashboardItemArray.push(
<Grid item xs={10} sm={6}>
<Card className= {styles.minCard}>
   <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
     <Dropdown>
      <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
        <MoreHorizIcon/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
       <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
       <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
       <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
      </Dropdown.Menu>
     </Dropdown>
   </CardContent>
    <CardContent className = {actualVitualization.id}>
      <Gauge 
        value={Value} width={400} height={320}
        topLabelStyle= {{
        fill: "#222",
        fill: "#999999",
        fontSize: "20px",
        fontWeight: "bold"
        }} 
        valueLabelStyle= {{
         textAnchor: "middle",
         fill: "#010101",
         stroke: "none",
        fontSize: "30px"

        }}
        color= "#00bfff"

      label = {visualisationName}/>
   </CardContent>
 </Card>
</Grid> 
)
}
if (actualVitualization.type==="COLUMN"  && actualVitualization.columns[0].dimension==="pe"){

  const dataDimension = actualVitualization.rows[0].items.map(ids => ids.id)
  const peItem=  actualVitualization.columns[0].items
  const OuItems=  actualVitualization.filters[0].items
  const periods = peItem.map(ids => ids.id)
  const peLabels = peItem.map(ids => ids.name)
  const dxLabel = actualVitualization.rows[0].items.map(ids => ids.name)
  console.log( periods)
  const orgUnits =  OuItems.map(ids => ids.id)
  const orgName =  OuItems[0].name
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

   const pearray = []
   for(var r = 0; r < periods.length; r++){
     pearray.push(periods[r]+";")
   }
   const periodString = pearray.join('')
   console.log(periodString)



 
  var dataValues = $.ajax({
   url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${periodString}`,
   dataType: "json",
   headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
   success: function (data) { },
   async: false,
   error: function (err) {
     console.log(err);
   }
 }).responseJSON;
 
 console.log(dataValues.rows)
 
 dashboardItemArray.push( 
  <Grid item xs={10} sm={12}>
  <Card className= {styles.cards}>
    <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
      <Dropdown>
       <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
        <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
        {orgName}
       {BarChartsWithdxRow(dataValues, dataDimension, dxLabel, visualisationName, periods)} 
       </CardContent>
  </Card>
 </Grid>
    ) 
 
 }

 if (actualVitualization.type==="COLUMN"  && actualVitualization.rows[0].dimension==="pe"){

  const dataDimension = actualVitualization.columns[0].items.map(ids => ids.id)
  const peItem=  actualVitualization.rows[0].items
  const OuItems=  actualVitualization.filters[0].items
  const periods = peItem.map(ids => ids.id)
  const peLabels = peItem.map(ids => ids.name)
  const dxLabel = actualVitualization.columns[0].items.map(ids => ids.name)
  console.log( periods)
  const orgUnits =  OuItems.map(ids => ids.id)
  const orgName =  OuItems[0].name
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

   const pearray = []
   for(var r = 0; r < periods.length; r++){
     pearray.push(periods[r]+";")
   }
   const periodString = pearray.join('')
   console.log(periodString)



 
  var dataValues = $.ajax({
   url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${periodString}`,
   dataType: "json",
   headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
   success: function (data) { },
   async: false,
   error: function (err) {
     console.log(err);
   }
 }).responseJSON;
 
 console.log(dataValues.rows)
 
 if(periods.length == 12){
 dashboardItemArray.push( 
  <Grid item xs={10} sm={6}>
  <Card className= {styles.cards}>
    <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
      <Dropdown>
       <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
        <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
       {orgName}
       {BarChartsWithpeRow(dataValues, peLabels, dxLabel, visualisationName, periods)} 
    </CardContent>
  </Card>
 </Grid>) 
 }

 else{
  dashboardItemArray.push( 
    <Grid item xs={10} sm={6}>
    <Card className= {styles.cards}>
      <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
        <Dropdown>
         <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
          <MoreHorizIcon/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
            <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </CardContent>
      <CardContent className = {actualVitualization.id}>
         {orgName}
         {secondBarChartsWithpeRow(dataValues, peLabels, dxLabel, visualisationName, dataDimension)} 
      </CardContent>
    </Card>
   </Grid>) 
 }
 
}
  
 }
 if(dashboardItemsData[i].maps){
  dashboardItemArray.push(
    <Grid item xs={10} sm={6}>
    <Card className= {styles.minCard}>
       <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
         <Dropdown>
          <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
            <MoreHorizIcon/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
           <Dropdown.Item id = {actualVitualization.id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
           <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
           <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
          </Dropdown.Menu>
         </Dropdown>
       </CardContent>
        <CardContent className = {dashboardItemsData[i].map.id}>
        {dashboardItemsData[i].map.name}
       </CardContent>

     </Card>
   </Grid> 
  ) 
 }
 if (dashboardItemsData[i].type==="REPORT_TABLE"){
   console.log(dashboardItemsData[i])
 const reportTableId = dashboardItemsData[i].reportTable.id
 var reportData = $.ajax({
   url: ADDRESS_URL + `/reportTables/${reportTableId}.json?fields=id%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren`,
   dataType: "json",
   headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
   success: function (data) { },
   async: false,
   error: function (err) {
   console.log(err);
 }
}).responseJSON;
console.log(reportData)
if(reportData.columns[0].items.length==1){
console.log(reportData)
 const dataDimension = reportData.rows[0].items.map(ids => ids.id)
 const peItem=  reportData.columns[0].items
 const OuItems=  reportData.filters[0].items
 const periods = peItem.map(ids => ids.id)
 const peLabels = peItem.map(ids => ids.name)
 const dxLabel = reportData.rows[0].items.map(ids => ids.name)
 const rowName = reportData.rows[0].items.map(ids => ids.name)
 const columnName = reportData.columns[0].items.map(ids => ids.name)
 console.log(rowName)


 console.log( periods)
 const orgUnits =  OuItems.map(ids => ids.id)
 const orgName =  OuItems[0].name
 console.log(dataDimension)
 const visualisationName = reportData.name
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

  const pearray = []
  for(var r = 0; r < periods.length; r++){
    pearray.push(periods[r]+";")
  }
  const periodString = pearray.join('')
  console.log(periodString)




 var dataValues = $.ajax({
  url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${periodString}`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
  success: function (data) { },
  async: false,
  error: function (err) {
    console.log(err);
  }
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push( 
 <Grid item xs={10} sm={6}>
 <Card className= {styles.cards}>
   <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
     <Dropdown>
      <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
       <MoreHorizIcon/>
       </Dropdown.Toggle>
       <Dropdown.Menu>
         <Dropdown.Item id = {reportTableId} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
         <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
       </Dropdown.Menu>
     </Dropdown>
   </CardContent>
   <CardContent>{visualisationName}</CardContent>
   <CardContent className = {reportTableId}>
      {orgName}
      {reportTable(dataValues, rowName, columnName)}
   </CardContent>
 </Card>
</Grid>) 
}
}

if (dashboardItemsData[i].type==="REPORT_TABLE"){
  console.log(dashboardItemsData[i])
const reportTableId = dashboardItemsData[i].reportTable.id
var reportData = $.ajax({
  url: ADDRESS_URL + `/reportTables/${reportTableId}.json?fields=id%2CdisplayName~rename(name)%2Ctype%2CdisplayDescription~rename(description)%2Ccolumns%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Crows%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2Cfilters%5Bdimension%2ClegendSet%5Bid%5D%2Cfilter%2CprogramStage%2Citems%5BdimensionItem~rename(id)%2CdisplayName~rename(name)%2CdimensionItemType%5D%5D%2C*%2C!attributeDimensions%2C!attributeValues%2C!category%2C!categoryDimensions%2C!categoryOptionGroupSetDimensions%2C!columnDimensions%2C!dataDimensionItems%2C!dataElementDimensions%2C!dataElementGroupSetDimensions%2C!filterDimensions%2C!itemOrganisationUnitGroups%2C!lastUpdatedBy%2C!organisationUnitGroupSetDimensions%2C!organisationUnitLevels%2C!organisationUnits%2C!programIndicatorDimensions%2C!relativePeriods%2C!reportParams%2C!rowDimensions%2C!translations%2C!userOrganisationUnit%2C!userOrganisationUnitChildren%2C!userOrganisationUnitGrandChildren`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
  success: function (data) { },
  async: false,
  error: function (err) {
  console.log(err);
}
}).responseJSON;
if(reportData.columns[0].items.length==12){
console.log(reportData)
const dataDimension = reportData.rows[0].items.map(ids => ids.id)
const peItem=  reportData.columns[0].items
const OuItems=  reportData.filters[0].items
const periods = peItem.map(ids => ids.id)
const peLabels = peItem.map(ids => ids.name)
const dxLabel = reportData.rows[0].items.map(ids => ids.name)
const rowName = reportData.rows[0].items.map(ids => ids.name)
const columnName = reportData.columns[0].items.map(ids => ids.name)
console.log(rowName)


console.log( periods)
const orgUnits =  OuItems.map(ids => ids.id)
const orgName =  OuItems[0].name
console.log(dataDimension)
const visualisationName = reportData.name
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

 const pearray = []
 for(var r = 0; r < periods.length; r++){
   pearray.push(periods[r]+";")
 }
 const periodString = pearray.join('')
 console.log(periodString)




var dataValues = $.ajax({
 url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${periodString}`,
 dataType: "json",
 headers: { "Authorization": "Basic " + btoa(username + ":" + password) },
 success: function (data) { },
 async: false,
 error: function (err) {
   console.log(err);
 }
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push( 
<Grid item xs={10} sm={6}>
<Card className= {styles.cards}>
  <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
    <Dropdown>
     <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
      <MoreHorizIcon/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item id = {reportTableId} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
        <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </CardContent>
  <CardContent>{visualisationName}</CardContent>
  <CardContent className = {reportTableId}>
     {orgName}
     {YearlyreportTable(dataValues, rowName, columnName, periods, dataDimension)}
  </CardContent>
</Card>
</Grid>) 
}

}
 if(dashboardItemsData[i].type==="TEXTs"){
        dashboardItemArray.push(
          <Grid item xs={10} sm={6}>
          <Card className={styles.minCard}>
            <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
              <Dropdown>
               <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                <MoreHorizIcon/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item id = {dashboardItemsData[i].id} onClick={e => chart2PDF(e)}>Save as pdf</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </CardContent>
            <CardContent className = {dashboardItemsData[i].id}>
            {dashboardItemsData[i].text}
            </CardContent>
          </Card>
         </Grid>  
       ) 
 }
 else {
  console.log("no data")

  } 

}


  return <Grid container spacing={1}>
           {dashboardItemArray}
         </Grid>
                 
}

//download function
const chart2PDF = e => {
  console.log(e.target.id)
  let CharId = e.target.id
  console.log(CharId)
  
  const but = e.target;
  but.style.display = "none";
  let input = window.document.getElementsByClassName(CharId)[0];

  html2canvas(input).then(canvas => {
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("1", "pt", 'a1');
    pdf.addImage(
      img,
      "png",
      input.offsetLeft,
      input.offsetTop,
      input.clientWidth,
      input.clientHeight
    );
    pdf.save("dhischart.pdf");
    but.style.display = "block";
  });
};

    return (
        <div> 
         <div className={styles.graphbox}>
         {fetchAndRenderDashboardItems()}
         </div>
        </div>
    );
}
export default Dashboards