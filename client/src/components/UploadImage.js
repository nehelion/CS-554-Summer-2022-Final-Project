import React, { useState } from 'react';
import './App.css';
import { useMutation, useQuery } from '@apollo/client';
import queries from '../queries';

function UploadImage(){
    const [uploadImage] = useMutation(queries.UPLOAD_image);

    let body;
    let url;
    let description;
    let posterName;
    
    body = (
        <form
            className='form'
            id='add-image'
            onSubmit={(e)=>{
                e.preventDefault();
                uploadImage({
                    variables:{
                        url: url.value,
                        description: description.value,
                        posterName: posterName.value
                    }
                });
                url.value = '';
                description.value = '';
                posterName.value = '';
                alert('Image posted');
                //window.location.href('/my-posts');
            }}
        >
            <div className='form-group'>
                <label>
                    Url:
                    <br/>
                    <input
                        ref={(node)=>{
                            url = node;
                        }}
                    required
                    autoFocus={true}
                    />
                </label>
            </div>
            <br/>
            <div className='form-group'>
                <label>
                    Description:
                    <br/>
                    <input
                        ref={(node)=>{
                            description = node;
                        }}
                    />
                </label>
            </div>
            <br/>
            <div className='form-group'>
                <label>
                    PosterName:
                    <br/>
                    <input
                        ref={(node)=>{
                            posterName = node;
                        }}
                    />
                </label>
            </div>

            <br/>
            <br/>
            <button className='button' type='submit'>
                Upload
            </button>
        </form>

    );

    return(
        <div>
            {body}
        </div>
    );
}

export default UploadImage;