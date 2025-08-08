import React, { useState } from 'react';
import VoiceInput from './speech';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');


    const handleVoiceResult = (result) => {
        console.log('Voice input result:', result);
        setTopic(topic + ' ' + result); // Append voice input to the topic state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!topic.trim()) {
            console.error('Topic cannot be empty.');
            return;
        }

        try {
            // const response = await fetch('http://localhost:3000/chat', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ message: topic }),
            // });

            // if (!response.ok) {
            //     throw new Error(`Server error: ${response.status}`);
            // }

            // const data = await response.json();
            // console.log('Server response:', data);
            // Redirect to the answer page with the response
            // window.location.href = `/answer?q=${encodeURIComponent(topic)}`;
            navigate(`/answer?q=${encodeURIComponent(topic)}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div className="app">
      <main className="main-content">
        <div className="content-container">
          <h2 className="main-title">
            What topic do you want
            <br />
            to learn?
          </h2>

          <div className="input-container">
            <input
              type="text"
              name='topic'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter Topic Here..."
              className="topic-input"
            />
            <VoiceInput onResult={handleVoiceResult} />
          </div>

          <button className="get-summary-btn" onClick={handleSubmit}>Get Summary</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
