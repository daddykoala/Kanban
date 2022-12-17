import React from 'react';
import Decks from './app/components/Deck/Decks';
import Header from './app/components/header/Header';
import Sidebar from './app/components/Sidebar/Sidebar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <Decks/>
        
      
    </div>
  );
}

export default App;
