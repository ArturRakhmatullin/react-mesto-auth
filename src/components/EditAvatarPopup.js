import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const refOnAvatar = useRef(null);

  useEffect(() => {
    refOnAvatar.current.value = '';
  }, [onUpdateAvatar]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: refOnAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
        name="popup-avatar "
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >

    <input
        id="avatar-link"
        className="popup__info popup__info_type_avatar"
        name="avatar"
        type="url"
        defaultValue=""
        placeholder="Ссылка на изображение"
        required=""
        ref={refOnAvatar}
    />

    <span className="popup__error popup__error_visible avatar-error" />
  </PopupWithForm>
  );
}

export default EditAvatarPopup;