import React from "react";
import "../card/card.css";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
function Card({ username, title, desc, rating, time }) {
  return (
    <div className='card'>
      <div className='place'>
        <span>Place :</span>
        <h4 className='place'> {title}</h4>
      </div>
      <div className='review'>
        <span>Review :</span>
        <p>{desc}</p>
      </div>

      <div className='rating'>
        <span>Rating</span>
        <div className='stars'>
          {Array(rating).fill(<StarIcon style={{ color: "gold" }} />)}
          {/* <StarIcon style={{ color: "gold" }} />
          <StarIcon style={{ color: "gold" }} />
          <StarIcon style={{ color: "gold" }} />
          <StarIcon style={{ color: "gold" }} />
          <StarIcon style={{ color: "gold" }} /> */}
        </div>
      </div>
      <div className='information'>
        <span>Information :</span>
        <span className='username'>
          Created by <b> {username}</b>
        </span>
        <span className='date'>{format(time)}</span>
      </div>
    </div>
  );
}

export default Card;
