import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";
import { AuthContext } from '../firebase/Auth';
import '../Image.css';

const ApprovedImage = () =>{
  const {currentUser} = useContext(AuthContext);
  const [imageInfo, setImageInfo] = useState(undefined)
  const [editable, setEditable] = useState(false)
//   const [candyHave, setCandyHave] = useState(0)
//   const [candyStock, setCandyStock] = useState(0)
//   const [userReview,setUserReview] = useState(undefined)


  const [ loading, setLoading ] = useState(true);
  const params = useParams();
  let imageId = params.id
//   const intn = /^\+?[1-9][0-9]*$/;

//   const [reviewRating, setReviewRating] = useState(0);
//   const veganCheck = 'https://iamgoingvegan.b-cdn.net/wp-content/uploads/2020/05/European-Vegetarian-Symbol-961x1024.png'


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const {data} = await axios.get('http://localhost:3001/approveImageByImageId/' + imageId);
        setImageInfo(data);
        let admin = await axios.post('http://localhost:3001/checkAdminFlagByid/' + currentUser._id);
        if (admin || currentUser._id == imageInfo.userId){
            setEditable(true);
        }
        // setCandyStock(data.stock);
      
        // if(currentUser !== null){          
        //   data.reviews.forEach((e)=>{
        //     if(e.email === currentUser.email) setUserReview(e)
        //   });
          
        //   const have = await axios.get('https://final554groupnull.herokuapp.com/usershopcart/' + currentUser.email)
        //   let changeData = await have.data.filter((e) => {
        //     return e.id === imageId
        //   })
          
        //   if(changeData.length !== 0 && changeData[0].numbers){
        //     setCandyHave(changeData[0].numbers)
        //   }
        // }
        setLoading(false);
        if (imageInfo == false){
            throw "Image has been deleted or can't find!";
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [imageInfo, currentUser, params.id]);

  const updateImageText = async () =>{
    // if (edit === false) {
    //   alert("Please enter a new text for the Image!");
    //   return;
    // }
    let edit = document.getElementById('edit').value;

    let oldImage = await axios.get('http://localhost:3001/getImageByImageId/' + imageId);
    if(!oldImage.text){
        oldImage.text = "N/A";
    }
    if(oldImage.text.trim(' ').length === 0) oldImage.text = "N/A";
    
    try{
       await axios.post('http://localhost:3001/editImageByImageId/' + imageId,{
        id: oldImage._id,
        userId: oldImage._userId,
        approverId: oldImage._approverId,
        uploader: oldImage.uploader,
        image: oldImage.image,
        text: edit,
        tags: oldImage.tags,
        approval: oldImage.approval,
        status: oldImage.status,
        approver: oldImage.approver
      });
      
    //   document.getElementById('review').value='';
    //   var today = new Date();
    //   var dd = String(today.getDate()).padStart(2, '0');
    //   var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    //   var yyyy = today.getFullYear();
    //   today = mm + '/' + dd + '/' + yyyy;
    //   let  newReview = {
    //     candyId: candyId,
    //     email: email,
    //     review: review,
    //     rating: rating,
    //     date: today
    //   }

    //   setEditImage(false);
    }catch(e){
      alert(e);
    }
  }

  const deleteImage = async()=>{
    try{
      await axios.post('http://localhost:3001/deleteImageByImageId/' + imageId,{
        _Id: imageId,
      });
      setImageInfo(false);
    } catch(e){
      alert(e);
    }
  }

//   const changeCandy = async () => {
//     let numberha = document.getElementById('number').value
//     let numberha1 = Number(numberha)
    
//     if (isNaN(numberha1) || isNaN(numberha1) || isNaN(numberha1)){
//       alert('input must be number')
//       document.getElementById('number').value = ''
//     }
//     else if(intn.test(numberha) === false){
//       alert('input must be integer')
//       document.getElementById('number').value = ''
//     } 
    
//     else if (numberha1 + candyHave > candyInfo.stock){
//       alert('There is not enough stock available to add that amount to your cart')
//       document.getElementById('number').value = ''
//     }
//     else{
//       let total = numberha1 + candyHave
//       const body = {id: params.id, name : candyInfo.name, price: candyInfo.price, image:candyInfo.image, numbers:total}
      
//       try{
//         await axios.put('https://final554groupnull.herokuapp.com/usershopcart/'+ currentUser.email, body,)
//         .then(res=>{
//           setCandyHave(res.data.numbers)
          
//         })
//         alert(`You successfully added ${numberha1} units to your cart`)
        
//       }
//       catch(e){
//         alert(e)
//       }
//       document.getElementById('number').value = ''
//     } 
//   };

//   const roundToHalf = (num) =>{
//     return Math.round(num * 2) / 2;
//   }
  
  
//   const makeStarRating = (rating) => {
//     rating = roundToHalf(rating);
//     let content = [];
//     for (let i = 0; i < 5; i++) {
//       if (rating - i === .5) {
//         content.push(<i className="fa fa-star-half-full checked" key={`star${i}`}/>);
//       } else if (rating - i > 0) {
//         content.push(<i className="fa fa-star checked" key={`star${i}`}/>);
//       } else {
//         content.push(<i className="fa fa-star-o checked" key={`star${i}`}/>);
//       }
//     }
//     return content;
//   }

  
//   const changeRating = (num) => {
//     setReviewRating(num);
//   }
  
  
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
    //   let notBlank= [];   
    //   imageInfo.reviews.forEach((e)=>{
    //     if(currentUser){
    //       if(e.email !== currentUser.email){
    //         if(e.review.trim(' ').length!==0) notBlank.push(e);
    //       }
    //     }
    //     else{
    //       if(e.review.trim(' ').length!==0) notBlank.push(e);
    //     } 
    //   });    
 
      return(
        <div>
          {/* {candyStock === 0 ?
            <div className="StockWarning Empty">{candyInfo.name} is sold out</div> :
            candyStock < 100 ?
              <div className='StockWarning Low'>Only {candyStock} {candyInfo.name} left in stock!</div> :
              null
          } */}
          <div className='Image-body'>
            <div className='Top-Info'>
              <img src = {imageInfo.image} alt = "Image" />
              <div className='Right-Top'>
                {/* <div className='Top-Top-Info'>
                  <p><u>{imageInfo&&imageInfo.manufacturer}</u></p>
                  {imageInfo.vegan&&<img src = {veganCheck} width={40} height={40} alt='veganCheck'/>}
                </div> */}
                <h1>{imageInfo&&imageInfo.tags}</h1>
                <h1>{imageInfo&&imageInfo.text}</h1>
                {/* <div className='Review-Info'>
                  <div className='starsBig'>{makeStarRating(imageInfo.rating)}</div>
                  <p>({imageInfo.rating.toFixed(1)})</p>
                  <a className='numReviews' href='#reviews'>{imageInfo.numRatings} {imageInfo.numRatings > 1? 'Ratings' : 'Rating'}</a>
                </div> */}
                {/* <h2>Price: ${imageInfo&&imageInfo.price.toFixed(2)}</h2> */}
                {/* <div className='add'>
                  {currentUser&&(<div className='input-selection'>
                    <p>You currently have {candyHave} units:</p>
                    <label>
                      Purchase more:
                      <input
                        id='number'
                        name='number'
                        placeholder='quantity'
                      />
                    </label>
                  </div>)}
                  {currentUser&&(<button onClick={changeCandy}> add to cart</button>)}
                  {!currentUser&&(<p> Must be logged in to add candy to shopping cart</p>)}
                  <h3>There is {candyStock} left in stock</h3>
                  <p>{imageInfo&&imageInfo.descrption}</p>
                </div> */}
              </div>
            </div>
            
            {editable && (<div id="newReview">
              <div className='review-input'>
                <h3>Edit Image:</h3>
                {/* <div className="star-rating">
                  <input type="radio" name="stars" id="star-a" value="5" onClick={() => changeRating(5)}/>
                  <label htmlFor="star-a"></label>

                  <input type="radio" name="stars" id="star-b" value="4" onClick={() => changeRating(4)}/>
                  <label htmlFor="star-b"></label>
              
                  <input type="radio" name="stars" id="star-c" value="3" onClick={() => changeRating(3)}/>
                  <label htmlFor="star-c"></label>
              
                  <input type="radio" name="stars" id="star-d" value="2" onClick={() => changeRating(2)}/>
                  <label htmlFor="star-d"></label>
              
                  <input type="radio" name="stars" id="star-e" value="1" onClick={() => changeRating(1)}/>
                  <label htmlFor="star-e"></label>
                </div> */}
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

            {editable&&(<div id="userReview">
                {/* <h3>Your Review</h3>
          
                  <p>Review by {userReview.email}  on {userReview.date}</p>
                  
                  <p>{makeStarRating(userReview.rating)}</p>
                  
                  <p>Review: {userReview.review}</p> */}

                <button onClick={deleteImage}>Delete Image</button>
            </div>)}
            {/* <p><b>Reviews: </b></p> */}
            {/* <ul id="reviewList">
              {notBlank.map(e=>
                <li key={e.email}>
                  <p>Review by {e.email}  on {e.date}</p>
                  
                  <p>{makeStarRating(e.rating)}</p>
                  
                  <p>Review: {e.review}</p>
                </li>
              )}
            </ul> */}
          </div>
        </div>
      )
    }
  }
};


export default ApprovedImage;