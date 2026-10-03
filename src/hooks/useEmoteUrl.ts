/**
 * Hook to generate Twitch emote URLs.
 * Encapsulates the CDN logic and allows for future theme/scale customization.
 */
export const useEmoteUrl = (id: string) => {
  const theme = 'dark';
  const scale = '1.0';
  return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/${theme}/${scale}`;
};
