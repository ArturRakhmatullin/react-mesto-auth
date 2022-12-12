import React from 'react';

function PopupWithForm(props) { 
//{name, title, children, buttonText, isOpen, onClose, onSubmit}
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                  className={`popup__close popup__close_type_${props.name}`}
                  aria-label="Закрыть попап"
                  type="button"
                  onClick={props.onClose}
                />
                <form
                  className={`popup__form popup__form_type_${props.name}`}
                  action="/"
                  name={`popup-${props.name}`}
                  noValidate=""
                  onSubmit={props.onSubmit}
                >
                  <h2 className="popup__description">{props.title}</h2>

                  {props.children}
                    
                  <button className="popup__submit" type="submit">
                    {props.buttonText}
                  </button>
                </form>
            </div>    
        </div>
    );
}

export default PopupWithForm;