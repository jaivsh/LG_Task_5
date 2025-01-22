import React from 'react';
import NavigationBar from './bar';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow" />
      <footer className="text-center p-4 animate-pulse">
        Created by <span className="font-bold hover:text-blue-600 transition-colors duration-300">Jaivardhan Shukla</span> for Liquid Galaxy Task 5 #6
      </footer>
    </div>
  );
}

export default App;