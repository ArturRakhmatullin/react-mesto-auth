import React from 'react';

function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit}) { 

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                  className={`popup__close popup__close_type_${name}`}
                  aria-label="Закрыть попап"
                  type="button"
                  onClick={onClose}
                />
                <form
                  className={`popup__form popup__form_type_${name}`}
                  action="/"
                  name={`popup-${name}`}
                  noValidate=""
                  onSubmit={onSubmit}
                >
                  <h2 className="popup__description">{title}</h2>

                  {children}
                    
                  <button className="popup__submit" type="submit">
                    {buttonText}
                  </button>
                </form>
            </div>    
        </div>
    );
}

export default PopupWithForm;