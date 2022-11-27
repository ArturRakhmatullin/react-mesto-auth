import React, {useContext} from "react";

import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, handleCardClick, onCardLike, onCardDelete, cards}) {

  const currentUser = useContext(CurrentUserContext);

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
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
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
