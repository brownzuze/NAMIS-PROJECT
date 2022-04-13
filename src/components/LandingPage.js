import React from "react";
import ico4 from "../images/ico4.png";
import ico5 from "../images/ico5.png";
import ico6 from "../images/ico6.png";
import ico7 from "../images/ico7.png";
import ico9 from "../images/ico9.png";
import styles from '../App.module.css';

/**
 * 
 * @returns A function that is displayed when there is no internet connection
 */
const LandingPage = () => {

  /* An array of objects. Each object has an id and an icon. */
  const chartData = [
    {
      id: 1,
      icon: <img className={styles.icon} src={ico4} alt="" />
    },
    {
      id: 2,
      icon: <img className={styles.icon} src={ico5} alt="" />
    },
    {
      id: 3,
      icon: <img className={styles.icon} src={ico6} alt="" />
    },
    {
      id: 4,
      icon: <img className={styles.icon} src={ico7} alt="" />
    },
    {
      id: 5,
      icon: <img className={styles.icon} src={ico9} alt="" />
    }
  ];
  return (
    <div  className={styles.landingcontainer}>
      <h2>WELCOME TO NAMIS WEB PORTAL</h2>
      <h6 className={styles.headings}>
        This is a public portal for NAMIS data. Information available:
      </h6>

      <div className={styles.landingpage}>
      <div className={styles.info}>
       <h4>NAMIS indicators</h4>
       <p>
         Visualise NAMIS indicators for
         antenatal care, ANC integration, labor
         and delivery, newborn care, postnatal create
         and cervical cancer
        </p>

      </div>
      <div className={styles.info}>
       <h4>Program indicators</h4>
       <p>
         Visualise program indicators for
         Malaria, Vaccine, Nutrition,
         Non communicable disease, Tracer medicine,
         TB and Leprocy, Family planning
        </p>

      </div>
      <div className={styles.info}>
       <h4>Resources</h4>
       <p>
         Get resources like cesors data, 
         Community survey, Facility Surveys,
         Healthy program reports,
         NAMIS annual reports, policies, 
         Guidelines and Strategy
        </p>

      </div>
      </div>
      <div className={styles.visualicons}>
      
        {chartData.map(item => (
                        item.icon
                    ))}
        </div>
       <h6 className={styles.loadingalert}>Loading data Please wait....</h6>

       
    </div>
  );
};

export default LandingPage;
