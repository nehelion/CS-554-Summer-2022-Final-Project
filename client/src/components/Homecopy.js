import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import ImageCard from "./ImageCard";
import URLS from '../constants/constants';


const useStyles = makeStyles({
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    }
});

const Home = () => {
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
	
	const fileUploadHandler = (event) => {
		event.preventDefault();
		console.log("TEST" + event.target.myImage.files[0]);
		const fileUploaded = event.target.myImage.files[0];
		// TODO: This file needs to be sent to backend using axios
	}


	if(images.length !== 0) {
		let imageCards = images.map((image) => {
			console.log("loaded " + image.id);
			return (<ImageCard image={image} key={image.id} />);
		});

		return (
			<div>
				<div className='uploadImageForm'> 
					<form onSubmit={fileUploadHandler}>
						<input type="file" name="myImage" />
						<button type="submit"> Upload and Extract </button>
					</form>
				</div>
	
				<Grid container className={classes.grid} spacing={5}>
					{imageCards}
				</Grid>
			</div>
		);
	} else {
		return (
            <div>
                Loading....
            </div>
        ); 
	}
	
	
	
};

export default Home;