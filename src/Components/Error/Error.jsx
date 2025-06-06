import React from "react";
import styles from "./Error.module.css";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.container}>
        <div className={styles.gif}>
          <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
        </div>
        <div className={styles.content}>
          <h1 className={styles["main-heading"]}>This page is gone.</h1>
          <p>
            ...maybe the page you're looking for is not found or never existed.
          </p>

          <Link className={styles.redirectButton}>
            Back to home <i className="far fa-hand-point-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
