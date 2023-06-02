import React, { useEffect ,useState} from "react";

import Decks from "./app/components/Deck/Decks";
import { Routes, Route } from "react-router-dom";
import Header from "./app/components/header/Header";
import Sidebar from "./app/components/Sidebar/Sidebar";
import { getRandomImage } from '../src/app/store/api/unsplashApi';
import  Background  from "./ressources/pexels-ave-calvar-martinez-4705113.jpg";


import "./styles/App.scss";

function App() {
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  useEffect(() => {

    const orientation = window.innerWidth > 600 ? "landscape" : "portrait";
    getRandomImage(orientation).then(result => {
      if (result.errors) {
        console.error('Erreur: ', result.errors[0]);
        setBackgroundUrl(Background);
      } else {
        console.log(result.response);
        const photo = result.response;
        setBackgroundUrl(photo.urls.full);
      }});
    },[]);

  return (
    <div className="App"
    style={{ 
      backgroundImage: `
      url(${backgroundUrl})`,
    backgroundSize: 'cover',
      // backgroundImage: `url(${backgroundUrl})`,
      // backgroundSize: 'cover',
      height: '100vh',
      width: '100%',
    }}
    >
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
