import React, { useState } from 'react';
import { Check, RefreshCw, ChevronLeft } from 'lucide-react';

const ProgressSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const steps = [
    { id: 1, label: 'Cart' },
    { id: 2, label: 'Address' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Checkout' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === steps.length && !isComplete) {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && !isComplete) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRelaunch = () => {
    setIsResetting(true);
    setTimeout(() => {
      setCurrentStep(1);
      setIsComplete(false);
      setIsResetting(false);
    }, 300);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 transition-opacity duration-300 ${isResetting ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex items-center justify-between relative mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            
            <div className="relative">
             
              {index < steps.length - 1 && (
                <div className="absolute w-32 h-1" style={{ left: '50px', top: '20px' }}>
                  
                  <div className="absolute h-full bg-blue-200 w-24" />
            
                  <div
                    className={`
                      absolute h-full bg-blue-500 transition-all duration-500
                      ${index + 1 < currentStep || isComplete ? 'w-24' :
                      index + 1 === currentStep ? 'w-12' :
                      'w-0'}
                    `}
                  />
                </div>
              )}
           
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center relative z-10
                transition-all duration-300
                ${step.id < currentStep || isComplete
                  ? 'bg-blue-500 text-white'
                  : step.id === currentStep
                  ? 'bg-blue-500 text-white border-2 border-white ring-2 ring-blue-500'
                  : 'bg-blue-200 text-blue-500'}
              `}>
                {step.id < currentStep || isComplete ? <Check className="w-6 h-6" /> : step.id}
              </div>
            </div>
       
            <span className="mt-2 text-sm font-medium">{step.label}</span>
            <span className={`
              text-xs mt-1 transition-colors duration-300
              ${step.id <= currentStep || isComplete ? 'text-blue-500' : 'text-gray-400'}
            `}>
              {step.id < currentStep || isComplete ? 'Completed' :
              step.id === currentStep && !isComplete ? 'In Progress' :
              'Pending'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
     
        <button
          onClick={handleBack}
          disabled={currentStep === 1 || isComplete || isResetting}
          className={`
            px-6 py-2 rounded-lg text-white font-medium transition-all duration-300
            flex items-center gap-2
            ${currentStep === 1 || isComplete ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}
            ${isResetting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

       
        <button
          onClick={handleNext}
          disabled={isResetting}
          className={`
            px-6 py-2 rounded-lg text-white font-medium transition-all duration-300
            ${isComplete ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}
            ${isResetting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isComplete ? 'Completed!' : currentStep === steps.length ? 'Complete Checkout' : 'Next Step'}
        </button>
        
      
        <button
          onClick={handleRelaunch}
          disabled={isResetting}
          className={`
            px-6 py-2 rounded-lg text-white font-medium 
            bg-gray-500 hover:bg-gray-600 
            flex items-center gap-2 transition-all duration-300
            ${isResetting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
          Relaunch
        </button>
      </div>
    </div>
  );
};

export default ProgressSteps;