import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');

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
            <button className="voice-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                  fill="currentColor"
                />
                <path
                  d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <button className="get-summary-btn" onClick={handleSubmit}>Get Summary</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
