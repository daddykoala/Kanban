import React, { useState } from "react";

import './authModaleStyles.scss';

import {RxAvatar} from'react-icons/rx';
import {ImCross} from 'react-icons/im';


function Backdrop() {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000, // assurez-vous que le zIndex est supérieur à celui de tous les autres éléments
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // fond semi-transparent
        }}
      />
    );
  }







function AuthModal() {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const switchMode = () => setIsLogin(!isLogin);

  const openConnect = () => {
    setModalOpen(true)
    setShow(true)
  }
  const closeConnect = () => {
    setModalOpen(false)
    setShow(false)
  }

  if (!show && !isModalOpen) {
    return (
      <button className="btn-modal brilliant" onClick={openConnect}>
        <RxAvatar/>
      </button>
    );
  }

  return (
    <>
    <Backdrop/>
    <div className="auth">
        <button className="auth__button__quit"onClick={closeConnect}>
        <ImCross/>
      </button>
      <div className="auth__button">
        <button onClick={() => setIsLogin(true)}>Se connecter</button>
        <button onClick={() => setIsLogin(false)}>S'inscrire</button>
      </div>
      <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
      <form>
        {!isLogin && (
          <>
            <label>
              Prénom
              <input type="text" name="firstname" placeholder='lastname' />
            </label>
            <label>
              Nom
              <input type="text" name="lastname" placeholder='name' />
            </label>
          </>
        )}
        <label>
          Email
          <input type="email"placeholder='your email' name="email" />
        </label>
        <label>
          Mot de passe
          <input type="password" placeholder='password'name="password" />
        </label>
        <button className='auth__button__connect'type="submit">{isLogin ? "Se connecter" : "S'inscrire"} </button>
      </form>
      
    </div>
    </>
  );
}

export default AuthModal;