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
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';

const useStyles = makeStyles({
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
		paper: { 
			minWidth: "800px" 
		},
});

var Tesseract = require('tesseract.js');
var grid = require("gridfs-stream");
const multer = require('multer');
const path = require('path');

const Home = () => {
	const editorRef = React.createRef();
	const classes = useStyles();
	const [images, setImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchImages, setSearchImages] = useState(null);
	const [loading, setLoading] = useState(true);
  const [fileText, setFileText] = useState("Empty");
  const [imageExtract, setImageExtract] = useState(null);
  const [imageExtractDisp, setImageExtractDisp] = useState(null);
  const {currentUser} = useContext(AuthContext);
	let theSelectedFile = null;
	var imageEditor = null;
	
	useEffect(() => {
		const loadImages = async () => {
			if(!images || images.length === 0) {
				try {
					const requestConfig = {headers: {user: await currentUser.getIdToken()}};
					const imagesResponse = await axios.get(URLS.GET_ALL_IMAGES_URL, requestConfig);
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
				const requestConfig = {headers: {user: await currentUser.getIdToken()}};
				const searchImagesResponse =  await axios.get(`${URLS.SEARCH_IMAGES_URL}?searchTerm=${searchTerm}`, requestConfig);
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
	
	const storage = multer.diskStorage(
	{
		dest: './images/',

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
		data.append("file", imageExtract);
		
		axios({
			method: "post",
			url: 'http://localhost:3001/images/setImage', 
			data: data,
			headers: { "Content-Type": "multipart/form-data" , "user": await currentUser.getIdToken()},
		})
			.then((res) => {
				console.log("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
	
    setOpen(false);
	};
	
	const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = async () => {
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
	
	const myTheme = {
		// Theme object to extends default dark theme.
	};
	
	const handleMousedown = () => {
		
		if(!imageEditor)
		{
			imageEditor = editorRef.current.getInstance()
		}
		
		let file = imageEditor.toDataURL("image/jpg");
			
		var x = document.getElementById("tesseractload");
		var y = document.getElementById("tesseracthide");
		var z = document.getElementById("tesseractread");
			
		x.style.display = "block";
		y.style.display = "none";
	 
		Tesseract.recognize(file, 'eng',
			{ 
				logger: m => console.log(m) 
			}).then(({ data: { text } }) => 
			{
				setFileText(text);
				let imageObj = dataURLtoFile(file, "newfile.jpg");
				setImageExtract(imageObj);
				setImageExtractDisp(URL.createObjectURL(imageObj));
				z.style.display = "block";
				x.style.display = "none";
			});
  };
	
	// convert DATA URL to Image File
	function dataURLtoFile(dataurl, filename) 
	{
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
				while(n--){
						u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {type:mime});
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
				<Dialog classes={{ paper : classes.paper}} open={open} onClose={handleClose}>
					
					<DialogTitle>
						Upload Image
					</DialogTitle>
					<form> 
					
						<img width="800px" height="600px" id="tesseractload" src="http://superstorefinder.net/support/wp-content/uploads/2018/01/orange_circles.gif" alt="" hidden />
						
						<div id="tesseracthide" >
						<ImageEditor
							ref={editorRef}
							id="imageEditor"
							includeUI={{
								theme: myTheme,
								menu: ['filter'],
								initMenu: 'filter',
								uiSize: {
									width: '800px',
									height: '500px',
								},
								menuBarPosition: 'top',
							}}
							cssMaxHeight={500}
							cssMaxWidth={700}
							selectionStyle={{
								cornerSize: 20,
								rotatingPointOffset: 70,
							}}
							usageStatistics={true}
						/>
						
						<br />
						
						<DialogActions>
							<Button className="submit_button" onClick={handleMousedown} color="primary">
								Extract
							</Button>
						</DialogActions>
						</div>
						
						<div id="tesseractread" hidden>
						
						<img src={imageExtractDisp} alt="" />
						
						<br />
						
						<label id="image-text">Text Extracted: {fileText}</label>
						
						<DialogActions hidden>
							<Button className="submit_button" onClick={uploadText} color="primary">
								Submit
							</Button>
						</DialogActions>
						
						</div>
						
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
};

export default Home;