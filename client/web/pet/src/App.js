import './App.css';
import logo from './petlogo.png';
import search from './search.png';

function Web(){
  return(
    <div className="Web">
      <a href="#home">
        <img src={logo} className="Web-logo" alt="logo" />
      </a>
      <input type="checkbox"  id="sideMenu-active" />
      <div className="sideMenu">
        <form>
        <img src={search} className="search-icon" alt="search"/>
            <input class="search-box" type="search" placeholder="Search"/>
        </form>
        <ul className="menu">
          <li><a className="home" href="#home">Home</a></li>
          <li><a className="shop" href="#shop">Shop</a></li>
        <li><a className="hospital" href="#hospital">Hospital</a></li>
        <li>
          <a className="pets" href="#pets">Pets</a>
          <ul>
            <li><a href="#cats">Cats</a></li>
            <li><a href="#dogs">Dogs</a></li>
            <li><a href="#other">Other</a></li>
          </ul>
        </li>
        <li><a className="profile" href="#profile">Profile</a></li>
        <li><a className="Notifications" href="#notifications">Notifications</a></li>
        </ul>
        <a className="setting" href="#setting">Setting</a>
        <a className="login" href="#login">Login</a>
        <label for="sideMenu-active">
          <i class="fas fa-angle-right"></i>
        </label>
      </div>
      <select name="language">
      <option value="English">English</option>
      </select>
    </div>
  );
}
export default Web;
