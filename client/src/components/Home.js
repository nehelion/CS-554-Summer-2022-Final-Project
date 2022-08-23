import React, { useState } from "react";
import axios from 'axios';
import URLS from '../constants/constants';
import {getCurrentUserName} from '../firebase/FirebaseFunctions';
const FormData = require('form-data');
var Tesseract = require('tesseract.js');

const Home = () => {
  const [loading, setLoading] = useState(false);

const onImageChange = async (e) => {
	const [fileUploaded] = e.target.imageUpload.files;
	setLoading(true);

	try {
		// Extract Image from Tesseract
		let response = await Tesseract.recognize(fileUploaded, 'eng', {logger: m => console.log(m)});
		console.log("Extraction Complete");

		// Create a Form and hit API Call
		let form = new FormData();
		form.append('ownerMail', await getCurrentUserName());
		form.append('textExtracted', response.data.text);
		form.append('imageLink', fileUploaded.name);
		form.append('fileUploaded', fileUploaded, fileUploaded.name);
		await axios.post(URLS.UPLOAD_IMAGE_URL, form);
		console.log("Object Creation Complete");
	} catch(e){
		console.log("Failed to upload image properly ", e);
	}
	setLoading(false);
  };

  if(loading) {
	return (<h4>Image is being Loaded</h4>);
  } else {
	return (
		<form onSubmit={onImageChange}> 
			<input id="submitted_image" name="imageUpload" type="file" />
			<button type="submit">Submit</button>
		</form>
  	);
  }
};

export default Home;