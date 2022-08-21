const express = require('express');
const router = express.Router();
const data = require('../data');
const imagesData = data.images;
const path = require('path');
const fs = require('fs');
let { ObjectId } = require('mongodb');
const xss = require('xss');
const UnauthorizedRequest = require('../errors/UnAuthorizedRequest');
const validations = require("../validations/validations");
const UnprocessibleRequest = require('../errors/UnprocessibleRequest');
const { deleteImageByImageId } = require('../data/images');

router.post('/setImage', async (req,res) =>{
	try 
	{
		console.log("out1");
		
		for (var p of req.body) {
			console.log("out2", p);
		}
		//const image = await imagesData.setImage(req.body.text);
		//console.log(image);
		//res.json(image);
	} 
	catch (e) 
	{
		res.status(404).json({error: e});
	}
});

router.get('/getAllUnapprovedImages', async (req,res) =>{
	try {
		let unApprovedImages = await imagesData.getAllUnapprovedImages();
		return res.status(200).json(unApprovedImages);
	} catch(e) {
		return res.status(500).json({"ERROR - getAllUnapprovedImages": e});
	}
});

router.post('/approveImageByImageId/:id', async (req,res) =>{
	let imageId = req.params['id'];
	try {
		imageId = validations.validateId(imageId, "Image Id");
	} catch (e) {
		return res.status(400).json({"ERROR - approveImageByImageId": e});
	}

	try {
		let approvedImage = await imagesData.approveImageByImageId(imageId);
		return res.status(200).json(approvedImage);
	} catch(e) {
		if(e instanceof UnprocessibleRequest)
			return res.status(e.status).json({"ERROR - approveImageByImageId": e.message});
		return res.status(500).json({"ERROR - approveImageByImageId": e});
	}
});

router.get('/getAllApprovedImages', async (req,res) =>{
	try {
		let approvedImages = await imagesData.getAllApprovedImages();
		return res.status(200).json(approvedImages);
	} catch(e) {
		return res.status(500).json({"ERROR - getAllApprovedImages": e});
	}
});

router.get('/searchImages', async (req, res) => {
	let searchTerm = req.query.searchTerm;
	try {
		searchTerm = validations.validateString(searchTerm, "Search Term");
	} catch (e) {
		return res.status(400).json({"ERROR - searchImages": e});
	}

	try {
		let searchImages = await imagesData.getImagesWithText();
		return res.status(200).json(searchImages);
	} catch(e) {
		return res.status(500).json({"ERROR - searchImages": e});
	}
});

router.get('/getImageByUserId/:id', async (req,res) =>{
	let userId = req.params['id'];
	try {
		userId = validations.validateId(userId, "Image Id");
	} catch (e) {
		return res.status(400).json({"ERROR - getImageByUserId": e});
	}

	try {
		let imageObjects = await imagesData.getImagesByUserId(userId);
		return res.status(200).json(imageObjects);
	} catch(e) {
		return res.status(500).json({"ERROR - getImageByUserId": e});
	}
});

// Not sure if this is needed
router.post('/editImageByImageId/:id', async (req,res) =>{

});


router.post('/deleteImageByImageId/:id', async (req,res) =>{
	let imageId = req.params['id'];
	try {
		imageId = validations.validateId(imageId, "Image Id");
	} catch (e) {
		return res.status(400).json({"ERROR - deleteImageByImageId": e});
	}

	try {
		let deletedImage = await imagesData.deleteImageByImageId(imageId);
		return res.status(200).json(deletedImage);
	} catch(e) {
		if(e instanceof UnprocessibleRequest)
			return res.status(e.status).json({"ERROR - deleteImageByImageId": e.message});
		return res.status(500).json({"ERROR - deleteImageByImageId": e});
	}
});

/**
 * Get Image by ImageLink
 */
router.get('/:fileName', async (req,res) =>{
	const fileName = req.params['fileName'];
	const filePath = path.join(__dirname, '../images', fileName);
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


module.exports = router;