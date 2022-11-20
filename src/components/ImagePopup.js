
function ImagePopup({selectedCard, isOpen, onClose}) {
    return (
      <div className={`popup popup_type_fullscreen ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_type_fullscreen">
            <button
              className="popup__close popup__close_type_fullscreen"
              aria-label="Закрыть попап"
              type="button"
              onClick={onClose}
            />
            <img className="popup__image" src={selectedCard.link} alt={selectedCard.name} />
            <p className="popup__name">{selectedCard.name}</p>
        </div>
      </div>
    )
}

export default ImagePopup;