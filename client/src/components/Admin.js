import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import { AuthContext } from '../firebase/Auth';
import URLS from '../constants/constants';
// import { getAuth } from "../firebase/auth";
import '../Image.css';

const Admin = () =>{
  const {currentUser} = useContext(AuthContext);
  const [imageInfo, setImageInfo] = useState(false)
  const [editable, setEditable] = useState(true)
  const [ empty, setEmpty ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  /**
   * Hard Coded Admin Checking as couldn't proceed with firebase authentication
   */
  let admin = false
  const uid = currentUser.uid;
  if (uid === 'LE6VJ8K3PnZjoJVd8btEIc4kT3d2'){
    admin = true;
  }

  async function fetchData() {
    try {
      const requestConfig = {headers: {user: await currentUser.getIdToken()}};
      const {data} = await axios.get('http://localhost:3001/images/getOneUnapprovedImage', requestConfig);
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

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const approveImage = async () =>{
    try{
      await axios.post('http://localhost:3001/images/approveImageByImageId',{
        _id: imageInfo._id,
        headers: {user: await currentUser.getIdToken()}
      });
      // setLoading(true);
      fetchData();
    } catch(e){
      alert(JSON.stringify(e.response.data));
    }
  }

  const deleteImage = async()=>{
    try{
      await axios.post('http://localhost:3001/images/deleteImageByImageId',{
        _id: imageInfo._id,
        headers: {user: await currentUser.getIdToken()}
      });
      // setLoading(true);
      fetchData();

    } catch(e){
      alert(JSON.stringify(e.response.data));
    }
  }

  if(!admin) {
    return (<div>
      <h4>Only Admins can view this page...</h4>
    </div>);
  }
 else if(empty){
    return (
			<div>
				<h2>No more Image needs to approve...</h2>
			</div>
		);
  } else if(loading){
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
      let imgUrl = `${URLS.GET_IMAGE_URL}/download/${imageInfo.imageLink}`
      return(
        <div>
          <div className='Image-body'>
            <div className='Top-Info'>
            <img src={imgUrl}/>
              {/* <img src = {imageInfo.image} alt = "Image" /> */}
              <div className='Right-Top'>
                <h1>{imageInfo&&imageInfo.tag}</h1>
                <p>{imageInfo&&imageInfo.textExtracted}</p>
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