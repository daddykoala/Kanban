import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetContentByUserQuery } from './app/store/api/api';

import Decks from './app/components/Deck/Decks';
import Header from './app/components/header/Header';
import Sidebar from './app/components/Sidebar/Sidebar';



import './App.css';

function App() {
const dispatch = useDispatch();
const {data, error, isLoading, isError } = useGetContentByUserQuery(1);
console.log(data);
if (isLoading){return <div>Loading...</div> };
if (isError){return <div>error</div> };



  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <Decks/>
        
      
    </div>
  );
}

export default App;
