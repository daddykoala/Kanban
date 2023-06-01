import React, { useEffect ,useState} from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery} from "./app/store/api/api";

import { setUser } from "./app/store/reducer/userSlice";
import Decks from "./app/components/Deck/Decks";
import { Routes, Route } from "react-router-dom";
import Header from "./app/components/header/Header";
import Sidebar from "./app/components/Sidebar/Sidebar";
// initialise le foid d'ecran avec une image aléatoire
import { getRandomImage } from '../src/app/store/api/unsplashApi';


import "./styles/App.scss";

function App() {
  const [backgroundUrl, setBackgroundUrl] = useState(null);

  useEffect(() => {

    const orientation = window.innerWidth > 600 ? "landscape" : "portrait";
    getRandomImage(orientation).then(result => {
      if (result.errors) {
        console.error('Erreur: ', result.errors[0]);
      } else {
        const photo = result.response;
        setBackgroundUrl(photo.urls.full);
      }
    });
  }, []);
  // const { data: user, refetch } = useGetMeQuery();

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

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
    }}>
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
