import React from 'react';
import Rating from '../../Components/Map/Rating/Rating';

const Comment = (props) => {
    return (
        <div className="comment">
            <h3>{props.comment.title}</h3>
            <Rating rating={props.comment.rating}/>
            <p>By {props.comment.author}</p>
            <p>{props.comment.body}</p>
        </div>
    )
}

export default Comment;