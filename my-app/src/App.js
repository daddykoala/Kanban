import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetContentByUserQuery } from "./app/store/api/api";
import { setUser } from "./app/store/reducer/userSlice";
// import Decks from "./app/components/Deck/Decks";

// import Header from "./app/components/header/Header";
import Sidebar from "./app/components/Sidebar/Sidebar";

import "./App.css";

function App() {

  const dispatch = useDispatch();

  const data = useGetContentByUserQuery(1);

  useEffect(() => {
    if (data.isSuccess) {
      console.log("data je passe par set user");
      dispatch(setUser(data.data));
    }
  }, [data,dispatch]);

  const state = useSelector((state) => state);
  console.log("coucou", state.user);
  
  if (data.isLoading) {
    console.log("data je passe par is loading");
    return <div>Loading...</div>;
  }
  if (data.isError) {
    console.log("data je passe par is error");
    return <div>error</div>;
  }
  

  // essai pour voir ce que contient data
  console.log(data);

  return (
    <div className="App">
      {/* <Header /> */}
      {/* <Sidebar /> */}
      {/* <Decks /> */}
    </div>
  );
}

export default App;
