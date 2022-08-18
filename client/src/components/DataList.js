import React, {useState} from 'react';
import './App.css';
import {useMutation, useQuery} from '@apollo/client';
import queries from '../queries';
import DeleteModal from './modals/DeleteModal';
import {NavLink, BrowserRouter as Router, Route} from 'react-router-dom';

function DataList(props){
    const [deleteImage, setDeleteImage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const [To_BinnedImages] = useMutation(queries.To_BinnedImages, {
      update(cache, {data: {To_BinnedImages}}){
        const allBinnedImages = cache.readQuery({query:queries.GET_binnedImages}).binnedImages;
        //console.log(allBinnedImages);
        cache.writeQuery({
          query: queries.GET_binnedImages,
          data:{allBinnedImages: allBinnedImages.concat([To_BinnedImages])}
        });
      }
    });

    const handleOpenDeleteModal = (image) =>{
      setShowDeleteModal(true);
      setDeleteImage(image);
    }

    const handleCloseModals = ()=>{
      setShowDeleteModal(false);
    }

    let images;
    let shouldDelete;
    if( props.data.unsplashImages){
      images = props.data.unsplashImages;
      shouldDelete = false;
    }else if(props.data.binnedImages){
      images = props.data.binnedImages;
      shouldDelete = false;
    }else if(props.data.userPostedImages){
      images = props.data.userPostedImages;
      shouldDelete = true;
    }

    return(
      <div>
          {images.map((image)=>{
              let bin = image.binned;
              return(
                  
                  <div className='card' key = {image.id}>
                  <div className='card-body'>
                  <h5 className='card-title'>
                      Author: {image.posterName? image.posterName: "No Name"}
                  </h5>
                  Description: {image.description? image.description:"No Description"}
                  <br/>
                  <img src={image.url} alt={image.posterName}/>
                  <br/>
                  <div>
            
              <button id={image.id}
              className='button'
              onClick={(e)=>{
                bin = !bin;
                document.getElementById(image.id).innerHTML= bin? "Remove from bin": "Add to Bin";
                e.preventDefault();
                To_BinnedImages({
                  variables:{
                    id: image.id,
                    url: image.url,
                    posterName: image.posterName,
                    description: image.description,
                    userPosted: image.userPosted,
                    binned: bin
                  }
                });
                window.location.reload();
              }}
            >
             {bin? "Remove from bin": "Add to Bin"}
            </button>
            
            {shouldDelete &&(
              <button className='button'
              onClick={()=>{
                handleOpenDeleteModal(image)
              }}
              >
                Delete Image
              </button>
            )}
          

          </div>
        
                  </div>
                  </div>
          );
          })}

          {showDeleteModal && showDeleteModal &&(
            <DeleteModal
              isOpen={showDeleteModal}
              handleClose={handleCloseModals}
              deleteImage={deleteImage}
            />
          )}
      </div>
  );
}

export default DataList;