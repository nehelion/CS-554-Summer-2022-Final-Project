import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from '../firebase/Auth';

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
		flexGrow: 1,
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
				
				const {imageFile} = await axios.get('http://localhost:3001/images/' + data[0].imageLink)
				
				setImagesFiles(imageFile);
				
				console.log("HERE 2: ", process.env.PUBLIC_URL + '/images/' + data[0].imageLink);
			}
			catch (e) 
			{
				console.log(e);
			}
		}
		fetchData();
  }, []);

	return (
		<div>
			<form> 
				<input id="submitted_image" name="submitted_image" type="file" onChange={onImageChange} />
				
				<br />
				
				<img src={selectedFileBlob} alt="" />
				
				<br />
				
				<label id="image-text">{fileText}</label>
				
				<br />
				<br />
				
				<button className="submit_button" onClick={uploadText}>Submit</button>
			</form>
		
			{imagesData ? 
			(
			
			<Grid>
				{
					imagesData.map((image) => {
						return (
							<Card className={classes.card} variant='outlined'>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										component='img'
										image={process.env.PUBLIC_URL + '/images/' + image.imageLink}
										title='show image'
									/>
									
									<img src={imagesFiles} alt="" />
									
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