import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import './Rating.css';

const Rating = (props) => {
    let stars = [] 
    if (props.rating) {
        let rating = parseInt(props.rating);
        for (let i = 0; i < rating; i++) {
            stars.push(
                // <img src="" />
                <img className="tp" src="/images/tpselected.svg" />
                // <FontAwesomeIcon key={i} icon={faStar}
                //     onClick={() => console.log(i, 'click')} />
            )
        }
        for (let i = rating; i <= 4; i++) {
            stars.push(
                <img className="tp" src="/images/tp.svg" />
                // <FontAwesomeIcon key={i+1} icon={faStar} className="star-blank"
                    // onClick={() => console.log(i, 'click')} />
            )
        }
    }
    else {
        stars = [
            <img className="tp" src="/images/tpselected.svg" />,
            <img className="tp" src="/images/tpselected.svg" />,
            <img className="tp" src="/images/tpselected.svg" />,
            <img className="tp" src="/images/tp.svg" />,
            <img className="tp" src="/images/tp.svg" />

            // <FontAwesomeIcon key={0} icon={faStar} />,
            // <FontAwesomeIcon key={1} icon={faStar} />,
            // <FontAwesomeIcon key={2} icon={faStar} />,
            // <FontAwesomeIcon key={3} icon={faStar} className="star-blank"/>,
            // <FontAwesomeIcon key={4} icon={faStar} className="star-blank" />
        ]
    }
    return (
        <div className="rating">
        {stars}
        </div>
    )
}

export default Rating;