import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetContentByUserQuery } from "./app/store/api/api";

import { setUser } from "./app/store/reducer/userSlice";
import Decks from "./app/components/Deck/Decks";
import { Routes,Route } from 'react-router-dom';
import Header from "./app/components/header/Header";
import Sidebar from "./app/components/Sidebar/Sidebar";

import "./App.css";


function App() {

  const dispatch = useDispatch();
  const data = useGetContentByUserQuery(1);

  useEffect(() => {
    if (data.isSuccess) {
      
      dispatch(setUser(data.data));
    }
  }, [data,dispatch]);


  if (data.isLoading) {
   
    return <div>Loading...</div>;
  }
  if (data.isError) {
    
    return <div>error</div>;
  }
  
  

  // essai pour voir ce que contient data2

  return (
    

    
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
          <Route path="/decks/:decksId" element={<Decks />} />
      </Routes>
    </div>
  
);
}

export default App;
