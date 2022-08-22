import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import { AuthContext } from '../firebase/Auth';
import '../Image.css';

const ApprovedImage = () =>{
  const {currentUser} = useContext(AuthContext);
  const [imageInfo, setImageInfo] = useState(false)
  const [editable, setEditable] = useState(true)
  const [error, setError] = useState(false)
  const [loading, setLoading ] = useState(true);
  const [deleted, setDeleted ] = useState(false);

  const params = useParams();
  let imageId = params.id


  useEffect(() => {
    async function fetchData() {
      try {
        if (!deleted){
          const {data} = await axios.get('http://localhost:3001/images/getImageByImageId/' + imageId);
          setImageInfo(data);
          // let admin = await axios.post('http://localhost:3001/checkAdminFlagByid/' + currentUser._id);
          // if (admin || currentUser._id == imageInfo.userId){
          //     setEditable(true);
          // }
          setLoading(false);
        }
      } catch (e) {
        setError(true);
        console.log(JSON.stringify(e.response.data));
      }
    }
    fetchData();
  }, [imageInfo, currentUser, deleted]);

  const updateImageText = async () =>{
    let edit = document.getElementById('edit').value;

    try{
       const{oldImage} = await axios.get('http://localhost:3001/images/getImageByImageId/' + imageId);
         // if(!oldImage.text){
        //     oldImage.text = "N/A";
        // }
        // if(oldImage.text.trim(' ').length === 0) oldImage.text = "N/A";
       await axios.post('http://localhost:3001/images/editImageByImageId',{
        _id: imageId,
        edit: edit,
      });
    }catch(e){
      setError(true);
      alert(JSON.stringify(e.response.data));
    }
  }

  const deleteImage = async()=>{
    try{
      await axios.post('http://localhost:3001/images/deleteImageByImageId',{
        _id: imageId
      });
      setDeleted(true)
      setImageInfo(false);
    } catch(e){
      setError(true);
      alert(JSON.stringify(e.response.data));
    }
  }

  
  if(loading){
    return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
  } else if(error){
    return (
			<div>
				<h2>EORROR!</h2>
			</div>
		);
  } else{
    if(imageInfo === false){
      return(
        <div>
          <h1>Sorry, we cannot find this Image!</h1>
        </div>
      )
    }
    else{
      let imgUrl = imageInfo.url;
      return(
        <div>
          <div className='Image-body'>
            <div className='Top-Info'>
            <img src={imgUrl}/>
              {/* <img src = {imageInfo.image} alt = "Image" /> */}
              <div className='Right-Top'>
                <h1>{imageInfo&&imageInfo.tag}</h1>
                <p>{imageInfo&&imageInfo.text}</p>
              </div>
            </div>
            
            {editable && (<div id="newReview">
              <div className='review-input'>
                <h3>Edit Image:</h3>
                  <label htmlFor ="edit">
                    Write a new text:
                    <textarea
                      cols="40" rows="5"
                      id='edit'
                      name='edit'
                      placeholder='Write a new text on this image...'
                    />
                  </label>
                </div>
              <button onClick={updateImageText}> Write a new Text</button>
            </div>)}

            {/* {editable&&(<div id="userReview">
                <button onClick={deleteImage}>Delete Image</button>
            </div>)} */}
          </div>
        </div>
      )
    }
  }
};


export default ApprovedImage;