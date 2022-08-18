import React, {useState} from 'react';
import './App.css';
import {useMutation, useQuery} from '@apollo/client';
import queries from '../queries';
import ShowData from './DataList';

function ShowUnsplash(){
    const [pageNum, setpageNum] = useState(0);
    const unsplashImages = useQuery(queries.GET_unsplashImages,{variables:{ pageNum },fetchPolicy: 'cache-and-network'});

    const nextPage=()=>{
        setpageNum(pageNum+1);
      }
    const previousPage=()=>{
        if (pageNum >= 1){
            setpageNum(pageNum - 1);
        } else{
            setpageNum(0);
        }

    }

    if(unsplashImages.data){
        return(
            <div>
                <button className='button' onClick={nextPage }>Next Page</button>
                <br/>
                <br/>
                <button className='button' onClick={previousPage}>Previous Page</button>
                <ShowData data={unsplashImages.data}/>
            </div>
            
        );
    }else if(unsplashImages.loading){
        return(
            <div>
                Loading...
            </div>
        );
    }else if(unsplashImages.error){
        return(
            <div>
                {unsplashImages.error.message}
            </div>
        );
    }
    
}

export default ShowUnsplash;