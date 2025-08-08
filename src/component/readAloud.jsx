import React, { useRef, useState } from 'react';

const TextToSpeech = ({ text }) => {
  const utteranceRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleSpeak = () => {
    if (!utteranceRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };
      speechSynthesis.speak(utterance);
      utteranceRef.current = utterance;
    } else if (isPaused) {
      speechSynthesis.resume();
    }

    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div>
      <button onClick={handleSpeak} title="Play">
        🔊
      </button>

      {isPlaying && !isPaused && (
        <button onClick={handlePause} title="Pause">
          ⏸️
        </button>
      )}

      {(isPlaying || isPaused) && (
        <button onClick={handleStop} title="Stop">
          ⏹️
        </button>
      )}
    </div>
  );
};

export default TextToSpeech;
