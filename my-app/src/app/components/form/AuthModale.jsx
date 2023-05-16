import React, { useState } from "react";

import './authModaleStyles.scss';

import {RxAvatar} from'react-icons/rx';
import {ImCross} from 'react-icons/im';

import { useLoginUserMutation } from "../../store/api/api";


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
  const [loginUser, { data, isSuccess }] = useLoginUserMutation();
  const [inputValueName, setInputValueName] = useState("");
    const [inputValueEmail, setInputValueEmail] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const [inputValueLastname, setInputValueLastname] = useState("");
    const [input,setinput] = useState('');
    

  const switchMode = () => setIsLogin(!isLogin);

  const openConnect = () => {
    setModalOpen(true)
    setShow(true)
  }
  const closeConnect = () => {
    setModalOpen(false)
    setShow(false)
  }

  //clear tout mes inputs
  const resetForm = () => {
    setInputValueName('');
    setInputValueEmail('');
    setInputValuePassword('');    
    setInputValueLastname('');
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("input", e.target);
        const result = await loginUser({
            email: inputValueEmail,
            password: inputValuePassword,
        });
        if (result) {
            //recuperation token
            localStorage.setItem("token", result.data.token);
            console.log("token", data);
            //je dispatch mon action
            console.log("data", data);
            //dispatch(addList(data));
            resetForm();
        }
        
    } catch (error) {
        console.log(error);
    }
};

const handleInputChange = (e,stateValue) => {           
    stateValue(e.target.value);
    console.log(inputValueName);
    
};
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
              <input type="text" name="firstname" placeholder='lastname' value={inputValueName} onChange={(e) =>handleInputChange(e,setInputValueName)} />
            </label>
            <label>
              Nom
              <input type="text" name="lastname" placeholder='name'value={inputValueLastname} onChange={(e) =>handleInputChange(e,setInputValueLastname)} />
            </label>
          </>
        )}
        <label>
          Email
          <input type="email"placeholder='your email' name="email"value={inputValueEmail} onChange={(e) =>handleInputChange(e,setInputValueEmail)} />
        </label>
        <label>
          Mot de passe
          <input type="password" placeholder='password'name="password"value={inputValuePassword} onChange={(e) =>handleInputChange(e,setInputValuePassword)} />
        </label>
        <button className='auth__button__connect'type="submit" onClick={handleSubmit}>{isLogin ? "Se connecter" : "S'inscrire"} </button>
      </form>
      
    </div>
    </>
  );
}

export default AuthModal;