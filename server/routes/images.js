const express = require('express');
const router = express.Router();
const data = require('../data');
const imagesData = data.images;
const path = require('path');
const fs = require('fs');
let { ObjectId } = require('mongodb');
const xss = require('xss');

router.post('/setImage', async (req,res) =>{
	try 
	{
		console.log("out", req.body);
		const image = await imagesData.setImage(req.body.text);
		//console.log(image);
		//res.json(image);
	} 
	catch (e) 
	{
		res.status(404).json({error: e});
	}
});

router.get('/getAllUnapprovedImages', async (req,res) =>{

});

router.post('/approveImageByImageId/:id', async (req,res) =>{

});

router.get('/getAllApprovedImages', async (req,res) =>{
	let dummyImages = [
		{id: 1, name: "Image 1", text: "This is the text extracted from Image", url: "invalidImage.png"}, 
		{id: 2, name: "Image 2", text: "This is the text extracted from Image", url: "sample.png"}
	];
	res.status(200).json(dummyImages);
});

/**
 * Get Image by Image Name
 */
router.get('/:fileName', async (req,res) =>{
	const fileName = req.params['fileName'];
	const filePath = path.join(__dirname, '../images', fileName);
	console.log("filename: " + filePath);
	try {
		if(fs.existsSync(filePath)) {
			// File Exists. Return it
			return res.status(200).sendFile(filePath);
		} else {
			// File not available
			return res.status(400).json({"ERROR": "Image Not found in the server"});
		}
	} catch (e) {
		return res.status(500).json({"ERROR": "Failed to send file"});
	}
});

router.get('/getImageByUserId/:id', async (req,res) =>{

});

router.post('/editImageByImageId/:id', async (req,res) =>{

});

router.post('/deleteImageByImageId/:id', async (req,res) =>{

});


module.exports = router;