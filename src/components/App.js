import React, {useState, useEffect} from "react";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import * as Auth from "../utils/Auth";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";

import "../index.css";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [loggedIn, setLoggedIn] = useState([]);
  const [profileEmail, setProfileEmail] = useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState({
    isOpen: false,
    checkin: false,
  });

  const navigate = useNavigate();
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(props) {
    setSelectedCard({ name: props.name, link: props.link });
    setIsImagePopupOpen(true);
  }

  function handleInfoToolTip(res) {
    setIsInfoToolTipOpen({
      ...isInfoToolTipOpen,
      isOpen: true,
      checkin: res,
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoToolTipOpen(false);
  }

  const isOpen = 
  isEditAvatarPopupOpen ||
  isEditProfilePopupOpen ||
  isAddPlacePopupOpen ||
  isInfoToolTipOpen ||
  selectedCard.link;

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      };
    };
    if (isOpen) {
      document.addEventListener("keyup", closeByEscape);
      return () => {
        document.removeEventListener("keyup", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {console.log(err)});
  }

  function handleCardDelete(cardId) {
    Api.removeCard(cardId).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== cardId));
    })
    .catch(err => {console.log(err)});
  }

  function handleAddPlaceSubmit(newPlace, newLink) {
    Api.addCard(newPlace, newLink).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => {console.log(err)});
  }

  function handleUpdateUser(info) {
    setIsDataLoad(true);
    Api.editProfile(info).then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {console.log(err);
      })
      .finally(() => {setIsDataLoad(false)});
  }

  function handleUpdateAvatar(data) {
    setIsDataLoad(true);
    Api.editAvatar(data).then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {console.log(err);
      })
      .finally(() => {setIsDataLoad(false)});
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      Auth
        .checkToken(token)
        .then((res) => {
          setProfileEmail(res.data.email);
        })
        .catch(err => {console.log(err)});
    }
  }, [loggedIn, profileEmail]);

  useEffect(() => {
    Api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(err => {console.log(err)});
  }, []);

  useEffect(() => {
    Api
      .getProfileInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => {console.log(err)});
  }, []);

  function handleLogin({email, password}) {
    Auth.login(email, password).then((res) => {
        if (res.token) {
          setProfileEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          navigate("/");
        }
      })
      .catch(err => {
        console.log(err);
        handleInfoToolTip(false);
      });
  }

  function handleRegister({email, password}) {
    Auth.register(email, password).then((data) => {
        if (data) {
          handleInfoToolTip(true);
        }
      })
      .catch(err => {
        console.log(err);
        handleInfoToolTip(false);
      });
  }

  const handleSignOut = () => {
    setProfileEmail("");
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  return (
   <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      
      <Header 
          loggedIn={loggedIn}
          email={profileEmail}
          onSignOut={handleSignOut}
      />

      <Routes>
          <Route
              path="/"
              element={
                <ProtectedRoute
                  path="/"
                  loggedIn={loggedIn}
                  component={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
          />

          <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
          />

          <Route 
              path="/sign-in" 
              element={<Login onLogin={handleLogin} />}
          />
          <Route 
              path="*"
              element={<Navigate to="/" replace />} 
          />
      </Routes>

      <Footer />

      <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
      />

      <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
      />

      <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isDataLoad={isDataLoad}
      />

      <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isDataLoad={isDataLoad}
      />

      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isDataLoad={isDataLoad}
      />

      <InfoToolTip 
          onClose={closeAllPopups} 
          status={isInfoToolTipOpen} 
      />
    </div>
   </CurrentUserContext.Provider>
  );
}

export default App;