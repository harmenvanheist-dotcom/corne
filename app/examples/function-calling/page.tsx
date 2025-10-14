"use client";

import React from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";

const FunctionCalling = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div
            style={{
              padding: "24px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Client functies</h2>
            <p>
              Workflow-runs kunnen eigen tools aanroepen, maar deze template
              bevat nog geen client-side handler. Voeg hier je eigen UI en
              logic toe wanneer je custom tools wilt koppelen.
            </p>
          </div>
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
