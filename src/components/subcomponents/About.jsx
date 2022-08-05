import React, { useContext, useEffect } from "react";
import "./About.css";
import gridImage from "../images/grid-image.jpg";
import aboutImage from "../images/motivation.png";
import { screenModeContext } from "../../helper/Context";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

const About = () => {
  const { screenMode } = useContext(screenModeContext);
  const navigate = useNavigate();

  // for scroll animation
  const { ref, inView } = useInView();
  const animation = useAnimation();
 
  return (
    <>
      <div  className="about-container" id="About">
        <div  className="title-container">
          <h1 className="about-title">About</h1>
          <h2 className="title-english">Shri Diganta Kalita</h2>
          <h2 className="title-assamese">শ্ৰী দিগন্ত কলিতা</h2>
          <button
            className="about-page-btn"
            onClick={() => navigate("/suggestions")}
          >
            {" "}
            Reach Out
            <ArrowForwardIcon />
            <span className="about-btn-blur">
              Reach Out
              <ArrowForwardIcon />
            </span>
          </button>
        </div>
        <div  className="info-container">
          <div
            className={
              screenMode
                ? "about-circle-1"
                : "about-circle-1 about-circle-1-dark"
            }
          ></div>
          <div
            className={
              screenMode
                ? "about-circle-2"
                : "about-circle-2 about-circle-2-dark"
            }
          ></div>

          <div className="info-container-in">
            <img
              src={gridImage}
              alt="Diganta Kalita"
              className="profile-image"
            />
            <p className="info-name">শ্ৰী দিগন্ত কলিতা</p>
            <div className="about-icons">
              <a
                href="https://www.facebook.com/DigantaKalita.Official/"
                target="blank"
              >
                <FacebookRoundedIcon className="fb" sx={{fontSize:30}} />
              </a>
              <a href="https://mobile.twitter.com/diganta68" target="blank">
                <TwitterIcon className="twitter" sx={{fontSize:30}} />
              </a>
              <a href="https://www.instagram.com/diganta4345/" target="blank">
                <InstagramIcon className="insta" sx={{fontSize:30}} />
              </a>
            </div>
          </div>
          <div className="info-main">
            <span className="dash"></span>
            <h3>MLA, Kamalpur Constituency</h3>
            <p>
              I am a social worker and State Executive Member, Bharatiya Janata
              Party, Assam Pradesh
            </p>
          </div>
        </div>

        <div  className="about-grid-container">
          <div className="about-container-gradient"></div>
          <div className="main-container">
            <img
              src={aboutImage}
              alt="diganta kalita"
              className="about-image"
            />
            <div className="quotes-box">
              <h1 className="quotes">
                “Moving ahead with responsibility, motivation, and
                determination!”
              </h1>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
