import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetContentByUserQuery } from "./app/store/api/api";
import { setUser } from "./app/store/reducer/userSlice";
import Decks from "./app/components/Deck/Decks";

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

  const state = useSelector((state) => state);


  if (data.isLoading) {
   
    return <div>Loading...</div>;
  }
  if (data.isError) {
    
    return <div>error</div>;
  }
  
  

  // essai pour voir ce que contient data

  return (
    <div className="App">
      <Header />
      <Sidebar />
      {/* <Decks /> */}
    </div>
  );
}

export default App;
