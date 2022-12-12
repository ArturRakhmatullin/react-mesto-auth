import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refOnAvatar = useRef(null);

  useEffect(() => {
    refOnAvatar.current.value = '';
  }, [props.onUpdateAvatar]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: refOnAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
        name="popup-avatar "
        title="Обновить аватар"
        children={<>
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
        </>}

        buttonText={props.isDataLoad ? "Сохраняем.." : "Сохранить"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
    />    
  );
}

export default EditAvatarPopup;