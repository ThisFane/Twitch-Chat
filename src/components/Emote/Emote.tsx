import React from 'react';
import { useEmoteUrl } from '../../hooks/useEmoteUrl';
import styles from './Emote.module.css';

interface EmoteProps {
  id: string;
  name?: string;
}

const Emote: React.FC<EmoteProps> = ({ id, name = 'emote' }) => {
  const url = useEmoteUrl(id);
  
  return (
    <img
      src={url}
      alt={name}
      title={name}
      className={styles.emote}
    />
  );
};

export default Emote;
