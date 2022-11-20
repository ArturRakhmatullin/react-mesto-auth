import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({cardData, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardData.owner._id === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? '' : 'elements__delete_passive'}`
  );

  const isLiked = cardData.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ''}`
  );

  function handleCardClick() {
    onCardClick(cardData);
  }
  
  function handleLikeClick() {
    onCardLike(cardData);
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
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
            alt={cardData.name} 
            src={cardData.link} 
          />
          <div className="elements__name">
            <h2 className="elements__cardname">{cardData.name}</h2>
            <div className="elements__like-box">
                <button
                  className={cardLikeButtonClassName}
                  aria-label="Отправить реакцию «нравится»"
                  type="button"
                  onClick={handleLikeClick}
                />
                <span className="elements__like-counter"> {cardData.likes.length} </span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Card;