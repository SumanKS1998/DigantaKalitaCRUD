import React, { useEffect, useState } from "react";
import "./Gallery.css";
import { motion } from "framer-motion";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";
import cancelImg from "./images/cancel.png";
const BlogImage = ({ post, setModal, setImageId }) => {
  return (
    <div
      className="image-box"
      onClick={() => {
        setModal(true);
        setImageId(post.image);
      }}
    >
      <img src={post.image} alt="galleryImage" className="gallery-image" />
       
    </div>
  );
};
const Gallery = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  // getting the blogs
  const [posts, setPosts] = useState([]);
  // modal state
  const [modal, setModal] = useState(false);
  const [imageId, setImageId] = useState("");
  useEffect(() => {
    setLoading(true);
    onSnapshot(
      query(collection(db, "blogs"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
        setLoading(false);
      }
    );
  }, []);

  return (
    <>
      {modal && (
        <div className="modal" onClick={() => setModal(false)}>
          <img
            src={imageId}
            alt="galleryImage"
            className="modal-image"
            onClick={() => setModal(false)}
          />
          <img src={cancelImg} alt="icon" className="cancel-image" />
        </div>
      )}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
      >
        <h1 className="gallery-title">Events 📷</h1>
        <p className="gallery-subtitle">Photos from different events.</p>
        {loading && <div class="mover"></div>}
        <div className="container">
          <div className="image-container">
            {posts.map((item) => {
              return (
                <BlogImage
                  key={item.id}
                  setModal={setModal}
                  setImageId={setImageId}
                  post={item.data()}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Gallery;
