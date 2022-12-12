
function ImagePopup(props) {
  //{card, isOpen, onClose}
    return (
      <div className={`popup popup_type_fullscreen ${props.card.name ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_type_fullscreen">
            <button
              className="popup__close popup__close_type_fullscreen"
              aria-label="Закрыть попап"
              type="button"
              onClick={props.onClose}
            />
            <img className="popup__image" src={props.card.link} alt={props.card.name} />
            <p className="popup__name">{props.card.name}</p>
        </div>
      </div>
    )
}

export default ImagePopup;