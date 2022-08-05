import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import AddLinkIcon from "@mui/icons-material/AddLink";
import "./Videos.css";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
} from "firebase/firestore";

const LIMIT = 6;
const Videos = () => {
  const [admin, setAdmin] = useState({});
  const [link, setLink] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prevDocRef, setPrevDocRef] = useState();
  const [hasMoreData, setHasMoreData] = useState(true);
  // auth state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAdmin(currentUser);
    });
  }, [admin]);
  const uploadLink = async () => {
    if (!link.trim()) {
      alert("Please add a link");
      return;
    }
    setIsLoading(true);
    await addDoc(collection(db, "videos"), {
      link: link,
      timestamp: serverTimestamp(),
    });
    setIsLoading(false);
    setLink("");
    window.location.reload();
  };
  useEffect(() => {
    setIsLoading(true);
    const q = query(
      collection(db, "videos"),
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
    setIsLoading(false);
  }, []);
  console.log(posts);
  const fetchData = () => {
    if (prevDocRef) {
      const q = query(
        collection(db, "videos"),
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
    <div className="video-container">
      <h1 className="gallery-title">Videos🎥</h1>
      <p className="gallery-subtitle">Videos from different events.</p>
      {admin && (
        <div className="admin-email videos-input">
          <input
            disabled={isLoading}
            type="email"
            className="email"
            placeholder="Enter iframe link"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
          <AddLinkIcon className="admin-email-icon" />
          <button
            disabled={isLoading}
            className="button-74 video-btn"
            onClick={uploadLink}
          >
            {isLoading ? "Wait" : "Post"}
          </button>
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
        <div className="video-posts">
          {posts?.map((item) => {
            return (
              <div className="iframe-videos">
                <iframe
                  id="player"
                  type="text/html"
                  width="340"
                  height="200"
                  src={item.link}
                  frameborder="0"
                  style={{ borderRadius: "10px" }}
                ></iframe>
                {admin && (
                  <button
                    className="iframe-btn"
                    onClick={async () => {
                      await deleteDoc(doc(db, "videos", item.docId));
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Videos;
