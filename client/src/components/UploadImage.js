import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function UploadImage(){
    
    const submitForm = async (event) =>{
        event.preventDefault();
        const {url, tag, text} = event.target.elements;
        try{
            await axios.post('http://localhost:3001/images/addUnapprovedImage',{
             url: url.value,
             tag: tag.value,
             text: text.value
           });
           alert("Image uploaded!");
        }catch(e){
            alert(e)
        }
    }
    
    return(
        <div>   
            <h2>UPLOEAD A NEW IMAGE</h2>
            <form onSubmit={submitForm}>
            <div className='form-group'>
                <label>
                URL:
                <input
                    className='form-control'
                    name='url'
                    id='url'
                    type='string'
                    placeholder='Please enter image URL'
                    autoComplete='off'
                    required
                />
                </label>
            </div>

            <div className='form-group'>
                <label>
                TAG:
                <input
                    className='form-control'
                    name='tag'
                    id='tag'
                    type='string'
                    placeholder='Please enter image TAG'
                    autoComplete='off'
                    required
                />
                </label>
            </div>
            <div className='form-group'>
                <label>
                TEXT:
                <input
                    className='form-control'
                    name='text'
                    id='text'
                    type='string'
                    placeholder='Please enter image TEXT'
                    autoComplete='off'
                    required
                />
                </label>
            </div>

            <button type='submit'>UPLOAD</button>
            </form>
            <br />
        </div>
    )
}

export default UploadImage;