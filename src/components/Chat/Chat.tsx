import React, { useEffect, useRef } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import useTwitchChat from '../../hooks/useTwitchChat';
import styles from './Chat.module.css';

interface ChatProps {
  channel: string;
}

const Chat: React.FC<ChatProps> = ({ channel }) => {
  const { messages } = useTwitchChat(channel);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!channel) return null;

  return (
    <div className={styles.chatContainer} ref={chatContainerRef}>
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            username={msg.username}
            message={msg.message}
            color={msg.color}
            emotes={msg.emotes}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
