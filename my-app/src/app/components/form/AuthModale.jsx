import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation , useRegisterUserMutation } from "../../store/api/api";
import { setUser } from "../../store/reducer/userSlice";
import { setCredentials } from "../../store/reducer/authSlice";
import { setPasswordValidity,setPasswordValidationWidth,setPassword,clearPassword, clearPasswordValidity} from "../../store/reducer/authSlice";
import "./authModaleStyles.scss";
//icone
import { RxAvatar } from "react-icons/rx";
import { ImCross } from "react-icons/im";
//desinfection des inputs
import { sanitizedValue } from "../../service/input";

function Backdrop() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999, // assurez-vous que le zIndex est supérieur à celui de tous les autres éléments
        // backgroundColor: "rgba(0, 0, 0, 0.5)", // fond semi-transparent
      }}
    />
  );
}

function AuthModal() {
  //gestion de la modale en locale
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  //gestion des requetes
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();
  //gestion des input
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValuePassword, setInputValuePassword] = useState("");
  const [inputValueLastname, setInputValueLastname] = useState("");
//accesibilité au clavier
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  //validation de du mot de passe.
  const { passwordValidity, passwordValidationWidth, password } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    //MAJ mot de passe store
    dispatch(setPassword(inputValuePassword)); 
    //definini le nombre de true 
    dispatch(setPasswordValidity());
    //definir la largeur de la barre de progressionQQ
    let values = Object.values(passwordValidity);
    const validCount = values.filter(Boolean).length;
    if (validCount === 3) {
      const count = validCount + 1;
      dispatch(setPasswordValidationWidth(count * 25));
    } else {
      dispatch(setPasswordValidationWidth(validCount * 25));
    }
}, [inputValuePassword, dispatch]);
//gestion de la modale
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

//fonction pour les requetes
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser({
        email: inputValueEmail,
        password: inputValuePassword,
        lastName: inputValueLastname,
        name: inputValueName
          });
      if (result && result.data) {
        alert("vous etes bien inscrit vous pouvez vos connecter");
        resetForm();
      }
    } catch (error) {
      
      throw error;
    }

  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({
        email: e.target.email.value,
        password: inputValuePassword,
      });
      if (result && result.data) {
        dispatch(setCredentials(result.data.token));
        dispatch(setUser(result.data.user));
        dispatch(clearPassword());
        dispatch(clearPasswordValidity());
        resetForm();
      }
    } catch (error) { 
      dispatch(clearPassword());
        dispatch(clearPasswordValidity());
      throw error;
    }
  };
  //fonction pour tout mes states locaux
  const handleInputChange = (e, stateValue) => {
    stateValue(sanitizedValue(e.target.value));
  };
  if (!show && !isModalOpen) {
    return (
      <button 
      className="btn-modal brilliant" 
      onClick={openConnect}
      // accessibilité
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onFocus={() => setIsTooltipVisible(true)}
      onBlur={() => setIsTooltipVisible(false)}
      aria-label="créer votre tableau">
        <RxAvatar />
        {/* //accessibilté */}
        {isTooltipVisible && <span className="tooltip">ouvrir le fenêtre de connection</span>}
      </button>
    );
  }

  return (
    <div  >
    
      <button className="btn-modal brilliant" onClick={openConnect}>
        <RxAvatar />
      </button>
      <Backdrop />
      <div className="auth">
        <div className="triangle"></div>
        <button  className="auth__button__quit" onClick={closeConnect}>
          <ImCross />
        </button>
        <div className="auth__button">
          <button  onClick={() => setIsLogin(true)}>Se connecter</button>
          <button  onClick={() => setIsLogin(false)}>S'inscrire</button>
        </div>
        <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
        <form onSubmit= {isLogin ? handleLogin :handleRegister}>
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
                  pattern="^[a-zA-ZÀ-ÿ ]+$"
                  required
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
                  pattern="^[a-zA-ZÀ-ÿ ]+$"
                  required
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
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
              required
              onInvalid="this.setCustomValidity('Veuillez remplir ce champ')"
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
              required
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
          <button className="auth__button__connect" type="submit">
            {isLogin ? "Se connecter" : "S'inscrire"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(AuthModal);
