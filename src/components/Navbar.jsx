import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { screenModeContext } from "../helper/Context";
import logo from "./images/logo.png";
import "./Navbar.css";
const Navbar = () => {
  const { screenMode, setScreenMode } = useContext(screenModeContext);

  // to get the scroll postion for the sticky navbar to change color
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showToggle, setShowtoggle] = useState(false);
  const [admin, setAdmin] = useState({});
  const [showSub, setshowSub] = useState(false);

  window.addEventListener("scroll", () => {
    setScrollPosition(window.scrollY);
  });
  //
  const navigate = useNavigate();
  // logouot function
  const logout = async () => {
    setshowSub(false);
    await signOut(auth);
    alert("logged out successfully!");
  };
  // to persist the auth state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAdmin(currentUser);
    });
  }, [admin]);

  return (
    <div className={scrollPosition ? "navbar hover" : "navbar"}>
      <div
        className="logo"
        onClick={() => {
          navigate("/");
          setShowtoggle(false);
          setshowSub(false);
        }}
        style={{ cursor: "pointer" }}
      >
        <img className="logo-img" src={logo} alt="logo" />
        <h2 className="logo-name">Diganta Kalita</h2>
      </div>
      <div
        title={!screenMode ? "Switch to dark mode" : "Switch to light mode"}
        className={
          !screenMode
            ? "switch-container"
            : "switch-container switch-container-dark"
        }
        onClick={() => {
          setScreenMode((prev) => !prev);
          setshowSub(false);
        }}
      >
        <div className={!screenMode ? "switch" : "switch switch-dark"}></div>
      </div>
      <button
        aria-controls="primary-nav"
        aria-expanded="false"
        className="mobile-nav-toggle"
        onClick={() => {
          setshowSub(false);
          setShowtoggle((prev) => !prev);
        }}
      >
        <span
          className={showToggle ? "sr-only1-clicked sr-only" : "sr-only"}
        ></span>
        <span
          className={showToggle ? "sr-only2-clicked sr-only" : "sr-only"}
        ></span>
        <span
          className={showToggle ? "sr-only3-clicked sr-only" : "sr-only"}
        ></span>
      </button>
      <nav className="nav-container">
        <ul
          id="primary-nav"
          className={!showToggle ? "nav-list" : "nav-list nav-list-show"}
        >
          <li
            className="nav-links"
            onClick={() => {
              navigate("/");
              setShowtoggle((prev) => !prev);
              setshowSub(false);
            }}
            aria-hidden="true"
          >
            Home
          </li>
          <li
            className="nav-links"
            onClick={() => {
              navigate("/events");
              setShowtoggle((prev) => !prev);
              setshowSub(false);
            }}
            aria-hidden="true"
          >
            Events
          </li>
          <li
            className="nav-links media-link"
            onClick={() => {
              setshowSub((prev) => !prev);
            }}
            aria-hidden="true"
          >
            Media
            {showSub && (
              <div className="nav-sublink">
                <li
                className='sublink'
                  onClick={() => {
                    setShowtoggle((prev) => !prev);
                    navigate("/media/family");
                  }}
                >
                  Family
                </li>
                <li
                className='sublink'
                  onClick={() => {
                    setShowtoggle((prev) => !prev);
                    navigate("/media/gallery");
                  }}
                >
                  Event Photos
                </li>
                <li
                className='sublink'
                  onClick={() => {
                    setShowtoggle((prev) => !prev);
                    navigate("/media/videos");
                  }}
                >
                  Videos
                </li>
              </div>
            )}
          </li>

          <li
            className="nav-links"
            onClick={() => {
              navigate("/suggestions");
              setShowtoggle((prev) => !prev);
              setshowSub(false);
            }}
            aria-hidden="true"
          >
            Suggestions
          </li>
          <li
            className="nav-links"
            onClick={() => {
              navigate("/adminLogin");
              setShowtoggle((prev) => !prev);
              setshowSub(false);
            }}
            aria-hidden="true"
          >
            Admin
          </li>
          {admin && (
            <li className="nav-links" onClick={logout} aria-hidden="true">
              Logout
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
