import React, { useMemo } from 'react';
import Emote from '../components/Emote/Emote';

/**
 * Hook to parse message text and inject Emote components.
 */
export const useFormattedMessage = (text: string, emoteData?: { [key: string]: string[] }) => {
  return useMemo(() => {
    if (!emoteData) return text;

    const emoteList: { id: string; start: number; end: number }[] = [];
    Object.entries(emoteData).forEach(([id, positions]) => {
      positions.forEach((position) => {
        const [start, end] = position.split('-').map(Number);
        emoteList.push({ id, start, end });
      });
    });

    emoteList.sort((a, b) => a.start - b.start);

    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;

    emoteList.forEach((emote, index) => {
      if (emote.start > lastIndex) {
        parts.push(text.slice(lastIndex, emote.start));
      }
      
      parts.push(
        <Emote
          key={`${emote.id}-${emote.start}-${index}`}
          id={emote.id}
        />
      );
      lastIndex = emote.end + 1;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }, [text, emoteData]);
};
