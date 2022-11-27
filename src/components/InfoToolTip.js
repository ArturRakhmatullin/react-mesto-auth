import React, { useEffect } from "react";

function InfoToolTip({onClose, status: { isOpen, checkin}}) {

  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        onClose()
      };
    };
    document.addEventListener("keyup", handleEscapeClose);
    return () => {
      document.removeEventListener("keyup", handleEscapeClose);
    };
  }, [isOpen, onClose])

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <form className="popup__container">
        <div className={`popup__status ${checkin ? 'popup__status_happy' : 'popup__status_unhappy'}`}></div>
        <h2 className="popup__title-status">{checkin ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button type="button" onClick={onClose} className="popup__close"></button>
        <div onClick={onClose} className="popup__overlay"></div>
      </form>
    </div>
  );
}

export default InfoToolTip;