import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getProfiles} from "../../actions/profile"
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem"


const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(()=>{
        getProfiles();
    },[getProfiles])
    return (
        <Fragment>
            {loading ? (<Spinner/>) : (<Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
            <i className="fab fa-connectdevelop"/>{"  "}Browse and connect with the developers
                </p>
                <div>
                  {profiles.length > 0 ? (profiles.map(profile=>(
                      <ProfileItem key={profile._id} profile={profile}/>
                  ))):<h4>No Profile Found...</h4> }
                </div>
                

                </Fragment>)}
        </Fragment>
    )
}

Profiles.propTypes = {
getProfiles:PropTypes.func.isRequired,
profile:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile:state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);
