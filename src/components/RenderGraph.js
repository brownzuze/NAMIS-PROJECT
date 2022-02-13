import  {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const RenderGraph = (organisationUnits, dataValues, visualisationName) => {
  const orgIds = dataValues.metaData.dimensions.ou
      const dataItems = dataValues.metaData.items;
  
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
      const rowData = dataValues.rows
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
          id2 = OrgUnitsDispNames[2]
          value2.push(parseFloat(rowData[i][3]))
          period2.push(rowData[i][2])
        }
      }
      orgData.push({ id2, value2, period2 })
  
  
      let id3 = [], value3 = [], period3 = []
  
      for (let i = 0; i < rowData.length; i++) {
        if (rowData[i][1] === orgIds[3]) {
          id3 = OrgUnitsDispNames[3]
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
            {
              data: orgData[4].value3,
              label: orgData[4].id3,
              fill: true,
              backgroundColor: 'rgb(255,165,0)' 
  
            },
            {
              data: orgData[5].value4,
              label: orgData[5].id4,
              fill: true,
              backgroundColor: "rgba(199,136,153)",
  
            },
          ],
          }}
          options = {{
            plugins: {
              legend: { position: "bottom" },
              title: {
                display: true,
                text: visualisationName
            }
            },
            responsive: true
          }}
        />
      )
     // console.log(orgData[1].value)
      return barChart
  
  };
  
  export const randomValueGenerator = ({ digit }) => {
    const elm = Math.round(Math.random() * digit);
    return elm;
  };
  