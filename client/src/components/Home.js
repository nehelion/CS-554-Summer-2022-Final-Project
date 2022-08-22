import React, { useState } from "react";
import axios from 'axios';
var Tesseract = require('tesseract.js');
var grid = require("gridfs-stream");
var mongooseDrv = require("mongoose");
const helpers = require('./helpers');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

const Home = () => {
  const [name, setName] = useState("");
  const [selectedFileBlob, setSelectedFileBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileText, setFileText] = useState("Empty");
	
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
			
			<br />
      
			<label id="image-text">{fileText}</label>
			
			<br />
			<br />
			
			<button className="submit_button" onClick={uploadText}>Submit</button>
		</form>
  );
};

export default Home;