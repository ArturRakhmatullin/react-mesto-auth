import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const refOnCardName = useRef(null);
  const refOnCardLink = useRef(null);

  useEffect(() => {
    refOnCardName.current.value = '';
    refOnCardLink.current.value = '';
  }, [onAddPlace]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: refOnCardName.current.value,
      link: refOnCardLink.current.value,
    });
  }

  return(
    <PopupWithForm
      name="append-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="place">
        <input
            id="place"
            className="popup__info popup__info_type_place"
            name="CardName"
            type="text"
            defaultValue=""
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
            ref={refOnCardName}
        />
        <span className="popup__error popup__error_visible place-error" />
      </label>
      <label className="popup__label" htmlFor="email">
        <input
            id="email"
            className="popup__info popup__info_type_email"
            name="CardLink"
            type="url"
            defaultValue=""
            placeholder="Ссылка на картинку"
            required=""
            ref={refOnCardLink}
        />
        <span className="popup__error popup__error_visible email-error" />
      </label>
    </PopupWithForm>
  );
}