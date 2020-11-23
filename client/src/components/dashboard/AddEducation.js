import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import {deleteEducation} from "../../actions/profile";
import {connect} from "react-redux";



const AddEducation = ({education, deleteEducation}) => {
    const educations = education.map(edu=>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td className="hide-sm"><Moment format="YYYY/DD/MM">{edu.from}</Moment>
                 - {edu.to === null ? (" Now"):(<Moment format="YYYY/DD/MM">{edu.to}</Moment>)}
            </td>
            <td>
                <button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education Details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>

            </table>
            
        </Fragment>
    )
}

AddEducation.propTypes = {
education:PropTypes.array.isRequired,
deleteEducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(AddEducation)

