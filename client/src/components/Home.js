import React, { useEffect, useState, useContext } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import {getCurrentUserName} from '../firebase/FirebaseFunctions';
import axios from 'axios';
import { AuthContext } from '../firebase/Auth';
import ImageCard from "./ImageCard";
import URLS from '../constants/constants';
import fs from 'fs';
import SearchImages from "./SearchImages";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    }
});

var Tesseract = require('tesseract.js');
var grid = require("gridfs-stream");
var mongooseDrv = require("mongoose");
const helpers = require('./helpers');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

const ApprovedImagesList = () => {
	const classes = useStyles();
	const [images, setImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchImages, setSearchImages] = useState(null);
	const [loading, setLoading] = useState(true);
  const [selectedFileBlob, setSelectedFileBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [imagesFiles, setImagesFiles] = useState(null);
  const [fileText, setFileText] = useState("Empty");
  const {currentUser} = useContext(AuthContext);
	
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
	
	const onImageChange = (e) => {
    const [file] = e.target.files;
		
		setSelectedFile(file);
		
		var passedVariable = file;
		
		Tesseract.recognize(passedVariable, 'eng',
		{ 
			logger: m => console.log(m) 
		}).then(({ data: { text } }) => 
		{
			setFileText(text);
		})
		
    setSelectedFileBlob(URL.createObjectURL(file));
		
		console.log("HERE -1: ", e.target);
		console.log("HERE 0: ", URL.createObjectURL(file));
  };
	
	const storage = multer.diskStorage(
	{
		dest: './images/',

		// By default, multer removes file extensions so let's add them back
		filename: function(req, file, cb) 
		{
			try
			{
				var newFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
				cb(null, newFileName);
			}
			catch (e) 
			{
				console.log("FAIL :" + e);
			}
		}
	});
	
	const uploadText = async () => 
	{
		const data = new FormData();
		
		data.append("ownerMail", currentUser.email);
		data.append("textExtracted", fileText);
		data.append("file", selectedFile);
		
		axios({
			method: "post",
			url: 'http://localhost:3001/images/setImage', 
			data: data,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
	
    setOpen(false);
	};
	
	const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

	const searchValue = async (value) => {
		setSearchTerm(value);
	};

	let imageCards = null;
	if(searchImages) {
		imageCards = searchImages.map(image => (<ImageCard image={image} key={image._id} />));
	} else if (images) {
		imageCards = images.map(image => (<ImageCard image={image} key={image._id} />));
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
					
					<div className={classes.centerWrap}>
				<Button variant="outlined" 
								color="primary" onClick={handleClickOpen}>
					Upload
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>
						Upload Image
					</DialogTitle>
					<form> 
						<input id="submitted_image" name="submitted_image" type="file" onChange={onImageChange} />
						
						<br />
						
						<img src={selectedFileBlob} alt="" />
						
						<br />
						
						<label id="image-text">{fileText}</label>
						
						<br />
						<br />
						
						<DialogActions>
							<Button className="submit_button" onClick={uploadText} color="primary">
								Submit
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			</div>
					
					<SearchImages searchValue={searchValue} />
				</Grid>
				<Grid item xs={2} md={10} lg={10} className='images'>
					<Grid container className={classes.grid} spacing={3}>
						{(imageCards.length > 0 )? imageCards : <h4> No Images to Display</h4>}
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