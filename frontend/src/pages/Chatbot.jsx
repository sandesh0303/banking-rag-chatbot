import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chatbot() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);

  // 1. Load Chat History
  const loadHistory = async () => {
    try {
      const email = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:9294/api/history?email=${email}`
      );
      const data = await response.json();
      setHistory(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // 2. Ask Question (Post Chat)
  const askQuestion = async () => {
    try {
      const response = await fetch(
        "http://localhost:9294/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            email: localStorage.getItem("user"),
          }),
        }
      );

      const data = await response.json();
      setAnswer(data.answer);
      loadHistory();
    } catch (error) {
      setAnswer("Server Error");
    }
  };

  // 3. Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#21468B",
      }}
    >
      {/* Sidebar - Chat History with Delete Button */}
      <div
        style={{
          width: "300px",
          background: "#17356b",
          color: "white",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <h2>💬 Chat History</h2>

        {history.map((chat) => (
          <div
            key={chat.id}
            style={{
              background: "#2a4d8f",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              setQuestion(chat.question);
              setAnswer(chat.answer);
            }}
          >
            <strong>{chat.question}</strong>

            {/* Delete Button Container */}
            <button
              onClick={async (e) => {
                e.stopPropagation(); // Parent div cha onClick trigger hou naye mhanun

                try {
                  await fetch(
                    `http://localhost:9294/api/history/${chat.id}`,
                    {
                      method: "DELETE",
                    }
                  );

                  loadHistory(); // History refresh karne

                  // Jar delete kelela chat ata samor open asel, tar display clear karne
                  if (question === chat.question) {
                    setAnswer("");
                    setQuestion("");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
              style={{
                background: "#ff3b30",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                marginTop: "8px",
                cursor: "pointer",
                display: "block",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "850px",
            background: "#fff",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#21468B",
                }}
              >
                🏦 Banking RAG Chatbot
              </h1>
              <p
                style={{
                  margin: "5px 0",
                  color: "#666",
                }}
              >
                Ask any banking related question
              </p>
            </div>

            <button
              onClick={logout}
              style={{
                background: "#ff3b30",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>

          {/* Question Input Box */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask banking question..."
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />

            <button
              onClick={askQuestion}
              style={{
                background: "#21468B",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Ask
            </button>
          </div>

          {/* Answer Box Display */}
          {answer && (
            <div
              style={{
                marginTop: "25px",
                background: "#f5f7ff",
                borderLeft: "5px solid #21468B",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: "#21468B",
                }}
              >
                Answer
              </h3>
              <p
                style={{
                  lineHeight: "1.8",
                  color: "#333",
                }}
              >
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;