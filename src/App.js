import React, { useState, useEffect } from 'react';
import { NavBar } from './components/Navbar';
import { TopCard } from './components/TopCard';
import { ChartCard } from './components/ChartCard';
// import { SummaryCard } from './components/SummaryCard';
 
import './App.css';
// import _ from 'lodash';

function App() { 
  const [population, setPopulation] = useState([])

  useEffect(() => {
    fetch('/data/population').then(res => res.json()).then(data => {
      console.log('hello')
      console.log(data)
      const t = data.map(i => i.population)
      setPopulation(t)
    });
  }, []);


  return (
    <div className="App">
      <NavBar/>
      <TopCard/>
      <ChartCard/>
      <span className='hide'>{population}</span>
    </div>
  );
}

export default App;
