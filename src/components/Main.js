import React from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
//{onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <article
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            alt="Аватарка"
        />
        
        <div className="profile__editavatar" onClick={props.onEditAvatar}></div>

        <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__rename"
              aria-label="Меняем имя"
              type="button"
              onClick={props.onEditProfile}
            />
            <p className="profile__profession">{currentUser.about}</p>
        </div>
        
        <button
          className="profile__button"
          aria-label="Добавляем карточку"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="cards">{
          props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
            />
          ))
      }
      </section>
    </main>
  )
}

export default Main;
