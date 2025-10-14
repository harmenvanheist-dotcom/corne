"use client";

import styles from "./warnings.module.css";
import { workflowId } from "../assistant-config";

const Warnings = () => {
  if (workflowId) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>Stel je workflow ID in</h1>
      <div className={styles.message}>
        Vul het Agent Builder workflow ID (bijv. <code>wf_...</code>) in binnen{" "}
        <span>app/assistant-config.ts</span> of zet de variabele{" "}
        <code>OPENAI_WORKFLOW_ID</code> in je omgeving.
      </div>
    </div>
  );
};

export default Warnings;
