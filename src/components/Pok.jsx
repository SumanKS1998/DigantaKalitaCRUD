import React, { useContext, useEffect, useRef, useState } from "react";
import image from "./images/blog-image.png";
import "./Pok.css";
import { screenModeContext } from "../helper/Context";
import { motion } from "framer-motion";
import PokBlog from "./subcomponents/PokBlog";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { deleteObject } from "@firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  startAfter,
  getDocs,
  limit,
  orderBy,
  query,
  deleteDoc,
} from "@firebase/firestore";
import { auth, db, storage } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 6;
const Pok = () => {
  const { screenMode } = useContext(screenModeContext);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogText, setBlogText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({});
  const [posts, setPosts] = useState([]);
  const [prevDocRef, setPrevDocRef] = useState();
  const [hasMoreData, setHasMoreData] = useState(true);

  // delete function
  const handleDelete = async (id) => {
    try {
      const desertRef = ref(storage, `blogs/${id}/image`);
      await deleteDoc(doc(db, "blogs", id));
      await deleteObject(desertRef);
      alert("Blog Deleted");
      window.location.reload();
    } catch (err) {
      alert(err.message);
      window.location.reload();
    }
  };
  // input functions to upload blog
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
  const postBlog = async () => {
    if (!blogText.trim() || !blogTitle.trim() || !selectedImage) {
      alert("Title, image or the text can't be empty");
      return;
    }
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "blogs"), {
      title: blogTitle,
      text: blogText,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `blogs/${docRef.id}/image`);
    if (selectedImage) {
      await uploadString(imageRef, selectedImage, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "blogs", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setSelectedImage(null);
    setBlogTitle("");
    setBlogText("");
    window.location.reload();
  };
  //---------------------
  // auth state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAdmin(currentUser);
    });
  }, [admin]);

  // getting the snapshot of db
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "blogs"),
      orderBy("timestamp", "desc"),
      limit(LIMIT)
    );
    getDocs(q)
      .then((snapData) => {
        const lastVisible = snapData.docs[snapData.docs.length - 1];
        setPrevDocRef(lastVisible);

        const data = [];
        snapData.forEach((doc) => data.push({ docId: doc.id, ...doc.data() }));

        //for handling 'All Tests' from filter
        if (snapData.docs.length < LIMIT) {
          setHasMoreData(false);
        } else {
          setHasMoreData(true);
        }

        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    setLoading(false);
  }, []);
  const fetchData = () => {
    if (prevDocRef) {
      const q = query(
        collection(db, "blogs"),
        orderBy("timestamp", "desc"),
        startAfter(prevDocRef),
        limit(LIMIT)
      );
      getDocs(q).then((snapData) => {
        const lastVisible = snapData.docs[snapData.docs.length - 1];
        setPrevDocRef(lastVisible);

        if (snapData.docs.length < LIMIT) {
          setHasMoreData(false);
        }

        const data = [];
        snapData.forEach((doc) => data.push({ docId: doc.id, ...doc.data() }));
        setPosts((prevState) => [...prevState, ...data]);
      });
    }
  };
  return (
    <motion.div
      initial={{ width: "100%" }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
    >
      {!posts.length ? (
        <>
          <div className="pok-main">
            <div className="pok-home-gradient"></div>

            <div className="pok-container">
              <div className="pok-home">
                <div className="pok-home-left">
                  <h1 className="pok-title">Events and blogs</h1>
                  <h3
                    className={
                      !screenMode
                        ? "pok-subtitle"
                        : "pok-subtitle pok-subtitle-dark"
                    }
                  >
                    Follow me on social media platforms for recent updates.
                  </h3>
                  <div className="social-icons pok-icons">
                    <a
                      href="https://www.facebook.com/DigantaKalita.Official/"
                      target="blank"
                    >
                      <FacebookRoundedIcon
                        style={{ fontSize: 30 }}
                        className="fb"
                      />
                    </a>
                    <a
                      href="https://mobile.twitter.com/diganta68"
                      target="blank"
                    >
                      <InstagramIcon
                        style={{ fontSize: 30 }}
                        className="insta"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/diganta4345/"
                      target="blank"
                    >
                      <TwitterIcon
                        style={{ fontSize: 30 }}
                        className="twitter"
                      />
                    </a>
                  </div>
                </div>

                <div className="pok-home-right">
                  <div className="pok-image-container">
                    <img src={image} alt="people" className="pok-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {admin && (
            <div className="blog-input">
              <h1 className="blog-input-heading">Add blog here</h1>
              <input
                type="text"
                placeholder="Type the title of the blog"
                className="blog-input-title"
                onChange={(e) => setBlogTitle(e.target.value)}
                value={blogTitle}
              />
              <textarea
                className="blog-input-content"
                cols="30"
                rows="10"
                placeholder="Type the blog content."
                onChange={(e) => setBlogText(e.target.value)}
                value={blogText}
              ></textarea>
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
                />
              </div>
              {selectedImage && (
                <div className="selected-image-container">
                  <CancelIcon
                    className="cancel-icon"
                    onClick={() => setSelectedImage(null)}
                  />
                  <img
                    src={selectedImage}
                    className="selected-image"
                    alt="blog input"
                  />
                </div>
              )}

              <button
                className={!loading ? "blog-post" : "blog-post uploading"}
                onClick={postBlog}
              >
                {loading ? (
                  <p>Uploading please wait...</p>
                ) : (
                  <p> Post the blog</p>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="pok-main">
            <div className="pok-home-gradient"></div>

            <div className="pok-container">
              <div className="pok-home">
                <div className="pok-home-left">
                  <h1 className="pok-title">Events and blogs</h1>
                  <h3
                    className={
                      !screenMode
                        ? "pok-subtitle"
                        : "pok-subtitle pok-subtitle-dark"
                    }
                  >
                    Follow me on social media platforms for recent updates.
                  </h3>
                  <div className="social-icons pok-icons">
                    <a
                      href="https://www.facebook.com/DigantaKalita.Official/"
                      target="blank"
                    >
                      <FacebookRoundedIcon
                        style={{ fontSize: 30 }}
                        className="fb"
                      />
                    </a>
                    <a
                      href="https://mobile.twitter.com/diganta68"
                      target="blank"
                    >
                      <InstagramIcon
                        style={{ fontSize: 30 }}
                        className="insta"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/diganta4345/"
                      target="blank"
                    >
                      <TwitterIcon
                        style={{ fontSize: 30 }}
                        className="twitter"
                      />
                    </a>
                  </div>
                </div>

                <div className="pok-home-right">
                  <div className="pok-image-container">
                    <img src={image} alt="people" className="pok-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {admin && (
            <div className="blog-input">
              <h1 className="blog-input-heading">Add blog here</h1>
              <input
                type="text"
                placeholder="Type the title of the blog"
                className="blog-input-title"
                onChange={(e) => setBlogTitle(e.target.value)}
                value={blogTitle}
              />
              <textarea
                className="blog-input-content"
                cols="30"
                rows="10"
                placeholder="Type the blog content."
                onChange={(e) => setBlogText(e.target.value)}
                value={blogText}
              ></textarea>
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
                />
              </div>
              {selectedImage && (
                <div className="selected-image-container">
                  <CancelIcon
                    className="cancel-icon"
                    onClick={() => setSelectedImage(null)}
                  />
                  <img
                    src={selectedImage}
                    className="selected-image"
                    alt="blog input"
                  />
                </div>
              )}

              <button
                className={!loading ? "blog-post" : "blog-post uploading"}
                onClick={postBlog}
              >
                {loading ? (
                  <p>Uploading please wait...</p>
                ) : (
                  <p> Post the blog</p>
                )}
              </button>
            </div>
          )}
          {loading && (
            <div className="single-blog-loading">
              <div className="mover"></div>
              <h2>Loading</h2>
            </div>
          )}
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMoreData}
            loader={
              <div className="single-blog-loading">
                <div className="mover"></div>
                <h2>Loading</h2>
              </div>
            }
            endMessage={
              <h2 style={{ textAlign: "center" }}>
                <b>No more items.</b>
              </h2>
            }
          >
            <div className="blog-posts">
              {posts?.map((item) => {
                return (
                  <PokBlog
                    screenMode={screenMode}
                    admin={admin}
                    key={item.id}
                    id={item.docId}
                    blog={item}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </>
      )}
    </motion.div>
  );
};
export default Pok;
