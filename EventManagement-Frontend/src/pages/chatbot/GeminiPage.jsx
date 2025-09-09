import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaCommentDots } from 'react-icons/fa'; // Chat icon

const ChatApp = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // Toggle chat visibility
    const chatContainerRef = useRef(null);

    const handleInputChange = (event) => setPrompt(event.target.value);

    const handleSend = async () => {
        if (!prompt.trim()) {
            setError('Prompt cannot be empty');
            return;
        }

        setError(null);
        setMessages((prev) => [...prev, { sender: 'user', text: prompt }]);
        setPrompt('');

        try {
            const response = await axios.post('http://localhost:3000/api/chatbot/generate', { prompt });
            setMessages((prev) => [...prev, { sender: 'ai', text: response.data.response }]);
        } catch (err) {
            setError('Failed to fetch data from Gemini API');
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            {/* Floating Chat Icon */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#515ad5ff',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    zIndex: 999,
                }}
            >
                <FaCommentDots size={28} color="white" />
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '20px',
                        width: '350px',
                        height: '400px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '15px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        zIndex: 998,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{ backgroundColor: '#515ad5ff', color: 'white', padding: '10px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                        <strong>AI Chatbot</strong>
                    </div>

                    <div
                        ref={chatContainerRef}
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '10px',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    backgroundColor: message.sender === 'user' ? '#515ad5ff' : '#E0E0E0',
                                    color: message.sender === 'user' ? 'white' : 'black',
                                    padding: '8px 12px',
                                    borderRadius: '15px',
                                    marginBottom: '10px',
                                    maxWidth: '80%',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>

                    {error && <p style={{ color: 'red', padding: '5px 10px' }}>{error}</p>}

                    <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #eee' }}>
                        <textarea
                            value={prompt}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                            rows="2"
                            style={{
                                flex: 1,
                                padding: '8px',
                                fontSize: '14px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                resize: 'none',
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                marginLeft: '8px',
                                padding: '10px 15px',
                                backgroundColor: '#515ad5ff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatApp;