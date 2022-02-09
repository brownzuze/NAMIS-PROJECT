/*import React, {useState, useEffect, useCallback} from 'react';
import {getDeliveryFirstChart, getIndicators, getOrganisationUnits}  from '../api';
import  {Bar, Line, Pie} from 'react-chartjs-2';

const DeliveryCharts = () => {
    const [delFirstChart, setDelFirstChart] = useState({});
    const [delIndicators, setDelIndicators] = useState({});
    const [delOrgUnits, setOrgUnits] = useState({});
    const [fetched, setFetched] = useState(false)
    const [fetchedData, setFetchedData] = useState(false)
    const [fetchedIndicator, setFetchedIndicator] = useState(false)



    useEffect(() => {

     const fetchApI = async () => {
         setDelFirstChart(await getDeliveryFirstChart())
         //qualifying that data has been fetched
         setFetched(true);
     }

     fetchApI()

    }, [fetched]);

    useEffect(() => {

        const fetchApIData = async () => {
            setOrgUnits(await getOrganisationUnits)
            //qualifying that data has been fetched
            setFetchedData(true);
        }
   
        fetchApIData()
   
       }, [fetchedData]);
       useEffect(() => {

        const fetchApI = async () => {
            setDelIndicators(await getIndicators())
            //qualifying that data has been fetched
            setFetchedIndicator(true);
        }
   
        fetchApI()
   
       }, [fetchedIndicator]);

    //creating delivery first chart 
    const DeliveryChartOne = () => {
    
        if (!delFirstChart || !delIndicators || !delOrgUnits) {
          return <div>Loading....</div>
        }
        console.log(delFirstChart);

        

      
        
        //const orgIds = delFirstChart.metaData.dimensions.ou
        //const indicatorIds = delFirstChart.metaData.dimensions.dx
        //const rowData = delFirstChart.rows
        //console.log(orgIds)
        //console.log(indicatorIds)
        //console.log(rowData)
       
        //get organisation displayNames
        /*const OrgUnitsDispNames = []
        delOrgUnits.forEach(org => {
          orgIds.forEach(id => {
            if (org.id === id) {
              OrgUnitsDispNames.push(org.displayName)
            }
          })
        })
        console.log(OrgUnitsDispNames);
        
    
    
        //get the rows aggregated data
        /*const rowData = firstChartAnalytics.rows
    
        //create an array of objects that stores the values in order
        let orgData = [{
          id: '',
          values: [],
          periods: []
        }]
    
        let id = [], value = [], period = []
    
        for (let i = 0; i < rowData.length; i++) {
    
          if (rowData[i][0] === orgIds[0]) {
            id = OrgUnitsDispNames[0]
            value.push(parseFloat(rowData[i][2]))
            period.push(rowData[i][1])
    
          }
    
        }
        orgData.push({ id, value, period })
    
        let id1 = [], value1 = [], period1 = []
    
        for (let i = 0; i < rowData.length; i++) {
          if (rowData[i][0] === orgIds[1]) {
            id1 = OrgUnitsDispNames[1]
            value1.push(parseFloat(rowData[i][2]))
            period1.push(rowData[i][1])
          }
        }
        orgData.push({ id1, value1, period1 })
    
    
        let id2 = [], value2 = [], period2 = []
    
        for (let i = 0; i < rowData.length; i++) {
          if (rowData[i][0] === orgIds[2]) {
            id2 = OrgUnitsDispNames[3]
            value2.push(parseFloat(rowData[i][2]))
            period2.push(rowData[i][1])
          }
        }
        orgData.push({ id2, value2, period2 })
    
    
        let id3 = [], value3 = [], period3 = []
    
        for (let i = 0; i < rowData.length; i++) {
          if (rowData[i][0] === orgIds[3]) {
            id3 = OrgUnitsDispNames[2]
            value3.push(parseFloat(rowData[i][2]))
            period3.push(rowData[i][1])
          }
        }
        orgData.push({ id3, value3, period3 })
    
    
        let id4 = [], value4 = [], period4 = []
    
        for (let i = 0; i < rowData.length; i++) {
          if (rowData[i][0] === orgIds[4]) {
            id4 = OrgUnitsDispNames[4]
            value4.push(parseFloat(rowData[i][2]))
            period4.push(rowData[i][1])
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
                  text: 'ANC: ANC 3 coverage by districts last 12 months'
              }
              },
              responsive: true
            }}
          />
        )
       // console.log(orgData[1].value)
        return barChart } 

    

}
    
   
    return (
  
       <div> 
        {DeliveryChartOne()}
       </div>

    )
}
export default DeliveryCharts;*/