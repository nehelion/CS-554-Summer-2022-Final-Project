import React, { useState } from "react";
import axios from 'axios';
var Tesseract = require('tesseract.js');
var grid = require("gridfs-stream");
var mongooseDrv = require("mongoose");
const helpers = require('./helpers');
const multer = require('multer');
const path = require('path');
const im = require('imagemagick');
const fs = require('fs');
const Jimp = require('jimp');
const phin = require('phin');

const Home = () => {
  const [jimpImage, setJimpImage] = useState(undefined);
  const [name, setName] = useState("");
  const [selectedFileBlob, setSelectedFileBlob] = useState(null);
  const [selectedFileIM, setSelectedFileIM] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileText, setFileText] = useState("Empty");
	
	//useEffect(() => {
    
  //}, [imageUrl]);
	
	const onImageChange = async (e) => {
    const [file] = e.target.files;
		
		setSelectedFile(file);
		
		var passedVariable = file;
		
		const data = new FormData();
		data.append("file", file);
		
		axios({
			method: "post",
			url: 'http://localhost:3001/images/setTempImage', 
			data: data,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
		
		const loadImage = async () => {
      // generating the Jimp data structure
      // loading an image from an URL
      const jimpImage = await Jimp.default.read('temp.jpg');
      setJimpImage(jimpImage);
      
      // transforming jimpImage into its Base64 representation
      // and storing it
      const image = await jimpImage.getBase64Async(Jimp.MIME_JPEG);
      setSelectedFileIM(image);
    };
    
    loadImage();
		
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
		data.append("fields", "alex");
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

	return (
		<form> 
			<input id="submitted_image" name="submitted_image" type="file" onChange={onImageChange} />
			
			<br />
      
			<img src={selectedFileBlob} alt="" />
			<img src={selectedFileIM} alt="" />
			
			<br />
      
			<label id="image-text">{fileText}</label>
			
			<br />
			<br />
			
			<button className="submit_button" onClick={uploadText}>Submit</button>
		</form>
  );
};

export default Home;