import React, { useState } from 'react';
import '../styles/screens/Contact.css';
import axios from "axios";


const JoinUs = () => {


  const [formData, setFormData] = useState({
    contactTopic: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    License: '',
    contactMessage: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //alert("Submitted!")
      axios.post("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/contact", {
        formData
      })
    }
    catch (e) {
      console.log(e);
    }
    const validationErrors = {}
    //   if(!formData.contactTopic.trim()) {
    //     validationErrors.contactTopic = "Topic is required"
    // }
    if (!formData.contactName.trim()) {
      validationErrors.contactName = "Name is required"
    }

    if (!formData.contactEmail.trim()) {
      validationErrors.contactEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      validationErrors.contactEmail = "Email is not valid"
    }

    if (!formData.contactPhone.trim()) {
      validationErrors.contactPhone = "Phone is required"
    } else if (formData.contactPhone.length < 10) {
      validationErrors.contactPhone = "Phone should be at least 10 digits"
    }
    if (!formData.License.trim()) {
      validationErrors.contactPhone = "Phone is required"
    } else if (formData.contactPhone.length < 10) {
      validationErrors.contactPhone = "Phone should be at least 10 digits"
    }

    if (!formData.contactMessage.trim()) {
      if (formData.contactMessage.length > 10) {
      validationErrors.contactMessage = "Max length is 20 characters"
    }
  }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully")
      window.location.href = 'https://e-react-frontend-55dbf7a5897e.herokuapp.com/';
    }


  }

  return (
    <div className='contact-container'>
      <div className='row'>
        <div className='col-12 text-center'>
          <div class='contact-heading-one'><h1>Join Us Today!</h1></div>
          <div class='contact-heading-three'><h3>Let's build smart healthcare together.</h3></div>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="contactName"
                placeholder='Contact Name'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.contactName && <span class='spancolor' >{errors.contactName}</span>}
            </div>
            <div>
              <input
                type="email"
                name="contactEmail"
                placeholder='Contact Email'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.contactEmail && <span class='spancolor'>{errors.contactEmail}</span>}
            </div>
            <div>
              <input
                type="text"
                name="contactPhone"
                placeholder='Contact Phone'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.contactPhone && <span class='spancolor'>{errors.contactPhone}</span>}
            </div>
            <div>
              <input
                type="text"
                name="License"
                placeholder='License Number'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.contactPhone && <span class='spancolor'>{errors.contactPhone}</span>}
            </div>

            <div>
              <textarea
                name="contactMessage"
                className='form-control formInput'
                placeholder='Note (Optional)'
                autoComplete='off'
                rows="6"
                onChange={handleChange}
              />
              {errors.contactMessage && <span class='spancolor'>{errors.contactMessage}</span>}
            </div>
            <button className='submit-btn' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
