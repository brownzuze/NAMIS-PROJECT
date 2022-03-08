import  {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const ChartWithPeRow = (organisationUnits, dataValues, visualisationName) => {
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

  export const ChartWithPeOuRow = (organisationUnits,indicators, dataValues, visualisationName) => {
   
   const orgIds = dataValues.metaData.dimensions.ou
   const periodIds = dataValues.metaData.dimensions.pe
   const indicatorIds = dataValues.metaData.dimensions.dx
   console.log(indicatorIds)
   
   const rowData = dataValues.rows 
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
  
    if (rowData[i][0] === indicatorIds[0] && rowData[i][2] === periodIds[0]) {
      value.push(parseFloat(rowData[i][3]))
  
    }
  
  }
  console.log(value)
  
  let value1 = []
  
  for (let i = 0; i < rowData.length; i++) {
  
    if (rowData[i][0] === indicatorIds[0] && rowData[i][2] === periodIds[1]) {
      value1.push(parseFloat(rowData[i][3]))
  
    }
  
  }
  console.log(value1)
  
  let value2 = []
  
  for (let i = 0; i < rowData.length; i++) {
  
    if (rowData[i][0] === indicatorIds[0] && rowData[i][2] === periodIds[2]) {
      value2.push(parseFloat(rowData[i][3]))
  
    }
  
  }
  console.log(value2)
  
  let value3 = []
  
  for (let i = 0; i < rowData.length; i++) {
  
    if (rowData[i][0] === indicatorIds[0] && rowData[i][2] === periodIds[3]) {
      value3.push(parseFloat(rowData[i][3]))
  
    }
  
  }
  console.log(value3)
  
  const totalAnc1CoverageArr = value.concat(value1,value2,value3)
  console.log(totalAnc1CoverageArr)
  
  //getting values for Anc 2 coverage
  let secondvalue = []
  
  for (let i = 0; i < rowData.length; i++) {
  
    if (rowData[i][0] === indicatorIds[1] && rowData[i][2] === periodIds[0]) {
      secondvalue.push(parseFloat(rowData[i][3]))
  
    }
  
  }
  console.log(secondvalue)
  
  let secondvalue1 = []
  
  for (let i = 0; i < rowData.length; i++) {
  
    if (rowData[i][0] === indicatorIds[1] && rowData[i][2] === periodIds[1]) {
      secondvalue1.push(parseFloat(rowData[i][3]))
  
    }
  
  }
  console.log(secondvalue1)
  
  let secondvalue2 = []
  
  for (let i = 0; i < rowData.length; i++) {
  
    if (rowData[i][0] === indicatorIds[1] && rowData[i][2] === periodIds[2]) {
      secondvalue2.push(parseFloat(rowData[i][3]))
  
    }
  
  }
  console.log(secondvalue2)
  
  let secondvalue3 = []
  
  for (let i = 0; i < rowData.length; i++) {
  
    if (rowData[i][0] === indicatorIds[1] && rowData[i][2] === periodIds[3]) {
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
            text:  visualisationName
        }
        },
        responsive: true,
      }}
    />
  )
  // console.log(orgData[1].value)
  return barChartVisualisation
  
    
  }

  export const LineChart = (organisationUnits, dataValues, visualisationName) => {
    const orgIds = dataValues.metaData.dimensions.ou
  
    const dataItems = dataValues.metaData.items;
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
    const actualData =dataValues.rows
  
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
              text: visualisationName
          }
          },
          responsive: true
        }}
      />
    )
   // console.log(orgData[1].value)
    return lineChart
  }

  export const PieChart = (organisationUnitGroups, dataValues, visualisationName) => {
    
    //get the rows aggregated data
    const rowData = dataValues.rows
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
              text: visualisationName
          }
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    )
    return pieChart

    
}

export const BarChartsWithOuRow = (organisationUnits, dataValues, visualisationName) => {
   
  //getting rows
  const rowData = dataValues.rows
  //getting the organistaionUnitDisplayName 
  let orgUnitDisplayNames = []
let value1 = []

for (let i = 0; i < rowData.length; i++) {
    for (let j = 0; j < organisationUnits.length; j++) {
       
       if (rowData[i][1] === organisationUnits[j].id) {
        orgUnitDisplayNames.push(( organisationUnits[j].displayName))
        value1.push(parseFloat(rowData[i][3]))

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
        text: visualisationName
    }
    },
    responsive: true
  }}
/>
)
// console.log(orgData[1].value)
return barChart

}

export const StackedChartWithPeRow = (organisationUnitGroups, dataValues, visualisationName) => {
  
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
      //get the rows aggregated data
      const rowData = dataValues.rows
  
      const orgIdsArray = [] 
       
      
        for(let i = 0; i<rowData.length; i++) {
          orgIdsArray.push(rowData[i][1])
        }
    
      console.log(orgIdsArray);

      const orgIds = Array.from(new Set( orgIdsArray));

console.log(orgIds);

//get organisation displayNames
const OrgUnitsDispNames = []
organisationUnitGroups.forEach(org => {
  orgIds.forEach(id => {
    if (org.id === id) {
      OrgUnitsDispNames.push(org.displayName)
    }
  })
})
console.log(OrgUnitsDispNames);
  
  
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
      console.log( orgData)
  
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
            scales: {
              xAxes: {
                  stacked: true
              },
              yAxes: {
                  stacked: true
              }
          },
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

  export const LineChartWithpeLabel = (dataValues, visualisationName) => {
    const dataItems = dataValues.metaData.items;
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
    const actualData = dataValues.rows
    console.log(actualData)
  
    //create an array of objects that stores the values in order
    const XlabelsValues= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December" ]
  
    let period = [], value = []
  
    for (let i = 0; i < actualData.length; i++) {
        value.push(parseFloat(actualData[i][3]))
        period.push(actualData[i][1])
    }
  
  const lineChartTwo = (
      <Line
        data={{
          labels: XlabelsValues,
          datasets: [
            {
              data: value,
              label: period[0].slice(0,4),
              borderColor: 'rgb(65,105,225)',
              fill: true,
  
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
    return lineChartTwo
  }


  