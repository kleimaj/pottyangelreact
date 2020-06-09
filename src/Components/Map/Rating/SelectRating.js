import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, } from '@fortawesome/free-solid-svg-icons'

const Rating = (props) => {
    const [stars, setStars] = useState([]);

    const renderRating = (rating) => {
        let arr = [];
        for (let i = 0; i <= rating; i++) {
            arr.push(
                <FontAwesomeIcon key={i} icon={faStar}
                    onClick={() => renderRating(i)} />
            )
        }
        for (let i = rating; i < 4; i++) {
            arr.push(
                <FontAwesomeIcon key={i} icon={faStar} className="star-blank"
                    onClick={() => renderRating(i)} />
            )
        }
        setStars(arr);
        props.setRating(rating+1);
    }

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push(
                <FontAwesomeIcon key={i} icon={faStar} className="star-blank"
                    onClick={() => renderRating(i)} />
            )
        }
        setStars(arr);
    }, [])
    return (
        <div className="rating">
        {stars}
        </div>
    )
}

export default Rating;