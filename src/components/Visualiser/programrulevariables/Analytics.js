import React from 'react'
import  {Bar, Line, Pie} from 'react-chartjs-2';
import $ from 'jquery';



 const Analytics = (props) => {
    const visualGraph = () => {
        const dataValues = $.ajax({
           url: 'https://covmw.com/namis1/api' + `/analytics.json?dimension=dx:${props.Indicator};&dimension=ou:${props.orgUnits};jUb8gELQApl;&dimension=pe:${props.period}`,
           dataType: "json",
           headers: { "Authorization": "Basic " + btoa('portal' + ":" + 'Namis71PortaL@*') },
           success: function (data) { },
           async: false,
           error: function (err) {
           console.log(err);
         }
        }).responseJSON;

        const indicators = $.ajax({
          url: 'https://covmw.com/namis1/api' + `/indicators.json`,
          dataType: "json",
          headers: { "Authorization": "Basic " + btoa('portal' + ":" + 'Namis71PortaL@*') },
          success: function (data) { },
          async: false,
          error: function (err) {
          console.log(err);
        }
       }).responseJSON;

       const organisationUnits = $.ajax({
        url: 'https://covmw.com/namis1/api' + `/organisationUnits/${props.orgUnits}.json`,
        dataType: "json",
        headers: { "Authorization": "Basic " + btoa('portal' + ":" + 'Namis71PortaL@*') },
        success: function (data) {},
        async: false,
        error: function (err) {
         console.log(err);
         }
        }).responseJSON;
       
       const IndData = indicators.indicators
       const titleName = organisationUnits.displayName 
        let value = []
        let indicatorNames = []
        console.log(dataValues.rows)
        let actualData = dataValues.rows
        for (let i = 0; i < actualData.length; i++) {
          for(let j =0; j<IndData.length; j++){
             if(IndData[j].id===actualData[i][0]){
             value.push(parseFloat(actualData[i][3]))
             indicatorNames.push(IndData[j].displayName)
          }
          }
         }

         const visualisedGraph = (
          <Bar
          data={{
            labels:  indicatorNames,
            datasets: [
              {
                data: value,
                label: props.period,
                borderColor: '#3333ff',
                backgroundColor: 'rgb(154,205,50)',
                fill: true,
      
              },
          ],
          }}
          options = {{
            plugins: {
              legend: { position: "bottom" },
              title: {
                display: true,
                text: titleName
            }
            },
            responsive: true,
          }}
        />
         )

       if(!indicators){
           return "Loading"
       }
         return visualisedGraph
       }

    return(
       <div>
        {visualGraph()}
       </div>
    )
}
export default Analytics