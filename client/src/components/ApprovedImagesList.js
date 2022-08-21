import React, { useEffect, useState, useContext } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import {getCurrentUserName} from '../firebase/FirebaseFunctions';
import axios from 'axios';
import ImageCard from "./ImageCard";
import URLS from '../constants/constants';
import fs from 'fs';
import SearchImages from "./SearchImages";


const useStyles = makeStyles({
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    }
});

const ApprovedImagesList = () => {
	const classes = useStyles();
	const [images, setImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchImages, setSearchImages] = useState(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const loadImages = async () => {
			if(!images || images.length === 0) {
				try {
					const imagesResponse = await axios.get(URLS.GET_ALL_IMAGES_URL);
					if(imagesResponse) {
						let {data} = imagesResponse;
						setImages(data);
						setLoading(false);
					} 
				} catch (e) {
					console.log("Failed to retrieve the images from backend", e);
					setImages([]);
				}
			}
		}
		loadImages();
	}, []);

	useEffect(() => {
		const getSearchImages = async () => {
			try{
				const searchImagesResponse =  await axios.get(`${URLS.SEARCH_IMAGES_URL}?searchTerm=${searchTerm}`);
				if(searchImagesResponse.status === 200) {
					setSearchImages(searchImagesResponse.data);
					setLoading(false);
				}
			} catch (e) {
				console.log(e);
			}
		}

		if(searchTerm) {
			getSearchImages();
		} else {
			setSearchImages(null);
		}
	}, [searchTerm]);


	const fileUploadHandler =  (event) => {
		event.preventDefault();
		console.log("TEST" + event.target.imageFile.files[0]);
		const fileUploaded = event.target.imageFile.files[0];

		// To hit the Backend along with the data, file-uploaded
		// TODO: Not yet Tested
		const storeImageAtBackend = async function() {
			try {
				const FormData = require('form-data'); // npm install --save form-data
				const form = new FormData();
				form.append('name', event.target.imageName.value);
				form.append('owner', await getCurrentUserName());
				form.append('file', fs.createReadStream(fileUploaded.path));
				let requestConfig = {headers: {...form.getHeaders()}}
				const imageStoredAtBackend = await axios.post(URLS.UPLOAD_IMAGE_URL, form, requestConfig);
				setImages([...images, imageStoredAtBackend]);
			} catch(e) {
				console.log("File failed to upload", e);
				alert("File failed to upload", e);
			}
		}
		storeImageAtBackend();
	}

	const searchValue = async (value) => {
		setSearchTerm(value);
	};

	let imageCards = null;
	if(searchImages) {
		imageCards = searchImages.map(image => (<ImageCard image={image} key={image.id} />));
	} else if (images) {
		imageCards = images.map(image => (<ImageCard image={image} key={image.id} />));
	}

	if(loading) {
		return (
            <div>
                Loading....
            </div>
        ); 
	} else {
		return (
			<Grid container>
				<Grid item xs={2} md={2} lg={2} className='searchForm'>
					<SearchImages searchValue={searchValue} />
				</Grid>
				<Grid item xs={2} md={10} lg={10} className='images'>
					<Grid container className={classes.grid} spacing={3}>
						{imageCards}
					</Grid>
				</Grid>
      		</Grid>
		);
	}


	// if(images.length !== 0) {
	// 	let imageCards = images.map(image => (<ImageCard image={image} key={image.id} />));
	// 	return (
    //   <div>
    //     <Grid container className={classes.grid} spacing={3}>
    //           {imageCards}
    //     </Grid>
    //   </div>

	// 		// <Grid container style={{width: '80%', margin: '0 auto'}}>
	// 		// 	<Grid item xs={2} className='uploadImageForm'>
	// 		// 		<form onSubmit={fileUploadHandler}>
	// 		// 			<input type="text" name="imageName" onChange={event => console.log(event.target.value)} />
	// 		// 			<input type="file" name="imageFile" onChange={event => console.log("File choosing")} />
	// 		// 			<button type="submit"> Upload and Extract </button>
	// 		// 		</form>
    //   // 			</Grid>
	// 		// 	<Grid item xs={10} className='uploadImageForm'>
					
	// 		// 	</Grid>
	// 		// </Grid>
	// 	);
	// } else {
		
	
	
	
};

export default ApprovedImagesList;