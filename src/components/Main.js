import React, {useContext} from "react";

import Card from "./Card.js";
//import api from "../utils/Api.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, handleCardClick, onCardLike, onCardDelete, cards}) {

  const currentUser = useContext(CurrentUserContext);

/*  
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const cardsElements = cards.map((item) => (
    <Card
      key={item._id}
      cardData={item}
      onCardClick={handleCardClick}
    />
  ))

  useEffect(() => {
    api.getInitialData()
      .then(([cards, user]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch(error => console.log(error));
  }, []);
*/

  return (
    <main className="content">
      <section className="profile">
        <article
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            alt="Аватарка"
        />
        
        <div className="profile__editavatar" onClick={onEditAvatar}></div>

        <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__rename"
              aria-label="Меняем имя"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__profession">{currentUser.about}</p>
        </div>
        
        <button
          className="profile__button"
          aria-label="Добавляем карточку"
          type="button"
          onClick={onAddPlace}
        />
      </section>

      <section className="cards">{
          cards.map((item) => (
            <Card
              key={item._id}
              cardData={item}
              onCardClick={handleCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
