import React, { useEffect, useRef, useState } from "react";
import "./Gallery.css";
import { motion } from "framer-motion";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase-config";
import cancelImg from "./images/cancel.png";
import { onAuthStateChanged } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Family.css";
const BlogImage = ({ post, setModal, setImageId, admin, id, handleDelete }) => {
  return (
    <div
      className="image-box"
      style={{ position: "relative" }}
      onClick={() => {
        setModal(true);
        setImageId(post.image);
      }}
    >
      {" "}
      {admin && (
        <DeleteIcon
          className="delete-icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
          color='error'
        />
      )}
      <img src={post.image} alt="galleryImage" className="gallery-image" />
    </div>
  );
};
const Family = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  const [isloading, setisLoading] = useState(false);
  // getting the blogs
  const [posts, setPosts] = useState([]);
  // modal state
  const [modal, setModal] = useState(false);
  const [imageId, setImageId] = useState("");
  const [admin, setAdmin] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const handleDelete = async (id) => {
    try {
      const desertRef = ref(storage, `family/${id}/image`);
      await deleteObject(desertRef);
      await deleteDoc(doc(db, "family", id));
      alert("Image Deleted");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    setLoading(true);
    onSnapshot(
      query(collection(db, "family"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
        setLoading(false);
      }
    );
    console.log("posts", posts);
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAdmin(currentUser);
    });
  }, [admin]);
  const filePickerRef = useRef();
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };
  const postImage = async () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }
    setisLoading(true);

    const docRef = await addDoc(collection(db, "family"), {
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `family/${docRef.id}/image`);
    if (selectedImage) {
      await uploadString(imageRef, selectedImage, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "family", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setisLoading(false);
    setSelectedImage(null);
    alert("Image uploaded successfully!");
  };
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
        <h1 className="gallery-title">Family 👨‍👩‍👧‍👦</h1>
        <p className="family-subtitle">
          Photos and videos of Diganta Kalita and family.
        </p>
        {loading && <div class="mover"></div>}
        {admin && (
          <div className="family-upload">
            <div
              className="icon"
              title="Select an image"
              onClick={() => filePickerRef.current.click()}
            >
              <AddPhotoAlternateIcon style={{ fontSize: 40 }} />
              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={addImageToPost}
                disabled={isloading}
              />
            </div>
            <button
              className="button-74"
              disabled={isloading}
              onClick={postImage}
            >
              {isloading ? "Please wait" : "Post Image"}
            </button>

            {selectedImage && (
              <div className="selected-image-container family-cont">
                <CancelIcon
                  className="cancel-icon"
                  onClick={() => setSelectedImage(null)}
                />
                <img
                  src={selectedImage}
                  className="selected-image cont"
                  alt="blog input"
                />
              </div>
            )}
          </div>
        )}

        <div className="container">
          <div className="image-container">
            {posts.map((item) => {
              return (
                <BlogImage
                  key={item.id}
                  setModal={setModal}
                  setImageId={setImageId}
                  post={item.data()}
                  id={item.id}
                  admin={admin}
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Family;
