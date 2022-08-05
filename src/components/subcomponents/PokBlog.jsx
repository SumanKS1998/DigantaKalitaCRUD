// single blog of pride of kamalpur page
import React from "react";
import Moment from "react-moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const PokBlog = ({ screenMode, id, blog, admin, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        !screenMode
          ? "pok-blog-container"
          : "pok-blog-container pok-blog-container-dark"
      }
      onClick={() => navigate(`/events/${id}`)}
    >
      <div
        className={
          !screenMode ? "pok-blog-top" : "pok-blog-top pok-blog-top-dark"
        }
      >
        <img src={blog?.image} alt="blog" className="pok-blog-image-top" />
        <div className="pok-blog-text-container">
          <h2 className="pok-blog-title-top">{blog?.title}</h2>
          <p className={!screenMode ? "date" : "date date-dark"}>
            <Moment fromNow>{blog?.timestamp?.toDate()}</Moment>
          </p>
          <p className="pok-blog-text">{blog?.text.substr(0, 100)}...</p>
          {!admin && (
            <button
              className="button-28"
              onClick={() => navigate(`/events/${id}`)}
            >
              Read more
            </button>
          )}
        </div>
      </div>
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
    </div>
  );
};

export default PokBlog;
