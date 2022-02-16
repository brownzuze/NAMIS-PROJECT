import React from 'react';
import styles from '../App.module.css';
import { ChartWithPeRow, ChartWithPeOuRow, LineChart, BarChartsWithOuRow, PieChart} from './RenderGraph';
import {getDashboards, getVisualizations, getMaps, getAntseventhChart, getAntsixthChart , getIndicators, getfifthAntChart, getorganisationUnitGroups, getAntFourthPieData, getOrganisationUnits, getAntFirstChart, getAntSecondChart, getAntThirdChart, getAntThirdChartData} from '../api';
import { Box, Card, Grid, Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import $ from 'jquery';
import  {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Dropdown from 'react-bootstrap/Dropdown'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import html2canvas from "html2canvas";
import jsPDF from "jspdf"
Chart.register(...registerables);

class AntCharts extends React.Component {
    state = {
      dashboards: "",
      indicators: "",
      organisationUnits: "",
      visualizations: "",
      maps: "",
      firstChartAnalytics: {},
      secondChartAnalytics: {},
      thirdChartAnalytics: {},
      thirdAddData: {},
      pieChartData: {},
      organisationUnitGroups: "",
      fifthChartAnalytics: {},
      sixthantChart:{},
      seventhantChart: {}
    }
  
  async  componentDidMount() {
    const antdashboards = await getDashboards()
    this.setState({dashboards: antdashboards})
    const firstAntChart = await getAntFirstChart();
    this.setState({firstChartAnalytics: firstAntChart});
    const antVisualizations = await getVisualizations()
    this.setState({ visualizations: antVisualizations})
    const antMaps = await getMaps()
    this.setState({maps: antMaps})
    const secondAntChart = await getAntSecondChart();
    this.setState({secondChartAnalytics: secondAntChart})
    const thirdAntChart = await getAntThirdChart();
    this.setState({thirdChartAnalytics: thirdAntChart});
    const thirdAntData = await getAntThirdChartData();
    this.setState({thirdAddData: thirdAntData});
    const orgUnitsData= await  getOrganisationUnits();
    this.setState({organisationUnits: orgUnitsData});
    const antpieData= await getAntFourthPieData();
    this.setState({pieChartData: antpieData});
    const indicatorData = await getIndicators()
    this.setState({indicators: indicatorData})
    const orgUnitGroups= await getorganisationUnitGroups();
    this.setState({organisationUnitGroups: orgUnitGroups});
    const sixthantchartdata = await getAntsixthChart()
    this.setState({sixthantChart: sixthantchartdata.rows})
    const seventhAntData = await getAntseventhChart()
    this.setState({seventhantChart: seventhAntData})
    
  
    }

    AntchartChiefdom = () => {
      const { organisationUnits,  sixthantChart  } = this.state
  
      if (!organisationUnits || !sixthantChart ) {
        return <div>Loading....</div>
      }

      //get the rows values

      //getting the organistaionUnitDisplayName 
      let orgUnitDisplayNames = []
    let value1 = []

    for (let i = 0; i < sixthantChart.length; i++) {
        for (let j = 0; j < organisationUnits.length; j++) {
           
           if (sixthantChart[i][1] === organisationUnits[j].id) {
            orgUnitDisplayNames.push(( organisationUnits[j].displayName))
            value1.push(parseFloat(sixthantChart[i][2]))

       }
     }
  }
  console.log(orgUnitDisplayNames)
  console.log(value1)

  const barChart = (
    <Bar
      data={{
        labels: orgUnitDisplayNames,
        datasets: [
          {
            data: value1,
            label: 'ANC 1 Coverage',
            borderColor: '#3333ff',
            backgroundColor: 'rgb(154,205,50)',
            fill: true,

          }
      ],
      }}
      options = {{
        plugins: {
          legend: { position: "bottom" },
          title: {
            display: true,
            text: 'ANC: ANC 1 coverage western chiefdoms this year'
        }
        },
        responsive: true
      }}
    />
  )
 // console.log(orgData[1].value)
  return barChart
  
}
  
    //creating first antchart with dynamic ids
    AntchartOne = () => {
      const { visualizations, dashboards, organisationUnits, indicators} = this.state

    if (!visualizations || !dashboards || !organisationUnits || !indicators) {
      return <div>Loading....</div>
    }


    const firstDashboardItems = dashboards[0].dashboardItems;
    const visualizationIds = [];

    for (let i = 0; i < firstDashboardItems.length; i++) {
      if (firstDashboardItems[i].visualization) {
        visualizationIds.push(firstDashboardItems[i].visualization);
      }
    }
    console.log(visualizationIds)

    let requiredVisaulizations = [];

    for (let i = 0; i < visualizationIds.length; i++) {
       for (let j = 0; j < visualizations.length; j++ ){
      if (( visualizationIds[i].id === visualizations[j].id)) {
        requiredVisaulizations.push(visualizations[j]);
      }
    }
  }
    console.log(requiredVisaulizations)
    console.log(visualizations)

    const visualisationMetadata = requiredVisaulizations[2];

    const visualisationName = visualisationMetadata.displayName
    const period = visualisationMetadata.relativePeriods
    //const orgUnitGroups = visualisationMetadata.organisationUnitGroupSetDimensions[0].organisationUnitGroups.map(ids => ids.id)
    const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
    //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
    //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
    const orgUnits = visualisationMetadata.organisationUnits.map(ids => ids.id)
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
for (var i = 0; i < text.length; i++)
{
    if (!wasUpper && text[i] == text.toUpperCase()[i] && isNaN(text[i]))
    {
      
        newString = newString + "_";
        wasUpper = true;
    }
    
    else
    {
        wasUpper = false;
    }
    newString = newString + text[i];
}

 const periodFormat = newString.toUpperCase()
 console.log(newString)
 
 var textdigit = "";
 var firstDigit = false;
 
 for (var i = 0; i < newString.length; i++)
{
    if (!firstDigit && !isNaN(newString[i]))
    {
      
        textdigit = textdigit + "_";
        firstDigit = true;
    }
    
    else
    {
        firstDigit = false;
    }
    textdigit = textdigit + newString[i];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


 //appending the data Dimension with ;
 const dxArray = []
    for(var i = 0; i < dataDimension.length; i++){
      dxArray.push(dataDimension[i]+";")
    }
    const dataDimensionString = dxArray.join('')
    console.log(dataDimensionString)

  
 //appending the organisation unit dimension with ; 
    const array = []
    for(var i = 0; i < orgUnits.length; i++){
      array.push(orgUnits[i]+";")
    }
    const orgUnitsString = array.join('')
    console.log(orgUnitsString)

    /*var dataValues = $.ajax({
      url: 'https://play.dhis2.org/dev/api/38' + `/analytics.json?dimension=${orgUnitsString}&dimension=dx:${dataDimensionString}&dimension=pe:${newPeFormat}`,
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
      success: function (data) { },
      async: false,
      error: function (err) {
        console.log(err);
      }
    }).responseJSON;
  
    console.log(dataValues.rows)*/

   var dataValues = $.ajax({
    url: 'https://play.dhis2.org/dev/api/38' + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
    dataType: "json",
    headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
    success: function (data) { },
    async: false,
    error: function (err) {
      console.log(err);
    }
  }).responseJSON;

  console.log(dataValues.rows)

  return ChartWithPeRow(organisationUnits, dataValues, visualisationName)
  
  //ChartWithPeOuRow(organisationUnits,indicators, dataValues, visualisationName)
  //LineChart(organisationUnits, dataValues, visualisationName)
  //ChartWithPeRow(organisationUnits, dataValues, visualisationName)

 
  }
  //Coverage by quarter and district
  AntchartCQDistrct = () => {
    const { visualizations, dashboards, organisationUnits, indicators} = this.state

  if (!visualizations || !dashboards || !organisationUnits || !indicators) {
    return <div>Loading....</div>
  }


  const firstDashboardItems = dashboards[0].dashboardItems;
  const visualizationIds = [];

  for (let i = 0; i < firstDashboardItems.length; i++) {
    if (firstDashboardItems[i].visualization) {
      visualizationIds.push(firstDashboardItems[i].visualization);
    }
  }
  console.log(visualizationIds)

  let requiredVisaulizations = [];

  for (let i = 0; i < visualizationIds.length; i++) {
     for (let j = 0; j < visualizations.length; j++ ){
    if (( visualizationIds[i].id === visualizations[j].id)) {
      requiredVisaulizations.push(visualizations[j]);
    }
  }
}
  console.log(requiredVisaulizations)
  console.log(visualizations)

  const visualisationMetadata = requiredVisaulizations[0];

  const visualisationName = visualisationMetadata.displayName
  const period = visualisationMetadata.relativePeriods
  const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
  const orgUnits = visualisationMetadata.organisationUnits.map(ids => ids.id)
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
for (var i = 0; i < text.length; i++)
{
  if (!wasUpper && text[i] == text.toUpperCase()[i] && isNaN(text[i]))
  {
    
      newString = newString + "_";
      wasUpper = true;
  }
  
  else
  {
      wasUpper = false;
  }
  newString = newString + text[i];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var i = 0; i < newString.length; i++)
{
  if (!firstDigit && !isNaN(newString[i]))
  {
    
      textdigit = textdigit + "_";
      firstDigit = true;
  }
  
  else
  {
      firstDigit = false;
  }
  textdigit = textdigit + newString[i];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


//appending the data Dimension with ;
const dxArray = []
  for(var i = 0; i < dataDimension.length; i++){
    dxArray.push(dataDimension[i]+";")
  }
  const dataDimensionString = dxArray.join('')
  console.log(dataDimensionString)


//appending the organisation unit dimension with ; 
  const array = []
  for(var i = 0; i < orgUnits.length; i++){
    array.push(orgUnits[i]+";")
  }
  const orgUnitsString = array.join('')
  console.log(orgUnitsString)

 var dataValues = $.ajax({
  url: 'https://play.dhis2.org/dev/api/38' + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
  success: function (data) { },
  async: false,
  error: function (err) {
    console.log(err);
  }
}).responseJSON;

console.log(dataValues.rows)

return  ChartWithPeOuRow(organisationUnits,indicators, dataValues, visualisationName)


}

  CumulativeChart = () => {
    const { visualizations, dashboards, organisationUnits, indicators} = this.state

  if (!visualizations || !dashboards || !organisationUnits || !indicators) {
    return <div>Loading....</div>
  }


  const firstDashboardItems = dashboards[0].dashboardItems;
  const visualizationIds = [];

  for (let i = 0; i < firstDashboardItems.length; i++) {
    if (firstDashboardItems[i].visualization) {
      visualizationIds.push(firstDashboardItems[i].visualization);
    }
  }
  console.log(visualizationIds)

  let requiredVisaulizations = [];

  for (let i = 0; i < visualizationIds.length; i++) {
     for (let j = 0; j < visualizations.length; j++ ){
    if (( visualizationIds[i].id === visualizations[j].id)) {
      requiredVisaulizations.push(visualizations[j]);
    }
  }
}
  console.log(requiredVisaulizations)
  console.log(visualizations)

  const visualisationMetadata = requiredVisaulizations[4];

  const visualisationName = visualisationMetadata.displayName
  const period = visualisationMetadata.relativePeriods
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  //const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
  const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
  const orgUnits = visualisationMetadata.organisationUnits.map(ids => ids.id)
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
for (var i = 0; i < text.length; i++)
{
  if (!wasUpper && text[i] == text.toUpperCase()[i] && isNaN(text[i]))
  {
    
      newString = newString + "_";
      wasUpper = true;
  }
  
  else
  {
      wasUpper = false;
  }
  newString = newString + text[i];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var i = 0; i < newString.length; i++)
{
  if (!firstDigit && !isNaN(newString[i]))
  {
    
      textdigit = textdigit + "_";
      firstDigit = true;
  }
  
  else
  {
      firstDigit = false;
  }
  textdigit = textdigit + newString[i];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


//appending the data Dimension with ;
const dxArray = []
  for(var i = 0; i < dataDimension.length; i++){
    dxArray.push(dataDimension[i]+";")
  }
  const dataDimensionString = dxArray.join('')
  console.log(dataDimensionString)


//appending the organisation unit dimension with ; 
  const array = []
  for(var i = 0; i < orgUnits.length; i++){
    array.push(orgUnits[i]+";")
  }
  const orgUnitsString = array.join('')
  console.log(orgUnitsString)

 var dataValues = $.ajax({
  url: 'https://play.dhis2.org/dev/api/38' + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
  success: function (data) { },
  async: false,
  error: function (err) {
    console.log(err);
  }
}).responseJSON;

console.log(dataValues.rows)

return LineChart(organisationUnits, dataValues, visualisationName)


}

ChiefdomChart = () => {
  const { visualizations, dashboards, organisationUnits, indicators} = this.state

if (!visualizations || !dashboards || !organisationUnits || !indicators) {
  return <div>Loading....</div>
}


const firstDashboardItems = dashboards[0].dashboardItems;
const visualizationIds = [];

for (let i = 0; i < firstDashboardItems.length; i++) {
  if (firstDashboardItems[i].visualization) {
    visualizationIds.push(firstDashboardItems[i].visualization);
  }
}
console.log(visualizationIds)

let requiredVisaulizations = [];

for (let i = 0; i < visualizationIds.length; i++) {
   for (let j = 0; j < visualizations.length; j++ ){
  if (( visualizationIds[i].id === visualizations[j].id)) {
    requiredVisaulizations.push(visualizations[j]);
  }
}
}
console.log(requiredVisaulizations)
console.log(visualizations)

const visualisationMetadata = requiredVisaulizations[3];

const visualisationName = visualisationMetadata.displayName
const period = visualisationMetadata.relativePeriods
//const orgUnitGroups = visualisationMetadata.organisationUnitGroupSetDimensions[0].organisationUnitGroups.map(ids => ids.id)
const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
//const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.indicator.id)
//const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
const orgUnits = visualisationMetadata.organisationUnits.map(ids => ids.id)
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
for (var i = 0; i < text.length; i++)
{
if (!wasUpper && text[i] == text.toUpperCase()[i] && isNaN(text[i]))
{
  
    newString = newString + "_";
    wasUpper = true;
}

else
{
    wasUpper = false;
}
newString = newString + text[i];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var i = 0; i < newString.length; i++)
{
if (!firstDigit && !isNaN(newString[i]))
{
  
    textdigit = textdigit + "_";
    firstDigit = true;
}

else
{
    firstDigit = false;
}
textdigit = textdigit + newString[i];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


//appending the data Dimension with ;
const dxArray = []
for(var i = 0; i < dataDimension.length; i++){
  dxArray.push(dataDimension[i]+";")
}
const dataDimensionString = dxArray.join('')
console.log(dataDimensionString)


//appending the organisation unit dimension with ; 
const array = []
for(var i = 0; i < orgUnits.length; i++){
  array.push(orgUnits[i]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)

var dataValues = $.ajax({
url: 'https://play.dhis2.org/2.37.2/api/38' + `/analytics.json?dimension=dx:${dataDimensionString}&dimension=ou:${orgUnitsString}&dimension=pe:${newPeFormat}`,
dataType: "json",
headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
success: function (data) { },
async: false,
error: function (err) {
  console.log(err);
}
}).responseJSON;

console.log(dataValues.rows)

return BarChartsWithOuRow(organisationUnits, dataValues, visualisationName)

//ChartWithPeOuRow(organisationUnits,indicators, dataValues, visualisationName)
//LineChart(organisationUnits, dataValues, visualisationName)
//ChartWithPeRow(organisationUnits, dataValues, visualisationName)


}

//Pie Chart
PieChart = () => {
  const { visualizations, dashboards, organisationUnitGroups, indicators} = this.state

if (!visualizations || !dashboards || !organisationUnitGroups || !indicators) {
  return <div>Loading....</div>
}


const firstDashboardItems = dashboards[0].dashboardItems;
const visualizationIds = [];

for (let i = 0; i < firstDashboardItems.length; i++) {
  if (firstDashboardItems[i].visualization) {
    visualizationIds.push(firstDashboardItems[i].visualization);
  }
}
console.log(visualizationIds)

let requiredVisaulizations = [];

for (let i = 0; i < visualizationIds.length; i++) {
   for (let j = 0; j < visualizations.length; j++ ){
  if (( visualizationIds[i].id === visualizations[j].id)) {
    requiredVisaulizations.push(visualizations[j]);
  }
}
}
console.log(requiredVisaulizations)
console.log(visualizations)

const visualisationMetadata = requiredVisaulizations[5];

const visualisationName = visualisationMetadata.displayName
const period = visualisationMetadata.relativePeriods
const chartIndicator = visualisationMetadata.organisationUnitGroupSetDimensions.map(ids =>ids.organisationUnitGroupSet.id)
const orgUnitGroups = visualisationMetadata.organisationUnitGroupSetDimensions.map(orgids => orgids.organisationUnitGroups.map(ids => ids.id))
const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
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
for (var i = 0; i < text.length; i++)
{
if (!wasUpper && text[i] == text.toUpperCase()[i] && isNaN(text[i]))
{
  
    newString = newString + "_";
    wasUpper = true;
}

else
{
    wasUpper = false;
}
newString = newString + text[i];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var i = 0; i < newString.length; i++)
{
if (!firstDigit && !isNaN(newString[i]))
{
  
    textdigit = textdigit + "_";
    firstDigit = true;
}

else
{
    firstDigit = false;
}
textdigit = textdigit + newString[i];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


//appending the data Dimension with ;
const dxArray = []
for(var i = 0; i < dataDimension.length; i++){
  dxArray.push(dataDimension[i]+";")
}
const dataDimensionString = dxArray.join('')
console.log(dataDimensionString)

console.log(orgUnitGroups)

//adding pending indicator with ;
const InArray = []
for(var i = 0; i < chartIndicator.length; i++){
  InArray.push(chartIndicator[i]+":")
}
const ChartIndicatorString = InArray.join('')
console.log(ChartIndicatorString)

//appending the organisation unit dimension with ; 
var array = []
for(var i = 0; i < orgUnitGroups[0].length; i++){
  array.push(orgUnitGroups[0][i]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)
//concatinating the actual dataDimension
const orgUnitGroupDx = ChartIndicatorString + orgUnitsString
console.log(orgUnitGroupDx) 

var dataValues = $.ajax({
  url: 'https://play.dhis2.org/dev/api/38' + `/analytics.json?dimension=${orgUnitGroupDx}&filter=pe:${newPeFormat}&filter=dx:${dataDimensionString}&filter=ou:USER_ORGUNIT&includeNumDen=false&skipMeta=true&skipData=false`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
  success: function (data) { },
  async: false,
  error: function (err) {
    console.log(err);
  }
}).responseJSON;

console.log(dataValues.rows)

return PieChart(organisationUnitGroups, dataValues, visualisationName) 

}

//stacked Chart
StackedChart = () => {
  const { visualizations, dashboards, organisationUnitGroups, indicators} = this.state

if (!visualizations || !dashboards || !organisationUnitGroups || !indicators) {
  return <div>Loading....</div>
}


const firstDashboardItems = dashboards[0].dashboardItems;
const visualizationIds = [];

for (let i = 0; i < firstDashboardItems.length; i++) {
  if (firstDashboardItems[i].visualization) {
    visualizationIds.push(firstDashboardItems[i].visualization);
  }
}
console.log(visualizationIds)

let requiredVisaulizations = [];

for (let i = 0; i < visualizationIds.length; i++) {
   for (let j = 0; j < visualizations.length; j++ ){
  if (( visualizationIds[i].id === visualizations[j].id)) {
    requiredVisaulizations.push(visualizations[j]);
  }
}
}
console.log(requiredVisaulizations)
console.log(visualizations)

const visualisationMetadata = requiredVisaulizations[6];

const visualisationName = visualisationMetadata.displayName
const period = visualisationMetadata.relativePeriods
const chartIndicator = visualisationMetadata.organisationUnitGroupSetDimensions.map(ids =>ids.organisationUnitGroupSet.id)
const orgUnitGroups = visualisationMetadata.organisationUnitGroupSetDimensions.map(orgids => orgids.organisationUnitGroups.map(ids => ids.id))
const dataDimension = visualisationMetadata.dataDimensionItems.map(ids => ids.dataElement.id)
const orgUnits = visualisationMetadata.organisationUnits.map(ids => ids.id)
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
for (var i = 0; i < text.length; i++)
{
if (!wasUpper && text[i] == text.toUpperCase()[i] && isNaN(text[i]))
{
  
    newString = newString + "_";
    wasUpper = true;
}

else
{
    wasUpper = false;
}
newString = newString + text[i];
}

const periodFormat = newString.toUpperCase()
console.log(newString)

var textdigit = "";
var firstDigit = false;

for (var i = 0; i < newString.length; i++)
{
if (!firstDigit && !isNaN(newString[i]))
{
  
    textdigit = textdigit + "_";
    firstDigit = true;
}

else
{
    firstDigit = false;
}
textdigit = textdigit + newString[i];
}
const newPeFormat = textdigit.toUpperCase()
console.log(newPeFormat)


//appending the data Dimension with ;
const dxArray = []
for(var i = 0; i < dataDimension.length; i++){
  dxArray.push(dataDimension[i]+";")
}
const dataDimensionString = dxArray.join('')
console.log(dataDimensionString)

console.log(orgUnitGroups)

//adding pending indicator with ;
const InArray = []
for(var i = 0; i < chartIndicator.length; i++){
  InArray.push(chartIndicator[i]+":")
}
const ChartIndicatorString = InArray.join('')
console.log(ChartIndicatorString)

//appending the organisation unit dimension with ; 
var array = []
for(var i = 0; i < orgUnitGroups[0].length; i++){
  array.push(orgUnitGroups[0][i]+";")
}
const orgUnitsString = array.join('')
console.log(orgUnitsString)
//concatinating the actual dataDimension
const orgUnitGroupDx = ChartIndicatorString + orgUnitsString
console.log(orgUnitGroupDx) 

 //appending the organisation unit dimension with ; 
 const orgarray = []
 for(var i = 0; i < orgUnits.length; i++){
   orgarray.push(orgUnits[i]+";")
 }
 const actualOrgUnitsString = orgarray.join('')
 console.log(orgUnitsString)

var dataValues = $.ajax({
  url: 'https://play.dhis2.org/dev/api/38' + `/analytics.json?dimension=${orgUnitGroupDx}&filter=pe:${newPeFormat}&filter=dx:${dataDimensionString}&filter=ou:${actualOrgUnitsString}`,
  dataType: "json",
  headers: { "Authorization": "Basic " + btoa("admin" + ":" + "district") },
  success: function (data) { },
  async: false,
  error: function (err) {
    console.log(err);
  }
}).responseJSON;

console.log(dataValues.rows)

}



  AntchartTwo = () => {
    const { organisationUnits, secondChartAnalytics  } = this.state
  
    if ( !organisationUnits || !secondChartAnalytics ) {
      return <div>Loading....</div>
    }
  
    const orgIds = secondChartAnalytics.metaData.dimensions.ou
  
    const dataItems = secondChartAnalytics.metaData.items;
      console.log(dataItems);
  
      const dataItemsArr = []
      for (var items in dataItems) {
        var name = dataItems[items].name;
        dataItemsArr.push(name);
      }
      console.log(dataItemsArr);
      
      //creating actual xAxisLabels
      const XLabels = []
      for (let i = 0; i<12; i++){
           XLabels.push(dataItemsArr[i])
      }
  
      console.log(XLabels);
  
    //get org display names
    const OrgUnitsDispNames = []
    organisationUnits.forEach(org => {
      orgIds.forEach(id => {
        if (org.id === id) {
          OrgUnitsDispNames.push(org.displayName)
        }
      })
    })
  
    console.log(OrgUnitsDispNames);
    console.log(orgIds);
  
    //get actaull data
    const actualData = secondChartAnalytics.rows
  
    //create an array of objects that stores the values in order
    let orgData = [{
      id: '',
      values: [],
      periods: []
    }]
  
    let id = [], value = [], period = []
  
    for (let i = 0; i < actualData.length; i++) {
  
      if (actualData[i][1] === orgIds[0]) {
        id = OrgUnitsDispNames[0]
        value.push(parseFloat(actualData[i][3]))
        period.push(actualData[i][2])
  
      }
  
    }
    orgData.push({ id, value, period })
  
    let id1 = [], value1 = [], period1 = []
  
    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[1]) {
        id1 = OrgUnitsDispNames[1]
        value1.push(parseFloat(actualData[i][3]))
        period1.push(actualData[i][2])
      }
    }
    orgData.push({ id1, value1, period1 })
  
  
    let id2 = [], value2 = [], period2 = []
  
    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[2]) {
        id2 = OrgUnitsDispNames[3]
        value2.push(parseFloat(actualData[i][3]))
        period2.push(actualData[i][2])
      }
    }
    orgData.push({ id2, value2, period2 })
  
  
    let id3 = [], value3 = [], period3 = []
  
    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[3]) {
        id3 = OrgUnitsDispNames[2]
        value3.push(parseFloat(actualData[i][3]))
        period3.push(actualData[i][2])
      }
    }
    orgData.push({ id3, value3, period3 })
  
  
    let id4 = [], value4 = [], period4 = []
  
    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i][1] === orgIds[4]) {
        id4 = OrgUnitsDispNames[4]
        value4.push(parseFloat(actualData[i][3]))
        period4.push(actualData[i][2])
      }
    }
    orgData.push({ id4, value4, period4 })
    const lineChart = (
      <Line
        data={{
          labels:XLabels,
          datasets: [
            {
              data: orgData[1].value,
              label: orgData[1].id,
              borderColor: 'rgb(70,130,180)',
  
            },
            {
              data: orgData[2].value1,
              label: orgData[2].id1,
              borderColor: 'rgb(128,128,128)',
              
          },
          {
            data: orgData[3].value2,
            label: orgData[3].id2,
            borderColor: 'rgb(47,79,79)', 
  
          },
          {
            data: orgData[4].value3,
            label: orgData[4].id3,
            borderColor: 'rgb(128,128,0)',
            
  
          },
          {
            data: orgData[5].value4,
            label: orgData[5].id4,
            borderColor: 'rgb(255,255,0)', 
  
          },
        ],
        }}
        options = {{
          plugins: {
            legend: { position: "bottom" },
            title: {
              display: true,
              text: 'ANC: ANC 1st visits last 12 months cumulative values'
          }
          },
          responsive: true
        }}
      />
    )
   // console.log(orgData[1].value)
    return lineChart
  }
  
  //prepare thirdChart
  AntchartThree = () => {
    const {organisationUnits, thirdChartAnalytics, thirdAddData  } = this.state
  
    if ( !organisationUnits || !thirdChartAnalytics || !thirdAddData ) {
      return <div>Loading....</div>
    }
    const dataItems = thirdChartAnalytics.metaData.items;
      console.log(dataItems);
  
      const dataItemsArr = []
      for (var items in dataItems) {
        var name = dataItems[items].name;
        dataItemsArr.push(name);
      }
      console.log(dataItemsArr);
      
      //creating actual xAxisLabels
      const XLabels = []
      for (let i = 0; i<12; i++){
           XLabels.push(dataItemsArr[i])
      }

      //slicing xlabels
      const slicedXlabels = []
      for (let i=0; i<XLabels.length; i++){
           slicedXlabels.push(XLabels[i].slice(0,8))
      }
  
      console.log(XLabels);
    //get actaull data
    const actualData = thirdChartAnalytics.rows
    const actualAddedData = thirdAddData.rows
    console.log(actualAddedData)
  
    //create an array of objects that stores the values in order
    const XlabelsValues= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December" ]
  
    let period = [], value = []
  
    for (let i = 0; i < actualData.length; i++) {
        value.push(parseFloat(actualData[i][3]))
        period.push(actualData[i][1])
    }
  
    let period1 = [], value1 = []
  
        for (let i = 0; i <actualAddedData.length; i++) {
            value1.push(parseFloat(actualAddedData[i][3]))
            period1.push(actualAddedData[i][1])
      
      }
  const lineChartTwo = (
      <Line
        data={{
          labels: XlabelsValues,
          datasets: [
            {
              data: value,
              label: '2021', //period[0].slice(0,4),
              borderColor: 'rgb(65,105,225)',
              fill: true,
  
            },
  
            {
              data: value1,
              label:  '2022', //period1[0].slice(0,4),
              borderColor: 'rgb(107,142,35)',
              fill: true,
  
            }
            
        ],
        }}
        options = {{
          plugins: {
            legend: { position: "bottom" },
            title: {
              display: true,
              text: 'ANC: ANC 1 coverage year over year'
          }
          },
          responsive: true
        }}
      />
    )
   // console.log(orgData[1].value)
    return lineChartTwo
  }

  AntPieChart = () => {
    const {pieChartData, organisationUnitGroups } = this.state

    if (!pieChartData || !organisationUnitGroups ) {
      return <div>Loading....</div>
    }
    //get the rows aggregated data
    const rowData = pieChartData.rows
    console.log(rowData)

    let orgunitgroupids = []
    let value1 = []

    for (let i = 0; i < rowData.length; i++) {
        for (let j = 0; j < organisationUnitGroups.length; j++) {
           
           if (rowData[i][0] === organisationUnitGroups[j].id) {
            orgunitgroupids.push(( organisationUnitGroups[j].displayName))
            value1.push(parseFloat(rowData[i][1]))

       }
     }
  }
    //get org display names
    const OrgUnitsGroupDispNames = []
    organisationUnitGroups.forEach(org => {
      orgunitgroupids.forEach(id => {
        if (org.id === id) {
          OrgUnitsGroupDispNames.push(org.displayName)
        }
      })
    })
    let  value = []
    for (let i = 0; i < rowData.length; i++) {
      value.push(parseFloat(rowData[i][1]))
  }
  console.log(value)
  console.log(OrgUnitsGroupDispNames)
  let colorHex= ['#FB3640', '#EFCA08', '#43AA8B', '#76818b', '#223D5B']

  const pieChart = (
      <Pie
        data={{
          labels:orgunitgroupids,
          datasets: [
            {
              data: value1,
              backgroundColor: colorHex,
              fill: true,
              height: "50%",
  
            }
        ],
        }}
        options = {{
          plugins: {
            legend: { position: "bottom" },
            title: {
              display: true,
              text: 'ANC:4+ visits by Facility Type last year'
          }
          },
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    )
    return pieChart

    
}

//creating the seventh chart

AntSeventhChart =  () => {
  const {  organisationUnits, indicators } = this.state

    if ( !organisationUnits || !indicators) {
      return <div>Loading....</div>
    }

    var getData = $.ajax({
      url: `https://play.dhis2.org/2.37.2/api/38/analytics?dimension=dx%3AUvn6LCg7dVU%3BOdiHJayrsKo,pe%3ALAST_4_QUARTERS,ou%3AO6uvpzGd5pu%3Bfdc6uOvgoji%3Blc3eMKXaEfw%3BjUb8gELQApl%3BPMa2VCrupOd`,
      dataType: "json",
      headers: { "Authorization": "Basic " + btoa('admin' + ":" + 'district') },
      success: function (data) { },
      async: false,
      error: function (err) {
        console.log(err);
      }
    }).responseJSON;

  

 const orgIds = getData.metaData.dimensions.ou
 const periodIds = getData.metaData.dimensions.pe
 const indicatorIds = getData.metaData.dimensions.dx
 console.log(indicatorIds)
 
 const rowData = getData.rows 
 //get indicators displayNames
 const indicatorDispNames = []
 for (let i = 0; i < indicatorIds.length; i++) {
  for (let j = 0; j < indicators.length; j++) {
     
     if (indicatorIds[i] === indicators[j].id) {
      indicatorDispNames.push(indicators[j].displayName)

 }
}
}
 console.log(indicatorDispNames);

 //getting the organisationUnit displayName

 const organisationUnitDispNames = []
 for (let i = 0; i < orgIds.length; i++) {
  for (let j = 0; j < organisationUnits.length; j++) {
     
     if (orgIds[i] ===  organisationUnits[j].id) {
      organisationUnitDispNames.push( organisationUnits[j].displayName)

 }
}
}
 console.log(organisationUnitDispNames);


let value = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[0] && rowData[i][1] === periodIds[0]) {
    value.push(parseFloat(rowData[i][3]))

  }

}
console.log(value)

let value1 = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[0] && rowData[i][1] === periodIds[1]) {
    value1.push(parseFloat(rowData[i][3]))

  }

}
console.log(value1)

