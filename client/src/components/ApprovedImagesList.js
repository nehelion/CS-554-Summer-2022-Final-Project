import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import {getCurrentUserName} from '../firebase/FirebaseFunctions';
import axios from 'axios';
import ImageCard from "./ImageCard";
import URLS from '../constants/constants';
import fs from 'fs';


const useStyles = makeStyles({
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    }
});

const ApprovedImagesList = () => {
	const classes = useStyles();
	const [images, setImages] = useState([]);
	
	useEffect(() => {
		const loadImages = async () => {
			if(!images || images.length === 0) {
				try {
					const imagesResponse = await axios.get(URLS.GET_ALL_IMAGES_URL);
					if(imagesResponse) {
						let {data} = imagesResponse;
						console.log("data extracted " + data);
						setImages(data);
					}
				} catch (e) {
					console.log("Failed to retrieve the images from backend", e);
					setImages([]);
				}
			}
		}
		loadImages();
	}, []);


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


	if(images.length !== 0) {
		let imageCards = images.map(image => (<ImageCard image={image} key={image.id} />));
		return (
			<Grid container style={{width: '80%', margin: '0 auto'}}>
				<Grid item xs={2} className='uploadImageForm'>
					<form onSubmit={fileUploadHandler}>
						<input type="text" name="imageName" onChange={event => console.log(event.target.value)} />
						<input type="file" name="imageFile" onChange={event => console.log("File choosing")} />
						<button type="submit"> Upload and Extract </button>
					</form>
      			</Grid>
				<Grid item xs={10} className='uploadImageForm'>
					<Grid container className={classes.grid} spacing={3}>
						{imageCards}
					</Grid>
				</Grid>
			</Grid>
		);
	} else {
		return (
            <div>
                Loading....
            </div>
        ); 
	}
	
	
	
};

export default ApprovedImagesList;