import React, { useEffect, useState } from "react";
import styles from './App.module.css';
import TimeDisplay from './components/TimeDisplay.jsx';
import api from './services/api.js';
import ComboBox from './components/ComboBox.jsx';

export default function App() {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  
  return (  
    <>
      <main className={styles.main}>
        <ComboBox onTimezoneChange={setSelectedTimezone} />
        <TimeDisplay timezoneName={selectedTimezone}></TimeDisplay>
      </main>
    </>
  )
}