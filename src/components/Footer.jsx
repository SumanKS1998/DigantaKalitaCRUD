import React, { useContext, useState, useEffect } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { screenModeContext } from "../helper/Context";
import "./Footer.css";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
const FooterPost = ({ post,id }) => {
  const navigate = useNavigate();
  return (
    <p
      style={{ cursor: "pointer",margin:'10px 0' }}
      onClick={() => navigate(`/events/${id}`)}
    >
      {post.title}
    </p>
  );
};

const Footer = () => {
  const { screenMode } = useContext(screenModeContext);
  const [recentPost, setRecentPost] = useState([]);

  // to get the posts
  useEffect(() => {
    onSnapshot(
      query(collection(db, "blogs"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setRecentPost(snapshot.docs);
      }
    );
  }, []);
  return (
    <div className="footer">
      <div className="b2t" onClick={() => window.scrollTo({ top: "0px" })}>
        <h2>Back to top</h2>
      </div>
      <div className="footer-main">
        <div className="footer-info">
          <h3>Shri Diganta Kalita</h3>
          <p style={{margin:'10px 0'}}>
            MLA, Kamalpur Constituency Social worker and State Executive Member
            Bharatiya Janata Party, Assam Pradesh
          </p>
        </div>
        <div className="footer-recent">
          <h3>Recent Post</h3>
          {recentPost.slice(0, 3).map((item) => {
            return <FooterPost key={item.id} post={item.data()} id={item.id} />;
          })}
        </div>
        <div className="footer-contact">
          <h3>Contact center</h3>
          <p style={{margin:'10px 0'}}>
            Vill/po- Baihata Near Gate saikia Hospital Ps- kamalpur Dist -
            kamrup Pin-781380
          </p >
          <p style={{margin:'10px 0'}}>Vill- singra Po- Hinguli, Ps- Kamalpur Dist- kamrup Pin- 781380</p>
          <div className="social-icons-footer">
            <a
              href="https://www.facebook.com/DigantaKalita.Official/"
              target="blank"
            >
              <FacebookRoundedIcon
                className={!screenMode ? "footer-icons" : "footer-icons-dark"}
              />
            </a>
            <a href="https://mobile.twitter.com/diganta68" target="blank">
              <TwitterIcon
                className={!screenMode ? "footer-icons" : "footer-icons-dark"}
              />
            </a>
            <a href="https://www.instagram.com/diganta4345/" target="blank">
              <InstagramIcon
                className={!screenMode ? "footer-icons" : "footer-icons-dark"}
              />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-rights">
        <p>
          ©{new Date().getFullYear()} Diganta Kalita. All Rights Reserved.
          Powered by{" "}
          <a
            href="https://www.techdigions.com/"
            style={{ textDecoration: "none", color: "#00a29a" }}
          >
            {" "}
            Techdigion.{" "}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
