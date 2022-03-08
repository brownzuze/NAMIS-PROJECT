import React from 'react';
import styles from '../App.module.css';
import { LineChartWithpeLabel, ChartWithPeRow, StackedChartWithPeRow, ChartWithPeOuRow, LineChart, BarChartsWithOuRow, PieChart} from './RenderGraph';
import {getDashboards, getIndicators, getorganisationUnitGroups, getOrganisationUnits} from '../api';
import {ADDRESS_URL} from '../api';
import { Box, Card, Grid, Typography } from "@material-ui/core";
import DisplayDashboardItems  from './DisplayDashboardItems';
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
                    url: ADDRESS_URL + `/visualizations/${visualizationId}.json?fields=*`,
                    dataType: "json",
                    headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
                    success: function (data) { },
                    async: false,
                    error: function (err) {
                    console.log(err);
                   }
                  }).responseJSON;
                  
                   console.log(actualVitualization)
                   if (actualVitualization.type==="COLUMN" && actualVitualization.rowDimensions[0]==="pe" && actualVitualization.rowDimensions[1] === "ou"){
                      console.log("data")
                      const visualisationName = actualVitualization.displayName
                      const period = actualVitualization.relativePeriods
                      const dataDimension = actualVitualization.dataDimensionItems.map(ids => ids.indicator.id)
                      //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
                      //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
                     const orgUnits = actualVitualization.organisationUnits.map(ids => ids.id)
                     console.log(orgUnits)
                     console.log(dataDimension)
                     console.log(period)

  var text = "";
  for (var key in period) {
  if (period[key] == true) {
      text = key
  }
}
var newString = "";
var wasUpper = false;
for (var q = 0; q < text.length; q++)
{
  if (!wasUpper && text[q] == text.toUpperCase()[q] && isNaN(text[q]))
  {
    
      newString = newString + "_";
      wasUpper = true;
  }
  
  else
  {
      wasUpper = false;
  }
  newString = newString + text[q];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var j = 0; j < newString.length; j++)
{
  if (!firstDigit && !isNaN(newString[j]))
  {
    
      textdigit = textdigit + "_";
      firstDigit = true;
  }
  
  else
  {
      firstDigit = false;
  }
  textdigit = textdigit + newString[j];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


//appending the data Dimension with ;
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
  url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
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
                   if (actualVitualization.type==="COLUMN" && actualVitualization.rowDimensions[0]==="pe" && actualVitualization.rowDimensions[1] == null){
                    console.log("got it")
                    const visualisationName = actualVitualization.displayName
    const period = actualVitualization.relativePeriods
    //const orgUnitGroups = visualisationMetadata.organisationUnitGroupSetDimensions[0].organisationUnitGroups.map(ids => ids.id)
    const dataDimension = actualVitualization.dataDimensionItems.map(ids => ids.indicator.id)
    //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
    //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
    const orgUnits = actualVitualization.organisationUnits.map(ids => ids.id)
    console.log(orgUnits)
    console.log(dataDimension)
    console.log(period)
  
    var text = "";
    for (var key in period) {
    if (period[key] == true) {
        text = key
    }
  }
var newString = "";
var wasUpper = false;
for (var u = 0; u < text.length; u++)
{
    if (!wasUpper && text[u] == text.toUpperCase()[u] && isNaN(text[u]))
    {
      
        newString = newString + "_";
        wasUpper = true;
    }
    
    else
    {
        wasUpper = false;
    }
    newString = newString + text[u];
}

 const periodFormat = newString.toUpperCase()
 console.log(newString)
 
 var textdigit = "";
 var firstDigit = false;
 
 for (var t = 0; t < newString.length; t++)
{
    if (!firstDigit && !isNaN(newString[t]))
    {
      
        textdigit = textdigit + "_";
        firstDigit = true;
    }
    
    else
    {
        firstDigit = false;
    }
    textdigit = textdigit + newString[t];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


 //appending the data Dimension with ;
 const dxArray = []
    for(var t = 0; t < dataDimension.length; t++){
      dxArray.push(dataDimension[t]+";")
    }
    const dataDimensionString = dxArray.join('')
    console.log(dataDimensionString)

  
 //appending the organisation unit dimension with ; 
    const array = []
    for(var t = 0; t < orgUnits.length; t++){
      array.push(orgUnits[t]+";")
    }
    const orgUnitsString = array.join('')
    console.log(orgUnitsString)


   var dataValues = $.ajax({
    url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
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
                   if (actualVitualization.type==="STACKED_COLUMN" && actualVitualization.rowDimensions[0]==="pe"){
                       console.log("stacked")
                       const visualisationName = actualVitualization.displayName
const period = actualVitualization.relativePeriods
const chartIndicator = actualVitualization.organisationUnitGroupSetDimensions.map(ids =>ids.organisationUnitGroupSet.id)
const orgUnitGroups = actualVitualization.organisationUnitGroupSetDimensions.map(orgids => orgids.organisationUnitGroups.map(ids => ids.id))
const dataDimension = actualVitualization.dataDimensionItems.map(ids => ids.dataElement.id)
const orgUnits = actualVitualization.organisationUnits.map(ids => ids.id)
console.log(orgUnitGroups)
console.log(chartIndicator)
console.log(dataDimension)
console.log(period)

var text = "";
for (var key in period) {
if (period[key] == true) {
    text = key
}
}
var newString = "";
var wasUpper = false;
for (var j = 0; j < text.length; j++)
{
if (!wasUpper && text[j] == text.toUpperCase()[j] && isNaN(text[j]))
{
  
    newString = newString + "_";
    wasUpper = true;
}

else
{
    wasUpper = false;
}
newString = newString + text[j];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var j = 0; j < newString.length; j++)
{
if (!firstDigit && !isNaN(newString[j]))
{
  
    textdigit = textdigit + "_";
    firstDigit = true;
}

else
{
    firstDigit = false;
}
textdigit = textdigit + newString[j];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


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
for(var j = 0; j < orgUnitGroups[0].length; j++){
  array.push(orgUnitGroups[0][j]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)
//concatinating the actual dataDimension
const orgUnitGroupDx = ChartIndicatorString + orgUnitsString
console.log(orgUnitGroupDx) 

 //appending the organisation unit dimension with ; 
 const orgarray = []
 for(var j = 0; j < orgUnits.length; j++){
   orgarray.push(orgUnits[j]+";")
 }
 const actualOrgUnitsString = orgarray.join('')
 console.log(orgUnitsString)

var dataValues = $.ajax({
  url: ADDRESS_URL + `/analytics.json?dimension=${orgUnitGroupDx}&dimension=dx:${dataDimensionString}&dimension=pe:${newPeFormat}&filter=ou:${actualOrgUnitsString}`,
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
                   if (actualVitualization.type==="LINE" && actualVitualization.rowDimensions[0]==="pe" && actualVitualization.yearlySeries[0]==null){
                    console.log("line")
                    const visualisationName = actualVitualization.displayName
  const period =actualVitualization.relativePeriods
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  const dataDimension = actualVitualization.dataDimensionItems.map(ids => ids.dataElement.id)
  const orgUnits = actualVitualization.organisationUnits.map(ids => ids.id)
  console.log(orgUnits)
  console.log(dataDimension)
  console.log(period)

  var text = "";
  for (var key in period) {
  if (period[key] == true) {
      text = key
  }
}
var newString = "";
var wasUpper = false;
for (var j = 0; j < text.length; j++)
{
  if (!wasUpper && text[j] == text.toUpperCase()[j] && isNaN(text[j]))
  {
    
      newString = newString + "_";
      wasUpper = true;
  }
  
  else
  {
      wasUpper = false;
  }
  newString = newString + text[j];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var j = 0; j < newString.length; j++)
{
  if (!firstDigit && !isNaN(newString[j]))
  {
    
      textdigit = textdigit + "_";
      firstDigit = true;
  }
  
  else
  {
      firstDigit = false;
  }
  textdigit = textdigit + newString[j];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


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
  url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
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
                    console.log("found")
                    const visualisationName = actualVitualization.displayName
  const period = actualVitualization.relativePeriods
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  const dataDimension = actualVitualization.dataDimensionItems.map(ids => ids.indicator.id)
  const orgUnits = actualVitualization.organisationUnits.map(ids => ids.id)
  console.log(orgUnits)
  console.log(dataDimension)
  console.log(period)

  var text = "";
  for (var key in period) {
  if (period[key] == true) {
      text = key
  }
}
var newString = "";
var wasUpper = false;
for (var j = 0; j < text.length; j++)
{
  if (!wasUpper && text[j] == text.toUpperCase()[j] && isNaN(text[j]))
  {
    
      newString = newString + "_";
      wasUpper = true;
  }
  
  else
  {
      wasUpper = false;
  }
  newString = newString + text[j];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var j = 0; j < newString.length; j++)
{
  if (!firstDigit && !isNaN(newString[j]))
  {
    
      textdigit = textdigit + "_";
      firstDigit = true;
  }
  
  else
  {
      firstDigit = false;
  }
  textdigit = textdigit + newString[j];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


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
  url: ADDRESS_URL + `/analytics.json?dimension=pe:${newPeFormat}&dimension=ou:${orgUnitsString}&dimension=dx:${dataDimensionString}`,
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

                   if (actualVitualization.type==="COLUMN" && actualVitualization.rowDimensions[0]==="ou" ){
                    console.log("ourow")
                    const visualisationName = actualVitualization.displayName
const period = actualVitualization.relativePeriods
//const orgUnitGroups = visualisationMetadata.organisationUnitGroupSetDimensions[0].organisationUnitGroups.map(ids => ids.id)
const dataDimension = actualVitualization.dataDimensionItems.map(ids => ids.indicator.id)
//const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
//const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
const orgUnits =actualVitualization.organisationUnits.map(ids => ids.id)
console.log(orgUnits)
console.log(dataDimension)
console.log(period)

var text = "";
for (var key in period) {
if (period[key] == true) {
    text = key
}
}
var newString = "";
var wasUpper = false;
for (var j = 0; j < text.length; j++)
{
if (!wasUpper && text[j] == text.toUpperCase()[j] && isNaN(text[j]))
{
  
    newString = newString + "_";
    wasUpper = true;
}

else
{
    wasUpper = false;
}
newString = newString + text[j];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var j = 0; j < newString.length; j++)
{
if (!firstDigit && !isNaN(newString[j]))
{
  
    textdigit = textdigit + "_";
    firstDigit = true;
}

else
{
    firstDigit = false;
}
textdigit = textdigit + newString[j];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


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
url: ADDRESS_URL + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
dataType: "json",
headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
success: function (data) { },
async: false,
error: function (err) {
  console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

dashboardItemArray.push(<div className={styles.card}>{BarChartsWithOuRow(organisationUnits, dataValues, visualisationName)}</div>)

                   }
                   if (actualVitualization.type==="PIE"){
                     console.log("pie")
                     const visualisationName = actualVitualization.displayName
const period = actualVitualization.relativePeriods
const chartIndicator = actualVitualization.organisationUnitGroupSetDimensions.map(ids =>ids.organisationUnitGroupSet.id)
const orgUnitGroups =actualVitualization.organisationUnitGroupSetDimensions.map(orgids => orgids.organisationUnitGroups.map(ids => ids.id))
const dataDimension = actualVitualization.dataDimensionItems.map(ids => ids.dataElement.id)
console.log(orgUnitGroups)
console.log(chartIndicator)
console.log(dataDimension)
console.log(period)

var text = "";
for (var key in period) {
if (period[key] == true) {
    text = key
}
}
var newString = "";
var wasUpper = false;
for (var j = 0; j < text.length; j++)
{
if (!wasUpper && text[j] == text.toUpperCase()[j] && isNaN(text[j]))
{
  
    newString = newString + "_";
    wasUpper = true;
}

else
{
    wasUpper = false;
}
newString = newString + text[j];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var j = 0; j < newString.length; j++)
{
if (!firstDigit && !isNaN(newString[j]))
{
  
    textdigit = textdigit + "_";
    firstDigit = true;
}

else
{
    firstDigit = false;
}
textdigit = textdigit + newString[j];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


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
for(var j = 0; j < orgUnitGroups[0].length; j++){
  array.push(orgUnitGroups[0][j]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)
//concatinating the actual dataDimension
const orgUnitGroupDx = ChartIndicatorString + orgUnitsString
console.log(orgUnitGroupDx) 

var dataValues = $.ajax({
  url: ADDRESS_URL + `/analytics.json?dimension=${orgUnitGroupDx}&filter=pe:${newPeFormat}&filter=dx:${dataDimensionString}&filter=ou:USER_ORGUNIT&includeNumDen=false&skipMeta=true&skipData=false`,
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

                   else {
                    console.log("no data")

                  } 
                  
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
  