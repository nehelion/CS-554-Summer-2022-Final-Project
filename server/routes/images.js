const express = require('express');
const router = express.Router();
const imagesData = require('../data/images');
let { ObjectId } = require('mongodb');
const xss = require('xss');

router.get('/getAllUnapprovedImages', async (req,res) =>{

});

router.post('/approveImageByImageId/:id', async (req,res) =>{

});

router.get('/getAllApprovedImages', async (req,res) =>{

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