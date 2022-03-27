import React from "react";
import loadingGif from "../images/gif/loading-arrow.gif";
import styles from '../App.module.css';

const Loading = () => {

 
  return (
      <div>  
      <img className={styles.loadingimg} src={loadingGif} alt=""/>
      </div>
  );
};

export default Loading;
