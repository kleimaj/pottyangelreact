import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import Rating from '../../Components/Map/Rating/SelectRating';
import Potty from '../../api/Potty';

const Comments = (props) => {
    const [comments, setComments] = useState(props.comments || [])
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(null)

    const updatePotty = async(req) => {
        const data = await Potty.PottyUpdate(props.id, req);
        console.log(data);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating && title && body) {
            const req = {
                author: props.user,
                title: title,
                body: body,
                rating: rating
            };
            console.log(req)
            setComments((current) => [
                ...current,
                req
            ])
            updatePotty(req)
        }
    }

    return (
        <>
        <div className="comment-container">
            {comments.map((comment, idx) => 
        <Comment comment={comment} key={idx}/>)}
        </div>
        {props.loggedIn ? (
            <form>
                <h4>Leave a Review</h4>
                <Rating setRating={setRating}/>
                <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} required/>
                <textarea type="text" placeholder="body" onChange={(e) => setBody(e.target.value)} required/>
                <button onClick={handleSubmit}>Post Comment</button>
            </form>
        ): null}
        </>
    )
}

export default Comments;