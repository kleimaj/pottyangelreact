import React from 'react';
import Rating from '../../Components/Map/Rating/Rating';

const Comment = (props) => {
    return (
        <>
        <div className="comment">
            <div className="border">
            <h3>{props.comment.title}</h3>
            <Rating rating={props.comment.rating}/>
            <p>{props.comment.body}</p>
            </div>
            <p className="author">By {props.comment.author} 👼</p>

        </div>
        
        </>
    )
}

export default Comment;