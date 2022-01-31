import React from 'react';
import styles from './App.module.css';
import Appbar from './components/Appbar';
import DashboardLinks from './components/DashBoardLinks'
import AntCharts from './components/AntCharts';
import {getDashboards} from './api';




class App extends React.Component {
  state = {
    dashboards: "",
  }

async  componentDidMount() {
  const fetchedData = await getDashboards();
  this.setState({dashboards: fetchedData});
}

  render(){
    const {  dashboards } = this.state

    if (!dashboards) {
      return <div>Loading....</div>
    }
    return (
      <div className={styles.container}>
        <Appbar />
        <DashboardLinks 
         dashboard1={dashboards[0].displayName}
         dashboard2={dashboards[1].displayName} 
         dashboard3={dashboards[2].displayName} 
         dashboard4={dashboards[3].displayName}  
         dashboard5={dashboards[4].displayName}  
         dashboard6={dashboards[5].displayName} 
         dashboard7={dashboards[6].displayName}
         dashboard8={dashboards[7].displayName}
         dashboard9={dashboards[8].displayName}
         dashboard10={dashboards[9].displayName}
         dashboard11={dashboards[10].displayName}
         dashboard12={dashboards[11].displayName}
        />
         <AntCharts/>
    </div>
   );
  }
}

export default App;
