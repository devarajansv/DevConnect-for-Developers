import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from "react-router-dom"
import { addExperience } from '../../actions/profile'
import {connect} from "react-redux"

const AddExperience = ({addExperience, history}) => {
    const [formData, setFormData] = useState({
        company:"",
        title:"",
        location:"",
        from:"",
        to:"",
        current:false,
        description:""
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {company, title, location, from, to, current, description} = formData;

    const onChange = e=>setFormData({...formData, [e.target.name] : e.target.value})

    const onSubmit = e=>{
        e.preventDefault();
        addExperience(formData, history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Add An Experience</h1>
            <small>* = Required Field</small>
            <p className="lead">
                <i className="fas fa-code-brange"/> Add any developer/programming positions that you have had in the past
            </p>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input type="text" 
                    placeholder="* Job Title" 
                    name="title" 
                    value={title} 
                    onChange={e=>onChange(e)}
                    required></input>
                </div>
                 <div className="form-group">
                    <input type="text" 
                    placeholder="* Company" 
                    name="company" 
                    value={company} 
                    onChange={e=>onChange(e)}
                    required></input>
                </div>
                 <div className="form-group">
                    <input type="text" 
                    placeholder="Location" 
                    name="location"
                    value={location} 
                    onChange={e=>onChange(e)}></input>
                </div>
                <div className="form-group">
                     <h3>From Date</h3>
                    <input type="date" name="from" 
                    value={from}
                    onChange={e=>onChange(e)}
                    required></input>
                </div>
                 <div className="form-group">
                     <p><input type="checkbox" 
                     name="current" 
                     value={current}
                     onChange ={e=>{
                         setFormData({...formData, current:!current}); 
                         toggleDisabled(!toDateDisabled)
                     }}></input>{" "}Current Job</p>
                </div>
                <div className="form-group">
                     <h3>To Date</h3>
                    <input type="date" 
                    name="to"
                    value={to}
                    onChange={e=>onChange(e)}
                    disabled={toDateDisabled ? "disabled" : ""}></input>
                </div>
                <div className="form-group">
                    <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description}
                    onChange={e=>onChange(e)}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1"></input>
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>

                
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
addExperience:PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(withRouter(AddExperience))
