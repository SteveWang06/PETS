import React from "react";
import logo from './petlogo.png';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="links">
        <h2>Pet Social Application</h2>
        <a href="#home">
        <img src={logo} className="logo" alt="logo" />
      </a>
      <div className="link">
        <span className="icons">
          <div className="facebook">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-5 h-5"
            viewBox="0 0 24 24"
           >
           <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
           </svg>
          </div>

          <div className="twitter">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-5 h-5"
            viewBox="0 0 24 24"
          >
           <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </div>

          <div className="instagram">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-5 h-5"
            viewBox="0 0 24 24"
          >
          <rect
            width="20"
            height="20"
            x="2"
            y="2"
            rx="5"
            ry="5"
            ></rect>
           <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
           </svg>
          </div>

          <div className="in">
          <svg
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="0"
            class="w-5 h-5"
            viewBox="0 0 24 24"
          >
          <path
            stroke="none"
            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
            ></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </div>
        </span>
        </div>
      </div>



      
      <nav >
        <div className="about">
          <h2>About</h2>
          <li>Company</li>
          <li>Careers</li>
          <li>Blog</li>
        </div>
      </nav>
      
      <nav>
        <div className="support">
          <h2>Support</h2>
          <li>Contact Support</li>
          <li>Help Resources</li>
          <li>Release Updates</li>
        </div>
      </nav>
      
      <nav>
        <div className="platform">
          <h2>Platform</h2>
          <li>Terms &amp; Privacy</li>
          <li>Pricing</li>
          <li>FAQ</li>
        </div>
      </nav>

      <nav>
      <div className="contact">
        <h2>Contact</h2>
        <li>Send a Message</li>
        <li>Request a Quote</li>
        <li>+123-456-7890</li>
        </div>
      </nav>
      
      <div className="copyright">
        <p>© 2024 Create by Pet Group</p>
      </div>
      
      </div>
    </footer>
  );
};

export default Footer;
