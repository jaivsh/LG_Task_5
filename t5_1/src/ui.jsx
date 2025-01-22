import React, { useState, useEffect } from 'react';
import './index.css'; 
import geminiImage from '../src/images.png';
import { Mic } from 'lucide-react';

const suggestions = [
  "What's the weather like?",
  "Set a timer for 5 minutes",
  "Tell me a joke",
  "What can you do?",
  "Play some music",
  "Send a message"
];


const GoogleGLogo = () => (
  <svg viewBox="0 0 48 48" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
    <path
      d="M 42.6 24 C 42.6 22.5 42.4 21.1 42.1 19.7 L 24 19.7 L 24 26.7 L 34.5 26.7 C 33.9 29.4 32.2 31.7 29.7 33.3 L 29.7 37.8 L 36.3 37.8 C 40.1 34.3 42.6 29.5 42.6 24 Z"
      fill="#4285F4"
    />
    <path
      d="M 24 43.5 C 29.8 43.5 34.7 41.6 38.3 37.8 L 31.7 33.3 C 29.7 34.7 27.1 35.5 24 35.5 C 18.2 35.5 13.3 31.6 11.5 26.4 L 4.7 26.4 L 4.7 31 C 8.3 38.4 15.6 43.5 24 43.5 Z"
      fill="#34A853"
    />
    <path
      d="M 11.5 26.4 C 11 25.1 10.7 23.7 10.7 22.3 C 10.7 20.9 11 19.5 11.5 18.2 L 11.5 13.6 L 4.7 13.6 C 3.1 16.8 2.2 20.4 2.2 22.3 C 2.2 24.2 3.1 27.8 4.7 31 L 11.5 26.4 Z"
      fill="#FBBC05"
    />
    <path
      d="M 24 9.1 C 27.4 9.1 30.5 10.2 32.9 12.5 L 38.7 6.7 C 34.7 2.9 29.8 1 24 1 C 15.6 1 8.3 6.1 4.7 13.6 L 11.5 18.2 C 13.3 13 18.2 9.1 24 9.1 Z"
      fill="#EA4335"
    />
  </svg>
);

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('Hi, how can I help?');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.margin = '0';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
    };
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const text = result[0].transcript;
        setTranscript(text);
        if (result.isFinal) {
          handleSearch(text);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      window.recognition = recognition;
    }
  }, []);

  const handleSearch = async (searchText) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setResponse(`Search results for: ${searchText}`);
    setSearchResults(`Here are the results for "${searchText}"`);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transcript.trim()) {
      handleSearch(transcript);
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      window.recognition?.start();
      setIsListening(true);
      setResponse('');
      setSearchResults('');
    } else {
      window.recognition?.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
      
      <style jsx>{`

@keyframes listening-pulse {
  0% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}

@keyframes wave {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}



        @property --gradBlueRed {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 25%;
        }
        @property --gradRedBlue {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 25%;
        }
        @property --gradRedYellow {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 50%;
        }
        @property --gradYellowRed {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 50%;
        }
        @property --gradYellowGreen {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 75%;
        }
        @property --gradGreenYellow {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 75%;
        }

        .voice-gradient {
        box-shadow: 
    0 -4px 8px rgba(66, 133, 244, 0.4),  /* Upward blue glow */
    0 -8px 16px rgba(234, 67, 53, 0.2); /* Upward red glow */

          background: linear-gradient(
            to right,
            #4285f4 0 var(--gradBlueRed),
            #ea4335 var(--gradRedBlue) var(--gradRedYellow),
            #fbbc05 var(--gradYellowRed) var(--gradYellowGreen),
            #34a853 var(--gradGreenYellow) 100%
          );
          animation: voice 2s ease infinite alternate;
        }

        .voice-gradient.blur {
          filter: blur(16px);
        }

        @keyframes voice {
          0% {
            --gradBlueRed: 80%;
            --gradRedBlue: 84%;
            --gradRedYellow: 88%;
            --gradYellowRed: 92%;
            --gradYellowGreen: 96%;
            --gradGreenYellow: 100%;
          }
          15% {
            --gradBlueRed: 10%;
            --gradRedBlue: 14%;
            --gradRedYellow: 70%;
            --gradYellowRed: 74%;
            --gradYellowGreen: 96%;
            --gradGreenYellow: 100%;
          }
          30% {
            --gradBlueRed: 10%;
            --gradRedBlue: 14%;
            --gradRedYellow: 80%;
            --gradYellowRed: 84%;
            --gradYellowGreen: 90%;
            --gradGreenYellow: 100%;
          }
          45% {
            --gradBlueRed: 10%;
            --gradRedBlue: 14%;
            --gradRedYellow: 60%;
            --gradYellowRed: 66%;
            --gradYellowGreen: 76%;
            --gradGreenYellow: 80%;
          }
          60% {
            --gradBlueRed: 0%;
            --gradRedBlue: 5%;
            --gradRedYellow: 10%;
            --gradYellowRed: 15%;
            --gradYellowGreen: 90%;
            --gradGreenYellow: 100%;
          }
          75% {
            --gradBlueRed: 0%;
            --gradRedBlue: 5%;
            --gradRedYellow: 10%;
            --gradYellowRed: 15%;
            --gradYellowGreen: 20%;
            --gradGreenYellow: 40%;
          }
          100% {
            --gradBlueRed: 80%;
            --gradRedBlue: 84%;
            --gradRedYellow: 88%;
            --gradYellowRed: 92%;
            --gradYellowGreen: 96%;
            --gradGreenYellow: 100%;
          }
        }
      `}</style>

      <div className="relative w-full max-w-xl px-4">
    
       
        <div className="flex justify-center mb-8">
        <img
    src={geminiImage}
    alt="Gemini"
    className={`w-32 h-32 object-contain transition-all duration-300 ${
      isListening ? 'animate-[listening-pulse_1.5s_ease-in-out_infinite,wave_2s_ease-in-out_infinite]' : ''
    }`}
    style={{
      transformOrigin: 'center center'
    }}
  />
</div>
        <div className="flex flex-col items-center justify-center">
          {!isListening ? (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="bg-gray-800 rounded-full px-4 sm:px-6 py-3 flex items-center w-full">
                <GoogleGLogo />
                <input
                  type="text"
                  className="bg-transparent flex-1 focus:outline-none text-white ml-4"
                  placeholder="Search..."
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={toggleListening}
                  className="hover:bg-gray-700 rounded-full transition-colors duration-200 p-1"
                >
                  <Mic className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center w-full">
              {transcript ? (
                <div className="text-xl sm:text-2xl md:text-3xl break-words">
                  {transcript}
                </div>
              ) : (
                <div className="text-gray-400 text-lg sm:text-xl md:text-2xl">
                  Listening...
                </div>
              )}
              <button onClick={toggleListening} className="mt-4">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-500 rounded-full animate-pulse mx-auto" />
                
              </button>
              {isListening && (
  <div className="mt-8 flex flex-wrap gap-3 justify-center max-w-2xl mx-auto px-4">
    {suggestions.map((suggestion, index) => (
      <button
        key={index}
        onClick={() => {
          setTranscript(suggestion);
          handleSearch(suggestion);
        }}
        className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg text-sm transition-colors duration-200"
      >
        {suggestion}
      </button>
    ))}
  </div>
)}
            </div>
            
          )}

      
          <div className="text-center mt-4">
            {isLoading ? (
              <div className="flex justify-center space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            ) : searchResults ? (
              <div className="text-sm sm:text-base md:text-lg break-words">
                {searchResults}
              </div>
            ) : null}
          </div>
        </div>

 
        <div className="fixed left-0 right-0 bottom-24">
          <div 
            className={`mx-auto transition-all duration-500 ease-in-out ${
              isListening ? 'w-11/12' : 'w-2/5'
            }`}
          >
            <div className="relative h-1 overflow-visible">
              {isListening ? (
                <>
                  <div className="absolute inset-0 voice-gradient blur" />
                  <div className="absolute inset-0 voice-gradient" />
                </>
              ) : (
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #4285f4 0 25%, #ea4335 25% 50%, #fbbc05 50% 75%, #34a853 75% 100%)'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default VoiceAssistant;