import { doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase-config";
import moment from "moment";
import './SingleBlog.css'
const SingleBlog = () => {
  const { id } = useParams();
  const [dataObject, setDataObject] = useState();
  useEffect(() => {
    getDoc(doc(db, "blogs", id)).then((snap) => {
      setDataObject(snap.data());
    });
  }, []);
  return (
    <div className="single-bog-container">
      {!dataObject && (
        <div className="single-blog-loading">
          <div className="mover"></div>
          <h2>Loading</h2>
        </div>
      )}
      {dataObject && (
        <div className="single-blog">
          <h1 className="single-blog-title">{dataObject.title}</h1>
          <p className="single-blog-time">
            {moment(dataObject.timestamp.seconds * 1000).format("DD MMMM YYYY")}
          </p>
          <hr className="single-blog-hr"/>
          <div className="single-blog-image-container">
          <img src={dataObject.image} className='single-blog-image' alt={dataObject.title} />
          </div>
          <p className="single-blog-text">{dataObject.text}</p>
        </div>
       
      )}
    </div>
  );
};

export default SingleBlog;
