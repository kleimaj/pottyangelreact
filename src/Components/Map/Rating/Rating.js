import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

const Rating = (props) => {
    let stars = [] 
    if (props.rating) {
        for (let i = 0; i < parseInt(props.rating); i++) {
            stars.push(
                <FontAwesomeIcon key={i} icon={faStar} />
            )
        }
        let blank = 5 % parseInt(props.rating)
        if (blank) {
            // if not 5 stars
            for (let i = 0; i < blank; i++) {
                stars.push(
                    <FontAwesomeIcon key={blank - i} icon={faStar} className="star-blank" />
                )
            }
        }
    }
    else {
        stars = [
            <FontAwesomeIcon key={0} icon={faStar} />,
            <FontAwesomeIcon key={1} icon={faStar} />,
            <FontAwesomeIcon key={2} icon={faStar} />,
            <FontAwesomeIcon key={3} icon={faStar} className="star-blank"/>,
            <FontAwesomeIcon key={4} icon={faStar} className="star-blank" />
        ]
    }
    return (
        <div className="rating">
        {stars}
        </div>
    )
}

export default Rating;