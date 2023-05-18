import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";

import { useGetContentByUserQuery } from "../../store/api/api";
import { useLoginUserMutation } from "../../store/api/api";
import { setUser } from "../../store/reducer/userSlice";
import { setCredentials } from "../../store/reducer/authSlice";
import { setPasswordValidity ,setPasswordValidationWidth,setPassword} from "../../store/reducer/authSlice";

import "./authModaleStyles.scss";

import { RxAvatar } from "react-icons/rx";
import { ImCross } from "react-icons/im";

function Backdrop() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000, // assurez-vous que le zIndex est supérieur à celui de tous les autres éléments
        backgroundColor: "rgba(0, 0, 0, 0.5)", // fond semi-transparent
      }}
    />
  );
}

function AuthModal() {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [loginUser, { data, isSuccess }] = useLoginUserMutation();
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValuePassword, setInputValuePassword] = useState("");
  const [inputValueLastname, setInputValueLastname] = useState("");
  //validation de du mot de passe.
 const { passwordValidity ,passwordValidationWidth, password} = useSelector((state) => state.auth);
 

 
 useEffect(() => {   
  dispatch(setPassword(inputValuePassword));
  console.log(password);
}, [inputValuePassword, dispatch]);


useEffect(() => {   
  dispatch(setPasswordValidity());
  console.log(passwordValidity);
}, [password, dispatch]);

useEffect(() => {   
  // const validCount = passwordValidity.filter(Boolean).length;
  let valuesToCount =[ ]
  let values = Object.values(passwordValidity)
  valuesToCount.push(values)
  const validCount = valuesToCount[0].filter(Boolean).length;
  if(validCount === 3){
    //ne serajamais a 100% car index commence a zero
    const count = validCount+1
    dispatch(setPasswordValidationWidth(count  * 25));
  }
  dispatch(setPasswordValidationWidth(validCount  * 25));

}, [passwordValidity, dispatch]);
  

  const openConnect = () => {
    setModalOpen(true);
    setShow(true);
  };
  const closeConnect = () => {
    setModalOpen(false);
    setShow(false);
  };

  //clear tout mes inputs
  const resetForm = () => {
    setInputValueName("");
    setInputValueEmail("");
    setInputValuePassword("");
    setInputValueLastname("");
  };

  const validationPassword = (e) => {
      setPasswordValidity(inputValuePassword)
  }
  //fonction qui va renvoyer la valeur de complexite du mote de passe en rnevoyent le nombre de condition remplies
  function countPasswordValidationWidth(elem) {
    const validCount = elem.filter(Boolean).length;
    dispatch(setPasswordValidationWidth(validCount * 25));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("input", e.target);
    try {
      
      const result = await loginUser({
        email: e.target.email.value,
        password: inputValuePassword,
      });
      if (result && result.data) {
        //recuperation token
        // localStorage.setItem("token", result.token);
        console.log("result", result);
        console.log("result", result.data.token);
        console.log("result", result.data.user);

        dispatch(setCredentials(result.data.token));
        dispatch(setUser(result.data.user));
        

        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
//fonction pour tout mes states locaux
  const handleInputChange = (e, stateValue) => {
    stateValue(e.target.value);
    
    
  };
  if (!show && isModalOpen) {
    return (
      <button className="btn-modal brilliant" onClick={openConnect}>
        <RxAvatar />
      </button>
    );
  }

  return (
    <>
    <button className="btn-modal brilliant" onClick={openConnect}>
        <RxAvatar />
      </button>
      <Backdrop />
      <div className="auth">
      <div className="triangle"></div>
        <button className="auth__button__quit" onClick={closeConnect}>
          <ImCross />
        </button>
        <div className="auth__button">
          <button onClick={() => setIsLogin(true)}>Se connecter</button>
          <button onClick={() => setIsLogin(false)}>S'inscrire</button>
        </div>
        <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>
                Prénom
                <input
                  type="text"
                  name="firstname"
                  placeholder="lastname"
                  value={inputValueName}
                  onChange={(e) => handleInputChange(e, setInputValueName)}
                />
              </label>
              <label>
                Nom
                <input
                  type="text"
                  name="lastname"
                  placeholder="name"
                  value={inputValueLastname}
                  onChange={(e) => handleInputChange(e, setInputValueLastname)}
                />
              </label>
            </>
          )}
          <label>
            Email
            <input
              type="email"
              placeholder="your email"
              name="email"
              value={inputValueEmail}
              onChange={(e) => handleInputChange(e, setInputValueEmail)}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              placeholder="text"
              name="password"
              value={inputValuePassword}
              onChange={(e) => handleInputChange(e, setInputValuePassword)}
            />
          </label>
          <div className="password-safety">
              Niveau de sécurité du mot de passe :
              <div className="password-safety-container">
                {passwordValidationWidth === 25 && (
                  <div className="password-safety-quart"></div>
                )}
                {passwordValidationWidth === 50 && (
                  <div className="password-safety-middle"></div>
                )}
                {passwordValidationWidth === 75 && (
                  <div className="password-safety-3quart"></div>
                )}
                {passwordValidationWidth === 100 && (
                  <div className="password-safety-full"></div>
                )}
              </div>
              <span>
                Au moins{" "}
                <span className={passwordValidity.minChar ? "success" : ""}>
                  8 caractères
                </span>
                , dont une{" "}
                <span className={passwordValidity.uppercase ? "success" : ""}>
                  {" "}
                  majuscule
                </span>
                , un{" "}
                <span className={passwordValidity.number ? "success" : ""}>
                  {" "}
                  chiffre
                </span>
                , et un
                <span className={passwordValidity.specialChar ? "success" : ""}>
                  {" "}
                  caractère spécial
                </span>
                .
              </span>
            </div>
          <button
            className="auth__button__connect"
            type="submit"
            
          >
            {isLogin ? "Se connecter" : "S'inscrire"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default React.memo(AuthModal);
