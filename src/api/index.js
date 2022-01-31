import axios from "axios";
const ADDRESS_URL = 'https://play.dhis2.org/dev/api';
const OAuth2 = 'Basic '+btoa('admin:district');
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
export const getOrganisationUnits = async () => {
    const orgData = await makeApiRequest({
        url: ADDRESS_URL + "/organisationUnits?fields=displayName, id&paging=false"
    })
    return orgData.organisationUnits;
}
export const getDashboards = async () => {
    const dashData = await makeApiRequest({
        url: ADDRESS_URL + '/dashboards.json?fields=*&paging=false'
    })
    return dashData.dashboards;
}

export const getAntFirstChart = async () => {
    const firstAntData = await makeApiRequest({
        url: ADDRESS_URL + '/analytics.json?dimension=dx:sB79w2hiLp8;&dimension=ou:TEQlaapDQoK;Vth0fbpFcsO;bL4ooGhyHRQ;jmIPBj66vD6;qhqAxPSTUXp&dimension=pe:LAST_12_MONTHS'
    })
    return firstAntData;
}
export const getAntSecondChart = async () => {
    const secondAntData = await makeApiRequest({
        url: ADDRESS_URL + '/analytics.json?dimension=dx:fbfJHSPpUQD;&dimension=ou:jUb8gELQApl;PMa2VCrupOd;jmIPBj66vD6;kJq2mPyFEHo;bL4ooGhyHRQ&dimension=pe:LAST_12_MONTHS'
    })
    return secondAntData;
}

export const getAntThirdChart = async () => {
    const thirdAntData = await makeApiRequest({
        url: ADDRESS_URL + '/analytics?dimension=pe%3AMONTHS_THIS_YEAR&dimension=ou%3AImspTQPwCqd&dimension=dx%3AUvn6LCg7dVU'
    })
    return thirdAntData;
}
export const getAntThirdChartData = async () => {
    const addthirdAntData = await makeApiRequest({
        url: ADDRESS_URL + '/analytics.json?dimension=pe%3AMONTHS_THIS_YEAR&dimension=ou%3AImspTQPwCqd&dimension=dx%3AUvn6LCg7dVU&relativePeriodDate=2021-01-22'
    })
    
    return addthirdAntData;
}

export const getAntFourthPieData = async () => {
    const pieChartData = await makeApiRequest({
        url: ADDRESS_URL + '/analytics.json?dimension=J5jldMd8OHv%3AuYxK4wmcPqA%3BtDZVQ1WtwpA%3BEYbopBOJWsW%3BRXL3lPSK8oG%3BCXw2yu5fodb&filter=pe%3ATHIS_YEAR&filter=dx%3AhfdmMSPBgLG&filter=ou%3AUSER_ORGUNIT&includeNumDen=false&skipMeta=true&skipData=false'
    })
    
    return pieChartData;
}
export const getorganisationUnitGroups = async () => {
    const orgGroups = await makeApiRequest({
        url: ADDRESS_URL + '/organisationUnitGroups'
    })
    
    return orgGroups.organisationUnitGroups;
}

export const getfifthAntChart = async () => {
    const fifthantchart = await makeApiRequest({
        url: ADDRESS_URL + '/analytics?dimension=fMZEcRHuamy%3AqkPbeWaFsnU%3BwbrDrL2aYEc,dx%3AfbfJHSPpUQD%3BcYeuwXTCPkU%3BJtf34kNZhzP%3BhfdmMSPBgLG&filter=pe%3ATHIS_YEAR&filter=ou%3AUSER_ORGUNIT'
    })
    
    return fifthantchart;
}

export const getAntsixthChart = async () => {
    const sixthchart = await makeApiRequest({
        url:  ADDRESS_URL + '/analytics?dimension=dx%3AUvn6LCg7dVU,ou%3AO6uvpzGd5pu%3Bfdc6uOvgoji%3Blc3eMKXaEfw%3BjUb8gELQApl%3BLEVEL-3&filter=pe%3ATHIS_YEAR&includeNumDen=false&skipMeta=true&skipData=false'
    })
    
    return sixthchart;
}


