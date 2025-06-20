import React, { useEffect, useState } from "react";
import styles from './App.module.css';
import TimeDisplay from './components/TimeDisplay.jsx';
import api from './services/api.js';
import SearchBar from './components/SearchBar.jsx';

export default function App() {

  

  return (
    <>
      <main className={styles.main}>
        <SearchBar />
        <TimeDisplay></TimeDisplay>
      </main>
    </>
  )
}