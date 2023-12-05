import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';

import FormLabel from '@mui/material/FormLabel';
import backgroundImage from '../styles/screens/reviews.svg'; // Import your image
import { Box, TextareaAutosize, Typography } from '@mui/material';
import { Button } from 'antd';
 // so yes
function TestimonialForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
 
  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };
 
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
 
  const  handleSubmit = async (e) => {
    e.preventDefault();
    if (rating > 0 && review.trim() !== '') {
   var loginDetails = JSON.parse( localStorage.getItem("loginData")) 
        // Create a testimonial object
      const testimonial = {
        userId: loginDetails.id, // You can replace this with the actual user
        rating,
        review,
      };
 
      // Pass the testimonial to the parent component for submission
      debugger
      let response = await fetch(`http://localhost:8080/addReview`, {
       method: "POST", 
        body: JSON.stringify(testimonial),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
              }
              
              )
      // Reset the form
   
      if(response.ok){
        let formmattedResponse = await response.json();
      console.log(formmattedResponse)
        console.log("Success")
    
    
      setRating(0);
      setReview('');
    
     return
    
    }else{
      console.log("Unable to submit Review")
    }
  };

  }
 
  const formStyles = {
    // backgroundImage: `url(${backgroundImage})`,
    // backgroundSize: 'cover', // Use 'contain' or 'auto' to display the full image
    // backgroundRepeat: 'no-repeat',
    // backgroundAttachment: 'fixed',
    // backgroundColor: '#f9f9f9',
    minHeight: '600px',
    with:"100%",
    height:"100%",
    paddingBottom: '500px', // You can adjust the value to push the footer down
  };
 
  const textareaStyles = {
    width: '50%',
    minHeight: '200px', // Set the desired height for the textarea
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };
 
  return (
    <div style={formStyles}>
     
      <Box sx={{display:"flex", alignItems:"center,", justifyContent:"space-around", width:"50%",marginX:"auto",marginTop:"3%", marginBottom:"1.5%" , p:"0.25%" ,boxShadow:"1px 1px 20px lightgray"}}>
      <Typography variant='h3' sx={{textAlign:"center", fontWeight:"semi-bold", p:"1%"}}>Leave a Review</Typography>
      <Box>
        <img src={backgroundImage} height={"100px"}/>
      </Box>
      </Box>
    
<Box sx={{ width:"80%", margin:"auto"}}>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            <option value="0">Select a Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div> */}
          {/* <FormLabel id="demo-controlled-radio-buttons-group" color=''>Rating</FormLabel>

          <RadioGroup
  row
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={rating}
     onChange={handleRatingChange}
  >
    <FormControlLabel value="1" control={<Radio />} label="1 - Poor" />
    <FormControlLabel value="2" control={<Radio />} label="2 - Fair" />
    <FormControlLabel value="3" control={<Radio />} label="3 - Good" />
    <FormControlLabel value="4" control={<Radio />} label="4 - Very Good" />
    <FormControlLabel value="5" control={<Radio />} label="5 - Excellent" />
   </RadioGroup> */}
   <Box sx={{boxShadow:"1px 1px 20px lightgray",px:"5%", py:"3%",width:"80%", margin:"auto"}}>
   <Box sx={{display:"flex", my:"3%"}}>
   <Typography sx={{paddingRight:"0.5%", fontSize:"25px"}}>Please, Rate Us: </Typography>
   <Rating
   sx={{fontSize:"35px"}}
  name="simple-controlled"
 value={rating}
  onChange={(event, newValue) => {
   setRating(newValue)
  }}
/>
</Box>
<Box sx={{display:"flex"}}>
  <Typography sx={{paddingRight:"1%", fontSize:"20px"}}>Please, Write a Review :</Typography>
                  {/* <label htmlFor="review">Review:</label> */}
                  <TextareaAutosize onChange={handleReviewChange}
                  //  aria-label="empty textarea"
                   placeholder="Please Write a Review ..."
                   rowsMin={5}
                   fullWidth 
                   value={review} // Set the value to the state variable
                   style={{ width: '75%', maxWidth: '75%', height:"6rem", padding:"1%" }}
                   // Update
                    />
          {/* <textarea id="review" value={review} onChange={handleReviewChange} style={textareaStyles}></textarea> */}
        
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", mt:"3%"}}>
        <Button size='large' color='#2c2c2c' htmlType='submit'>  Submit</Button>
        </Box>
        {/* <button type="submit">Submit</button> */}
        </Box>
      </form>
      </Box>
    </div>
  );
}
 
export default TestimonialForm;