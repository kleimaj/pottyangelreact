import React, { useState } from 'react';
import Rating from '../Map/Rating/SelectRating';
import './Modal.css';

const Modal = (props) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && rating) {
            props.submitModal(name,rating);
        }
    }
    return (
        <div className="modal">
            <form>
                <h2>Potty Name</h2>
                <input onChange={(e) => setName(e.target.value)}/>
                <h2>Rating</h2>
                <Rating setRating={setRating}/>
            </form>
            <div className="modal-button-group">
                <button onClick={handleSubmit}>Create Potty</button>
                <button onClick={() => props.setShow(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default Modal;