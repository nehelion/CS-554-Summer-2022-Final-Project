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
let multer = require('multer');
const helpers = require('./helpers');
const { images } = require('../data');

var storage = multer.diskStorage({
  destination: function(req, file, callback) 
	{
    callback(null, 'images/');
  },
  filename: function (req, file, callback) 
	{
		var newFileName = 'image-' + Date.now() + path.extname(file.originalname);
		callback(null, newFileName);
  }
});
var upload = multer({ storage: storage }).single('file');

router.post('/setImage', upload, async (req,res) => {
	try 
	{
		let ownerMail = xss(req.body.ownerMail);
		let filename = xss(req.file.filename);
		let textExtracted = xss(req.body.textExtracted);

		try {
			ownerMail = validations.validateMail(ownerMail);
			filename = validations.validateString(filename);
			textExtracted = validations.validateString(textExtracted);
		} catch(e) {
			return res.status(400).json({"ERROR - setImage": e});
		}

		try {
			let insertedImage = await imagesData.insertImage(ownerMail, filename, textExtracted);
			return res.status(200).json(insertedImage);
		} catch (e) {
			return res.status(500).json({"ERROR - setUmage": e});
		}
	} 
	catch (e) 
	{
		res.status(404).json({error: e});
	}
});

router.get('/getOneUnapprovedImage', async (req,res) =>{
	try {
		let unApprovedImage = await imagesData.getOneUnapprovedImage();
		return res.status(200).json(unApprovedImage);
	} catch(e) {
		return res.status(500).json({"ERROR - getOneUnapprovedImage": e});
	}
});

router.post('/approveImageByImageId/', async (req,res) =>{
	let imageId = req.body._id;
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
	let searchTerm = xss(req.query.searchTerm);
	try {
		searchTerm = validations.validateString(searchTerm, "Search Term");
	} catch (e) {
		return res.status(400).json({"ERROR - searchImages": e});
	}

	try {
		let searchImages = await imagesData.getImagesWithText(searchTerm);
		return res.status(200).json(searchImages);
	} catch(e) {
		return res.status(500).json({"ERROR - searchImages": e});
	}
});

router.get('/getImageByUserId/:id', async (req,res) =>{
	let userId = xss(req.params['id']);
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
router.post('/updateText/:id', async (req,res) =>{
	let imageId = xss(req.params['id']);
	let updateText = req.body.updateText;
	try {
		imageId = validations.validateId(imageId, "Image Id");
		updateText = validations.validateString(updateText, "Update Text");
	} catch (e) {
		return res.status(400).json({"ERROR - updateText": e});
	}

	try {
		let updatedImage = await imagesData.updateTextbyImageId(imageId, updateText);
		return res.status(200).json(updatedImage);
	} catch(e) {
		return res.status(500).json({"ERROR - updateText": e});
	}
});


router.post('/deleteImageByImageId', async (req,res) =>{
	let imageId = xss(req.body._id);
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
router.get('/download/:fileName', async (req,res) =>{
	const fileName = xss(req.params['fileName']);
	const filePath = path.join(__dirname, '../images', fileName);
	try {
		if(fs.existsSync(filePath)) {
			// File Exists. Return it
			console.log("exist");
			return res.status(200).sendFile(filePath);
		} else {
			// File not available
			console.log("exist not");
			return res.status(400).sendFile(path.join(__dirname, '../images', "NoImage.png"));
		}
	} catch (e) {
		return res.status(500).json({"ERROR": "Failed to send file"});
	}
});


module.exports = router;