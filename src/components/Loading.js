import React from "react";
import loadingGif from "../images/gif/loading-arrow.gif";
import styles from '../App.module.css';

/**
 * 
 * @returns Loading icon
 */
const Loading = () => {

 
  return (
      <div>  
      <img className={styles.loadingimg} src={loadingGif} alt=""/>
      </div>
  );
};

export default Loading;
