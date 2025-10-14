"use client";

import React from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import FileViewer from "../../components/file-viewer";
import WeatherWidget from "../../components/weather-widget";

const AllFeatures = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget
            location="—"
            temperature="—"
            conditions="Voeg je eigen tool-output toe"
            isEmpty={true}
          />
          <FileViewer />
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

export default AllFeatures;
