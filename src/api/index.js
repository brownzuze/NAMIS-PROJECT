import axios from "axios";
export const ADDRESS_URL = 'https://covmw.com/namis1/api';
export const username = "portal"
export const password = "Namis71PortaL@*" 
const OAuth2 = 'Basic '+btoa(username + ":" + password );
export const makeApiRequest = async (apiUrl) => {

apiUrl = Object.assign({}, apiUrl);
try{
    const response = await axios.get(apiUrl.url, {headers: 
        {'Authorization': OAuth2,
        'Access-Control-Allow-Origin':'*',
        'Content-type': 'application/json',  
         'Allow-Cross-Origin-Access': 'https://play.dhis2.org/dev',
         "Access-Control-Allow-Credentials" : true,
         'Access-Control-Allow-Headers': 'application/json' }});

    return response.data;
     }catch (error){
 
     }
    

};

export const getDataElements = async () => {
    const elementsData = await makeApiRequest({
        url: ADDRESS_URL + '/dataElements'
    })
    return elementsData.dataElements;
}
export const getIndicators = async () => {
    const indicatorData = await makeApiRequest({
        url: ADDRESS_URL + '/indicators.json?fields=*&paging=false'
    })
    return indicatorData.indicators;
}
export const getOrganisationUnits = async () => {
    const orgData = await makeApiRequest({
        url: ADDRESS_URL + "/organisationUnits?fields=displayName, id&paging=false"
    })
    return orgData.organisationUnits;
}
export const getDashboards = async () => {
    const dashData = await makeApiRequest({
        url: ADDRESS_URL + '/dashboards.json'
    })
    return dashData.dashboards;
}
export const getVisualizations = async () => {
    const visualData = await makeApiRequest({
        url: ADDRESS_URL + '/visualizations.json?fields=*'
    })
    return visualData.visualizations;
}
export const getMaps = async () => {
    const dashData = await makeApiRequest({
        url: ADDRESS_URL + '/maps.json?fields=*&paging=false'
    })
    return dashData.maps;
}

export const getorganisationUnitGroups = async () => {
    const orgGroups = await makeApiRequest({
        url: ADDRESS_URL + '/organisationUnitGroups'
    })
    
    return orgGroups.organisationUnitGroups;
}



