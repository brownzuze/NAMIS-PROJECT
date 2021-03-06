import  {Bar, Line, Pie} from 'react-chartjs-2';
import Table from 'react-bootstrap/Table';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// creating chart with period rows and organization units label
/**
 * 
 * @param {*} organisationUnits 
 * @param {*} dataValues 
 * @param {*} visualisationName 
 * @returns  A function that renders charts
 */
export const ChartWithPeRow = (organisationUnits, dataValues, visualisationName) => {
  const orgIds = dataValues.metaData.dimensions.ou
      const dataItems = dataValues.metaData.items;
      const peId = dataValues.metaData.dimensions.pe


      const XLabels = []
      for (var i=0; i<peId.length; i++){
      for (var items in dataItems) {
        if(peId[i]===items){
        var name = dataItems[items].name;
        XLabels.push(name);
        }
      }
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

  // creating chart with period and organisation units rows
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

  // Creating a line chart
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


  //creating a pie chart
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
 // creating a stacked column chart
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
 // creating a line chart with period label
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
    const XlabelsValues= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
  
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

  export const OuRowCharts = (OuItems,dimensionItems, dataValues, visualisationName) => {

    const indicatorIds = dataValues.metaData.dimensions.dx
    const orgIds = dataValues.metaData.dimensions.ou
    console.log(indicatorIds)
    console.log(OuItems)
    console.log(dimensionItems)

   //get the rows aggregated data
    const rowData = dataValues.rows
    console.log(rowData)

  //get indicators displayNames

  const indicatorDispNames = []
  for (let i = 0; i < indicatorIds.length; i++) {
   for (let j = 0; j < dimensionItems.length; j++) {
   
   if (indicatorIds[i] === dimensionItems[j].id) {
    indicatorDispNames.push(dimensionItems[j].name)

}
}
}
console.log(indicatorDispNames);

//get Orgunitsnames
const organisationUnitDispNames = []
for (let i = 0; i < orgIds.length; i++) {
for (let j = 0; j < OuItems.length; j++) {
   
   if (orgIds[i] ===  OuItems[j].id) {
    organisationUnitDispNames.push( OuItems[j].name)

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
        value.push(parseFloat(rowData[i][3]))

      }

    }
    orgData.push({ id, value })

    let id1 = [], value1 = []

    for (let i = 0; i < rowData.length; i++) {

      if (rowData[i][0] === indicatorIds[1]) {
        id1 = indicatorDispNames[1]
        value1.push(parseFloat(rowData[i][3]))

      }

    }
    orgData.push({ id1, value1})


    let id2 = [], value2 = []

    for (let i = 0; i < rowData.length; i++) {

      if (rowData[i][0] === indicatorIds[2]) {
        id2 = indicatorDispNames[2]
        value2.push(parseFloat(rowData[i][3]))

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
              text: visualisationName
          }
          },
          responsive: true
        }}
      />
    )
   
    return barChart
}

