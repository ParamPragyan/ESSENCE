import React from "react";
import styles from "./BetaBanner.module.css";

const BetaBanner = () => {
  return (
    <div className={styles.award}>
      <div className={`${styles.ribbon} ${styles.ribbonTop}`}>
        <span>
          <strong>This</strong> site
        </span>
      </div>
      <div className={`${styles.ribbon} ${styles.ribbonBottom}`}>
        <span>
          is in <strong>Beta</strong>
        </span>
      </div>
    </div>
  );
};

export default BetaBanner;
