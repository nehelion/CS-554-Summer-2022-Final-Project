const express = require('express');
const router = express.Router();
const data = require('../data');
const imagesData = data.images;
let { ObjectId } = require('mongodb');
const xss = require('xss');

router.post('/addUnapprovedImage', async (req,res) =>{
	try {
		var body = req.body;
		if (!body.url || !body.tag || !body.text) throw 'Empty input!';
		const url = xss(body.url);
		const tag = xss(body.tag);
		const text = xss(body.text);
		let x = await imagesData.addUnapprovedImage(url, tag, text);
		res.status(200).json({"Successful":"Successful"});
	} 
	catch (e) {
		throw e;
	}
});

router.get('/getAllUnapprovedImages', async (req,res) =>{

});

router.post('/approveImageByImageId/:id', async (req,res) =>{

});

router.get('/getAllApprovedImages', async (req,res) =>{
	try {
		let x = await imagesData.getAllApprovedImages();
		res.status(200).json(x);
	} 
	catch (e) {
		throw e;
	}
});

router.get('/getImageByImageId/:id', async (req,res) =>{

});

router.get('/getImageByUserId/:id', async (req,res) =>{

});

router.post('/editImageByImageId/:id', async (req,res) =>{

});

router.post('/deleteImageByImageId/:id', async (req,res) =>{

});


module.exports = router;