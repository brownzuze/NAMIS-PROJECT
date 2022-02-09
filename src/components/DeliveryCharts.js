import React from 'react';
import styles from '../App.module.css';
import { getIndicators, getOrganisationUnits, getDeliveryFirstChart, getDeliverySecondChart} from '../api';
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

class DeliveryCharts extends React.Component {
    state = {
      indicators: "",
      organisationUnits: "",
      firstDelChart: {},
    secondDelChart: {}
      
    }
  
  async  componentDidMount() {
    const firstDelChartData = await getDeliveryFirstChart()
    this.setState({firstDelChart: firstDelChartData})
    console.log(this.state.firstDelChart)
    const secondDelChartData = await getDeliverySecondChart()
    this.setState({secondDelChart: secondDelChartData})
    console.log(this.state.secondDelChart)
    const orgUnitsData= await  getOrganisationUnits();
    this.setState({organisationUnits: orgUnitsData});
    const indicatorData = await getIndicators()
    this.setState({indicators: indicatorData})
    
  }

    
    //creating first antchart 
    DeliveryChartOne = () => {
      const { organisationUnits, firstDelChart, indicators } = this.state
  
      if (!organisationUnits || !firstDelChart || !indicators ) {
        return <div>Loading....</div>
      }
  
      const indicatorIds = firstDelChart.metaData.dimensions.dx
      const orgIds = firstDelChart.metaData.dimensions.ou
      console.log(indicatorIds)

     //get the rows aggregated data
      const rowData = firstDelChart.rows
      console.log(rowData)

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

 //get Orgunitsnames
  const organisationUnitDispNames = []
 for (let i = 0; i < orgIds.length; i++) {
  for (let j = 0; j < organisationUnits.length; j++) {
     
     if (orgIds[i] ===  organisationUnits[j].id) {
      organisationUnitDispNames.push( organisationUnits[j].displayName)

 }
}
}
 console.log(organisationUnitDispNames);

      //create an array of objects that stores the values in order
      let orgData = [{
        id: '',
        values: []
      }]
  
      let id = [], value = []
  
      for (let i = 0; i < rowData.length; i++) {
  
        if (rowData[i][0] === indicatorIds[0]) {
          id =indicatorDispNames[0]
          value.push(parseFloat(rowData[i][2]))
  
        }
  
      }
      orgData.push({ id, value })
  
      let id1 = [], value1 = []
  
      for (let i = 0; i < rowData.length; i++) {
  
        if (rowData[i][0] === indicatorIds[1]) {
          id1 = indicatorDispNames[1]
          value1.push(parseFloat(rowData[i][2]))
  
        }
  
      }
      orgData.push({ id1, value1})
  
  
      let id2 = [], value2 = []
  
      for (let i = 0; i < rowData.length; i++) {
  
        if (rowData[i][0] === indicatorIds[2]) {
          id2 = indicatorDispNames[2]
          value2.push(parseFloat(rowData[i][2]))
  
        }
  
      }
      orgData.push({ id2, value2})
      const barChart = (
        <Bar
          data={{
            labels: organisationUnitDispNames,
            datasets: [
              {
                data: orgData[1].value,
                label: orgData[1].id,
                borderColor: '#3333ff',
                backgroundColor: 'rgb(154,205,50)',
                fill: true,
  
              },
              {
                data: orgData[2].value1,
                label: orgData[2].id1,
                fill: true,
                borderColor: 'blue',
                backgroundColor: 'rgb(30,144,255)' 
            },
            {
              data: orgData[3].value2,
              label: orgData[3].id2,
              fill: true,
              backgroundColor: "rgba(178,34,34)",
              
  
            },
          ],
          }}
          options = {{
            plugins: {
              legend: { position: "bottom" },
              title: {
                display: true,
                text: 'Delivery: Institutinal delivery rates Yearly'
            }
            },
            responsive: true
          }}
        />
      )
     
      return barChart
  }

  secondDeliveryChart = () => {
    const { organisationUnits,  secondDelChart  } = this.state

    if (!organisationUnits || !secondDelChart ) {
      return <div>Loading....</div>
    }

    //get the rows values

    let rowValues = secondDelChart.rows
    console.log(rowValues)

    //getting the organistaionUnitDisplayName 

    let orgUnitDisplayNames = []
  let value1 = []

  for (let i = 0; i < rowValues.length; i++) {
      for (let j = 0; j < organisationUnits.length; j++) {
         
         if (rowValues[i][1] === organisationUnits[j].id) {
          orgUnitDisplayNames.push(( organisationUnits[j].displayName))
          value1.push(parseFloat(rowValues[i][2]))

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
          label: 'PHU delivery rate (by expected pregnancies)',
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
          text: 'Delivery: PHU delivery rate (by pop.) by orgunit last year'
      }
      },
      responsive: true
    }}
  />
)
// console.log(orgData[1].value)
return barChart

}
  
  
  
    //download function
    chart2PDF = e => {
  
      const but = e.target;
      but.style.display = "none";
      let input = window.document.getElementsByClassName("chartPDF")[0];
  
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
        <div>
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
              <CardContent className = "chartPDF">
              {this. DeliveryChartOne()}
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
              <CardContent className = "delchartPDF">
               {this. secondDeliveryChart()}
              </CardContent>
            </Card>
          </Grid>
          </Grid>
       </Box>
             
      </div>
     );
    }
  }
  
  export default DeliveryCharts;
  