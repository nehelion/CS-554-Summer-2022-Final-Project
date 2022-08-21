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
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileText, setFileText] = useState("Empty");
	
	const onImageChange = (e) => {
    const [file] = e.target.files;
		
		var passedVariable = file;
		
		Tesseract.recognize(passedVariable, 'eng',
		{ 
			logger: m => console.log(m) 
		}).then(({ data: { text } }) => 
		{
			setFileText(text);
		})
		
    setSelectedFile(URL.createObjectURL(file));
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
	
	const upload = multer({
			 storage: storage,
			 limits:{fileSize: 1000000},
		}).single("submitted_image");
	

	const uploadText = () => {
    //console.log("GOING IN: ", fileText);
		//var jsonData = JSON.stringify({"text": fileText});
		
    //formData.append('json1', JSON.stringify(jsonData));
		//console.log("GOING IN 2: ", JSON.stringify(jsonData));
		
		/*
		
		const formData = new FormData();
		const imagefile = document.querySelector('#submitted_image');
		
		await axios.post('images/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
				}
		}).then((response) => 
				{alert("The file is successfully uploaded");})
		
		
		
		
    formData.append('submitted_image',this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
		await axios.post("/images",{
				 upload(req, res, (e) => {
						console.log("Request ---", req.body);
						console.log("Request file ---", req.file);
						if(!e)
							 return res.send(200).end();
				 });
			};)
      .then((response) => 
				{alert("The file is successfully uploaded");})
			.catch((error) => {});
		
		.then((response) => {
			
			*/
			
		//const input = document.getElementById('submitted_image');

		const data = new FormData();
		data.append("file", selectedFile);
		data.append("text", "alex");

		for (var p of data) {
			console.log("out2", p);
		}
		
		alert("The file is successfully uploaded");

		axios.post('http://localhost:3001/images/setImage', data)
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));


/*
		fetch('http://localhost:3001/images/setImage', 
		{
      method: 'POST',
      mode: 'cors', 
      body: data
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
		alert("The file is successfully uploaded");
		*/
		
		
		//let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('submitted_image');
  };
	
	
	const onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      axios.post("api/uploadfile", formData);
    };
	
	return (
		<form> 
			<input id="submitted_image" name="submitted_image" type="file" onChange={onImageChange} />
			
			<br />
      
			<img src={selectedFile} alt="" />
			
			<br />
      
			<label id="image-text">{fileText}</label>
			
			<br />
			<br />
			
			<button className="submit_button" onClick={uploadText}>Submit</button>
		</form>
  );
};

export default Home;










/*


<form method="POST" enctype="multipart/form-data" id="upload_image" action="/home">

			<label class="image_label" for="submitted_image">File:
			
			
			
			
			<input
				type="file"
				id="submitted_image"
				accept="image/png, image/jpeg"
				required
				value={selectedFile}
				onChange={(e) => setSelectedFile(e.target.files[0])}
			/>
		
			<img src={selectedFile} alt=""></img>
			
			
			
			
				
      </label>
			
			<br />
			
			<button class="submit_button" type="submit" onclick="toggleText()">Submit</button>
			
			
		
		</form>
		
		*/