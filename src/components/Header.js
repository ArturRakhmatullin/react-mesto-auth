import logo from '../logo.svg';

function Header() {
  return (
    <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Лого_в_шапке"
        />
    </header>
  );
}

export default Header;