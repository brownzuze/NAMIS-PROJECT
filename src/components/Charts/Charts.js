import React, {useState, useEffect} from 'react';
import {getAntFirstChart, getOrganisationUnits} from '../../api';
import  {Bar} from 'react-chartjs-2';


const Chart = () => {
    const [AntFirstChart, setAntFirstChart] = useState({});
    const [AntOrgUnits, setAntOrgUnits] = useState("");
    const [fetched, setFetched] = useState(false);

    useEffect(async() => {
            setAntFirstChart( await getAntFirstChart());
            setAntOrgUnits( await getOrganisationUnits());

   

    }, [setAntOrgUnits,setAntFirstChart]);
    useEffect( () => {
      if (!fetched) {
        setAntFirstChart(  getAntFirstChart());
        setAntOrgUnits( getOrganisationUnits());
       
        setFetched(true);

      }
    }, [fetched]);
        
     return (
         <h1></h1>
     )
}
export default Chart;