import React, { useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const BotScreen = () => {
  const [messages, setMessages] = useState([]);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text;

    try {
      const response = await axios.post(
        'https://api.google.dev/gemini/v1/chat',
        {
          model: 'gemini-pro',
          messages: [{ role: 'user', content: userMessage }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer AIzaSyDlo8e0AWrVdEyy_lKCyq5uoNny0mwcFMc`,
          },
        }
      );

      const botReply = {
        _id: Math.random().toString(),
        text: response.data.choices[0].message.content,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Gemini AI',
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [botReply])
      );
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
    />
  );
};

export default BotScreen;
