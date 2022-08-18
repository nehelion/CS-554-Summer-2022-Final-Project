import React, {useState} from 'react';
import './App.css';
import {useMutation, useQuery} from '@apollo/client';
import queries from '../queries';
import ShowData from './DataList';

function ShowMybin(){
    const [pageNum, setpageNum] = useState(0);
    const binnedImages = useQuery(queries.GET_binnedImages,{fetchPolicy: 'cache-and-network'});

    if(binnedImages.data){
        return(
            <div>
                <ShowData data={binnedImages.data}/>
            </div>
            
        );
    }else if(binnedImages.loading){
        return(
            <div>
                Loading On My Bin...
            </div>
        );
    }else if(binnedImages.error){
        return(
            <div>
                {binnedImages.error.message}
            </div>
        );
    }
    
}

export default ShowMybin;