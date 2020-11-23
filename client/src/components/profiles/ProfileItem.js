import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const ProfileItem = ({profile:{
    user:{_id, name, avatar},
    company, 
    status,
    skills
}}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} className="round-img" alt=""/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <div>
                <ul>
                   {skills.slice(0, 4).map((skill, index)=>(
                       <li key={index} className="text-primary">
                            <i className="fas fa-check"/>{skill}
                       </li>
                ))}
                </ul> 
               
            </div>
            
        </div>
    )
}

ProfileItem.propTypes = {
 profile:PropTypes.object.isRequired,
}

export default ProfileItem