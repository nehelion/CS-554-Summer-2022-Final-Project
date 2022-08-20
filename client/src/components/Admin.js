import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import { AuthContext } from '../firebase/Auth';
import '../Image.css';

const Admin = () =>{
  const {currentUser} = useContext(AuthContext);
  const [imageInfo, setImageInfo] = useState(false)
  const [editable, setEditable] = useState(false)

  const [ loading, setLoading ] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const {data} = await axios.get('http://localhost:3001/getAllUnapprovedImages');
        if (data == null){
            throw "No more images need to approve!"
        }
        let admin = await axios.post('http://localhost:3001/checkAdminFlagByid/' + currentUser._id);
        if (admin){
            setEditable(true);
        } else{
            throw "You are not admin, you can't inspect images!"
        }
        setLoading(false);
        while(data != null){
            for (let image in data){
                setImageInfo(image);
                setTimeout(() => { }, 5000);
            }
            const {data} = await axios.get('http://localhost:3001/getAllUnapprovedImages');
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [imageInfo, currentUser, params.id]);

  const approveImage = async () =>{
    let edit = document.getElementById('edit').value;

    let oldImage = await axios.get('http://localhost:3001/getImageByImageId/' + imageInfo._id);
    
    try{
       await axios.post('http://localhost:3001/approveImageByImageId/' + imageInfo._id,{
        id: oldImage._id,
        userId: oldImage._userId,
        approverId: oldImage._approverId,
        uploader: oldImage.uploader,
        image: oldImage.image,
        text: oldImage.text,
        tags: oldImage.tags,
        approval: oldImage.approval,
        status: true,
        approver: oldImage.approver
      });
      
    }catch(e){
      alert(e);
    }
  }

  const deleteImage = async()=>{
    try{
      await axios.post('http://localhost:3001/deleteImageByImageId/' + imageInfo._id,{
        _Id: imageInfo._id,
      });
    } catch(e){
      alert(e);
    }
  }
  
  if(loading){
    return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
  }
  else{
    if(imageInfo === undefined){
      return(
        <div>
          <h1>Sorry, we cannot find this Image!</h1>
        </div>
      )
    }
    else{  
      return(
        <div>
          <div className='Image-body'>
            <div className='Top-Info'>
              <img src = {imageInfo.image} alt = "Image" />
              <div className='Right-Top'>
                <h3>Inspect Image:</h3>
                <h1>{imageInfo&&imageInfo.tags}</h1>
                <h1>{imageInfo&&imageInfo.text}</h1>
              </div>
            </div>

            {editable&&(<div id="userReview">
                <button onClick={approveImage}>Aprove Image</button>
                <button onClick={deleteImage}>Delete Image</button>
            </div>)}

          </div>
        </div>
      )
    }
  }
};


export default Admin;