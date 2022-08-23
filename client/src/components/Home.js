import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from '../firebase/Auth';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

import '../App.css';
const useStyles = makeStyles({
  card: {
    width: 150,
    height: 220,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #1e8678',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    borderBottom: '1px solid #1e8678',
    fontWeight: 'bold'
  },
  grid: {
		flexGrow: 5,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#1e8678',
    fontWeight: 'bold',
    fontSize: 12
  }
});

var Tesseract = require('tesseract.js');
var grid = require("gridfs-stream");
var mongooseDrv = require("mongoose");
const helpers = require('./helpers');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

const Home = () => {
  const {currentUser} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [selectedFileBlob, setSelectedFileBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [imagesFiles, setImagesFiles] = useState(null);
  const [fileText, setFileText] = useState("Empty");
	const classes = useStyles();
	const imagesPath = path.join(__dirname, '../../../server/images/');
	
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
	
	
	useEffect(() => 
	{
    async function fetchData() 
		{
      try 
			{
				const {data} = await axios.get('http://localhost:3001/images/getAllUnapprovedImages');
				
				console.log("HERE 1: ", data);
		
				setImagesData(data);
				
				const imageFile = await axios.get('http://localhost:3001/images/image-1661239829766.jpg');
				//const [file] = imageFile;
				
				//setImagesFiles(imageFile.data);
				//setImagesFiles(URL.createObjectURL(file));
				
				
				
				
				var arrayBufferView = new Uint8Array( imageFile );
				var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
				var urlCreator = window.URL || window.webkitURL;
				var imageUrl = URL.createObjectURL( blob );
				setImagesFiles(imageUrl);
				
				
				//var reader  = new FileReader();
				//reader.readAsDataURL(file);
				
				
				
				
				console.log("HERE 2: ", imageUrl);
				//console.log("HERE 3: ", imageFile.data);
				
			}
			catch (e) 
			{
				console.log(e);
			}
		}
		fetchData();
  }, []);
	
	const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

	return (
		<div>
			<div>
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
						
						<img src={imagesFiles} alt="" />
						
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
		
			
		
			{imagesData ? 
			(
			
			<Grid>
				{
					imagesData.map((image) => {
						return (
							<Card className={classes.card} key={image._id} variant='outlined'>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										component='img'
										image={imagesPath + image.imageLink}
										title='show image'
									/>
									
									
									
									<CardContent>
										<Typography
											className={classes.titleHead}
											gutterBottom
											variant='h6'
											component='h3'
										>
											{image.textExtracted}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						)
				})}
			</Grid>
			
			):(<div></div>)
			}
			
		</div>
	);
};

export default Home;