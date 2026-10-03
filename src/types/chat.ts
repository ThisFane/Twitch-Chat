export interface Message {
  id: string;
  username: string;
  message: string;
  color?: string;
  emotes?: { [key: string]: string[] };
}
