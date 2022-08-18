import React, {useState} from 'react';
import './App.css';
import {useMutation, useQuery} from '@apollo/client';
import queries from '../queries';
import ShowData from './DataList';

function ShowMypost(){
    const userPostedImages = useQuery(queries.GET_userPostedImages,{fetchPolicy: 'cache-and-network'});

    if(userPostedImages.data){
        return(
            
            <div>
                <button className='button'>
                    {/* <a href='/new-post'>Upload a new Image</a> */}
                </button>
                <ShowData data={userPostedImages.data}/>
            </div>
            
        );
    }else if(userPostedImages.loading){
        return(
            <div>
                Loading On My Post...
            </div>
        );
    }else if(userPostedImages.error){
        return(
            <div>
                {userPostedImages.error.message}
            </div>
        );
    }
    
}

export default ShowMypost;