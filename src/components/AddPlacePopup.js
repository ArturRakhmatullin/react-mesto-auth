import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isDataLoad}) {
  const [values, setValues] = useState({name: "", link: ""})

  useEffect(() => {
    setValues({name: "", about: ""});
  }, [isOpen])

  function handleChange(e) {
    const {value, name} = e.target;
    setValues({...values, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return(
    <PopupWithForm
      name="append-card"
      title="Новое место"
      buttonText={isDataLoad ? "Создаем.." : "Создать"}
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
            value={values.name || ""}
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
            onChange={handleChange}
        />
        <span className="popup__error popup__error_visible place-error" />
      </label>
      <label className="popup__label" htmlFor="email">
        <input
            id="email"
            className="popup__info popup__info_type_email"
            name="CardLink"
            type="url"
            value={values.link || ""}
            placeholder="Ссылка на картинку"
            required=""
            onChange={handleChange}
        />
        <span className="popup__error popup__error_visible email-error" />
      </label>
    </PopupWithForm>
  );
}