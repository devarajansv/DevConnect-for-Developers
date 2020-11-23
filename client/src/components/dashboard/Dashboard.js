import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getCurrentProfile, deleteAccount} from "../../actions/profile";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions"
import AddExperience from "./AddExperience"
import AddEducation from "./AddEducation"



const Dashboard = ({auth:{user}, profile:{profile, loading}, getCurrentProfile, deleteAccount}) => {
   useEffect(()=>{
       getCurrentProfile()
   },[getCurrentProfile]);

   return profile && loading === null ? <Spinner/> : <Fragment>
       <h1 className="large text-primary">Dashboard</h1>  
       <p className="lead"><i className="fas fa-user"/>Welcome {user && user.name}</p>
       {profile !== null ? 
       <Fragment>
           <DashboardActions/>
           <AddExperience experience = {profile.experience}/>
           <AddEducation education = {profile.education}/>
           <div className="my-2" >
               <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                   <i className="fas fa-user-minus"/>{"  "}
                   Delete My Account
               </button>
           </div>
       </Fragment> : 
       <Fragment>
           <p>You have not yet setup your profile, please add some info</p>
           <Link to="/create-profile" className="btn btn-primary my-1">
               Create Profile
           </Link>
       </Fragment>} 
   </Fragment>
   
}

Dashboard.propTypes = {
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,

}

const mapStateToProps = state =>({
auth:state.auth,
profile:state.profile

})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
