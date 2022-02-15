import React from 'react';
import styles from './App.module.css';
import Appbar from './components/Appbar';
import DashboardLinks from './components/DashBoardLinks'
import AntCharts from './components/AntCharts';
import Loading from "./components/Loading";
import {getDashboards} from './api';
import DeliveryCharts from './components/DeliveryCharts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



class App extends React.Component {
  state = {
    dashboards: "",
  }

async  componentDidMount() {
  const fetchedData = await getDashboards();
  this.setState({dashboards: fetchedData});
  console.log(this.state.dashboards)
}

  render(){
    const {  dashboards } = this.state

    if (!dashboards) {
      return <div className={styles.loader}>
               <Loading/>
              </div>
    }
    return (
      <Router>
      <div className={styles.container}>
        <Appbar />
        <DashboardLinks/>
        
         <Routes>
           <Route path="/" element={<AntCharts/>}/>
           <Route path="dashboard2" element={<DeliveryCharts/>}/>
         </Routes>
    </div>
    </Router>
   );
  }
}

export default App;