export const BarChartsWithpeRow = (dataValues, peLabels, dxLabel, visualisationName, periods) => {
   
  //getting rows
  const rowData = dataValues.rows

  
  let value1 = []
  for (let i = 0; i< periods.length; i++){
    for (let j=0; j<rowData.length; j++){
      if(periods[i]===rowData[j][2]){
        value1.push(parseFloat(rowData[j][3]))        
      }
    }
      typeof(value1[i]) === 'undefined' ? value1.push("") : console.log(i)
  }
  console.log(value1)

const barChart = (
<Bar
  data={{
    labels: peLabels,
    datasets: [
      {
        data: value1,
        label: dxLabel,
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

export const secondBarChartsWithpeRow = (dataValues, peLabels, dxLabel, visualisationName, dataDimension) => {
   
  //getting rows
  const rowData = dataValues.rows

  
  let value1 = []
    for (let j=0; j<rowData.length; j++){
      if(dataDimension[0]===rowData[j][0]){
        value1.push(parseFloat(rowData[j][3]))        
      }
    }
    let value2 = []
    for (let j=0; j<rowData.length; j++){
      if(dataDimension[1]===rowData[j][0]){
        value2.push(parseFloat(rowData[j][3]))        
      }
    }
  
  console.log(value1)

const barChart = (
<Bar
  data={{
    labels: peLabels,
    datasets: [
      {
        data: value1,
        label: dxLabel[0],
        borderColor: '#3333ff',
        backgroundColor: 'rgb(154,205,50)',
        fill: true,

      },
      {
        data: value2,
        label: dxLabel[1],
        borderColor: '#3333ff',
        backgroundColor: 'rgb(30,144,255)',
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
// Creating barChart with indicators label
export const BarChartsWithdxRow = (dataValues, dataDimension, dxLabel, visualisationName, periods) => {
   
  //getting rows
  const rowData = dataValues.rows

let value1 = []
for (let j = 0; j < rowData.length; j++) {
      if(periods[0]===rowData[j][2]){
        value1.push({id:rowData[j][0], value:rowData[j][3]})
      }
}

console.log(value1)

let value2 = []
for (let j = 0; j < rowData.length; j++) {
      if(periods[1]===rowData[j][2]){
        value2.push({id:rowData[j][0], value:rowData[j][3]})
      }
}

let value3 = []
for (let j = 0; j < rowData.length; j++) {
      if(periods[2]===rowData[j][2]){
        value3.push({id:rowData[j][0], value:rowData[j][3]})
      }
}
let realValue1 = []

for (let i = 0; i < dataDimension.length; i++) {
    for (let j = 0; j < value1.length; j++){
      if(dataDimension[i]===value1[j].id){
        realValue1.push(value1[j].value)
      }
    }
    typeof(realValue1[i]) === 'undefined' ? realValue1.push("") : console.log(i)

}

let realValue2 = []

for (let i = 0; i < dataDimension.length; i++) {
    for (let j = 0; j < value2.length; j++){
      if(dataDimension[i]===value2[j].id){
        realValue2.push(value2[j].value)
      }
    }
    typeof(realValue2[i]) === 'undefined' ? realValue2.push("") : console.log(i)

}

let realValue3 = []

for (let i = 0; i < dataDimension.length; i++) {
    for (let j = 0; j < value3.length; j++){
      if(dataDimension[i]===value3[j].id){
        realValue3.push(value3[j].value)
      }
    }
    typeof(realValue3[i]) === 'undefined' ? realValue3.push("") : console.log(i)

}


const barChart = (
     <Bar
        data={{
          labels: dxLabel,
          datasets: [
            {
              data: realValue1,
              label: periods[0],
              borderColor: '#3333ff',
              backgroundColor: 'rgb(154,205,50)',
              fill: true,

            },
            {
              data: realValue2,
              label: periods[1],
              fill: true,
              borderColor: 'blue',
              backgroundColor: 'rgb(30,144,255)' 
          },
          {
            data: realValue3,
            label: periods[2],
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

//creating a pivot table
export const PivotTable = (organisationUnits, dataValues) => {
  const orgIds = dataValues.metaData.dimensions.ou
  const dataItems = dataValues.metaData.items;
  const rowData = dataValues.rows;
  const peId = dataValues.metaData.dimensions.pe

  console.log(orgIds)
  console.log(rowData)
  console.log(dataItems)
  console.log(peId)



  const periodArr = []
  for (var i=0; i<peId.length; i++){
  for (var items in dataItems) {
    if(peId[i]===items){
    var name = dataItems[items].name;
    periodArr.push(name);
    }
  }
}
  console.log(periodArr);
  


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

  var sortedArr = []

  for (var i=0; i<peId.length; i++){
    for(var j=0; j<rowData.length; j++){
      if(peId[i]===rowData[j][1]){
        sortedArr.push(rowData[j])
      }
    }
  }
  console.log(sortedArr)

  //looping values
  const arrayValues = []
  
  for(let i = 0; i<orgIds.length; i++){
    for(let j= 0; j<sortedArr.length; j++){
      if(orgIds[i] === sortedArr[j][2]){
        arrayValues.push(sortedArr[j][3])
      }
    }
  }

  const arrayObject = []
  let a = 0;

  for(let i = 0; i < arrayValues.length; i += 4){
    arrayObject.push({
       name: OrgUnitsDispNames[a],
       val: arrayValues[i],
       val1: arrayValues[i + 1],
       val2: arrayValues[i + 2],
       val3: arrayValues[i + 3],
    });
    a++
 };

  console.log(arrayValues)
  console.log(arrayObject)

  const PivotChart = (
    <Table striped border hover responsive>
    <thead>
      <tr>
        <th>organisationUnit</th>
         {periodArr.map(name => (
            <th>{name}</th>
         ))}
     </tr>
    </thead>

    <tbody>
    {arrayObject.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{listValue.name}</td>
              <td>{listValue.val}</td>
              <td>{listValue.val1}</td>
              <td>{listValue.val2}</td>
              <td>{listValue.val3}</td>
            </tr>
          );
        })}
    </tbody>
  </Table>
  )
  return PivotChart
}

// creating a report table
 export const reportTable = (dataValues, rowName, columnName) => {
  
  const rowData = dataValues.rows;
 const arrayValues = []
  for(let i = 0; i<rowData.length; i++){
      arrayValues.push(rowData[i][3])
  }

  console.log(arrayValues)
  
  //obtaining json object
  const res = [];
  for(let i = 0; i < rowName.length; i++){
     res.push({
        name: rowName[i],
        val: arrayValues[i]
     });
  };

  console.log(res)


  
  const PivotChart = (
    <Table striped border hover responsive>
    <thead>
    <tr>
        <th>Data/period</th>
         {columnName.map(name => (
            <th>{name}</th>
         ))}
     </tr>
    </thead>
    <tbody>
    {res.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{listValue.name}</td>
              <td>{listValue.val}</td>
            </tr>
          );
        })}
    </tbody>
  </Table>
  )
 // console.log(orgData[1].value)
  return PivotChart
   
 }

 // creating a report table
 export const YearlyreportTable = (dataValues, rowName, columnName, periods, dataDimension) => {
  
  const rowData = dataValues.rows;

  
 const arrayValues = []
  for(let i = 0; i<rowData.length; i++){
      arrayValues.push(rowData[i][3])
  }



  console.log(arrayValues)
  var sortedArr = []

  for (var i=0; i<periods.length; i++){
    for(var j=0; j<rowData.length; j++){
      if(periods[i]===rowData[j][2]){
        sortedArr.push(rowData[j])
      }
    }
  }
  console.log(sortedArr)
  //looping values
  const newarrayValues = []

  for(let i = 0; i<dataDimension.length; i++){

     newarrayValues.push([])
    for(let j = 0; j<periods.length; j++){
        for (let k = 0; k < sortedArr.length; k++){

         if(periods[j] === sortedArr[k][2] && dataDimension[i]===sortedArr[k][0]){
           newarrayValues[i].push(sortedArr[k][3])  
    }
  }
  typeof(newarrayValues[i][j]) === 'undefined' ? newarrayValues[i].push("") : console.log(i)

 }
}
  console.log(newarrayValues)

  var merged = [].concat.apply([], newarrayValues)
  console.log(merged)

  const arrayObject = []
   let a = 0;
  for(let i = 0; i < merged.length; i += 12){
    arrayObject.push({
       name: rowName[a],
       val: merged[i],
       val1: merged[i + 1],
       val2: merged[i + 2],
       val3: merged[i + 3],
       val4: merged[i + 4],
       val5: merged[i + 5],
       val6: merged[i + 6],
       val7: merged[i + 7],
       val8: merged[i + 8],
       val9: merged[i + 9],
       val10: merged[i + 10],
       val11: merged[i + 11]
    });
    a++
 };
 console.log(a)
  
  //obtaining json object
  const res = [];
  for(let i = 0; i < rowName.length; i++){
     res.push({
        name: rowName[i],
        val: arrayValues[i]
     });
  };

  console.log(res)


  
  const PivotChart = (
    <Table striped border hover responsive>
    <thead>
    <tr>
        <th>Data/period</th>
         {columnName.map(name => (
            <th>{name}</th>
         ))}
     </tr>
    </thead>
    <tbody>
    {arrayObject.map(( listValue, index ) => {
          return (
            <tr key={index}>
            <td>{listValue.name}</td>
            <td>{listValue.val}</td>
            <td>{listValue.val1}</td>
            <td>{listValue.val2}</td>
            <td>{listValue.val3}</td>
            <td>{listValue.val4}</td>
            <td>{listValue.val5}</td>
            <td>{listValue.val6}</td>
            <td>{listValue.val7}</td>
            <td>{listValue.val8}</td>
            <td>{listValue.val9}</td>
            <td>{listValue.val10}</td>
            <td>{listValue.val11}</td>


            </tr>
          );
        })}
    </tbody>
  </Table>
  )
  return PivotChart
   
 }

 // creating a report table
 export const dxColumnreportTable = (dataValues, rowName, columnName, periods, dataDimension) => {
  
  const rowData = dataValues.rows;
  console.log(rowData)
//sorting the rowData array
  var sortedArr = []

  for (var i=0; i<periods.length; i++){
    for(var j=0; j<rowData.length; j++){
      if(periods[i]===rowData[j][2]){
        sortedArr.push(rowData[j])
      }
    }
  }
  console.log(sortedArr)
  //looping values
  const newarrayValues = []

  for(let i = 0; i<periods.length; i++){

     newarrayValues.push([])
    for(let j = 0; j<dataDimension.length; j++){
        for (let k = 0; k < sortedArr.length; k++){

         if( dataDimension[j]===sortedArr[k][0] && periods[i] === sortedArr[k][2]){
           newarrayValues[i].push(parseFloat(sortedArr[k][3]))  
    }
  }
  typeof(newarrayValues[i][j]) === 'undefined' ? newarrayValues[i].push("") : console.log(i)

 }
}
  console.log(newarrayValues)

  const PivotChart = (
    <Table striped border hover responsive>
    <thead>
    <tr>
        <th>Data/period</th>
         {columnName.map(name => (
            <th>{name}</th>
         ))}
     </tr>
    </thead>
    <tbody>
    
            <tr>
            <td>{rowName[0]}</td>
            {newarrayValues[0].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[1]}</td>
            {newarrayValues[1].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[2]}</td>
            {newarrayValues[2].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[3]}</td>
            {newarrayValues[3].map(value => (
              <td>{value}</td>
            ))}
            </tr>

            <tr>
            <td>{rowName[4]}</td>
            {newarrayValues[4].map(value => (
              <td>{value}</td>
            ))}
            </tr>

            <tr>
            <td>{rowName[5]}</td>
            {newarrayValues[5].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[6]}</td>
            {newarrayValues[6].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[7]}</td>
            {newarrayValues[7].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[8]}</td>
            {newarrayValues[8].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[9]}</td>
            {newarrayValues[9].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[10]}</td>
            {newarrayValues[10].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            <tr>
            <td>{rowName[11]}</td>
            {newarrayValues[11].map(value => (
              <td>{value}</td>
            ))}
            </tr>
            
          
    </tbody>
  </Table>
  )
  return PivotChart
   
 }

 export const YearlyPivotTable = (dataValues, items) => {
  
  const rowData = dataValues.rows;
  const year =rowData[1][0]
  
  const arrayValues = []
  const dGroupNames = []
  
  for(let i = 0; i<rowData.length; i++){
    for(let j= 0; j<items.length; j++){
      if(rowData[i][2] === items[j].id){
        arrayValues.push(rowData[i][3])
        dGroupNames.push(items[j].name)
      }
    }
  }

  console.log(arrayValues)
  console.log(dGroupNames)
  //obtaining json object
  const res = [];
  for(let i = 0; i < arrayValues.length; i++){
     res.push({
        name: dGroupNames[i],
        val: arrayValues[i]
     });
  };

  console.log(res)


  
  const PivotChart = (
    <Table striped border hover responsive>
    <thead>
      <tr>
        <th>New cases</th>
        <th>{year}</th>
     </tr>
    </thead>
    <tbody>
    {res.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{listValue.name}</td>
              <td>{listValue.val}</td>
            </tr>
          );
        })}
    </tbody>
  </Table>
  )
 // console.log(orgData[1].value)
  return PivotChart
   
 }



  