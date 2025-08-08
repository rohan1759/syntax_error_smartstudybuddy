// components/VoiceInput.jsx
import React, { useEffect, useRef, useState } from 'react';

const VoiceInput = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const micIcon = useRef(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser. Try Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onend = () => setIsListening(false);
    
    // {isListening ? console.log('Listening...') : micIcon.current.classList.remove('listening')}

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current = recognition;
    
    // micIcon.current.style.color = isListening ? '#f65c95ff' : '#926aef'; // Change color based on listening state
    
    // micIcon.current.classList.toggle('listening', isListening);
    
}, [onResult]);

const handleClick = () => {
    if (recognitionRef.current) {
        recognitionRef.current.start();
    }
  };

  return (
    <button className="voice-button" ref={micIcon} onClick={handleClick}>
      {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
          fill="currentColor"
        />
        <path
          d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
          fill="currentColor"
        />
      </svg> */}
      {isListening ? (
        "Listening..."
      ) : (
        <svg className='mic-icon' width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
            fill="currentColor"
          />
          <path
            d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
};

export default VoiceInput;
