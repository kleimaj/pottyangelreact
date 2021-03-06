import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, } from '@fortawesome/free-solid-svg-icons'

const Rating = (props) => {
    const [stars, setStars] = useState([]);

    const renderRating = (rating) => {
        // console.log(rating)
        let arr = [];
        let i = 0
        for (i = 0; i <= rating; i++) {
            arr.push(
                <img src="/images/tpselected.svg" 
                    role="button"
                    key={i}
                    className="tp"
                    // onClick={() => renderRating(i)} 
                    />
                // <FontAwesomeIcon key={i} icon={faStar}
                    // onClick={() => renderRating(i)} />
            )
        }
        for (i; i <= 4; i++) {
            arr.push(
                <img src="/images/tp.svg" 
                role="button"
                className="tp"
                key={i}
                // onClick={() => renderRating(i)} 
                />
                // <FontAwesomeIcon key={i+1} icon={faStar} className="star-blank"
                //     onClick={() => renderRating(i)} />
            )
        }
        setStars(arr);
        props.setRating(rating+1);
    }

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            // console.log(i)
            arr.push(
                <img src="/images/tp.svg" 
                role="button"
                className="tp"
                key={i}
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