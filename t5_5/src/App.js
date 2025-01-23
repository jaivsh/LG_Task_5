import React from 'react';
// import RotatingImage from './RotatingImage';
// import './App.css';
import ProgressSteps from './progress';
function App() {
  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <ProgressSteps/>
      <div className="flex-grow" />
      <footer className="text-center p-4 animate-pulse">
        Created by <span className="font-bold hover:text-blue-600 transition-colors duration-300">Jaivardhan Shukla</span> for Liquid Galaxy Task 5 #6
      </footer>
    </div>
    
  );
}

export default App;
