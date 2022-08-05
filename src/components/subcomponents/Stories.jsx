import React, { useEffect, useState } from "react";
import "./Stories.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase-config";

const BlogImage = ({ post }) => {
  return (
    <div>
      <img src={post.image} alt="images" className="stories-image" />
    </div>
  );
};

const Stories = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
    <>
      <div className="stories-container">
        <div className="stories-text">
          <h1 className="stories-title">Gallery</h1>
          <h3 className="stories subtitle">
            Moments that are unforgettable 📷. Have a look at the images.
          </h3>
          <button
            className="about-page-btn"
            onClick={() => navigate("/media/gallery")}
          >
            {" "}
            Go to Gallery
            <ArrowForwardIcon />
            <span className="about-btn-blur">
              Go to Gallery
              <ArrowForwardIcon />
            </span>
          </button>
        </div>
        <div className="carousel-container">
          <Slider {...settings}>
            {posts.slice(0, 4).map((item) => {
              return <BlogImage key={item.id} post={item.data()} />;
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Stories;
