import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({onRegister}) => {
  const [profileData, setProfileData] = useState({});

  function handleChange(e) {
    const {name, value} = e.target;
    setProfileData((profileData) => ({ 
      ...profileData, 
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(profileData)
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1 className="register__title">Регистрация</h1>
      <input
        id="email"
        className="register__input"
        name="email"
        type="email"
        placeholder="E-mail"
        minLength="2"
        maxLength="40"
        value={profileData.email}
        required
        onChange={handleChange}
      />
      <span className="popup__error email-error"></span>
      <input
        id="password"
        className="register__input"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="2"
        maxLength="40"
        value={profileData.password}
        required
        onChange={handleChange}
      />
      <span className="popup__error email-error"></span>
      <button type="submit" className="register__button">
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="register__link">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}

export default Register;