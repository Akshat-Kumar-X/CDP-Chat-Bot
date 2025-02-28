import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(""); // Error state

    const sendMessage = async () => {
        if (!query.trim()) return;

        setError(""); // Reset error before new request
        const userMessage = { sender: "user", text: query };
        setMessages([...messages, userMessage]);

        try {
            const res = await axios.get(`http://localhost:3000/ask?q=${query}`);
            
            if (res.data.error) {
                setError(res.data.error);
            } else {
                const botMessage = {
                    sender: "bot",
                    text: res.data.answer || res.data.message,
                    source: res.data.source
                };
                setMessages([...messages, userMessage, botMessage]);
            }
        } catch (error) {
            setError("Failed to connect to chatbot. Please try again later.");
            console.error("❌ Frontend Error:", error.message);
        }

        setQuery("");
    };

    return (
        <div className="chatbot">
            <h2>CDP Support Chatbot</h2>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <p>{msg.text}</p>
                        {msg.source && <a href={msg.source} target="_blank" rel="noopener noreferrer">Read More</a>}
                    </div>
                ))}
            </div>

            {error && <div className="error-message">❌ {error}</div>} {/* Display error messages */}
            
            <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Ask something..." 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