let value2 = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[0] && rowData[i][1] === periodIds[2]) {
    value2.push(parseFloat(rowData[i][3]))

  }

}
console.log(value2)

let value3 = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[0] && rowData[i][1] === periodIds[3]) {
    value3.push(parseFloat(rowData[i][3]))

  }

}
console.log(value3)

const totalAnc1CoverageArr = value.concat(value1,value2,value3)
console.log(totalAnc1CoverageArr)

//getting values for Anc 2 coverage
let secondvalue = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[1] && rowData[i][1] === periodIds[0]) {
    secondvalue.push(parseFloat(rowData[i][3]))

  }

}
console.log(secondvalue)

let secondvalue1 = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[1] && rowData[i][1] === periodIds[1]) {
    secondvalue1.push(parseFloat(rowData[i][3]))

  }

}
console.log(secondvalue1)

let secondvalue2 = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[1] && rowData[i][1] === periodIds[2]) {
    secondvalue2.push(parseFloat(rowData[i][3]))

  }

}
console.log(secondvalue2)

let secondvalue3 = []

for (let i = 0; i < rowData.length; i++) {

  if (rowData[i][0] === indicatorIds[1] && rowData[i][1] === periodIds[3]) {
    secondvalue3.push(parseFloat(rowData[i][3]))

  }

}
console.log(secondvalue3)

