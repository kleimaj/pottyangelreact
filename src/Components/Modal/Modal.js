import React, { useState } from 'react';
import Rating from '../Map/Rating/SelectRating';
import './Modal.css';

const Modal = (props) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(null);
    return (
        <div className="modal">
            <form onSubmit={(e) => {
                e.preventDefault();
                if (name && rating) {
                    props.submitModal(name,rating);
                }
                //api call, return values to Home.js
            }}>
                <h2>Potty Name</h2>
                <input onChange={(e) => setName(e.target.value)}/>
                <h2>Rating</h2>
                <Rating setRating={setRating}/>
                <button>Create Potty</button>
            </form>
                <button onClick={() => props.setShow(false)}>Cancel</button>
        </div>
    );
}

export default Modal;