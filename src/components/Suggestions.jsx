import React, { useContext } from "react";
import "./Suggestion.css";
import { motion } from "framer-motion";
import { screenModeContext } from "../helper/Context";
import image from "./images/grid-image.jpg";
import gForm from './images/gform.png'
const Suggestions = () => {
  const { screenMode } = useContext(screenModeContext);
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
      className="suggestion-container"
    >
      <div className="titles">
        <img src={image} alt="diganta kalita" className="contact-image" />
        <h1 className="suggestion-title">Reach out 📲</h1>
        <h4 className="suggestion-subtitle">
          Send a suggestion or message through the google form or connect using
          social links.
        </h4>
      </div>
      <div className="suggestion-form">
       <h1 className="form-title">Fill the google form below.</h1>
       <a href='https://forms.gle/yfSF8fgtAFzFm4pD8'>< img className='form-png' src={gForm} alt='form'/></a>
      </div>
      <div className="-suggestion-sidebar">
        <div class="card">
          {/* <div className="blob-1"></div> */}
          <div class="card-inner">
            <h1 className="suggestions-social-links">Connect through</h1>
            <p>social links and send a suggestion</p>
            <ul className="suggestion-social-links-icon">
              <li className="suggestions-list-item">
                <a
                  className="link"
                  href="https://www.facebook.com/DigantaKalita.Official/"
                >
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                  <span>Facebook</span>
                </a>
              </li>
              <li className="suggestions-list-item">
                <a href="https://mobile.twitter.com/diganta68" className="link">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                  <span>Twitter</span>
                </a>
              </li>

              <li className="suggestions-list-item">
                <a
                  className="link"
                  href="https://www.instagram.com/diganta4345/"
                >
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Suggestions;
