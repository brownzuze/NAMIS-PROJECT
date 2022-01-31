import React from 'react';
import styles from '../App.module.css';
import {getAntsixthChart , getDataElements, getfifthAntChart, getorganisationUnitGroups, getAntFourthPieData, getOrganisationUnits, getAntFirstChart, getAntSecondChart, getAntThirdChart, getAntThirdChartData} from '../api';
import { blue, red } from "@material-ui/core/colors";
import { Box, Card, Grid, Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import  {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import html2canvas from "html2canvas";
import jsPDF from "jspdf"
Chart.register(...registerables);

class AntCharts extends React.Component {
    state = {
      organisationUnits: "",
      firstChartAnalytics: {},
      secondChartAnalytics: {},
      thirdChartAnalytics: {},
      thirdAddData: {},
      pieChartData: {},
      organisationUnitGroups: "",
      fifthChartAnalytics: {},
      sixthantChart:{}
    }
  
  async  componentDidMount() {
    const firstAntChart = await getAntFirstChart();
    this.setState({firstChartAnalytics: firstAntChart});
    const secondAntChart = await getAntSecondChart();
    this.setState({secondChartAnalytics: secondAntChart})
    const thirdAntChart = await getAntThirdChart();
    this.setState({thirdChartAnalytics: thirdAntChart});
    const thirdAntData = await getAntThirdChartData();
    this.setState({thirdAddData: thirdAntData});
    console.log(this.state.thirdAddData.rows)
    const orgUnitsData= await  getOrganisationUnits();
    this.setState({organisationUnits: orgUnitsData});
    const antpieData= await getAntFourthPieData();
    this.setState({pieChartData: antpieData});
    console.log(this.state.pieChartData);
    const orgUnitGroups= await getorganisationUnitGroups();
    this.setState({organisationUnitGroups: orgUnitGroups});
    console.log(this.state.organisationUnitGroups);
    const sixthantchartdata = await getAntsixthChart()
    console.log(sixthantchartdata)
    this.setState({sixthantChart: sixthantchartdata.rows})
    console.log(this.state.sixthantChart)
    
  
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
  
    //creating first antchart 
    AntchartOne = () => {
      const { organisationUnits, firstChartAnalytics  } = this.state
  
      if (!organisationUnits || !firstChartAnalytics ) {
        return <div>Loading....</div>
      }
  
      const orgIds = firstChartAnalytics.metaData.dimensions.ou
      const dataItems = firstChartAnalytics.metaData.items;
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
  
      //get organisation displayNames
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
  
  
      //get the rows aggregated data
      const rowData = firstChartAnalytics.rows
  
      //create an array of objects that stores the values in order
      let orgData = [{
        id: '',
        values: [],
        periods: []
      }]
  
      let id = [], value = [], period = []
  
      for (let i = 0; i < rowData.length; i++) {
  
        if (rowData[i][1] === orgIds[0]) {
          id = OrgUnitsDispNames[0]
          value.push(parseFloat(rowData[i][3]))
          period.push(rowData[i][2])
  
        }
  
      }
      orgData.push({ id, value, period })
  
      let id1 = [], value1 = [], period1 = []
  
      for (let i = 0; i < rowData.length; i++) {
        if (rowData[i][1] === orgIds[1]) {
          id1 = OrgUnitsDispNames[1]
          value1.push(parseFloat(rowData[i][3]))
          period1.push(rowData[i][2])
        }
      }
      orgData.push({ id1, value1, period1 })
  
  
      let id2 = [], value2 = [], period2 = []
  
      for (let i = 0; i < rowData.length; i++) {
        if (rowData[i][1] === orgIds[2]) {
          id2 = OrgUnitsDispNames[3]
          value2.push(parseFloat(rowData[i][3]))
          period2.push(rowData[i][2])
        }
      }
      orgData.push({ id2, value2, period2 })
  
  
      let id3 = [], value3 = [], period3 = []
  
      for (let i = 0; i < rowData.length; i++) {
        if (rowData[i][1] === orgIds[3]) {
          id3 = OrgUnitsDispNames[2]
          value3.push(parseFloat(rowData[i][3]))
          period3.push(rowData[i][2])
        }
      }
      orgData.push({ id3, value3, period3 })
  
  
      let id4 = [], value4 = [], period4 = []
  
      for (let i = 0; i < rowData.length; i++) {
        if (rowData[i][1] === orgIds[4]) {
          id4 = OrgUnitsDispNames[4]
          value4.push(parseFloat(rowData[i][3]))
          period4.push(rowData[i][2])
        }
      }
      orgData.push({ id4, value4, period4 })
      const barChart = (
        <Bar
          data={{
            labels: XLabels,
            datasets: [
              {
                data: orgData[1].value,
                label: orgData[1].id,
                borderColor: '#3333ff',
                backgroundColor: 'rgb(255,230,0,0.5)',
                fill: true,
  
              },
              {
                data: orgData[2].value1,
                label: orgData[2].id1,
                fill: true,
                borderColor: 'red',
                backgroundColor: 'rgb(255,0,0,0.5)' 
            },
            {
              data: orgData[3].value2,
              label: orgData[3].id2,
              fill: true,
              backgroundColor: "rgba(198,40,40,0.6)",
              borderColor: red["A200"], 
  
            },
            {
              data: orgData[4].value3,
              label: orgData[4].id3,
              borderColor: 'blue',
              fill: true,
              backgroundColor: 'rgb(0,0,255,0.5)' 
  
            },
            {
              data: orgData[5].value4,
              label: orgData[5].id4,
              fill: true,
              backgroundColor: "rgba(21,101,192,0.6)",
              borderColor: blue["A200"], 
  
            },
          ],
          }}
          options = {{
            plugins: {
              legend: { position: "bottom" },
              title: {
                display: true,
                text: 'ANC: ANC 3 coverage by districts last 12 months'
            }
            },
            responsive: true
          }}
        />
      )
     // console.log(orgData[1].value)
      return barChart
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
  
      console.log(XLabels);
    //get actaull data
    const actualData = thirdChartAnalytics.rows
    const actualAddedData = thirdAddData.rows
    console.log(actualAddedData)
  
    //create an array of objects that stores the values in order
  
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
          labels:XLabels,
          datasets: [
            {
              data: value,
              borderColor: 'rgb(65,105,225)',
              fill: true,
  
            },
  
            {
              data: value1,
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
        pdf.save("dhishart.pdf");
        but.style.display = "block";
      });
    };
  
    render(){

      return (
        <div>
          <Box className={styles.graphbox}>
          <Grid container spacing={1}>
           <Grid item xs={12} sm={7}>
            <Card>
              <CardContent>
                <Typography variant='h5' component='h6'>
                </Typography>
              </CardContent>
              <CardContent className = "chart2PDF">
                {this.AntchartTwo()}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={5}>
            <Card>
              <CardContent>
                <Typography variant='h5' component='h6'>
                </Typography>
              </CardContent>
              <CardContent>
                {this.AntPieChart()}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Card>
              <CardContent>
                <Typography variant='h5' component='h6'>
                </Typography>
              </CardContent>
              <CardContent>
              {this.AntchartOne()}
              </CardContent>
            </Card>
          </Grid>
           <Grid item xs={10} sm={6}>
            <Card>
              <CardContent>
                <Typography variant='h5' component='h6'>
                </Typography>
              </CardContent>
              <CardContent>
              
                {this.AntchartThree()}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Card>
              <CardContent>
                <Typography variant='h5' component='h6'>
                </Typography>
              </CardContent>
              <CardContent>
              
              {this.AntchartChiefdom()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box> 
          <div>
            <button onClick={e => this.chart2PDF(e)}>Export 2 PDF</button>
          </div> 
          {this.AntchartChiefdom()}
             
      </div>
     );
    }
  }
  
  export default AntCharts;
  