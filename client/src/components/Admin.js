import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import { AuthContext } from '../firebase/Auth';
// import { getAuth } from "../firebase/auth";
import '../Image.css';

const Admin = () =>{
  const {currentUser} = useContext(AuthContext);
  const [imageInfo, setImageInfo] = useState(false)
  const [editable, setEditable] = useState(true)
  const [ loading, setLoading ] = useState(true);
  const [ empty, setEmpty ] = useState(false);
  const [ admin, setAdmin ] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // const auth = getAuth();
        // const user = auth.currentUser;
        if (currentUser){
          const uid = JSON.stringif(currentUser.uid);
          let admin = await axios.post('http://localhost:3001/users/checkAdminFlagByid', {
            _id:uid
          });
          if (admin){
             setAdmin(true);
          } else{
             setAdmin(false);
          }
        }

        const {data} = await axios.get('http://localhost:3001/images/getOneUnapprovedImage');
        if (data.length === 0){
          throw "No more images need to approve!"
        }
        setImageInfo(data)
      } catch (e) {
        setEmpty(true)
        console.log(JSON.stringify(e.response.data));
      }
      setLoading(false);
    }
    fetchData();
  }, [imageInfo, currentUser]);

  const approveImage = async () =>{
    try{
      await axios.post('http://localhost:3001/images/approveImageByImageId',{
        _id: imageInfo._id,
      });
    } catch(e){
      alert(JSON.stringify(e.response.data));
    }
  }

  const deleteImage = async()=>{
    try{
      await axios.post('http://localhost:3001/images/deleteImageByImageId',{
        _id: imageInfo._id,
      });
    } catch(e){
      alert(JSON.stringify(e.response.data));
    }
  }
  
  if(!admin){
    return (
			<div>
				<h2>Your are not admin!</h2>
        <h2>Admin Account Email address:</h2>
        <p>admin@test.com</p>
        <h2>Admin Account Password:</h2>
        <p>123456</p>
			</div>
		);
  }else if(empty){
    return (
			<div>
				<h2>No more Image needs to approve...</h2>
			</div>
		);
  }else if(loading){
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