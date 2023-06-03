import React, { useEffect ,useState} from "react";
import { Routes, Route, Navigate,useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
//components
import Decks from "./app/components/Deck/Decks";
import Header from "./app/components/header/Header";
import Sidebar from "./app/components/Sidebar/Sidebar";
import HomePage from "./app/components/home/Home";
//gestion fond d'écran
import { getRandomImage } from '../src/app/store/api/unsplashApi';
import  Background  from "./ressources/pexels-ave-calvar-martinez-4705113.jpg";

import { useGetMeQuery } from "./app/store/api/api";
import { setUser } from "./app/store/reducer/userSlice";

import "./styles/App.scss";


function App() {
const dispatch = useDispatch();

  ///refetch avec token au rafraichissement de la page
  // const [getMe] = useGetMeQuery();
  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem('token'));
  
  //   if(token){
  //     async function fetchData() {
  //       console.log("je passe bien ici");
  //       const result = await getMe(token);
  //       if(result.data){
  //         dispatch(setUser(result.data));
  //       }
  //     }
      
  //     fetchData();
  //   }
  // }, [dispatch, getMe]);

  //gestion du fond
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
              
              <HomePage/>
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
