import React, { useState, useEffect } from 'react';
import Potty from '../../api/Potty';
import Rating from '../Map/Rating/Rating';
import Comments from '../../Containers/Comments/Comments';

const PottyDetails = (props) => {
    const [potty, setPotty] = useState(null)

    const getPotty = async(id) => {
        const data = await Potty.PottyGet(id);
        console.log(data.data.potty)
        setPotty(data.data.potty.fields);
    }
    useEffect(() => {
        var pathArray = window.location.pathname.split('/');
        getPotty(pathArray[2]);
    }, [])

    return (
        <div className="potty">
            {potty ? (
            <>
                <h1>{potty.name}</h1>
                <a target="_blank" href=
                {"https://www.google.com/maps/search/?api=1&query="+
                // active.latitude+','+active.longitude}
                potty.address}>{potty.address}</a>
                <Rating rating={potty.rating}/>
                <Comments comments={potty.comments} user={props.user} loggedIn={props.loggedIn} />
            </>
            ):
            <h2>Loading</h2>
        }
        </div>
    );
}

export default PottyDetails;