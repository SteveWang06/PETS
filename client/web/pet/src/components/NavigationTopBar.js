import './css/NavigationTopBar.css'

const NavigationTopBar = () => {
    return (
      <div className="NavigationTopBar">
        <div className="lang">
          <select>
          <option value="English">English</option>
        </select>
        </div>
      <div className="account">
        <b>FCU</b>
      <p>Admin</p>
      </div>
      
        <div className="Search">
        <input type="text" class="Search" placeholder="Search"></input>
        </div>
      </div>
    );
  }
  
  export default NavigationTopBar;
  