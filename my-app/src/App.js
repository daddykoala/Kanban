import React, { useEffect ,useState ,lazy,Suspense} from "react";
import { Routes, Route, Navigate,useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";

//components
import Header from "./app/components/header/Header";
//ameliorations des performances
import HomePage from "./app/components/home/Home";
//gestion fond d'écran
import { getRandomImage } from '../src/app/store/api/unsplashApi';
import  Background  from "./ressources/pexels-ave-calvar-martinez-4705113.jpg";

import { useGetMeQuery } from "./app/store/api/api";
import { setUser } from "./app/store/reducer/userSlice";

import "./styles/App.scss";
const Sidebar = lazy(() => import('./app/components/Sidebar/Sidebar'));
const Decks = lazy(() => import('./app/components/Deck/Decks'));



function App() {
const dispatch = useDispatch();
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
    backgroundRepeat: 'repeat-y',
      height: 'max-content',
      minHeight: '100vh',
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

              <Suspense fallback={<div>Loading...</div>}>
                <Sidebar />
                <Decks />
              </Suspense>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
