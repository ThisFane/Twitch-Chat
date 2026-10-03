import { useState, useEffect } from 'react';
import tmi from 'tmi.js';
import type {Message} from '../types/chat';

const useTwitchChat = (channel: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let isCancelled = false;
    if (!channel) return;

    const client = new tmi.Client({
      channels: [channel]
    });

    client.on('message', (_twitchChannel, userInfo, message) => {
      if (isCancelled) return;

      const messageId = userInfo.id || Date.now().toString();

      setMessages((prev) => {
        // Prevent adding duplicate messages
        if (prev.some(m => m.id === messageId)) {
          return prev;
        }

        const newMessage: Message = {
          id: messageId,
          username: userInfo['display-name'] || userInfo.username || 'Anonymous',
          message: message,
          color: userInfo.color,
          emotes: userInfo.emotes
        };

        return [...prev.slice(-99), newMessage];
      });
    });

    client.connect().catch((err) => {
      if (!isCancelled) console.error(err);
    });

    return () => {
      isCancelled = true;
      client.disconnect().catch(console.error);
    };
  }, [channel]);

  return { messages };
};

export default useTwitchChat;
