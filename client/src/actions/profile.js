import axios from "axios";
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES} from "./types";
import {setAlert} from "./alert";


// GET CURRENT USER PROFILE
export const getCurrentProfile = ()=>async dispatch=>{
    try {
        const res = await axios.get("/api/profile/me")
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

//GET ALL PROFILE

export const getProfiles = () => async dispatch =>{
    dispatch({type:CLEAR_PROFILE});
    try {
        const res = await axios.get("/api/profile")
        dispatch({
            type:GET_PROFILES,
            payload:res.data,
        })
    } catch (error) {
         dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// GET PROFILE BY USERID

export const getProfileById = userId => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data,
        })
    } catch (error) {
         dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// CREATE OR EDIT PROFILE

export const createProfile = (formData, history, edit=false)=> async dispatch=>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const res = await axios.post("/api/profile", formData, config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
        if(!edit){
            history.push("/dashboard");
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg, "danger")))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
        
    }
}

// ADD EXPERIENCE

export const addExperience = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }

        const res = await axios.put("/api/profile/experience", formData, config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert("Experience Added", "success"));
        history.push("/dashboard");
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg, "danger")))
        }
        dispatch({
            type:PROFILE_ERROR,
            paylaod:{msg:error.response.statusText, status:error.response.status}
        })
        
    }
}

// ADD EDUCATION

export const addEducation = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        const res = await axios.put("/api/profile/education", formData, config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert("Education Added", "success"))
        history.push("/dashboard")
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg, "danger")))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

//DELETE EXPERIENCE

export const deleteExperience = (id) =>async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data,
        })
        dispatch(setAlert("Experience Removed", "success"))
    } catch (error) {
         dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

//DELETE EDUCATION

export const deleteEducation = (id) =>async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data,
        })
        dispatch(setAlert("Education Removed","success"))
    } catch (error) {
         dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
    }
}

// DELETE ACCOUNT

export const deleteAccount = ()=> async dispatch =>{
    if(window.confirm("Are you sure? This can NOT be updone!")){
try {
        await axios.delete("/api/profile")
        dispatch({type:CLEAR_PROFILE})
        dispatch({type:ACCOUNT_DELETED})
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText, status:error.response.status}
        })
        
    }
    }
    
}


