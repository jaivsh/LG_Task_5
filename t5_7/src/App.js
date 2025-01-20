import React from 'react';
import MaterialTabs from './bar';

const App = () => {
  return (
    <div className="fixed inset-0 flex flex-col">
      <MaterialTabs />
      <main className="flex-1 min-h-0">
        {/* Main content area */}
      </main>
      <br></br>
      <br></br>
      <br></br>
      <center><div className="text-center py-4 text-gray-600">
        Created By{' '}
        <span className="font-bold text-red-700">
          <b>Jaivardhan Shukla</b>
        </span>
        {' '}for Liquid Galaxy Task 5 #7
      </div></center>
    </div>
  );
  
};


export default App;