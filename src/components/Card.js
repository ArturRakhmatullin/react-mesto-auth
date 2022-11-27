import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? '' : 'elements__delete_passive'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ''}`
  );

  function handleCardClick() {
    onCardClick(card);
  }
  
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div id="elements">
      <div className="elements__card">
          <button 
            className={cardDeleteButtonClassName}
            aria-label="Удалить" 
            type="button"
            onClick={handleDeleteClick}
          />
          <img 
            className="elements__photo" 
            onClick={handleCardClick} 
            alt={card.name} 
            src={card.link} 
          />
          <div className="elements__name">
            <h2 className="elements__cardname">{card.name}</h2>
            <div className="elements__like-box">
                <button
                  className={cardLikeButtonClassName}
                  aria-label="Отправить реакцию «нравится»"
                  type="button"
                  onClick={handleLikeClick}
                />
                <span className="elements__like-counter"> {card.likes.length} </span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Card;