import React from 'react';
import { useFormattedMessage } from '../../hooks/useFormattedMessage';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  username: string;
  message: string;
  color?: string;
  emotes?: { [key: string]: string[] };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ username, message, color, emotes }) => {
  const formattedMessage = useFormattedMessage(message, emotes);

  return (
    <div className={styles.message}>
        <span className={styles.username} style={{ color: color || '#ffc400' }}>
        {username}:
      </span>
      <span className={styles.text}>{formattedMessage}</span>
    </div>
  );
};

export default ChatMessage;
