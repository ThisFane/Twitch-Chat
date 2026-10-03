import React from 'react';
import Chat from './components/Chat/Chat';
import styles from './App.module.css';

const App: React.FC = () => {
  const channel = window.location.pathname.split('/')[1] || '';

  return (
    <div className={styles.container}>
      <Chat channel={channel.toLowerCase()} />
    </div>
  );
};

export default App;
