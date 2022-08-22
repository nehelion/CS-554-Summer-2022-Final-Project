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
		res.status(500).json({"1":e});
	}
});

router.get('/getAllUnapprovedImages', async (req,res) =>{
	try {
		let x = await imagesData.getAllUnapprovedImages();
		res.status(200).json(x);
	} 
	catch (e) {
		res.status(500).json({"1":e});
	}
});

router.get('/getOneUnapprovedImage', async (req,res) =>{
	try {
		let x = await imagesData.getOneUnapprovedImage();
		res.status(200).json(x);
	} 
	catch (e) {
		res.status(500).json({"1":e});
	}
});

router.post('/approveImageByImageId', async (req,res) =>{
	try {
		var body = req.body;
		if (!body._id) throw 'Empty approve input!';
		const id = xss(body._id);
		let x = await imagesData.approveImageByImageId(id);
		res.status(200).json(x);
	} 
	catch (e) {
		res.status(500).json({"1":e});
	}
});

router.get('/getAllApprovedImages', async (req,res) =>{
	try {
		let x = await imagesData.getAllApprovedImages();
		res.status(200).json(x);
	} 
	catch (e) {
		res.status(500).json({"1":e});
	}
});

router.get('/getImageByImageId/:id', async (req,res) =>{
	try {
		const id = req.params.id;
		if (!id) throw 'Empty userId!';
		let x = await imagesData.getImageByImageId(id);
		res.status(200).json(x);
	} 
	catch (e) {
		res.status(500).json({"1":e});
	}
});

router.get('/getImageByUserId/:id', async (req,res) =>{

});

router.post('/editImageByImageId', async (req,res) =>{
	try {
		var body = req.body;
		if (!body._id || !body.edit) throw 'Empty new text input!';
		const id = xss(body._id);
		const text = xss(body.edit);
		let x = await imagesData.editImageByImageId(id, text);
		res.status(200).json(x);
	} 
	catch (e) {
		res.status(500).json({"1":e});
	}
});

router.post('/deleteImageByImageId', async (req,res) =>{
	try {
		var body = req.body;
		if (!body._id) throw 'Empty delete input!';
		const id = xss(body._id);
		let x = await imagesData.deleteImageByImageId(id);
		res.status(200).json(x);
	} 
	catch (e) {
		res.status(500).json({"1":e});
	}
});


module.exports = router;