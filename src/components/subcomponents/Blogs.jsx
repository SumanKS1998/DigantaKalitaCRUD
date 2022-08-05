import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import "./Blogs.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase-config";
const Blogs = () => {
  const navigate = useNavigate();
 

  // getting the blogs
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "blogs"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);
  return (
    < >
      <div  className="blogs-container">
        <div className="blogs">
          {posts.slice(0, 2).map((item) => {
            return <Blog id={item.id} key={item.id} blog={item.data()} />;
          })}
        </div>
        <div className="blogs-title">
          <h1>Events and Blogs</h1>
          <h2 className="blogs-subtitle">
            {" "}
            Have a look at the events and daily blogs.{" "}
          </h2>
          <button
            className="about-page-btn"
            onClick={() => navigate("/events")}
          >
            {" "}
            Go to Blogs
            <ArrowForwardIcon />
            <span className="about-btn-blur">
              Go to Blogs
              <ArrowForwardIcon />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Blogs;
