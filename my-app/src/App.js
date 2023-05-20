import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery} from "./app/store/api/api";

import { setUser } from "./app/store/reducer/userSlice";
import Decks from "./app/components/Deck/Decks";
import { Routes, Route } from "react-router-dom";
import Header from "./app/components/header/Header";
import Sidebar from "./app/components/Sidebar/Sidebar";


import "./styles/App.scss";

function App() {
  // const { data: user, refetch } = useGetMeQuery();

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <Decks />
            </div>
          }
        />
        <Route
          path="/decks/:decksId"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <Decks />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
