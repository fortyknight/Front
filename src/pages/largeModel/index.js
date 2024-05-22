import React, { useState } from 'react';
import { Layout, Input, Button, List, Avatar } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const LargeModel = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user's message to the chat
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue('');

      // Simulate ChatGPT's response
      setTimeout(() => {
        const response = generateResponse(inputValue);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'chatgpt', text: response },
        ]);
      }, 1000);
    }
  };

  const generateResponse = (message) => {
    // This function can be replaced with an API call to get real responses
    return `ChatGPT's response to: ${message}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <h1 style={{ color: 'white' }}>ChatGPT Clone</h1>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div className="chat-container">
          <List
            className="chat-content"
            dataSource={messages}
            renderItem={(message) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar>
                      {message.sender === 'user' ? 'U' : 'G'}
                    </Avatar>
                  }
                  title={message.sender === 'user' ? 'You' : 'ChatGPT'}
                  description={message.text}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="input-container">
          <TextArea
            rows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <Button
            type="primary"
            onClick={handleSend}
            style={{ marginTop: '10px' }}
          >
            Send
          </Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>ChatGPT Clone ©2024</Footer>
    </Layout>
  );
};

export default LargeModel;