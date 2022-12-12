import React, {useState} from "react";

function Login(props) {
  const initialData = {
    email: "",
    password: "",
  };
  const [profileData, setProfileData] = useState(initialData);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProfileData((profileData) => ({
      ...profileData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profileData.password || !profileData.email) {
      return;
    }
    props.onLogin(profileData);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1 className="login__title">Вход</h1>
      <input
        id="e-mail"
        className="login__input"
        name="email"
        type="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        value={profileData.email || initialData.email}
        required
        onChange={handleChange}
      />
      <span className="popup__error email-error"></span>
      <input
        id="password"
        className="login__input"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="2"
        maxLength="40"
        value={profileData.password || initialData.password}
        autoComplete={profileData.password || initialData.password}
        required
        onChange={handleChange}
      />
      <span className="popup__error email-error"></span>
      <button className="login__button" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;