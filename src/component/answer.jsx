import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./answer.css"; // Assuming you have some styles for the answer component
import TextToSpeech from "./readAloud";

const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fullAnswer = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://smartstudybuddy-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: topic }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      // Handle response structure: { reply: ... }
      const answer =
        data.reply ||
        data.response?.reply ||
        data.answer?.reply ||
        data.result?.reply ||
        "No response found.";
      setResponse(answer);
    } catch (error) {
      setResponse("⚠️ Error fetching answer. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch the AI summary from backend
  const findAnswer = async (query) => {
    setLoading(true);
    try {
      const res = await fetch("https://smartstudybuddy-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "reply in 100 words " + query }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      // Handle response structure: { reply: ... }
      const answer =
        data.reply ||
        data.response?.reply ||
        data.answer?.reply ||
        data.result?.reply ||
        "No response found.";
      setResponse(answer);
    } catch (error) {
      setResponse("⚠️ Error fetching answer. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    console.log("Query:", q);
    setTopic(q || "");
    setResponse("");
    if (q) {
      findAnswer(q);
    }
  }, [location.search]);

  return (
    <>
      <div className="answer-wrapper">
        <div
          style={{
            padding: "1.5rem",
            background: "#f9f9f9",
            borderRadius: "8px",
            marginTop: "2rem",
            maxWidth: "600px",
            marginInline: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>AI Summary</h2>
          <h3 className="topic" style={{ marginTop: "1rem" }}>
            <strong>Topic:</strong>
            <strong>
              {decodeURIComponent(topic)}
            </strong>

            <TextToSpeech text={response} />
          </h3>

          {loading ? (
            <div
              className="loader"
              style={{ marginTop: "1.5rem", fontStyle: "italic" }}
            >
              🔄 Loading response...
            </div>
          ) : (
            <p style={{ marginTop: "1rem", whiteSpace: "pre-line" }}>
              <strong>Response:</strong> {response}
            </p>
          )}
        </div>
        <div className="action-buttons" style={{ marginTop: "2rem", textAlign: "center" }}>
            <button onClick={() => navigate(`/home`)}>ASK ANOTHER</button>
            <button onClick={() => fullAnswer()}>FULL RUNDOWN</button>
            <button onClick={() => navigate(`/home`)}>QUICK CHECK</button>
        </div>
      </div>

    </>
  );
};

export default Answer;
