import React, { useContext, useEffect } from "react";
import dpl from "./images/dkimg-day.png";
import dpd from "./images/dkimg-dark.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Home.css";
import { screenModeContext } from "../helper/Context";
import Blogs from "./subcomponents/Blogs";
import About from "./subcomponents/About";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Stories from "./subcomponents/Stories";
import { useInView } from "react-intersection-observer";

function Home() {
  const { screenMode } = useContext(screenModeContext);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ width: "100%" }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
      className="main-home-container"
    >
      {/* svg code */}
      <div className="bg">
        {screenMode ? (
          <svg
            width="100%"
            height="100vh"
            viewBox="0 0 100% 100vh"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1440 0H0V900H1440V0Z" fill="#161B22" />
            <path
              id="one"
              d="M1440 562.5C1336.48 547.65 1232.96 532.8 1139.2 488.4C1045.44 444.15 961.6 370.2 915.36 283.95C869.28 197.55 861.12 98.85 852.8 0H1440V562.5Z"
              fill="#112839"
            />
            <path
              id="two"
              d="M1440 492.15C1349.44 479.25 1258.88 466.2 1176.8 427.35C1094.72 388.65 1021.28 324 980.96 248.4C940.64 172.95 933.44 86.4 926.24 0H1440V492.15Z"
              fill="#004765"
            />
            <path
              id="three"
              d="M1440 421.95C1362.4 410.7 1284.64 399.6 1214.4 366.3C1144.16 333 1081.12 277.65 1046.56 213C1012 148.2 1005.76 74.1 999.68 0H1440V421.95Z"
              fill="#006888"
            />
            <path
              id="four"
              d="M1440 351.6C1375.36 342.3 1310.56 333 1252 305.25C1193.44 277.5 1140.96 231.45 1112.16 177.45C1083.36 123.45 1078.24 61.8 1072.96 0H1440V351.6Z"
              fill="#008B99"
            />
            <path
              id="six"
              d="M1440 281.25C1388.16 273.75 1336.48 266.4 1289.6 244.2C1242.72 222 1200.8 185.1 1177.76 141.9C1154.72 98.85 1150.56 49.35 1146.4 0H1440V281.25Z"
              fill="#00AF95"
            />
            <path
              id="seven"
              d="M1440 210.9C1401.12 205.35 1362.4 199.8 1327.2 183.15C1292 166.5 1260.64 138.9 1243.36 106.5C1225.92 74.1 1222.88 37.05 1219.84 0H1440V210.9Z"
              fill="#00D17B"
            />
            <path
              id="eight"
              d="M1440 140.7C1414.08 136.95 1388.16 133.2 1364.8 122.1C1341.44 111 1320.32 92.55 1308.8 70.95C1297.28 49.35 1295.2 24.75 1293.28 0H1440V140.7Z"
              fill="#00F146"
            />
            <path
              id="nine"
              d="M1440 70.35C1427.04 68.4 1414.08 66.6 1402.4 61.05C1390.72 55.5 1380.16 46.35 1374.4 35.55C1368.64 24.75 1367.68 12.3 1366.56 0H1440V70.35Z"
              fill="#22FF00"
            />
          </svg>
        ) : (
          <svg
            width="100%"
            height="100vh"
            viewBox="0 0 100% 100vh"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Frame">
              <path id="Vector" d="M1440 0H0V900H1440V0Z" fill="white" />
              <g id="Group">
                <path
                  id="eight"
                  d="M1440 586.5C1352.8 605.25 1265.44 623.85 1169.44 612.6C1073.28 601.2 968.32 559.95 919.84 487.65C871.52 415.35 879.52 312 859.04 225.6C838.56 139.2 789.76 69.6 740.8 0H1440V586.5Z"
                  fill="#FFF8F0"
                />
                <path
                  id="seven"
                  d="M1440 513.15C1363.68 529.5 1287.36 545.85 1203.2 535.95C1119.04 526.05 1027.36 489.9 984.96 426.6C942.56 363.45 949.6 273 931.68 197.4C913.76 121.8 871.04 60.9 828.16 0H1440V513.15Z"
                  fill="#FFE9D3"
                />
                <path
                  id="six"
                  d="M1440 439.95C1374.56 453.9 1309.12 467.85 1236.96 459.45C1164.96 450.9 1086.24 419.85 1049.92 365.7C1013.6 311.4 1019.68 234 1004.32 169.2C988.96 104.4 952.32 52.2 915.68 0H1440V439.95Z"
                  fill="#FFDAB7"
                />
                <path
                  id="five"
                  d="M1440 366.6C1385.44 378.3 1330.88 389.85 1270.88 382.8C1210.72 375.75 1145.28 349.95 1114.88 304.8C1084.64 259.5 1089.76 195 1076.96 141C1064.16 87 1033.6 43.5 1003.04 0H1440V366.6Z"
                  fill="#FFCC9A"
                />
                <path
                  id="four"
                  d="M1440 293.25C1396.32 302.55 1352.8 312 1304.64 306.3C1256.64 300.6 1204.16 279.9 1180 243.75C1155.68 207.6 1159.68 156 1149.6 112.8C1139.36 69.6 1114.88 34.8 1090.4 0H1440V293.25Z"
                  fill="#FFBD7E"
                />
                <path
                  id="three"
                  d="M1440 219.9C1407.2 226.95 1374.56 234 1338.56 229.65C1302.4 225.45 1263.2 210 1244.96 182.85C1226.72 155.7 1229.76 117 1222.08 84.6C1214.56 52.2 1196.16 26.1 1177.76 0H1440V219.9Z"
                  fill="#FFAF62"
                />
                <path
                  id="two"
                  d="M1440 146.7C1418.24 151.35 1396.32 156 1372.32 153.15C1348.32 150.3 1322.08 139.95 1309.92 121.95C1297.92 103.8 1299.84 78 1294.72 56.4C1289.6 34.8 1277.44 17.4 1265.28 0H1440V146.7Z"
                  fill="#FFA044"
                />
                <path
                  id="one"
                  d="M1440 73.35C1429.12 75.6 1418.24 78 1406.24 76.5C1394.08 75.15 1381.12 70.05 1375.04 60.9C1368.96 51.9 1369.92 39 1367.36 28.2C1364.8 17.4 1358.72 8.7 1352.64 0H1440V73.35Z"
                  fill="#FF9933"
                />
              </g>
            </g>
          </svg>
        )}
      </div>

      {/* home top page */}
      <div className="home-container">
        <div className="profile-image-container">
          <img
            src={!screenMode ? dpl : dpd}
            className="profile-img"
            alt="Diganta Kalita"
          />
        </div>
        <div className="intro-text">
          <h1 className="intro-title">Shri Diganta Kalita</h1>
          <h2 className="intro-subtitle">
            Member of the Assam Legislative Assembly
          </h2>
          <h2 className="intro-subtitle">Kamalpur constituency</h2>
          <div className="buttons">
            <button
              onClick={() => navigate("/suggestions")}
              className="about-btn"
            >
              Connect
            </button>
          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/DigantaKalita.Official/"
              target="blank"
            >
              <FacebookRoundedIcon style={{ fontSize: 50 }} className="fb" />
            </a>
            <a href="https://www.instagram.com/diganta4345/" target="blank">
              <InstagramIcon style={{ fontSize: 50 }} className="insta" />
            </a>
            <a href="https://mobile.twitter.com/diganta68" target="blank">
              <TwitterIcon style={{ fontSize: 50 }} className="twitter" />
            </a>
          </div>
        </div>
      </div>

      {/* recent or social frames i.e. twitter and facebook */}
      <div className="social-media">
        <div>
          <div className="twitter-tab">
            <h3>Twitter</h3>
          </div>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="diganta68"
            options={{ height: 400, width: 340 }}
            className="social-tab"
          />
        </div>
        <div>
        <div className="facebook-tab">
            <h3>Facebook</h3>
          </div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDigantaKalita.Official%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="400"
            className="social-tab"
            title="facebook"
          ></iframe>
        </div>
        <div className="social-text">
          <h1 className="social-title">Recent Events</h1>
          <h2 className="social-subtitle">Follow me on:</h2>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/DigantaKalita.Official/"
              target="blank"
            >
              <FacebookRoundedIcon
                style={{ fontSize: 30 }}
                className={!screenMode ? " fb" : "fb fb-dark"}
              />
            </a>
            <a href="https://www.instagram.com/diganta4345/" target="blank">
              <InstagramIcon
                style={{ fontSize: 30 }}
                className={!screenMode ? "insta" : "insta insta-dark"}
              />
            </a>
            <a href="https://mobile.twitter.com/diganta68" target="blank">
              <TwitterIcon
                style={{ fontSize: 30 }}
                className={!screenMode ? "twitter" : "twitter twitter-dark"}
              />
            </a>
          </div>
          <h2 className="social-subtitle">to get the recent updates.</h2>
        </div>
      </div>
      <About />
      <Blogs />
      <Stories />
    </motion.div>
  );
}

export default Home;
