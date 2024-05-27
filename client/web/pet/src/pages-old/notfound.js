// notfound.js

import React from 'react';
import '.css/notfound.css';
import img from '../image/404notfound.png';

function NotFound() {
  return (
    <div className="container">
      <center><img src={img} className="img"/></center>
      <div className="button-group">
      <center><h2>Looks like you’ve got lost….</h2></center>
        <center><button type="button" onClick={'#'}>
        Back to Dashboard
        </button></center>
      </div>
    </div>
  );
};

export default NotFound;