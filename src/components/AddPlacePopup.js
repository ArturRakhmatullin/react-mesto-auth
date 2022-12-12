import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [place, setValues] = useState("");
  const [link, setLink] = useState("");

  function handleAddPlace(e) {
    setValues(e.target.value);
  }

  function handleAddLink(e) {
    setLink(e.target.value);
  }

/*  function handleChange(e) {
    const {value, name} = e.target;
    setValues({...values, [name]: value});
  }
*/

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(place, link);
  }

  useEffect(() => {
    setValues("");
    setLink("");
  }, [props.isOpen])

  return(
    <PopupWithForm
      name="append-card"
      title="Новое место"

      children={<>
        <label className="popup__label" htmlFor="place">
          <input
              id="place"
              className="popup__info popup__info_type_place"
              name="CardName"
              type="text"
              value={place}
              placeholder="Название"
              minLength={2}
              maxLength={30}
              required=""
              onChange={handleAddPlace}
          />
          <span className="popup__error popup__error_visible place-error" />
        </label>
        <label className="popup__label" htmlFor="email">
          <input
              id="email"
              className="popup__info popup__info_type_email"
              name="CardLink"
              type="url"
              value={link}
              placeholder="Ссылка на картинку"
              required=""
              onChange={handleAddLink}
          />
          <span className="popup__error popup__error_visible email-error" />
        </label>
      </>}

      buttonText={props.isDataLoad ? "Создаем.." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}