const totalAnc2CoverageArr = secondvalue.concat(secondvalue1,secondvalue2,secondvalue3)
console.log(totalAnc2CoverageArr)

const xlabels = organisationUnitDispNames.concat(organisationUnitDispNames,organisationUnitDispNames,organisationUnitDispNames)
console.log(xlabels)

//drawing the bargraph from fetched data
const barChartVisualisation = (
  <Bar
    data={{
      labels: xlabels,
      datasets: [
        {
          data: totalAnc1CoverageArr,
          label: indicatorDispNames[0],
          borderColor: '#3333ff',
          backgroundColor: 'rgb(154,205,50)',
          fill: true,

        },
        {
          data: totalAnc2CoverageArr,
          label: indicatorDispNames[1],
          fill: true,
          borderColor: '#3333ff',
          backgroundColor: 'rgb(30,144,255)' 
      },
    ],
    }}
    options = {{
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: 'ANC: Coverage by quarter and district (two-category)'
      }
      },
      responsive: true,
    }}
  />
)
// console.log(orgData[1].value)
return barChartVisualisation

  
}
  
    //download function
    chart2PDF = e => {
  
      const but = e.target;
      but.style.display = "none";
      let input = window.document.getElementsByClassName("chart2PDF")[0];
  
      html2canvas(input).then(canvas => {
        const img = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "pt");
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

      return (
        <>
          <Box className={styles.graphbox}>
          <Grid container spacing={1}>
          <Grid item xs={10} sm={6}>
            <Card>
              <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
                <Dropdown>
                 <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                  <MoreHorizIcon/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={e => this.chart2PDF(e)}>Save as pdf</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent className = "chart2PDF">
              {/*this.AntSeventhChart()*/}
              {this.AntchartCQDistrct()}
              </CardContent>
            </Card>
          </Grid>
           <Grid item xs={10} sm={6}>
            <Card >
              <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
              <Dropdown>
                 <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                  <MoreHorizIcon/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">Save</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">View in full screen</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View as a table</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent className = "chart2PDF">
                {this.AntchartOne()}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Card>
              <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
               <Dropdown>
                 <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                  <MoreHorizIcon/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">Save as pdf</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent>
              {this.ChiefdomChart()}
              
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Card>
              <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
               <Dropdown>
                 <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                  <MoreHorizIcon/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">Save as pdf</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export as csv</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent>
              {/*this.AntchartTwo()*/}
              {this.CumulativeChart()}
              </CardContent>
            </Card>
          </Grid>
           <Grid item xs={10} sm={6}>
            <Card>
              <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
               <Dropdown>
                 <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                  <MoreHorizIcon/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">Save as pdf</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent>
              
                {this.AntchartThree()}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={5}>
            <Card>
              <CardContent style = {{paddingBottom: 0, display:'flex', justifyContent: 'flex-end'}}>
               <Dropdown>
                 <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                  <MoreHorizIcon/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">Save as pdf</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export as a csv</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View in full screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </CardContent>
              <CardContent>
               {/*this.AntPieChart()*/}
               {this.PieChart()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box> 
          <div>
            <button onClick={e => this.chart2PDF(e)}>Export 2 PDF</button>
          </div> 
          
          {this.AntchartChiefdom()}
          {this.AntchartCQDistrct()}   

      </>
     );
    }
  }
  
  export default AntCharts;
  