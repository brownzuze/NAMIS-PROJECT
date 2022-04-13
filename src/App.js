import React from 'react';
import styles from './App.module.css';
import Appbar from './components/Appbar';
import DashboardLinks from './components/DashBoardLinks'
import AntCharts from './components/AntCharts';
import Dashboards from './components/Dashboards'
import TestDashboard from './components/TestDashboard'
import LandingPage from "./components/LandingPage";
import {getDashboards} from './api';
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

    /* Checking if the state is empty. If it is empty, it will render the landing page. */
    if (!dashboards) {
      return <div>
               <LandingPage/>
             </div>
    }
    return (
      <Router>
      <div className={styles.container}>
        <Appbar/>
        
        { /* A react router. It is a way to navigate between pages. */}
         <Routes>
           <Route path="/" element={<AntCharts/>}/>
           <Route exact path='/dashboards/:id' element={<Dashboards/>}/>
         </Routes>
    </div>
    </Router>
   
   );
  }
}

export default App;
