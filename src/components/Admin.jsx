import React, { useContext, useState, useRef, useEffect } from "react";
import "./Admin.css";
import formImage from "./images/form-bg.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { screenModeContext } from "../helper/Context";
import { motion } from "framer-motion";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
function Admin() {
  const [visible, setVisible] = useState(false);
  const { screenMode } = useContext(screenModeContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [admin, setAdmin] = useState({});
  const [isLoading,setIsLoading]=useState(false)
  // sending inputs/credentials to firebase
  const login = async () => {
    try {
      if(!email.trim()){
        return alert("Email can't be empty")
      }
      if(!pass.trim()){
        return alert("Password can't be empty")
      }
      setIsLoading(true)
      const user = await signInWithEmailAndPassword(auth, email, pass);
      // console.log(user)
      setIsLoading(false)
      setEmail('')
      setPass('')
      alert('Admin logged in successfully!')
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      alert('Wrong email/password.')
    }
  };
  const logout = async () => {
    setIsLoading(true)
    await signOut(auth);
    setIsLoading(false)
  };
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => {
      setAdmin(currentUser);
    });
  },[admin])
 
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
      className={!screenMode ? "admin" : "admin admin-dark"}
    >
      <div className="admin-form-container">
        <div className="admin-form-image-container">
          <img src={formImage} alt="collage" className="admin-form-image" />
        </div>
        <div
          className={!screenMode ? "admin-form" : "admin-form admin-form-dark"}
        >
          <h2 className="admin-form-title"> Admin Login</h2>
          <p className="admin-form-subtitle">
            {" "}
            Hey, Enter your details to get sign in to your account
          </p>
          <div className="admin-email">
            <input
              disabled={admin}
              type="email"
              className="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
            <EmailIcon className="admin-email-icon" />
          </div>
          <div className="admin-pass">
            <input
              disabled={admin}
              type={visible ? "text" : "password"}
              className="password"
              placeholder="Enter your password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <LockIcon className="admin-pass-icon" />
            {visible ? (
              <VisibilityOffIcon
                onClick={() => setVisible(false)}
                className="visibility-icon"
              />
            ) : (
              <VisibilityIcon
                onClick={() => setVisible(true)}
                className="visibility-icon"
              />
            )}
          </div>
          {admin ? (
            <button className="logout-btn" onClick={logout}>
             {isLoading ?<p>Please wait...</p>:<p>LOGOUT</p>}
            </button>
          ) : (
            <button className="login-btn" onClick={login}>
              {isLoading ?<p>Please wait...</p>:<p>LOGIN</p>}
              
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Admin;
