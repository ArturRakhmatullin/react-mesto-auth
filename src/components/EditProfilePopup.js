import React, {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
        name="rename-user"
        title="Редактировать профиль"

        children={<>
          <label className="popup__label" htmlFor="username">
              <input
                  id="username"
                  className="popup__info popup__info_type_name"
                  name="name"
                  type="text"
                  value={name || ""}
                  placeholder="Имя"
                  minLength={2}
                  maxLength={40}
                  required=""
                  onChange={handleChangeName}
              />
              <span className="popup__error popup__error_visible username-error" />
          </label>
          <label className="popup__label" htmlFor="userprofession">
              <input
                  id="userprofession"
                  className="popup__info popup__info_type_profession"
                  name="about"
                  type="text"
                  value={description || ""}
                  placeholder="Описание"
                  minLength={2}
                  maxLength={200}
                  required=""
                  onChange={handleChangeDescription}
              />
              <span className="popup__error popup__error_visible userprofession-error" />
          </label>
        </>}

        buttonText={props.isDataLoad ? "Сохранение..." : "Сохранить"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
    />
  );
}

export default EditProfilePopup;