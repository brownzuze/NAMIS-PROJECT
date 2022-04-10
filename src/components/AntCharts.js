import React from 'react';
import styles from '../App.module.css';
import { OuRowCharts, LineChartWithpeLabel, ChartWithPeRow, StackedChartWithPeRow,BarChartsWithpeRow, ChartWithPeOuRow, LineChart, BarChartsWithOuRow, PieChart} from './RenderGraph';
import {getDashboards, getIndicators, getorganisationUnitGroups, getOrganisationUnits} from '../api';
import {ADDRESS_URL, username, password } from '../api';
import { Box, Card, Grid, Typography } from "@material-ui/core";
import Loading from "./Loading";
import { CardContent } from "@material-ui/core";
import Dropdown from 'react-bootstrap/Dropdown'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import $ from 'jquery';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class AntCharts extends React.Component {
    state = {
      dashboards: "",
      indicators: "",
      organisationUnits: "",
      organisationUnitGroups: "",
      chartId: ""
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
        return <div>
                <Loading/>
               </div>
      }

        const dashIds = dashboards.map(ids => ids.id)
    
        var dataValues = $.ajax({
        url: ADDRESS_URL + `/dashboards/${dashIds[0]}`,
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
                    <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent className = {actualVitualization.id}>
              {OuRowCharts(organisationUnits,indicators, dataValues, visualisationName)}
              </CardContent>
            </Card>
          </Grid>)

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
                    <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent className = {actualVitualization.id}>
              {StackedChartWithPeRow(organisationUnitGroups, dataValues, visualisationName)}
              </CardContent>
            </Card>
          </Grid>) 
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
          <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
    {ChartWithPeOuRow(organisationUnits,indicators, dataValues, visualisationName)}
    </CardContent>
  </Card>
</Grid>) 
 
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
          <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
    {ChartWithPeRow(organisationUnits, dataValues, visualisationName)}
    </CardContent>
  </Card>
 </Grid>) 
 
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
          <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
    {PieChart(organisationUnitGroups, dataValues, visualisationName)}
    </CardContent>
  </Card>
 </Grid>) 
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
          <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
    {LineChart(organisationUnits, dataValues, visualisationName)}
    </CardContent>
  </Card>
 </Grid>) 

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
          <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
    {LineChartWithpeLabel(dataValues, visualisationName)}
    </CardContent>
  </Card>
 </Grid>) 
}

else {
    console.log("no data")

  } 
                  
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
  <Grid item xs={10} sm={6}>
  <Card className= {styles.cards}>
    <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
      <Dropdown>
       <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
        <MoreHorizIcon/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id = {actualVitualization.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
          <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </CardContent>
    <CardContent className = {actualVitualization.id}>
       {BarChartsWithpeRow(dataValues, peLabels, dxLabel, visualisationName, periods)} 
    </CardContent>
  </Card>
 </Grid>) 
 
 }

 if(dashboardItemsData[i].maps){
  dashboardItemArray.push(
    <Grid item xs={10} sm={6}>
    <Card className={styles.minCard}>
      <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
        <Dropdown>
         <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
          <MoreHorizIcon/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id = {dashboardItemsData[i].map.id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
            <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </CardContent>
      <CardContent className = {dashboardItemsData[i].map.id}>
        {dashboardItemsData[i].map.name}  
      </CardContent>
    </Card>
   </Grid>) 
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
              <Dropdown.Item id = {dashboardItemsData[i].id} onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
              <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </CardContent>
        <CardContent className = {dashboardItemsData[i].id}>
          {dashboardItemsData[i].text}
        </CardContent>
      </Card>
     </Grid>) 
 }
}

    return   <Grid container spacing={1}>
               {dashboardItemArray}
            </Grid>
                   
} 
//download function
chart2PDF = e => {
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
    render(){
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
  